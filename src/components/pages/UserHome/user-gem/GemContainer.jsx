import { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import EventContainer from '@/components/pages/UserHome/user-gem/EventContainer';
import UserGemHeader from '@/components/pages/UserHome/user-gem/layout/UserGemHeader';
import UserGemMedia from '@/components/pages/UserHome/user-gem/UserGemMedia';
import UserGemPoll from './poll/UserGemPoll';
import UserGemFooter from '@/components/pages/UserHome/user-gem/layout/UserGemFooter';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function GemContainer({ gem }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

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
                __html: DOMPurify.sanitize(
                  showMore
                    ? gem.body.postContent
                    : gem.body.postContent.slice(0, 200),
                ),
              }}
            ></div>
          )}
          {!showMore && gem.body?.postContent?.length > 200 && (
            <div className='user-gem__show-full-gem' onClick={toggleShowMore}>
              <RemoveRedEyeOutlinedIcon style={{ fontSize: '16px' }} />
              <span>See full gem</span>
            </div>
          )}
          {gem.body?.postContent?.length > 200 && showMore && (
            <div className='user-gem__show-full-gem' onClick={toggleShowMore}>
              <VisibilityOffOutlinedIcon style={{ fontSize: '16px' }} />
              <span>See less</span>
            </div>
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
