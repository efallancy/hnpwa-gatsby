const path = require('path');
const axios = require(`axios`);
const crypto = require(`crypto`);
const url = require(`url`);
const _ = require(`lodash`);

const get = (query) =>
  axios.get(
    `https://www.graphqlhub.com/graphql?query=${encodeURIComponent(query)}`
  );

const createHnNode = (
  stories,
  storyType,
  createNode
) => {
  stories.filter(
    (story) => story !== null && story !== undefined
  ).forEach((story, i) => {
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
      children: kids.kids.map((k) => k.id),
      parent: `__SOURCE__`,
      content: storyStr,
      internal: {
        type: storyType,
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
      comments.filter(
        (comment) => comment !== null && comment !== undefined
      ).forEach((comment, i) => {
        if (!comment.kids) {
          comment.kids = [];
        }
        let commentNode = {
          ..._.omit(comment, `kids`),
          children: comment.kids.map((k) => k.id),
          parent,
          internal: {
            type: `${storyType}Comment`,
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
    showStories(limit: 30) {
      ...storiesFragment
    }
    askStories(limit: 30) {
      ...storiesFragment
    }
    jobStories(limit: 30) {
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

  createHnNode(topStories, 'TopHnStory', createNode);
  createHnNode(newStories, 'NewHnStory', createNode);
  createHnNode(showStories, 'ShowHnStory', createNode);
  createHnNode(askStories, 'AskHnStory', createNode);
  createHnNode(jobStories, 'JobHnStory', createNode);

  return;
};

const createPages = ({graphql, boundActionCreators}) => {
  const {createPages} = boundActionCreators;

  return new Promise((resolve, reject) => {
    const hackerNewsTemplate = path.resolve('./src/templates/hacker-news.js');

    graphql(`
      {
        allHnStory(sort: { fields: [order] }) {
          edges {
            node {
              title
              url
              score
              order
              domain
              timeISO(fromNow: true)
            }
          }
        }
      }
    `).then((res) => {
      const allHnStoryNodes = data.edges;
      console.log('Nodes', allHnStoryNodes.length);
      resolve();
    });
  });
};
