import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import axiosInstance from '@/services/axios';
import ViewReactsModal from '@/components/pages/UserHome/user-gem/ViewReactsModal';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CommentSection from '@/components/pages/UserHome/user-gem/comments/CommentSection';

function UserGemFooter({ gemInfo }) {
  const user = useSelector((state) => state.user);

  const emojiPickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [gem, setGem] = useState(gemInfo);

  const [showCommentSection, setShowCommentSection] = useState(false);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  useEffect(() => {
    if (showReactionsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showReactionsModal]);

  function onEmojiClick(emoji) {
    axiosInstance
      .put(`/api/gems/${gem._id}/reacts`, {
        emoji,
        userId: user._id,
      })
      .then(({ data }) => {
        setGem(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShowEmojis(false);
      });
  }

  return (
    <>
      {gem.reacts.length > 0 && (
        <>
          <div className='user-gem__emoji-list'>
            {gem.reacts.map((react) => (
              <div
                key={react._id}
                className={`user-gem__emoji-wrapper ${
                  react.users.some(
                    (reactingUser) => reactingUser.userId === user._id,
                  )
                    ? 'active-emoji'
                    : ''
                }`}
                onClick={() => onEmojiClick(react.emoji)}
              >
                <div className='user-gem__emoji'>{react.emoji}</div>
                <div className='user-gem__emoji-count'>
                  {react.users.length}
                </div>
              </div>
            ))}
            <div
              className='user-gem__view-reactions'
              onClick={() => setShowReactionsModal(true)}
            >
              <EmojiEmotionsOutlinedIcon
                style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: 'var(--color-grey)',
                }}
              />
              <div>See all</div>
            </div>
          </div>
        </>
      )}

      {showReactionsModal && (
        <ViewReactsModal
          gemId={gem._id}
          closeModal={() => setShowReactionsModal(false)}
        />
      )}

      <div className='user-gem__footer'>
        <div
          className={`user-gem__footer-container ${
            showEmojis ? 'active-section' : ''
          }`}
          onClick={() => setShowEmojis((prev) => !prev)}
        >
          <AddReactionOutlinedIcon style={{ fontSize: '19px' }} />
          <span>React</span>
          <span>
            {gem.reacts
              .map((react) => react.users.length)
              .reduce((a, b) => a + b, 0)}
          </span>
        </div>
        <div
          className={`user-gem__footer-container ${
            showCommentSection ? 'active-section' : ''
          }`}
          onClick={() => setShowCommentSection((prev) => !prev)}
        >
          <SmsOutlinedIcon style={{ fontSize: '19px' }} />
          <span>Comment</span>
          <span>{gem.comments.length}</span>
        </div>
        <div className='user-gem__footer-container'>
          <AutorenewOutlinedIcon style={{ fontSize: '19px' }} />
          <span>Share</span>
          <span>0</span>
        </div>
        <div className='user-gem__footer-container'>
          <ForwardToInboxOutlinedIcon style={{ fontSize: '20px' }} />
          <span>Send</span>
          <span>0</span>
        </div>
        <div className='user-gem__footer-container' title='Add to favorites'>
          <StarBorderOutlinedIcon style={{ fontSize: '19px' }} />
        </div>

        {showEmojis && (
          <div className='user-gem__emoji-picker-wrapper' ref={emojiPickerRef}>
            <EmojiPicker
              onEmojiClick={(react) => onEmojiClick(react.emoji)}
              previewConfig={{ showPreview: false }}
              autoFocusSearch={false}
              emojiStyle='native'
              theme='light'
            />
          </div>
        )}
      </div>

      {showCommentSection && <CommentSection gem={gem} />}
    </>
  );
}

UserGemFooter.propTypes = {
  gemInfo: PropTypes.object.isRequired,
};

export default UserGemFooter;
