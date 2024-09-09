import PropTypes from 'prop-types';

function GemMedia({ gem }) {
  return (
    <>
      {gem.body?.fileName && gem.type !== 'event' ? (
        <div className='user-gem__image'>
          <img
            src={`${import.meta.env.VITE_API_URL}/assets/${gem.body.fileName}`}
            alt={gem.title + "'s image"}
            className='user-media-preview'
          />
        </div>
      ) : gem.body?.gifSrc ? (
        <div className='user-gem__image'>
          <img
            src={gem.body.gifSrc}
            alt={gem.body.title}
            className='user-media-preview'
          />
        </div>
      ) : gem.body?.gif ? (
        <div className='user-gem__image'>
          <img
            src={gem.body.gif}
            alt={gem.body.title}
            className='user-media-preview'
          />
        </div>
      ) : null}
    </>
  );
}

GemMedia.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default GemMedia;
