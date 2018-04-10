import React from 'react';
import PropTypes from 'prop-types';

import Link from './link';

const LinkTag = ({href, children, ...props}) =>
  href ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <span {...props}>{children}</span>
  );

const StoryList = ({
  id,
  score,
  url,
  title,
  by,
  timeISO,
  descendants,
  domain,
}) => (
  <div
    css={{
      alignItems: 'center',
      backgroundColor: '#fffffc',
      border: '1px solid #bdbdbd',
      borderRadius: '5px',
      display: 'flex',
      margin: '0 0 2rem',
      padding: '2rem 0',
      width: '100%',
    }}
  >
    <div
      css={{
        display: 'inline-block',
        padding: '0 1rem 0 2rem',
        width: '85px',
      }}
    >
      <p
        css={{
          color: '#25ced1',
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {score}
      </p>
    </div>
    <div
      css={{
        display: 'inline-block',
        padding: '0 2rem 0 1rem',
        width: 'calc(100% - 80px)',
      }}
    >
      <p
        css={{
          fontSize: '1.8rem',
          marginBottom: '0.6rem',
        }}
      >
        <LinkTag
          href={url}
          css={{
            color: 'rgba(0, 0, 0, 0.85)',
            textDecoration: 'none',
          }}
        >
          {title}
        </LinkTag>
      </p>
      <p
        css={{
          color: '#979797',
          lineHeight: '1.5',
          margin: '0',
        }}
      >
        {by} - {timeISO} - {' '}
        <Link
          to={`/${id}/comments`}
          css={{
            color: '#25ced1',
            textDecoration: 'none',
          }}
        >
          {descendants || 0}{' '}
          {descendants && descendants > 1 ? 'comments' : 'comment'}
        </Link>{' '}
        {(domain && `- (${domain})`) || ''}
      </p>
    </div>
  </div>
);

LinkTag.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
};

StoryList.propTypes = {
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
};

export default StoryList;
