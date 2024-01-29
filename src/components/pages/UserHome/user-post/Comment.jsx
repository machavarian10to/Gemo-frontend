import { useState, useRef, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import useClickOutside from '@/hook/useClickOutside';
import PropTypes from 'prop-types';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EmojiPicker from 'emoji-picker-react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { Fade } from '@mui/material';
import AddComment from '@/components/pages/UserHome/user-post/AddComment';
function Comment({ comment }) {
  const [emojiCount, setEmojiCount] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [commentEmojis, setCommentEmojis] = useState([]);
  const emojiPickerRef = useRef(null);

  const [showCommentReply, setShowCommentReply] = useState(false);

  const [showEditComment, setShowEditComment] = useState(false);
  const editCommentRef = useRef(null);

  useEffect(() => {
    const count = commentEmojis.reduce((acc, emoji) => {
      return acc + emoji.count;
    }, 0);
    setEmojiCount(count);
  }, [commentEmojis]);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  useClickOutside(editCommentRef, () => {
    setShowEditComment(false);
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

  function removeEmojiIfAlreadyClicked(id) {
    const emojiIndex = commentEmojis.findIndex((emoji) => emoji.id === id);
    if (commentEmojis[emojiIndex].isClicked) {
      setCommentEmojis((prev) => [
        ...prev.slice(0, emojiIndex),
        ...prev.slice(emojiIndex + 1),
      ]);
      return;
    }
  }

  return (
    <div className='user-post__comment-wrapper'>
      <div className='user-post__comment'>
        <UserAvatar
          width={32}
          height={32}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s'
        />
        <div className='user-post__comment-details'>
          <div className='user-post__comment-details-header'>
            <div className='user-post__comment-details-header-wrapper'>
              <div className='user-post__comment-username'>
                @machavarian10to
              </div>
              <div className='user-post__date'>
                <span>•</span>
                <span>1 day ago</span>
              </div>
            </div>
            <div
              className='user-post__comment-menu'
              style={{
                background: showEditComment && '#fff',
              }}
            >
              <MoreHorizIcon
                style={{ color: 'var(--color-main-grey)', fontSize: '20px' }}
                onClick={() => setShowEditComment((prev) => !prev)}
              />
            </div>

            {showEditComment && (
              <Fade in={showEditComment} timeout={400}>
                <div
                  className='user-post__comment-edit-wrapper'
                  ref={editCommentRef}
                >
                  <div className='user-post__comment-edit-item'>
                    <EditOutlinedIcon
                      style={{
                        fontSize: '18px',
                        color: 'var(--color-main-yellow)',
                      }}
                    />
                    <span>Edit</span>
                  </div>
                  <div className='user-post__comment-edit-item'>
                    <DeleteOutlineOutlinedIcon
                      style={{
                        fontSize: '18px',
                        color: 'var(--color-main-yellow)',
                      }}
                    />
                    <span>Delete</span>
                  </div>
                </div>
              </Fade>
            )}
          </div>
          <div className='user-post__comment-text'>{comment.text}</div>
          {commentEmojis.length > 0 && (
            <div className='user-post__emoji-list'>
              {commentEmojis.map((commentEmoji) => (
                <div
                  key={commentEmoji.id}
                  className={`user-post__emoji-wrapper ${
                    commentEmoji.isClicked ? 'active-emoji' : ''
                  }`}
                  onClick={() => removeEmojiIfAlreadyClicked(commentEmoji.id)}
                >
                  <div className='user-post__emoji'>{commentEmoji.emoji}</div>
                  <div className='user-post__emoji-count'>
                    {commentEmoji.count}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='user-post__comment-actions'>
        <div
          className='user-post__comment-action'
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
          className='user-post__comment-action'
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
          className='user-post__comment-react-emoji-picker-wrapper'
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
          <div className='user-post__comment-reply-wrapper'>
            <div className='user-post__comment-reply'>
              <AddComment placeholder={`Reply to ${emojiCount}`} value='test' />
            </div>

            <div className='user-post__comment-reply-actions'>
              <div
                className='user-post__comment-reply-action'
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
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
