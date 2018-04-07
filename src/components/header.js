import React from 'react';

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

const Header = () => (
  <div
    css={{
      backgroundColor: '#25CED1',
    }}
  >
    <nav
      css={{
        margin: '0 auto',
        maxWidth: '1024px',
        padding: '1.45rem 1.0875rem',
      }}
    >
      {links.map((link, index) => (
        <p css={{color: '#dcdcdc'}} key={index}>
          <Link
            to={link.url}
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {link.text}
          </Link>
        </p>
      ))}
    </nav>
  </div>
);

export default Header;
