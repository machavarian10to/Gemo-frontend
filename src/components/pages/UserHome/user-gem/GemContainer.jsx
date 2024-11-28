import { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import EventContainer from '@/components/pages/UserHome/user-gem/EventContainer';
import GemHeader from '@/components/pages/UserHome/user-gem/layout/GemHeader';
import GemMedia from '@/components/pages/UserHome/user-gem/GemMedia';
import GemPoll from './poll/GemPoll';
import GemFooter from '@/components/pages/UserHome/user-gem/layout/GemFooter';
import Skeleton from 'react-loading-skeleton';

function GemContainer({ gem }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {gem ? (
        <div className='user-gem' id={`gem-${gem._id}`}>
          <GemHeader gem={gem} />

          <div className='user-gem__texts'>
            <h3>{gem.title}</h3>
            {gem?.content?.body && (
              <div
                className='user-gem__body'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    showMore
                      ? gem?.content?.body
                      : gem?.content?.body.slice(0, 200),
                  ),
                }}
              ></div>
            )}
            {!showMore && gem?.content?.body?.length > 200 && (
              <div
                className='user-gem__show-full-gem'
                onClick={() => setShowMore((prev) => !prev)}
              >
                <span>show more</span>
              </div>
            )}
            {gem?.content?.body?.length > 200 && showMore && (
              <div
                className='user-gem__show-full-gem'
                onClick={() => setShowMore((prev) => !prev)}
              >
                <span>show less</span>
              </div>
            )}
          </div>

          {(gem.media || gem?.content?.gifSrc) && <GemMedia gem={gem} />}

          {gem.type === 'event' ? (
            <EventContainer gem={gem} />
          ) : (
            gem.type === 'poll' && <GemPoll gemId={gem._id} />
          )}

          <GemFooter gemInfo={gem} />
        </div>
      ) : (
        <div className='user-gem'>
          <div className='user-gem__header-skeleton'>
            <Skeleton circle={true} height={32} width={32} />
            <div>
              <Skeleton width={200} height={10} />
              <Skeleton width={80} height={7} />
            </div>
          </div>

          <div className='user-gem__texts'>
            <Skeleton height={100} style={{ marginTop: '10px' }} />
            <div className='user-gem__footer-skeleton-wrapper'>
              <Skeleton containerClassName='flex-1' />
              <Skeleton containerClassName='flex-1' />
              <Skeleton containerClassName='flex-1' />
              <Skeleton containerClassName='flex-1' />
              <Skeleton
                width={100}
                baseColor='transparent'
                enableAnimation={false}
              />
              <Skeleton containerClassName='flex-1 last-skeleton' width={20} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

GemContainer.propTypes = {
  gem: PropTypes.object,
};

export default GemContainer;
