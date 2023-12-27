import { useState, useRef, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import AddComment from '@/components/pages/UserHome/user-post/AddComment';
import Comment from '@/components/pages/UserHome/user-post/Comment';
import Fade from '@mui/material/Fade';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';

function Post() {
  const emojiPickerRef = useRef(null);
  const [emojiCount, setEmojiCount] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [postEmojis, setPostEmojis] = useState([]);

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentList, setCommentList] = useState([
    { id: 1, text: 'Hello' },
    { id: 2, text: 'world' },
  ]);

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
    <div className='user-post'>
      <div className='user-post__group'>
        <PeopleAltOutlinedIcon
          style={{ color: 'var(--color-grey)', fontSize: '20px' }}
        />
        <span>&gt;</span>
        <div className='user-post__group-image'>
          <img src='https://picsum.photos/500/300' alt='post' />
        </div>
        <div className='user-post__group-name'>food</div>
      </div>

      <div className='user-post__header'>
        <div className='user-post__user-info'>
          <UserAvatar
            size='30'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s'
          />
          <div className='user-post__details'>
            <div className='user-post__username'>@machavarian10to</div>
            <div className='user-post__user-level'>
              <div className='user-post__user-level-name'>Novice Cook</div>
              <LocalPoliceOutlinedIcon
                style={{
                  color: '#62baac',
                  fontSize: '11px',
                }}
              />
            </div>
          </div>
        </div>

        <div className='user-post__date'>
          <span>•</span>
          <span>1d ago</span>
        </div>

        <div className='user-post__menu'>
          <MoreHorizIcon style={{ color: '#828282' }} />
        </div>
      </div>

      <div className='user-post__texts'>
        <h3>Whats hardest food to swallow?</h3>
        {/* <div className='user-post__body'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          nobis optio tempore magnam velit quo unde libero omnis, harum quos
          maxime vitae exercitationem minus adipisci quae iste ullam facilis
          aperiam.
        </div> */}
      </div>
      {/* 
      <div className='user-post__image'>
        <img
          src='https://picsum.photos/500/300'
          alt='post'
          className='user-media-preview'
        />
      </div> */}

      <div className='user-post__poll'>
        <div className='user-post__poll-option-container'>
          <input type='radio' name='poll' id='option-1' />
          <label htmlFor='option-1'>Option 1</label>

          <div className='user-post__poll-option-count'>0</div>
        </div>
      </div>

      <div className='user-post__footer'>
        <div
          className={`user-post__footer-container ${
            showEmojis ? 'active-section' : ''
          }`}
          onClick={() => setShowEmojis((prev) => !prev)}
        >
          <AddReactionOutlinedIcon style={{ fontSize: '19px' }} />
          <span>React</span>
          <span>{emojiCount}</span>
        </div>
        <div
          className={`user-post__footer-container ${
            showCommentSection ? 'active-section' : ''
          }`}
          onClick={() => setShowCommentSection((prev) => !prev)}
        >
          <SmsOutlinedIcon style={{ fontSize: '19px' }} />
          <span>Comment</span>
          <span>{commentList.length}</span>
        </div>
        <div className='user-post__footer-container'>
          <ReplyOutlinedIcon style={{ fontSize: '19px' }} />
          <span>Share</span>
          <span>0</span>
        </div>
        <div className='user-post__footer-container'>
          <ForwardToInboxOutlinedIcon style={{ fontSize: '19px' }} />
          <span>Send</span>
        </div>
        <div className='user-post__footer-container' title='Add to favorites'>
          <StarBorderOutlinedIcon style={{ fontSize: '19px' }} />
        </div>
      </div>

      {showEmojis && (
        <div className='user-post__emoji-picker-wrapper' ref={emojiPickerRef}>
          <EmojiPicker
            onEmojiClick={(emoji) => addEmoji(emoji)}
            previewConfig={{ showPreview: false }}
            autoFocusSearch={false}
            emojiStyle='native'
            theme='light'
            height={450}
            width={300}
          />
        </div>
      )}

      {postEmojis.length > 0 && (
        <div className='user-post__emoji-list'>
          {postEmojis.map((postEmoji) => (
            <div
              key={postEmoji.id}
              className={`user-post__emoji-wrapper ${
                postEmoji.isClicked ? 'active-emoji' : ''
              }`}
              onClick={() => removeEmojiIfAlreadyClicked(postEmoji.id)}
            >
              <div className='user-post__emoji'>{postEmoji.emoji}</div>
              <div className='user-post__emoji-count'>{postEmoji.count}</div>
            </div>
          ))}
        </div>
      )}

      {showCommentSection && (
        <Fade in={true} timeout={600}>
          <div className='user-post__comment-section'>
            <AddComment />
            {commentList.length > 0 && (
              <div className='user-post__comment-list'>
                {commentList.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            )}
            {commentList.length > 1 && (
              <div className='user-post__comment-show-more-comments'>
                show more comments
              </div>
            )}
          </div>
        </Fade>
      )}
    </div>
  );
}

export default Post;