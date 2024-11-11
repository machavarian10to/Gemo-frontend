import { useState, useRef, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import useClickOutside from '@/hook/useClickOutside';
import PropTypes from 'prop-types';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import EmojiPicker from 'emoji-picker-react';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useSelector } from 'react-redux';
import { Fade } from '@mui/material';
import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import CommentHeader from '@/components/pages/UserHome/user-gem/comments/CommentHeader';
import CommentReply from '@/components/pages/UserHome/user-gem/comments/CommentReply';
import axiosInstance from '@/services/axios';
import ViewReactsModal from '@/components/pages/UserHome/user-gem/ViewReactsModal';

function Comment({ gemAuthorId, comment, setComments, setGem }) {
  const user = useSelector((state) => state.user);

  const emojiPickerRef = useRef(null);

  const [showEmojis, setShowEmojis] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [showCommentReply, setShowCommentReply] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);

  const [seeReplies, setSeeReplies] = useState(false);

  const [commentDetails, setCommentRepliesDetails] = useState({
    replies: comment.replies.slice(0, 10),
    limit: 10,
    skip: 0,
  });

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

  function onEmojiClick(emoji) {
    axiosInstance
      .put(`/api/gems/${comment.gemId}/comments/${comment._id}/reacts`, {
        emoji,
        userId: user._id,
      })
      .then(({ data }) => {
        setComments((prev) =>
          prev.map((prevComment) =>
            prevComment._id === data._id ? data : prevComment,
          ),
        );
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
            gemId={comment.gemId}
            comment={comment}
            setComments={setComments}
            setShowEditComment={setShowEditComment}
            setGem={setGem}
            focus
          />

          <div
            className='user-gem__comment-cancel'
            onClick={() => setShowEditComment(false)}
          >
            <DoDisturbOnOutlinedIcon style={{ fontSize: '15px' }} />
            <span>Cancel</span>
          </div>
        </div>
      ) : (
        <>
          <div className='user-gem__comment-wrapper'>
            <div className='user-gem__comment'>
              <UserAvatar
                width={32}
                height={30}
                src={comment.commentAuthor.profilePhoto}
              />
              <div
                className={`user-gem__comment-details${
                  !comment.content ? '-only-media' : ''
                }`}
              >
                <CommentHeader
                  gemAuthorId={gemAuthorId}
                  comment={comment}
                  setComments={setComments}
                  setGem={setGem}
                  onEditComment={onEditComment}
                />
                {comment.content && (
                  <div className='user-gem__comment-text'>
                    {comment.content}
                  </div>
                )}
              </div>
            </div>

            {comment?.media?.gifSrc && (
              <div
                className='user-gem__comment-media'
                style={{ marginTop: comment.content && '8px' }}
              >
                <img src={comment.media.gifSrc} alt='user-gem-comment-media' />
              </div>
            )}

            {comment?.media?.fileSrc && (
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
                        fontSize: '15px',
                        fontWeight: '800',
                        color: 'var(--color-grey)',
                        marginTop: '2px',
                      }}
                    />
                    <div>see all</div>
                  </div>
                </div>
              </>
            )}

            {showReactionsModal && (
              <ViewReactsModal
                gemId={comment.gemId}
                commentId={comment._id}
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
                <span>{comment.replies.length}</span>
              </div>
            </div>

            {showEmojis && (
              <div
                className='user-gem__comment-react-emoji-picker-wrapper'
                ref={emojiPickerRef}
              >
                <EmojiPicker
                  onEmojiClick={(react) => onEmojiClick(react.emoji)}
                  previewConfig={{ showPreview: false }}
                  autoFocusSearch={false}
                  emojiStyle='native'
                  theme='light'
                />
              </div>
            )}

            {!seeReplies && commentDetails.replies.length > 0 && (
              <div className='user-gem__see-all-replies'>
                <KeyboardArrowUpOutlinedIcon
                  style={{
                    fontSize: '18px',
                    color: 'var(--color-main-yellow)',
                    transform: 'rotate(180deg)',
                  }}
                />
                <span onClick={() => setSeeReplies(true)}>Show replies</span>
              </div>
            )}

            {seeReplies && (
              <>
                <div className='user-gem__see-all-replies'>
                  <KeyboardArrowUpOutlinedIcon
                    style={{
                      fontSize: '18px',
                      color: 'var(--color-main-yellow)',
                    }}
                  />
                  <span onClick={() => setSeeReplies(false)}>Hide replies</span>
                </div>

                <div className='user-gem__comment-replies'>
                  {commentDetails.replies.map((commentId) => (
                    <CommentReply
                      key={commentId}
                      gemId={comment.gemId}
                      gemAuthorId={gemAuthorId}
                      parentComment={comment}
                      commentId={commentId}
                      setComments={setComments}
                      setGem={setGem}
                    />
                  ))}

                  {comment.replies.length > 10 &&
                    comment.replies.length !==
                      commentDetails.replies.length && (
                      <div className='user-gem__see-all-replies'>
                        <KeyboardArrowUpOutlinedIcon
                          style={{
                            fontSize: '18px',
                            color: 'var(--color-main-yellow)',
                            transform: 'rotate(180deg)',
                          }}
                        />
                        <span
                          onClick={() => {
                            setCommentReplies((prev) => [
                              ...prev,
                              ...comment.replies.slice(
                                commentRepliesInfo.limit,
                                commentRepliesInfo.limit + 10,
                              ),
                            ]);
                            setCommentRepliesInfo((prev) => ({
                              ...prev,
                              limit: prev.limit + 10,
                            }));
                          }}
                        >
                          Show more replies
                        </span>
                      </div>
                    )}
                </div>
              </>
            )}

            {showCommentReply && (
              <Fade in={showCommentReply} timeout={400}>
                <div className='user-gem__comment-reply-wrapper'>
                  <div className='user-gem__comment-reply'>
                    <AddComment
                      placeholder={`Write a reply for @${comment.commentAuthor.username}`}
                      gemId={comment.gemId}
                      comment={comment}
                      setComments={setComments}
                      setShowEditComment={setShowEditComment}
                      setGem={setGem}
                      isReply
                      focus
                    />
                  </div>

                  <div className='user-gem__comment-reply-actions'>
                    <div
                      className='user-gem__comment-reply-action'
                      onClick={() => {
                        setShowCommentReply(false);
                        setSeeReplies(false);
                      }}
                    >
                      <DoDisturbOnOutlinedIcon style={{ fontSize: '15px' }} />
                      <span>Cancel</span>
                    </div>
                  </div>
                </div>
              </Fade>
            )}
          </div>
        </>
      )}
    </>
  );
}

Comment.propTypes = {
  gemAuthorId: PropTypes.string,
  comment: PropTypes.object.isRequired,
  setComments: PropTypes.func,
  setGem: PropTypes.func,
};

export default Comment;
