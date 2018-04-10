import React from 'react';
import PropTypes from 'prop-types';

import Link from './link';

const PreviousPageNavigation = ({
  hasPreviousPage,
  currentPage,
  categoryPath,
}) =>
  hasPreviousPage ? (
    <Link
      to={`/${categoryPath}${
        currentPage - 1 === 1 ? '' : `/${currentPage - 1}`
      }`}
      css={{
        color: '#25ced1',
        textDecoration: 'none',
      }}
    >
      &lt; Prev
    </Link>
  ) : (
    <p
      css={{
        color: '#979797',
        margin: '0',
      }}
    >
      &lt; Prev
    </p>
  );

const NextPageNavigation = ({hasNextPage, currentPage, categoryPath}) =>
  hasNextPage ? (
    <Link
      to={`/${categoryPath}/${currentPage + 1}`}
      css={{
        color: '#25ced1',
        textDecoration: 'none',
      }}
    >
      Next &gt;
    </Link>
  ) : (
    <p
      css={{
        color: '#979797',
        margin: '0',
      }}
    >
      Next &gt;
    </p>
  );

const Pagination = ({
  hasPreviousPage,
  hasNextPage,
  currentPage,
  categoryPath,
}) => (
  <div
    css={{
      fontSize: '1.8rem',
      maxWidth: '300px',
      margin: '0 auto 2rem',
      padding: '1rem 1.5rem',
    }}
  >
    <div
      css={{
        display: 'inline-block',
        textAlign: 'left',
        width: 'calc(100% / 3)',
      }}
    >
      <PreviousPageNavigation
        hasPreviousPage={hasPreviousPage}
        currentPage={currentPage}
        categoryPath={categoryPath}
      />
    </div>
    <div
      css={{
        display: 'inline-block',
        textAlign: 'center',
        width: 'calc(100% / 3)',
      }}
    >
      <span>{currentPage}</span>
    </div>
    <div
      css={{
        display: 'inline-block',
        textAlign: 'right',
        width: 'calc(100% / 3)',
      }}
    >
      <NextPageNavigation
        hasNextPage={hasNextPage}
        currentPage={currentPage}
        categoryPath={categoryPath}
      />
    </div>
  </div>
);

Pagination.propTypes = {
  hasNextPage: PropTypes.bool,
  hasPreviousPage: PropTypes.bool,
  currentPage: PropTypes.number,
  categoryPath: PropTypes.string,
};

PreviousPageNavigation.propTypes = {
  hasPreviousPage: PropTypes.bool,
  currentPage: PropTypes.number,
  categoryPath: PropTypes.string,
};

NextPageNavigation.propTypes = {
  hasNextPage: PropTypes.bool,
  currentPage: PropTypes.number,
  categoryPath: PropTypes.string,
};

export default Pagination;
