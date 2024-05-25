import { useState, useRef } from 'react';
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
function UserGemFooter({ gem }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const emojiPickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentList, setCommentList] = useState([]);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  function addEmoji(gemEmoji) {
    const newReaction = {
      emoji: gemEmoji.emoji,
      users: [
        {
          id: user._id,
          userName: user.username,
          userPhoto: user.profilePicture,
        },
      ],
    };

    let updatedReactions = gem.reacts
      .map((react) => {
        const updatedUsers = react.users.filter(
          (reactingUser) => reactingUser.id !== user._id,
        );
        return updatedUsers.length > 0
          ? { ...react, users: updatedUsers }
          : null;
      })
      .filter((react) => react !== null);

    const existingReactionIndex = updatedReactions.findIndex(
      (react) => react.emoji === gemEmoji.emoji,
    );

    if (existingReactionIndex !== -1) {
      updatedReactions[existingReactionIndex].users.push(newReaction.users[0]);
    } else {
      updatedReactions.push(newReaction);
    }

    axiosInstance
      .put(`/api/gems/${gem._id}/add-gem-react`, { reacts: updatedReactions })
      .then((res) => {
        console.log(res.data);
        dispatch(updateGem({ _id: gem._id, ...res.data }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShowEmojis(false);
      });
  }

  function removeEmojiIfAlreadyClicked(id) {
    const updatedReactions = gem.reacts
      .map((react) => {
        const userIndex = react.users.findIndex(
          (reactingUser) => reactingUser.id === user._id,
        );

        if (userIndex !== -1) {
          return {
            ...react,
            users: [
              ...react.users.slice(0, userIndex),
              ...react.users.slice(userIndex + 1),
            ],
          };
        }

        return react;
      })
      .filter((react) => react.users.length > 0);

    const updatedGem = { ...gem, reacts: updatedReactions };

    dispatch(updateGem({ _id: gem._id, ...updatedGem }));
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
          <span>{gem.reacts.length}</span>
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
        <div className='user-gem__emoji-list'>
          {gem.reacts.map((react) => (
            <div
              key={react._id}
              className={`user-gem__emoji-wrapper ${
                react.users.some((reactingUser) => reactingUser.id === user._id)
                  ? 'active-emoji'
                  : ''
              }`}
              onClick={() => removeEmojiIfAlreadyClicked(react.id)}
            >
              <div className='user-gem__emoji'>{react.emoji}</div>
              <div className='user-gem__emoji-count'>{react.users.length}</div>
              {react.users[0]._id}
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

UserGemFooter.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default UserGemFooter;
