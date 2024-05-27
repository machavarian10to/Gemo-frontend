import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Fade from '@mui/material/Fade';
import AddComment from '@/components/pages/UserHome/user-gem/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/Comment';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { updateGem } from '@/state/index';
import axiosInstance from '@/services/axios';
import ViewReactsModal from '@/components/pages/UserHome/user-gem/ViewReactsModal';

function UserGemFooter({ gem }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const emojiPickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentList, setCommentList] = useState([]);

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

  function addEmoji(gemEmoji) {
    const newReaction = {
      emoji: gemEmoji.emoji,
      users: [
        {
          userId: user._id,
          userName: user.username,
          userPhoto: user.profilePicture,
        },
      ],
    };

    let updatedReactions = gem.reacts
      .map((react) => {
        if (react.emoji === gemEmoji.emoji) {
          const updatedUsers = react.users.filter(
            (reactingUser) => reactingUser.userId !== user._id,
          );
          return {
            ...react,
            users: [...updatedUsers, newReaction.users[0]],
          };
        } else {
          return {
            ...react,
            users: react.users.filter(
              (reactingUser) => reactingUser.userId !== user._id,
            ),
          };
        }
      })
      .filter((react) => react.users.length > 0);

    if (!updatedReactions.some((react) => react.emoji === gemEmoji.emoji)) {
      updatedReactions.push(newReaction);
    }

    axiosInstance
      .put(`/api/gems/${gem._id}/update-gem-reacts`, {
        reacts: updatedReactions,
      })
      .then((res) => {
        dispatch(updateGem({ _id: gem._id, ...res.data }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShowEmojis(false);
      });
  }

  function updateGemReacts(emoji) {
    const updatedReactions = gem.reacts
      .map((react) => {
        if (react.emoji === emoji) {
          const userIndex = react.users.findIndex(
            (reactingUser) => reactingUser.userId === user._id,
          );

          if (userIndex !== -1) {
            return {
              ...react,
              users: [
                ...react.users.slice(0, userIndex),
                ...react.users.slice(userIndex + 1),
              ],
            };
          } else {
            return {
              ...react,
              users: [
                ...react.users,
                {
                  userId: user._id,
                  userName: user.username,
                  userPhoto: user.profilePicture,
                },
              ],
            };
          }
        } else {
          return {
            ...react,
            users: react.users.filter(
              (reactingUser) => reactingUser.userId !== user._id,
            ),
          };
        }
      })
      .filter((react) => react.users.length > 0);

    axiosInstance
      .put(`/api/gems/${gem._id}/update-gem-reacts`, {
        reacts: updatedReactions,
      })
      .then((res) => {
        dispatch(updateGem({ _id: gem._id, ...res.data }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShowEmojis(false);
      });
  }

  return (
    <>
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
          <span>{commentList.length}</span>
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
              onEmojiClick={(emoji) => addEmoji(emoji)}
              previewConfig={{ showPreview: false }}
              autoFocusSearch={false}
              emojiStyle='native'
              theme='light'
            />
          </div>
        )}
      </div>

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
                onClick={() => updateGemReacts(react.emoji)}
              >
                <div className='user-gem__emoji'>{react.emoji}</div>
                <div className='user-gem__emoji-count'>
                  {react.users.length}
                </div>
              </div>
            ))}
          </div>

          <span
            className='user-gem__view-reacts'
            onClick={() => setShowReactionsModal(true)}
          >
            view reactions
          </span>
        </>
      )}

      {showReactionsModal && (
        <ViewReactsModal
          reacts={gem.reacts}
          closeModal={() => setShowReactionsModal(false)}
        />
      )}

      {showCommentSection && (
        <Fade in={true} timeout={600}>
          <div className='user-gem__comment-section'>
            <AddComment placeholder='Write a comment' />

            {commentList.length > 0 && (
              <div className='user-gem__comment-list'>
                {commentList.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            )}
            {commentList.length > 1 && (
              <div className='user-gem__comment-show-more-comments'>
                show more comments
              </div>
            )}
          </div>
        </Fade>
      )}
    </>
  );
}

UserGemFooter.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default UserGemFooter;
