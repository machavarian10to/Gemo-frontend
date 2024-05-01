import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import EventContainer from '@/components/pages/UserHome/user-gem/EventContainer';
import UserGemHeader from '@/components/pages/UserHome/user-gem/layout/UserGemHeader';
import UserGemMedia from '@/components/pages/UserHome/user-gem/UserGemMedia';
import UserGemPoll from './poll/UserGemPoll';
import UserGemFooter from '@/components/pages/UserHome/user-gem/layout/UserGemFooter';

function GemContainer({ gem }) {
  return (
    <>
      <div className='user-gem'>
        <UserGemHeader gem={gem} />

        <div className='user-gem__texts'>
          <h3>{gem.title}</h3>
          {gem.body?.postContent && (
            <div
              className='user-gem__body'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(gem.body.postContent),
              }}
            ></div>
          )}
        </div>

        <UserGemMedia gem={gem} />

        {gem.type === 'event' ? (
          <EventContainer gem={gem} />
        ) : (
          gem.type === 'poll' && <UserGemPoll gem={gem} />
        )}

        <UserGemFooter />
      </div>
    </>
  );
}

GemContainer.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default GemContainer;
