import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddComment from '@/components/pages/UserHome/user-post/AddComment';
import Comment from '@/components/pages/UserHome/user-post/Comment';
import PollContainer from '@/components/pages/UserHome/user-post/PollContainer';
import EventContainer from '@/components/pages/UserHome/user-post/EventContainer';
import UserAvatar from '@/components/shared/UserAvatar';
import Button from '@/components/UI/Button';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import Fade from '@mui/material/Fade';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';

function Post({ type }) {
  const emojiPickerRef = useRef(null);
  const [emojiCount, setEmojiCount] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [postEmojis, setPostEmojis] = useState([]);

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentList, setCommentList] = useState([
    { id: 1, text: 'Hello' },
    { id: 2, text: 'world' },
  ]);

  const [pollOptions, setPollOptions] = useState([]);
  const [pollVotesAmount, setPollVotesAmount] = useState(0);

  const [showPostEdit, setShowPostEdit] = useState(false);
  const postEditRef = useRef(null);

  useEffect(() => {
    const count = postEmojis.reduce((acc, emoji) => {
      return acc + emoji.count;
    }, 0);
    setEmojiCount(count);
  }, [postEmojis]);

  useEffect(() => {
    const count = pollOptions.reduce((acc, option) => {
      return acc + option.count;
    }, 0);
    setPollVotesAmount(count);
  }, [pollOptions]);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  useClickOutside(postEditRef, () => {
    setShowPostEdit(false);
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

  function onOptionChange(e) {
    const { value } = e.target;
    const index = pollOptions.findIndex((option) => option.text === value);
    const updatedPollOptions = [...pollOptions];
    updatedPollOptions[index].checked = !updatedPollOptions[index].checked;
    setPollOptions(updatedPollOptions);
  }

  function removeUserVote() {
    const updatedPollOptions = pollOptions.map((option) => {
      return {
        ...option,
        checked: false,
      };
    });
    setPollOptions(updatedPollOptions);
  }

  return (
    <div className='user-post'>
      <div className='user-post__group'>
        <PeopleAltOutlinedIcon
          style={{ color: 'var(--color-grey)', fontSize: '20px' }}
        />
        <span>&gt;</span>
        <div className='user-post__group-image-wrapper'>
          <div className='user-post__group-image'>
            <img src='https://picsum.photos/500/300' alt='post' />
          </div>
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
              <FastForwardOutlinedIcon style={{ fontSize: '10px' }} />
              {/* <span>&middot;</span> */}
              <span>12 hours ago</span>
            </div>
          </div>
        </div>

        <div className='user-post__date'>
          <LocalPoliceOutlinedIcon
            style={{
              color: '#62baac',
              fontSize: '9px',
            }}
          />
        </div>

        <div className='user-post__menu'>
          <MoreHorizIcon
            style={{ color: '#828282' }}
            onClick={() => setShowPostEdit((prev) => !prev)}
          />

          {showPostEdit && (
            <Fade in={showPostEdit} timeout={400}>
              <div
                className='user-post__comment-edit-wrapper'
                ref={postEditRef}
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

      {/* <div className='user-post__image'>
        <img
          src='https://picsum.photos/500/300'
          alt='post'
          className='user-media-preview'
        />
      </div> */}

      {type === 'event' && <EventContainer />}

      {pollOptions.length > 0 && (
        <div className='user-post__poll'>
          {pollOptions.map((option) => (
            <PollContainer
              key={option.id}
              option={option}
              totalVotes={pollVotesAmount}
              onChange={onOptionChange}
            />
          ))}
          {pollOptions.some((option) => option.checked) && (
            <div className='user-post__footer-button'>
              <Button
                label='Remove my vote'
                type='base'
                size='extra-small'
                clickHandler={removeUserVote}
              />
            </div>
          )}
        </div>
      )}

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
        <div className='user-post__footer-container' title='Add to favorites'>
          <StarBorderOutlinedIcon style={{ fontSize: '19px' }} />
        </div>

        {showEmojis && (
          <div className='user-post__emoji-picker-wrapper' ref={emojiPickerRef}>
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
            <AddComment placeholder='Write a comment' />

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

Post.propTypes = {
  type: PropTypes.string,
};

export default Post;
