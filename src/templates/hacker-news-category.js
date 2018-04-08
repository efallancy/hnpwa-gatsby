import React from 'react';
import PropTypes from 'prop-types';

const HackerNewsCategoryTemplate = ({pathContext: {stories}}) => (
  <div
    css={{
      maxWidth: '1024px',
    }}
  >
    {stories.map((story, index) => (
      <div
        key={index}
        css={{
          padding: '1rem 1.5rem',
          margin: '1rem 0',
          borderBottom: '1px solid #bdbdbd',
          width: '100%',
        }}
      >
        <div
          css={{
            width: '128px',
            display: 'inline-block',
          }}
        >
          <p>{story.score}</p>
        </div>
        <div
          css={{
            width: 'calc(100% - 128px)',
            display: 'inline-block',
          }}
        >
          <h3>
            <a href={story.url}>{story.title}</a>
          </h3>
          <p>
            <em>{story.by}</em> - {story.timeISO}&nbsp; ({story.descendants ||
              0}{' '}
            comments)
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
