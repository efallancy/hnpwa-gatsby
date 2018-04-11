module.exports = {
  siteMetadata: {
    title: 'HNPWA with GatsbyJS',
    description: 'Hacker News app build with GatsbyJS.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-glamor',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Hacker News - Gatsby',
        short_name: 'gatsbyhn',
        start_url: '/top',
        background_color: '#fffffc',
        theme_color: '#25ced1',
        display: 'minimal-ui',
        icon: 'src/images/gatsbyhn-icon.png',
      },
    },
  ],
};
