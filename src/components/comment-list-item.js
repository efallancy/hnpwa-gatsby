import React from 'react';
import PropTypes from 'prop-types';

const CommentList = ({by, timeISO, text}) => (
  <div
    css={{
      padding: '1rem 0',
    }}
  >
    <div
      css={{
        backgroundColor: '#f5f5f5',
        margin: '0 0 1.5rem',
        padding: '1rem 1.5rem',
        '& p': {
          margin: '1rem 0',
        },
        '& a': {
          color: '#0274b3',
          textDecoration: 'none',
        },
        '& a:hover': {
          textDecoration: 'underline',
        },
      }}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
    <p>
      <em>{by}</em> - {timeISO}
    </p>
  </div>
);

CommentList.propTypes = {
  text: PropTypes.string,
  by: PropTypes.string,
  timeISO: PropTypes.string,
};

export default CommentList;
