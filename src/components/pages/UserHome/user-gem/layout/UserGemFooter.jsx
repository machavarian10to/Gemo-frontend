import { useState, useEffect, useRef } from 'react';
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

function UserGemFooter() {
  const emojiPickerRef = useRef(null);
  const [emojiCount, setEmojiCount] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [postEmojis, setPostEmojis] = useState([]);

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const count = postEmojis.reduce((acc, emoji) => {
      return acc + emoji.count;
    }, 0);
    setEmojiCount(count);
  }, [postEmojis]);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  function addEmoji(postEmoji) {
    const emojiIndex = postEmojis.findIndex(
      (emoji) => emoji.emoji === postEmoji.emoji,
    );

    if (emojiIndex !== -1) {
      setShowEmojis(false);
      return;
    }

    setPostEmojis((prev) => [
      ...prev,
      {
        id: Date.now(),
        emoji: postEmoji.emoji,
        count: 1,
        isClicked: true,
      },
    ]);
    setShowEmojis(false);
  }

  function removeEmojiIfAlreadyClicked(id) {
    const emojiIndex = postEmojis.findIndex((emoji) => emoji.id === id);
    if (postEmojis[emojiIndex].isClicked) {
      setPostEmojis((prev) => [
        ...prev.slice(0, emojiIndex),
        ...prev.slice(emojiIndex + 1),
      ]);
      return;
    }
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
          <span>{emojiCount}</span>
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

      {postEmojis.length > 0 && (
        <div className='user-gem__emoji-list'>
          {postEmojis.map((postEmoji) => (
            <div
              key={postEmoji.id}
              className={`user-gem__emoji-wrapper ${
                postEmoji.isClicked ? 'active-emoji' : ''
              }`}
              onClick={() => removeEmojiIfAlreadyClicked(postEmoji.id)}
            >
              <div className='user-gem__emoji'>{postEmoji.emoji}</div>
              <div className='user-gem__emoji-count'>{postEmoji.count}</div>
            </div>
          ))}
        </div>
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

export default UserGemFooter;
