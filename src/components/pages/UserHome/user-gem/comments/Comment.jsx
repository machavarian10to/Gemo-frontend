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
import Skeleton from 'react-loading-skeleton';

function Comment({ authorId, comment, setCommentState, setGem, isPinned }) {
  const user = useSelector((state) => state.user);

  const emojiPickerRef = useRef(null);

  const [showEmojis, setShowEmojis] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [showCommentReply, setShowCommentReply] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [commentReplyState, setCommentReplyState] = useState({
    replies: [],
    limit: 10,
    skip: 0,
  });

  const fetchReplies = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/gems/${comment.gemId}/comments/${comment._id}/replies?limit=${commentReplyState.limit}&skip=${commentReplyState.skip}`,
      );
      setCommentReplyState((prev) => ({
        ...prev,
        replies: res.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

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
        if (comment.parentId) {
          setCommentReplyState((prev) => ({
            ...prev,
            replies: prev.replies.map((prevReply) =>
              prevReply._id === data._id ? data : prevReply,
            ),
          }));
        } else {
          setCommentState((prev) => ({
            ...prev,
            comments: prev.comments.map((prevComment) =>
              prevComment._id === data._id ? data : prevComment,
            ),
          }));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShowEmojis(false);
      });
  }

  function onShowReplies() {
    setShowReplies(true);
    fetchReplies();
  }

  return (
    <>
      {showEditComment ? (
        <div className='user-gem__comment-edit'>
          <AddComment
            placeholder='Edit comment...'
            gemId={comment.gemId}
            comment={comment}
            setCommentState={setCommentState}
            setCommentReplyState={setCommentReplyState}
            setShowEditComment={setShowEditComment}
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
                src={comment.author.profilePhoto}
              />
              <div
                className={`user-gem__comment-details${
                  !comment.content ? '-only-media' : ''
                }`}
              >
                <CommentHeader
                  authorId={authorId}
                  comment={comment}
                  setCommentState={setCommentState}
                  setCommentReplyState={setCommentReplyState}
                  setGem={setGem}
                  onEditComment={onEditComment}
                  isPinned={isPinned}
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
                    <div>View all</div>
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

            {!showReplies && comment.replies.length > 0 && (
              <div className='user-gem__see-all-replies'>
                <KeyboardArrowUpOutlinedIcon
                  style={{
                    fontSize: '18px',
                    color: 'var(--color-main-yellow)',
                    transform: 'rotate(180deg)',
                  }}
                />
                <span onClick={onShowReplies}>Show replies</span>
              </div>
            )}

            {showReplies && (
              <>
                <div className='user-gem__see-all-replies'>
                  <KeyboardArrowUpOutlinedIcon
                    style={{
                      fontSize: '18px',
                      color: 'var(--color-main-yellow)',
                    }}
                  />
                  <span onClick={() => setShowReplies(false)}>
                    Hide replies
                  </span>
                </div>

                {commentReplyState.replies.length > 0 ? (
                  <div className='user-gem__comment-replies'>
                    {commentReplyState.replies.map((reply) => (
                      <CommentReply
                        key={reply._id}
                        authorId={authorId}
                        parentComment={comment}
                        comment={reply}
                        setCommentState={setCommentState}
                        setGem={setGem}
                      />
                    ))}

                    {comment.replies.length > 10 &&
                      comment.replies.length !==
                        commentReplyState.replies.length && (
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
                              setCommentReplyState((prev) => ({
                                ...prev,
                                skip: prev.skip + 10,
                              }));
                            }}
                          >
                            Show more replies
                          </span>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className='user-gem__reply-comment-wrapper'>
                    <Skeleton height={15} width={'40%'} />
                    <Skeleton height={30} />
                    <div className='user-gem__reply-comment-skeleton'>
                      <Skeleton circle width={30} height={30} />
                      <Skeleton height={70} containerClassName='flex-1' />
                    </div>
                  </div>
                )}
              </>
            )}

            {showCommentReply && (
              <Fade in={showCommentReply} timeout={400}>
                <div className='user-gem__comment-reply-wrapper'>
                  <div className='user-gem__comment-reply'>
                    <AddComment
                      placeholder={`Write a reply for @${comment.author.username}`}
                      gemId={comment.gemId}
                      comment={comment}
                      setCommentState={setCommentState}
                      setCommentReplyState={setCommentReplyState}
                      setShowCommentReply={setShowCommentReply}
                      isReply
                      focus
                    />
                  </div>

                  <div className='user-gem__comment-reply-actions'>
                    <div
                      className='user-gem__comment-reply-action'
                      onClick={() => {
                        setShowCommentReply(false);
                        setShowReplies(false);
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
  authorId: PropTypes.string,
  comment: PropTypes.object.isRequired,
  setCommentState: PropTypes.func,
  setGem: PropTypes.func,
  isPinned: PropTypes.bool,
};

export default Comment;
