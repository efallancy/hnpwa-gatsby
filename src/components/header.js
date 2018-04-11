import React from 'react';
import PropTypes from 'prop-types';

import Logo from './logo';
import Link from './link';

const links = [
  {
    text: 'TOP',
    url: '/top',
  },
  {
    text: 'NEW',
    url: '/new',
  },
  {
    text: 'SHOW',
    url: '/show',
  },
  {
    text: 'ASK',
    url: '/ask',
  },
  {
    text: 'JOB',
    url: '/job',
  },
];

const getMatchingPathIndex = (url, pathname) => {
  const splitPath = pathname.split('/').filter((item) => !!item);

  return splitPath.length && url.includes(splitPath[0]);
};

const Header = ({location}) => (
  <header
    css={{
      backgroundColor: '#25CED1',
    }}
  >
    <nav
      css={{
        margin: '0 auto',
        padding: '2rem',
      }}
    >
      {links.map((link, index) => (
        <p
          key={index}
          css={{
            display: 'inline-block',
            fontSize: '1.8rem',
            margin: '0',
            width: '15rem',
            '@media (max-width: 992px)': {
              marginRight: '5rem',
              width: 'auto',
            },
            '@media (max-width: 600px)': {
              fontSize: '1.5rem',
              marginRight: '1.5rem',
              width: 'auto',
            },
          }}
        >
          <Link
            to={link.url}
            css={{
              color: getMatchingPathIndex(link.url, location.pathname)
                ? '#2b2b2b'
                : 'white',
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
