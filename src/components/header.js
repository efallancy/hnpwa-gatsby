import React from 'react';
import PropTypes from 'prop-types';

import Link from './link';

const links = [
  {
    text: 'HNPWA',
    url: 'https://www.gatsbyjs.org',
  },
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
              width: 'auto',
              marginRight: '5rem',
            },
          }}
        >
          <Link
            to={link.url}
            css={{
              color: getMatchingPathIndex(link.url, location.pathname) ?
                '#0274b3' :
                'white',
              textDecoration: 'none',
            }}
          >
            {link.text}
          </Link>
        </p>
      ))}
    </nav>
  </header>
);

Header.propTypes = {
  location: PropTypes.object,
}

export default Header;
