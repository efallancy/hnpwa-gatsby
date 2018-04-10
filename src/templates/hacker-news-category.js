import React from 'react';
import PropTypes from 'prop-types';

import StoryListItem from '../components/story-list-item';
import Pagination from '../components/pagination';

const HackerNewsCategoryTemplate = ({
  pathContext: {
    stories,
    hasNextPage,
    hasPreviousPage,
    currentPage,
    categoryPath,
  },
}) => (
  <div
    css={{
      marginBottom: '2rem',
      width: '100%',
    }}
  >
    <Pagination
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      currentPage={currentPage}
      categoryPath={categoryPath}
    />
    {stories.map((story, index) => <StoryListItem key={index} {...story} />)}
  </div>
);

HackerNewsCategoryTemplate.propTypes = {
  pathContext: PropTypes.shape({
    stories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        by: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
        score: PropTypes.number,
        order: PropTypes.number,
        domain: PropTypes.string,
        category: PropTypes.string,
        descendants: PropTypes.number,
        timeISO: PropTypes.string,
        childrenHnComment: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string,
            by: PropTypes.string,
            timeISO: PropTypes.string,
          })
        ),
      })
    ),
  }),
};

export default HackerNewsCategoryTemplate;
