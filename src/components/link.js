import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';

const Link = ({to, ...props}) => {
  let isExternalLink = false;
  if (/^https?:\/\/.*/.test(to)) {
    isExternalLink = true;
  }

  return isExternalLink ?
    <a href={to} {...props} /> :
    <GatsbyLink to={to} {...props} />;
};

Link.propTypes = {
  to: PropTypes.string,
};

export default Link;
