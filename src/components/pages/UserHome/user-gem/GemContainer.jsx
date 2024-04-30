import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddComment from '@/components/pages/UserHome/user-gem/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/Comment';
import PollContainer from '@/components/pages/UserHome/user-gem/poll/PollContainer';
import PollResultsModal from '@/components/pages/UserHome/user-gem/poll/PollResultsModal';
import EventContainer from '@/components/pages/UserHome/user-gem/EventContainer';
import Button from '@/components/UI/Button';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import axiosInstance from '@/services/axios';
import UserGemHeader from '@/components/pages/UserHome/user-gem/layout/UserGemHeader';
import Fade from '@mui/material/Fade';

function GemContainer({ gem }) {
  const emojiPickerRef = useRef(null);
  const [emojiCount, setEmojiCount] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [postEmojis, setPostEmojis] = useState([]);

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const user = useSelector((state) => state.user);

  const [pollOptions, setPollOptions] = useState(gem?.body?.pollOptions || []);
  const [pollVotesAmount, setPollVotesAmount] = useState(0);
  const [pollIsEnded, setPollIsEnded] = useState(false);
  const [pollEndTime, setPollEndTime] = useState(0);
  const [showPollResultsModal, setShowPollResultsModal] = useState(false);

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
    if (gem.body.hidePeoplesVotes) return;
    setShowPollResultsModal(true);
  }

  return (
    <>
      <div className='user-gem'>
        <UserGemHeader gem={gem} />

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

        {gem.body?.fileName && gem.type !== 'event' ? (
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
        ) : gem.body?.gif ? (
          <div className='user-gem__image'>
            <img
              src={gem.body.gif}
              alt={gem.body.title}
              className='user-media-preview'
            />
          </div>
        ) : null}

        {gem.type === 'event' ? (
          <EventContainer gem={gem} />
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
                  className={`user-gem__total-votes ${
                    gem.body.hidePeoplesVotes ? 'hide-votes' : ''
                  }`}
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
          <div className='user-gem__footer-container'>
            <ForwardToInboxOutlinedIcon style={{ fontSize: '20px' }} />
            <span>Send</span>
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
