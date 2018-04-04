module.exports = {
  siteMetadata: {
    title: 'HNPWA with GatsbyJS',
    description: 'Hacker News app build with GatsbyJS.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-glamor',
    'gatsby-plugin-offline',
    'gatsby-source-hacker-news',
  ],
};
