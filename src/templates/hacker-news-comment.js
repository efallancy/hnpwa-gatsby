import React from 'react';
import PropTypes from 'prop-types';

import CommentListItem from '../components/comment-list-item';

const HackerNewsComment = ({pathContext}) => (
  <div
    css={{
      margin: '2rem 1rem',
    }}
  >
    <h1>{pathContext.title}</h1>
    <p>
      By {pathContext.by} - {pathContext.createdAt}
    </p>
    <p
      css={{
        fontSize: '15px',
        margin: '0 0 2rem',
      }}
    >
      <em>Showing first level comment(s)</em>
    </p>
    <div css={{margin: '2rem 0'}}>
      {pathContext.comments.length ? (
        pathContext.comments.map((comment, index) => (
          <CommentListItem key={index} {...comment} />
        ))
      ) : (
        <div
          css={{
            backgroundColor: '#f5f5f5',
            padding: '1rem 1.5rem',
          }}
        >
          <p
            css={{
              margin: '0',
            }}
          >
            No comments for this story/post.
          </p>
        </div>
      )}
    </div>
  </div>
);

HackerNewsComment.propTypes = {
  pathContext: PropTypes.shape({
    title: PropTypes.string,
    by: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        by: PropTypes.string,
        timeISO: PropTypes.string,
      })
    ),
  }),
};

export default HackerNewsComment;
