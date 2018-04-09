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
          }}
        >
          <Link
            to={link.url}
            css={{
              color: 'white',
              textDecoration: 'none',
              marginRight: '15rem',
            }}
          >
            {link.text}
          </Link>
        </p>
      ))}
    </nav>
  </header>
);

export default Header;
