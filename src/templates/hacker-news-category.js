import React from 'react';
import PropTypes from 'prop-types';

const LinkTag = ({href, children, ...props}) =>
  href ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <span {...props}>{children}</span>
  );

const HackerNewsCategoryTemplate = ({pathContext: {stories}}) => (
  <div
    css={{
      marginTop: '2rem',
      maxWidth: '1024px',
    }}
  >
    {stories.map((story, index) => (
      <div
        key={index}
        css={{
          alignItems: 'center',
          backgroundColor: '#fffffc',
          border: '1px solid #bdbdbd',
          borderRadius: '5px',
          display: 'flex',
          margin: '0 0 2rem',
          padding: '2rem 0',
          width: '100%',
        }}
      >
        <div
          css={{
            display: 'inline-block',
            padding: '0 1rem 0 2rem',
            width: '85px',
          }}
        >
          <p
            css={{
              color: '#25ced1',
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {story.score}
          </p>
        </div>
        <div
          css={{
            display: 'inline-block',
            padding: '0 2rem 0 1rem',
            width: 'calc(100% - 80px)',
          }}
        >
          <p
            css={{
              fontSize: '1.8rem',
              marginBottom: '0.6rem',
            }}
          >
            <LinkTag
              href={story.url}
              css={{
                color: 'rgba(0, 0, 0, 0.85)',
                textDecoration: 'none',
              }}
            >
              {story.title}
            </LinkTag>
          </p>
          <p
            css={{
              color: '#979797',
              lineHeight: '1.5',
              margin: '0',
            }}
          >
            {story.by} - {story.timeISO} - ({story.descendants || 0} comments)
          </p>
        </div>
      </div>
    ))}
  </div>
);

HackerNewsCategoryTemplate.propTypes = {
  pathContext: PropTypes.shape({
    stories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        by: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
        score: PropTypes.number,
        order: PropTypes.number,
        domain: PropTypes.string,
        category: PropTypes.string,
        descendants: PropTypes.number,
        timeISO: PropTypes.string,
        childrenHnComment: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string,
            by: PropTypes.string,
            timeISO: PropTypes.string,
          })
        ),
      })
    ),
  }),
};

export default HackerNewsCategoryTemplate;
