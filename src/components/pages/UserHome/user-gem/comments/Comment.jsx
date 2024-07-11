import { useState, useRef, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import useClickOutside from '@/hook/useClickOutside';
import PropTypes from 'prop-types';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import EmojiPicker from 'emoji-picker-react';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { Fade } from '@mui/material';
import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import CommentHeader from '@/components/pages/UserHome/user-gem/comments/CommentHeader';
import axiosInstance from '@/services/axios';
import { updateGemComment } from '@/state/index.js';

function Comment({ comment }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const emojiPickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);

  const [showCommentReply, setShowCommentReply] = useState(false);

  const [showEditComment, setShowEditComment] = useState(false);

  useEffect(() => {
    if (showReactionsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showReactionsModal]);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  function onEditComment() {
    setShowEditComment(true);
  }

  function addEmoji(commentEmoji) {
    const newReaction = {
      emoji: commentEmoji.emoji,
      users: [
        {
          userId: user._id,
          userName: user.username,
          userPhoto: user.profilePicture,
        },
      ],
    };

    let updatedReactions = comment.reacts
      .map((react) => {
        if (react.emoji === commentEmoji.emoji) {
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

    if (!updatedReactions.some((react) => react.emoji === commentEmoji.emoji)) {
      updatedReactions.push(newReaction);
    }

    axiosInstance
      .put(
        `/api/comments/${comment._id}/gems/${comment.gemId}/update-comment-reacts`,
        {
          reacts: updatedReactions,
        },
      )
      .then((res) => {
        dispatch(updateGemComment({ ...res.data }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShowEmojis(false);
      });
  }

  return (
    <>
      {showEditComment ? (
        <div className='user-gem__comment-edit'>
          <AddComment
            placeholder='Edit comment...'
            value={comment.body}
            gif={comment.gif}
            fileName={comment.fileName}
            commentId={comment._id}
            gemId={comment.gemId}
            hideEditComment={() => setShowEditComment(false)}
          />

          <div
            className='user-gem__comment-cancel'
            onClick={() => setShowEditComment(false)}
          >
            <DoDisturbOnOutlinedIcon style={{ fontSize: '14px' }} />
            <span>Cancel</span>
          </div>
        </div>
      ) : (
        <div className='user-gem__comment-wrapper'>
          <div className='user-gem__comment'>
            <UserAvatar width={32} height={30} src={comment.userPhoto} />

            {!comment.body ? (
              <div className='user-gem__comment-details-only-media'>
                <CommentHeader
                  comment={comment}
                  onEditComment={onEditComment}
                />
              </div>
            ) : (
              <div className='user-gem__comment-details'>
                <CommentHeader
                  comment={comment}
                  onEditComment={onEditComment}
                />
                <div className='user-gem__comment-text'>{comment.body}</div>
              </div>
            )}
          </div>

          {comment.gif && (
            <div
              className='user-gem__comment-media'
              style={{ marginTop: comment.body && '8px' }}
            >
              <img src={comment.gif} alt='user-gem-comment-media' />
            </div>
          )}
          {comment.fileName && (
            <div
              className='user-gem__comment-media'
              style={{ marginTop: comment.body && '8px' }}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/assets/${
                  comment.fileName
                }`}
                alt='user-gem-comment-media'
              />
            </div>
          )}

          {comment.reacts.length > 0 && (
            <div className='user-gem__emoji-list'>
              {comment.reacts.map((react) => (
                <div
                  key={react._id}
                  className={`user-gem__emoji-wrapper ${
                    react.users.some(
                      (reactingUser) => reactingUser.userId === user._id,
                    )
                      ? 'active-emoji'
                      : ''
                  }`}
                  onClick={() => console.log(react.emoji, react.users.length)}
                >
                  <div className='user-gem__emoji'>{react.emoji}</div>
                  <div className='user-gem__emoji-count'>
                    {react.users.length}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='user-gem__comment-actions'>
            <div
              className='user-gem__comment-action'
              onClick={() => setShowEmojis((prev) => !prev)}
            >
              <AddReactionOutlinedIcon
                style={{
                  color: showEmojis
                    ? 'var(--color-main-yellow)'
                    : 'rgba(130, 130, 130, 0.5)',
                  fontSize: '15px',
                }}
              />
              <div>React</div>
              <span>
                {comment.reacts
                  .map((react) => react.users.length)
                  .reduce((a, b) => a + b, 0)}
              </span>
            </div>
            <div
              className='user-gem__comment-action'
              onClick={() => setShowCommentReply(true)}
            >
              <ModeCommentOutlinedIcon
                style={{
                  color: 'rgba(130, 130, 130, 0.5)',
                  fontSize: '15px',
                }}
              />
              <div>Reply</div>
              <span>0</span>
            </div>
          </div>

          {showEmojis && (
            <div
              className='user-gem__comment-react-emoji-picker-wrapper'
              ref={emojiPickerRef}
            >
              <EmojiPicker
                onEmojiClick={(emoji) => addEmoji(emoji)}
                previewConfig={{ showPreview: false }}
                autoFocusSearch={false}
                emojiStyle='native'
                theme='light'
              />
            </div>
          )}

          {showCommentReply && (
            <Fade in={showCommentReply} timeout={400}>
              <div className='user-gem__comment-reply-wrapper'>
                <div className='user-gem__comment-reply'>
                  <AddComment
                    placeholder={`Reply to @${comment.userName}`}
                    value={'@' + comment.userName}
                  />
                </div>

                <div className='user-gem__comment-reply-actions'>
                  <div
                    className='user-gem__comment-reply-action'
                    onClick={() => setShowCommentReply(false)}
                  >
                    <DoDisturbOnOutlinedIcon style={{ fontSize: '15px' }} />
                    <span>Cancel</span>
                  </div>
                </div>
              </div>
            </Fade>
          )}
        </div>
      )}
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
