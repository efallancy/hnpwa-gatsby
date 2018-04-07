import React from 'react';
import PropTypes from 'prop-types';

const HackerNewsComment = ({pathContext}) =>
  <div>
    <h1>{pathContext.title}</h1>
    <p>{pathContext.by} - {pathContext.createdAt}</p>
    <div css={{margin: '1rem 0'}}>
      {
        pathContext.comments.map(
          (comment, index) =>
            <div
              key={index}
              css={{
                padding: '1rem 1.5rem',
              }}
            >
              <pre>
                {comment.text}
              </pre>
              <p>
                <em>{comment.by}</em> - {comment.timeISO}
              </p>
            </div>
        )
      }
    </div>
  </div>;

HackerNewsComment.propTypes = {
  pathContext: PropTypes.shape({
    title: PropTypes.string,
    by: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.shape({
      text: PropTypes.string,
      by: PropTypes.string,
      timeISO: PropTypes.string,
    }),
  }),
};

export default HackerNewsComment;
