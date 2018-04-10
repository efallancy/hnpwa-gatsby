import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import 'glamor/reset';
import '../styles/reset.css';

const TemplateWrapper = ({children, location}) => (
  <div>
    <Helmet
      title="Hacker News - Gatsby"
      meta={[
        {name: 'description', content: 'Hacker News app built with GatsbyJS'},
        {name: 'keywords', content: 'pwa, hacker news, gatsbyjs'},
      ]}
    />
    <Header location={location} />
    <div
      css={{
        margin: '0 auto',
        maxWidth: '1044px',
        padding: '0 2rem',
      }}
    >
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
};

export default TemplateWrapper;
