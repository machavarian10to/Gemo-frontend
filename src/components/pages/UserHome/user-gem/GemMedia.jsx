import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PropTypes from 'prop-types';

function GemMedia({ gem }) {
  return (
    <>
      {gem.media?.fileSrc && gem.type !== 'event' ? (
        <div className='user-gem__image'>
          <img
            src={`${import.meta.env.VITE_API_URL}/assets/${gem.media.fileSrc}`}
            alt={gem.title + "'s image"}
            className='user-media-preview'
          />
        </div>
      ) : gem.media?.gifSrc ? (
        <div className='user-gem__image'>
          <img
            src={gem.media.gifSrc}
            alt={gem.title}
            className='user-media-preview'
          />
        </div>
      ) : gem?.content?.gifSrc ? (
        <div className='user-gem__image'>
          <img
            src={gem.content.gifSrc}
            alt={gem.title}
            className='user-media-preview'
          />
        </div>
      ) : (
        <div className='user-gem__image'>
          <div className='user-gem__image-skeleton'>
            <SkeletonTheme baseColor='var(--bg-main-color)'>
              <Skeleton height={300} />
            </SkeletonTheme>
          </div>
        </div>
      )}
    </>
  );
}

GemMedia.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default GemMedia;
