const path = require('path');
const axios = require(`axios`);
const crypto = require(`crypto`);
const url = require(`url`);
const _ = require(`lodash`);

const get = (query) =>
  axios.get(
    `https://www.graphqlhub.com/graphql?query=${encodeURIComponent(query)}`
  );

// Node creation is pulled in from `gatsby-plugin-source-hacker-news`.
// Credits to the author. Extending functionality to pull in more resources.
const createHnNode = (stories, storyCategory, createNode) => {
  stories
    .filter((story) => story !== null && story !== undefined)
    .forEach((story, i) => {
      const storyStr = JSON.stringify(story);

      // Ask HN, Polls, etc. don't have urls.
      // For those that do, HN displays just the bare domain.
      let domain;
      if (story.url) {
        const parsedUrl = url.parse(story.url);
        const splitHost = parsedUrl.host.split(`.`);
        if (splitHost.length > 2) {
          domain = splitHost.slice(1).join(`.`);
        } else {
          domain = splitHost.join(`.`);
        }
      }

      let kids;
      kids = _.pick(story, `kids`);
      if (!kids.kids) {
        kids.kids = [];
      }
      const kidLessStory = _.omit(story, `kids`);

      const storyNode = {
        ...kidLessStory,
        category: `${storyCategory}HnStory`,
        children: kids.kids.filter((k) => k && k.id).map((k) => k.id),
        parent: `__SOURCE__`,
        content: storyStr,
        internal: {
          type: 'HnStory',
        },
        domain,
        order: i + 1,
      };

      // Just store the user id
      storyNode.by = storyNode.by.id;

      // Get content digest of node.
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(storyNode))
        .digest(`hex`);

      storyNode.internal.contentDigest = contentDigest;

      createNode(storyNode);

      // Recursively create comment nodes.
      const createCommentNodes = (comments, parent, depth = 0) => {
        comments
          .filter((comment) => comment !== null && comment !== undefined)
          .forEach((comment, i) => {
            if (!comment.kids) {
              comment.kids = [];
            }
            let commentNode = {
              ..._.omit(comment, `kids`),
              category: `${storyCategory}HnComment`,
              children: comment.kids.filter((k) => k && k.id).map((k) => k.id),
              parent,
              internal: {
                type: `HnComment`,
              },
              order: i + 1,
            };

            commentNode.by = commentNode.by.id;
            const nodeStr = JSON.stringify(commentNode);

            // Get content digest of comment node.
            const contentDigest = crypto
              .createHash(`md5`)
              .update(nodeStr)
              .digest(`hex`);

            commentNode.internal.contentDigest = contentDigest;
            commentNode.internal.content = nodeStr;

            createNode(commentNode);

            if (comment.kids.length > 0) {
              createCommentNodes(comment.kids, comment.id, depth + 1);
            }
          });
      };

      createCommentNodes(kids.kids, story.id);
    });
};

const createPaginatedHnCategoryPage = (
  stories = [],
  category = 'TopHnStory',
  limit = 10,
  skip = 0,
  depth = 1,
  templatePath,
  createPage,
  createRedirect
) => {
  const paginatedStories = stories.slice(skip, skip + limit - 1);

  const categoryPath = category.toLowerCase().replace(/hnstory/, '');
  const urlPath = `/${categoryPath}${depth === 1 ? '' : `/${depth}`}`;
  createPage({
    path: urlPath,
    component: path.resolve(templatePath),
    context: {
      stories: paginatedStories,
      hasNextPage: limit + skip <= stories.length,
      hasPreviousPage: depth !== 1,
      currentPage: depth,
      categoryPath,
    },
  });

  if (depth === 1) {
    createRedirect({
      fromPath: `${urlPath}/1`,
      toPath: urlPath,
      isPermanent: true,
    });
  }

  if (limit + skip <= stories.length) {
    createPaginatedHnCategoryPage(
      stories,
      category,
      limit,
      skip + limit - 1,
      depth + 1,
      templatePath,
      createPage,
      createRedirect
    );
  }
};

exports.sourceNodes = async ({
  boundActionCreators,
  getNode,
  hasNodeChanged,
}) => {
  const {createNode} = boundActionCreators;

  // Do the initial fetch
  console.time(`fetch HN data`);
  console.log(
    `Start fetching data from the Hacker News GraphQL API. Warning, this can take a long time e.g. 10-20 seconds or more.`
  );
  const result = await get(
    `
{
  hn {
    topStories(limit: 100) {
      ...storiesFragment
    }
    newStories(limit: 100) {
      ...storiesFragment
    }
    showStories(limit: 100) {
      ...storiesFragment
    }
    askStories(limit: 100) {
      ...storiesFragment
    }
    jobStories(limit: 100) {
      ...storiesFragment
    }
  }
}

fragment commentsFragment on HackerNewsItem {
  id
  text
  timeISO
  by {
    id
  }
}

fragment storiesFragment on HackerNewsItem {
  id
  title
  score
  timeISO
  url
  by {
    id
  }
  descendants
  kids {
    ...commentsFragment
  }
}
  `
  );
  console.timeEnd(`fetch HN data`);

  // Create story nodes.
  const topStories = result.data.data.hn.topStories;
  const newStories = result.data.data.hn.newStories;
  const showStories = result.data.data.hn.showStories;
  const askStories = result.data.data.hn.askStories;
  const jobStories = result.data.data.hn.jobStories;

  createHnNode(topStories, 'Top', createNode);
  createHnNode(newStories, 'New', createNode);
  createHnNode(showStories, 'Show', createNode);
  createHnNode(askStories, 'Ask', createNode);
  createHnNode(jobStories, 'Job', createNode);

  return;
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage, createRedirect} = boundActionCreators;

  return new Promise((resolve, reject) => {
    const hackerNewsCategoryTemplate = path.resolve(
      './src/templates/hacker-news-category.js'
    );

    const hackerNewsCommentTemplate = path.resolve(
      './src/templates/hacker-news-comment.js'
    );

    graphql(`
      {
        allHnStory(sort: { fields: [order] }) {
          edges {
            node {
              id
              by
              title
              url
              score
              order
              domain
              category
              descendants
              timeISO(fromNow: true)
              childrenHnComment {
                text
                by
                timeISO(fromNow: true)
              }
            }
          }
        }
      }
    `).then((res) => {
      let nodeCategory = {};
      const allHnStoryEdges = res.data.allHnStory.edges;

      allHnStoryEdges.forEach((edge) => {
        const node = edge.node;

        if (nodeCategory[node.category]) {
          nodeCategory[node.category].push(node);
        } else {
          nodeCategory[node.category] = [node];
        }

        createPage({
          path: `/comment/${node.id}`,
          component: path.resolve(hackerNewsCommentTemplate),
          context: {
            title: node.title,
            createdAt: node.timeISO,
            by: node.by,
            comments: node.childrenHnComment,
          },
        });
      });

      Object.keys(nodeCategory).forEach((category) => {
        createPaginatedHnCategoryPage(
          nodeCategory[category],
          category,
          10,
          0,
          1,
          hackerNewsCategoryTemplate,
          createPage,
          createRedirect
        );
      });

      // Redirect homepage to Top HN Story
      createRedirect({
        fromPath: `/`,
        toPath: '/top',
        isPermanent: true,
      });

      resolve();
    });
  });
};
