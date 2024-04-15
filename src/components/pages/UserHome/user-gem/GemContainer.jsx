import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddComment from '@/components/pages/UserHome/user-gem/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/Comment';
import PollContainer from '@/components/pages/UserHome/user-gem/poll/PollContainer';
import PollResultsModal from '@/components/pages/UserHome/user-gem/poll/PollResultsModal';
import EventContainer from '@/components/pages/UserHome/user-gem/EventContainer';
import UserAvatar from '@/components/shared/UserAvatar';
import Button from '@/components/UI/Button';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import Fade from '@mui/material/Fade';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SwapCallsOutlinedIcon from '@mui/icons-material/SwapCallsOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import axiosInstance from '@/services/axios';

function GemContainer({ gem }) {
  const emojiPickerRef = useRef(null);
  const [emojiCount, setEmojiCount] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [postEmojis, setPostEmojis] = useState([]);

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const user = useSelector((state) => state.user);

  const [pollOptions, setPollOptions] = useState(gem.body.pollOptions || []);
  const [pollVotesAmount, setPollVotesAmount] = useState(0);
  const [pollIsEnded, setPollIsEnded] = useState(false);
  const [pollEndTime, setPollEndTime] = useState(0);
  const [showPollResultsModal, setShowPollResultsModal] = useState(false);

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
      return acc + option.users.length;
    }, 0);
    setPollVotesAmount(count);
    setPollEndTime(calculatePollEndTime());

    function calculatePollEndTime() {
      if (gem.type !== 'poll') return;
      const gemCreatedAt = new Date(gem.createdAt);
      const pollDurationInDays = gem.body.pollDuration[0];

      if (gem.body.pollDuration === '- None -') return;

      const pollEndTime = new Date(
        gemCreatedAt.getTime() + pollDurationInDays * 24 * 60 * 60 * 1000,
      );

      const daysDifference = Math.round(
        (pollEndTime - new Date()) / (1000 * 60 * 60 * 24),
      );
      const hoursDifference = Math.round(
        (pollEndTime - new Date()) / (1000 * 60 * 60),
      );
      const minutesDifference = Math.round(
        (pollEndTime - new Date()) / (1000 * 60),
      );

      if (daysDifference > 0) {
        return `${daysDifference} day${daysDifference !== 1 ? 's' : ''}`;
      } else if (hoursDifference > 0) {
        return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''}`;
      } else if (minutesDifference > 0) {
        return `${minutesDifference} minute${
          minutesDifference !== 1 ? 's' : ''
        }`;
      } else {
        setPollIsEnded(true);
        return `Poll ended`;
      }
    }
  }, [pollOptions, gem]);

  useEffect(() => {
    if (showPollResultsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showPollResultsModal]);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  useClickOutside(postEditRef, () => {
    setShowPostEdit(false);
  });

  function getUserLevel() {
    const userLevelMap = {
      novice: '#62baac',
      home: '#56ccf2',
      enthusiast: '#f8ad9d',
      gourmet: '#a52a2a',
      explorer: '#92bdd9',
      professional: '#6c6377',
      master: '#f9a109',
    };
    return userLevelMap[user.level];
  }

  function getTimeDifference(createdAt) {
    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime - createdAt);
    const secondsDifference = Math.round(timeDifference / 1000);
    const minutesDifference = Math.round(secondsDifference / 60);
    const hoursDifference = Math.round(minutesDifference / 60);
    const daysDifference = Math.round(hoursDifference / 24);

    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${
        minutesDifference !== 1 ? 's' : ''
      } ago`;
    } else {
      return `just now`;
    }
  }

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

  function onOptionChange(optionId) {
    const updatedPollOptions = [...pollOptions];
    const optionIndex = updatedPollOptions.findIndex(
      (option) => option.id === optionId,
    );

    if (gem.body.multipleSelection) {
      if (
        updatedPollOptions[optionIndex].users.find(
          (u) => u.username === user.username,
        )
      ) {
        updatedPollOptions[optionIndex].users = updatedPollOptions[
          optionIndex
        ].users.filter((u) => u.username !== user.username);
      } else {
        updatedPollOptions[optionIndex].users.push({
          id: user._id,
          username: user.username,
          userPhoto: user.profilePicture,
        });
      }
    } else {
      if (
        updatedPollOptions[optionIndex].users.find(
          (u) => u.username === user.username,
        )
      ) {
        updatedPollOptions[optionIndex].users = updatedPollOptions[
          optionIndex
        ].users.filter((u) => u.username !== user.username);
      } else {
        updatedPollOptions.forEach((option) => {
          option.users = option.users.filter(
            (u) => u.username !== user.username,
          );
        });
        updatedPollOptions[optionIndex].users.push({
          id: user._id,
          username: user.username,
          userPhoto: user.profilePicture,
        });
      }
    }

    setPollOptions(updatedPollOptions);
    const data = {
      body: { ...gem.body, pollOptions: updatedPollOptions },
    };
    axiosInstance
      .put(`/api/gems/${gem._id}`, data)
      .then()
      .catch((err) => console.error(err));
  }

  function removeUserVote() {
    const updatedPollOptions = [...pollOptions];
    updatedPollOptions.forEach((option) => {
      option.users = option.users.filter((u) => u.username !== user.username);
    });
    setPollOptions(updatedPollOptions);
    const data = {
      body: { ...gem.body, pollOptions: updatedPollOptions },
    };
    axiosInstance
      .put(`/api/gems/${gem._id}`, data)
      .then()
      .catch((err) => console.error(err));
  }

  function showTotalVotesModal() {
    setShowPollResultsModal(true);
  }

  return (
    <>
      <div className='user-gem'>
        {/* <div className='user-gem__group'>
        <PeopleAltOutlinedIcon
          style={{ color: 'var(--color-grey)', fontSize: '22px' }}
        />
        <span>&gt;</span>
        <div className='user-gem__group-image-wrapper'>
          <div className='user-gem__group-image'>
            <img src='https://picsum.photos/500/300' alt='post' />
          </div>
        </div>
        <div className='user-gem__group-name'>food</div>
      </div> */}

        <div className='user-gem__header'>
          <div className='user-gem__user-info'>
            <UserAvatar width={32} height={32} src={gem.userPhoto} />
            <div className='user-gem__details'>
              <div className='user-gem__username'>@{gem.userName}</div>
              <div className='user-gem__user-level'>
                <HistoryToggleOffOutlinedIcon style={{ fontSize: '13px' }} />
                <span>{getTimeDifference(new Date(gem.createdAt))}</span>
              </div>
            </div>
          </div>

          <div className='user-gem__date'>
            <LocalPoliceOutlinedIcon
              style={{
                color: getUserLevel(),
                fontSize: '9px',
              }}
            />
          </div>

          <div
            className='user-gem__menu'
            style={{
              background: showPostEdit && 'var(--bg-main-white)',
            }}
          >
            <MoreHorizIcon
              style={{ color: 'var(--color-main-grey)' }}
              onClick={() => setShowPostEdit((prev) => !prev)}
            />

            {showPostEdit && (
              <Fade in={showPostEdit} timeout={400}>
                <div
                  className='user-gem__comment-edit-wrapper'
                  ref={postEditRef}
                >
                  <div className='user-gem__comment-edit-item'>
                    <EditOutlinedIcon
                      style={{
                        fontSize: '18px',
                        color: 'var(--color-main-yellow)',
                      }}
                    />
                    <span>Edit</span>
                  </div>
                  <div className='user-gem__comment-edit-item'>
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

        <div className='user-gem__texts'>
          <h3>{gem.title}</h3>
          {gem.body?.postContent && (
            <div
              className='user-gem__body'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(gem.body.postContent),
              }}
            ></div>
          )}
        </div>

        {gem.body?.fileName ? (
          <div className='user-gem__image'>
            <img
              src={`${import.meta.env.VITE_API_URL}/assets/${
                gem.body.fileName
              }`}
              alt={gem.title + "'s image"}
              className='user-media-preview'
            />
          </div>
        ) : gem.body?.gifSrc ? (
          <div className='user-gem__image'>
            <img
              src={gem.body.gifSrc}
              alt={gem.body.title}
              className='user-media-preview'
            />
          </div>
        ) : null}

        {gem.type === 'event' ? (
          <EventContainer />
        ) : (
          gem.type === 'poll' && (
            <div className='user-gem__poll'>
              {gem.body.pollOptions.map((option) => (
                <PollContainer
                  key={option.id}
                  option={option}
                  totalVotes={pollVotesAmount}
                  onChange={() => onOptionChange(option.id)}
                  groupName={`pollOption_${option.value}`}
                  pollIsEnded={pollIsEnded}
                  multipleSelection={gem.body.multipleSelection}
                />
              ))}
              <div className='user-gem__poll-total-votes'>
                <div className='user-gem__footer-button'>
                  {!pollIsEnded &&
                  gem.body.pollOptions.some((option) =>
                    option.users.find((u) => u.username === user.username),
                  ) ? (
                    <>
                      <Button
                        label='Remove my vote'
                        type='base'
                        size='extra-small'
                        clickHandler={removeUserVote}
                      />
                    </>
                  ) : (
                    <div className='user-gem__poll-vote-placeholder'></div>
                  )}
                </div>
                <div className='user-gem__poll-time'>
                  <div>
                    {!pollIsEnded ? (
                      <div>
                        {pollEndTime && 'Poll ends in: '}
                        <span>{pollEndTime}</span>
                      </div>
                    ) : (
                      <span>Poll is ended!</span>
                    )}
                  </div>
                </div>
                <div
                  className='user-gem__total-votes'
                  onClick={showTotalVotesModal}
                >
                  total votes: <span>{pollVotesAmount}</span>
                </div>
              </div>
            </div>
          )
        )}

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
          <div className='user-gem__footer-container' title='Add to favorites'>
            <StarBorderOutlinedIcon style={{ fontSize: '19px' }} />
          </div>

          {showEmojis && (
            <div
              className='user-gem__emoji-picker-wrapper'
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
      </div>

      {showPollResultsModal && (
        <PollResultsModal
          pollOptions={pollOptions}
          closeModal={() => setShowPollResultsModal(false)}
        />
      )}
    </>
  );
}

GemContainer.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default GemContainer;
