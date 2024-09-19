import PropTypes from 'prop-types';

function GemMedia({ gem }) {
  return (
    <>
      {gem?.media?.fileSrc && gem.type !== 'event' ? (
        <div className='user-gem__image'>
          <img
            src={`${import.meta.env.VITE_API_URL}/assets/${gem.media.fileSrc}`}
            alt={gem.title + "'s image"}
            className='user-media-preview'
          />
        </div>
      ) : gem?.media?.gifSrc ? (
        <div className='user-gem__image'>
          <img
            src={gem.media.gifSrc}
            alt={gem.title}
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
