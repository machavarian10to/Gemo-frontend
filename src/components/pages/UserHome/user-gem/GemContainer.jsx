import { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import EventContainer from '@/components/pages/UserHome/user-gem/EventContainer';
import UserGemHeader from '@/components/pages/UserHome/user-gem/layout/UserGemHeader';
import GemMedia from '@/components/pages/UserHome/user-gem/GemMedia';
import GemPoll from './poll/GemPoll';
import UserGemFooter from '@/components/pages/UserHome/user-gem/layout/UserGemFooter';
import Skeleton from 'react-loading-skeleton';

function GemContainer({ gem }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      {gem ? (
        <div className='user-gem'>
          <UserGemHeader gem={gem} />

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
              <div className='user-gem__show-full-gem' onClick={toggleShowMore}>
                <span>show more</span>
              </div>
            )}
            {gem?.content?.body?.length > 200 && showMore && (
              <div className='user-gem__show-full-gem' onClick={toggleShowMore}>
                <span>show less</span>
              </div>
            )}
          </div>

          <GemMedia gem={gem} />

          {gem.type === 'event' ? (
            <EventContainer gem={gem} />
          ) : (
            gem.type === 'poll' && <GemPoll gem={gem} />
          )}

          <UserGemFooter gem={gem} />
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
            <div>
              <Skeleton height={30} style={{ marginTop: '10px' }} />
              <Skeleton height={15} style={{ marginTop: '15px' }} />
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
