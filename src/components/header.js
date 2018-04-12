import React from 'react';
import PropTypes from 'prop-types';

import Logo from './logo';
import Link from './link';

const links = [
  {
    text: 'TOP',
    url: '/top/',
  },
  {
    text: 'NEW',
    url: '/new/',
  },
  {
    text: 'SHOW',
    url: '/show/',
  },
  {
    text: 'ASK',
    url: '/ask/',
  },
  {
    text: 'JOB',
    url: '/job/',
  },
];

const getMatchingPathIndex = (url, pathname) => {
  const splitPath = pathname.split('/').filter((item) => !!item);

  return splitPath.length && url.includes(splitPath[0]);
};

const Header = ({location}) => (
  <header
    css={{
      borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
      boxShadow: '0 0 8px 0 #979797',
      marginBottom: '0.8rem',
    }}
  >
    <nav
      css={{
        margin: '0 auto',
        maxWidth: '1024px',
        padding: '2rem',
      }}
    >
      {links.map((link, index) => (
        <p
          key={index}
          css={{
            borderBottom: getMatchingPathIndex(link.url, location.pathname)
              ? '2px solid #25CED1'
              : 'none',
            display: 'inline-block',
            fontSize: '1.6rem',
            margin: '0 5rem 0 0',
            padding: '0 0 0.5rem',
            '@media (max-width: 600px)': {
              fontSize: '1.5rem',
              marginRight: '1.5rem',
            },
          }}
        >
          <Link
            to={link.url}
            css={{
              color: '#2b2b2b',
              fontWeight: getMatchingPathIndex(link.url, location.pathname)
                ? 'bold'
                : '400',
              textDecoration: 'none',
            }}
          >
            {link.text}
          </Link>
        </p>
      ))}
      <p
        css={{
          display: 'inline-block',
          margin: 0,
          float: 'right',
        }}
      >
        <span
          css={{
            fontSize: '1.4rem',
            '@media (max-width: 624px)': {
              display: 'none',
            },
          }}
        >
          Built with&nbsp;
        </span>
        <Link to="https://github.com/emmafallancy/hnpwa-gatsby">
          <Logo width="50px" height="15px" />
        </Link>
      </p>
    </nav>
  </header>
);

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
