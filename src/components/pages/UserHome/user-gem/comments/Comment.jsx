import { useState, useRef, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import useClickOutside from '@/hook/useClickOutside';
import PropTypes from 'prop-types';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import EmojiPicker from 'emoji-picker-react';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { Fade } from '@mui/material';
import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import CommentHeader from '@/components/pages/UserHome/user-gem/comments/CommentHeader';
import axiosInstance from '@/services/axios';
import { updateGemComment } from '@/state/index.js';
import ViewReactsModal from '@/components/pages/UserHome/user-gem/ViewReactsModal';

function Comment({ comment, setComments }) {
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
        onUpdateComment({ ...res.data });
        dispatch(updateGemComment({ ...res.data }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShowEmojis(false);
      });
  }

  function updateCommentReacts(emoji) {
    const updatedReactions = comment.reacts
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
            gemId={comment.gemId}
            placeholder='Edit comment...'
            comment={comment}
            setComments={setComments}
            setShowEditComment={setShowEditComment}
            focus
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
            <UserAvatar
              width={32}
              height={30}
              src={comment.commentAuthor.profilePhoto}
            />

            {!comment.content ? (
              <div className='user-gem__comment-details-only-media'>
                <CommentHeader
                  comment={comment}
                  setComments={setComments}
                  onEditComment={onEditComment}
                />
              </div>
            ) : (
              <div className='user-gem__comment-details'>
                <CommentHeader
                  comment={comment}
                  setComments={setComments}
                  onEditComment={onEditComment}
                />
                <div className='user-gem__comment-text'>{comment.content}</div>
              </div>
            )}
          </div>

          {comment.media.gifSrc && (
            <div
              className='user-gem__comment-media'
              style={{ marginTop: comment.content && '8px' }}
            >
              <img src={comment.media.gifSrc} alt='user-gem-comment-media' />
            </div>
          )}

          {comment.media.fileSrc && (
            <div
              className='user-gem__comment-media'
              style={{ marginTop: comment.content && '8px' }}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/assets/${
                  comment.media.fileSrc
                }`}
                alt='user-gem-comment-media'
              />
            </div>
          )}

          {comment.reacts.length > 0 && (
            <>
              <div className='user-gem__emoji-list'>
                {comment.reacts.map((react) => (
                  <div
                    key={react._id}
                    className={`user-gem__emoji-wrapper user-gem__emoji-comment-wrapper ${
                      react.users.some(
                        (reactingUser) => reactingUser.userId === user._id,
                      )
                        ? 'active-emoji'
                        : ''
                    }`}
                    onClick={() => updateCommentReacts(react.emoji)}
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
                      fontSize: '11px',
                      color: 'var(--color-grey)',
                      marginTop: '2px',
                    }}
                  />
                  <div>view reacts</div>
                </div>
              </div>
            </>
          )}

          {showReactionsModal && (
            <ViewReactsModal
              modalReacts={comment.reacts}
              closeModal={() => setShowReactionsModal(false)}
            />
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
                    gemId={comment.gemId}
                    placeholder='Write a reply...'
                    comment={comment}
                    setComments={setComments}
                    setShowEditComment={setShowEditComment}
                    isReply
                    focus
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
  setComments: PropTypes.func,
};

export default Comment;
