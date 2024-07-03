import { useState, useRef, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import useClickOutside from '@/hook/useClickOutside';
import PropTypes from 'prop-types';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import EmojiPicker from 'emoji-picker-react';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { Fade } from '@mui/material';
import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import CommentHeader from '@/components/pages/UserHome/user-gem/comments/CommentHeader';

function Comment({ comment }) {
  const [emojiCount, setEmojiCount] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [commentEmojis, setCommentEmojis] = useState([]);
  const emojiPickerRef = useRef(null);

  const [showCommentReply, setShowCommentReply] = useState(false);

  const [showEditComment, setShowEditComment] = useState(false);

  useEffect(() => {
    const count = commentEmojis.reduce((acc, emoji) => {
      return acc + emoji.count;
    }, 0);
    setEmojiCount(count);
  }, [commentEmojis]);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  function addEmoji(commentEmoji) {
    const emojiIndex = commentEmojis.findIndex(
      (emoji) => emoji.emoji === commentEmoji.emoji,
    );

    if (emojiIndex !== -1) {
      setShowEmojis(false);
      return;
    }

    setCommentEmojis((prev) => [
      ...prev,
      {
        id: Date.now(),
        emoji: commentEmoji.emoji,
        count: 1,
        isClicked: true,
      },
    ]);
    setShowEmojis(false);
  }

  function onEditComment() {
    setShowEditComment(true);
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
              <span>{emojiCount}</span>
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
