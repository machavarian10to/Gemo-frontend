import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axios';
import PollContainer from '@/components/pages/UserHome/user-gem/poll/PollContainer';
import Button from '@/components/UI/Button';
import PollResultsModal from '@/components/pages/UserHome/user-gem/poll/PollResultsModal';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Input from '@/components/UI/Input';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import generateId from '@/helpers/generateId';

function GemPoll({ gemId }) {
  const user = useSelector((state) => state.user);
  const gem = useSelector((state) => state.gems.find((g) => g._id === gemId));

  const [pollState, setPollState] = useState({
    pollOptions: gem.content.pollOptions,
    pollVotesAmount: gem.content.pollOptions.reduce((acc, option) => {
      return acc + option.users.length;
    }, 0),
    pollIsEnded: calculatePollEndTime() === 'Poll ended',
    pollEndTime: calculatePollEndTime(),
    showPollResultsModal: false,
    showAllOptions: false,
    inputValue: '',
  });

  function calculatePollEndTime() {
    if (gem.content.pollDuration === '- None -') return;
    const gemCreatedAt = new Date(gem.createdAt);
    const pollDurationInDays = gem.content.pollDuration[0];
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
      return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''}`;
    } else {
      return `Poll ended`;
    }
  }

  useEffect(() => {
    if (pollState.showPollResultsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [pollState.showPollResultsModal]);

  function onOptionChange(optionId) {
    const updatedPollOptions = [...pollState.pollOptions];
    const optionIndex = updatedPollOptions.findIndex(
      (option) => option.id === optionId,
    );
    const userVoted = updatedPollOptions[optionIndex].users.find(
      (u) => u.id === user._id,
    );

    if (gem.content.multipleSelection) {
      if (userVoted) {
        updatedPollOptions[optionIndex] = {
          ...updatedPollOptions[optionIndex],
          users: updatedPollOptions[optionIndex].users.filter(
            (u) => u.id !== user._id,
          ),
        };
      } else {
        updatedPollOptions[optionIndex] = {
          ...updatedPollOptions[optionIndex],
          users: [
            ...updatedPollOptions[optionIndex].users,
            {
              id: user._id,
              timestamp: new Date(),
            },
          ],
        };
      }
    } else {
      updatedPollOptions.forEach((option, index) => {
        if (index === optionIndex) {
          updatedPollOptions[index] = {
            ...option,
            users: [
              ...option.users.filter((u) => u.id !== user._id),
              {
                id: user._id,
                timestamp: new Date(),
              },
            ],
          };
        } else {
          updatedPollOptions[index] = {
            ...option,
            users: option.users.filter((u) => u.id !== user._id),
          };
        }
      });
    }

    const newPollVotesAmount = updatedPollOptions.reduce((acc, option) => {
      return acc + option.users.length;
    }, 0);

    const data = {
      type: gem.type,
      title: gem.title,
      content: { ...gem.content, pollOptions: updatedPollOptions },
    };
    axiosInstance
      .put(`/api/gems/${gem._id}`, data)
      .then((res) => {
        setPollState({
          ...pollState,
          pollOptions: updatedPollOptions,
          pollVotesAmount: newPollVotesAmount,
        });
      })
      .catch((err) => console.error(err));
  }

  function removeUserVote() {
    const updatedPollOptions = pollState.pollOptions.map((option) => {
      return {
        ...option,
        users: option.users.filter((u) => u.id !== user._id),
      };
    });

    const newPollVotesAmount = updatedPollOptions.reduce((acc, option) => {
      return acc + option.users.length;
    }, 0);

    const data = {
      type: gem.type,
      title: gem.title,
      content: { ...gem.content, pollOptions: updatedPollOptions },
    };
    axiosInstance
      .put(`/api/gems/${gem._id}`, data)
      .then((res) => {
        setPollState({
          ...pollState,
          pollOptions: updatedPollOptions,
          pollVotesAmount: newPollVotesAmount,
        });
      })
      .catch((err) => console.error(err));
  }

  function showTotalVotesModal() {
    if (gem.content.hidePeoplesVotes) return;
    setPollState({ ...pollState, showPollResultsModal: true });
  }

  function toggleShowAllOptions() {
    setPollState({ ...pollState, showAllOptions: !pollState.showAllOptions });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && pollState.inputValue.trim() !== '') {
      const updatedPollOptions = [
        ...pollState.pollOptions,
        {
          id: generateId(),
          value: pollState.inputValue.trim(),
          users: [],
        },
      ];
      const data = {
        type: gem.type,
        title: gem.title,
        content: { ...gem.content, pollOptions: updatedPollOptions },
      };
      axiosInstance
        .put(`/api/gems/${gem._id}`, data)
        .then((res) => {
          setPollState({
            ...pollState,
            pollOptions: updatedPollOptions,
            inputValue: '',
          });
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <>
      <div className='user-gem__poll'>
        {pollState.pollOptions
          .slice(0, pollState.showAllOptions ? pollState.pollOptions.length : 5)
          .map((option) => (
            <PollContainer
              key={option.id}
              option={option}
              totalVotes={pollState.pollVotesAmount}
              onChange={() => onOptionChange(option.id)}
              groupName={`pollOption_${option.value}`}
              pollIsEnded={pollState.pollIsEnded}
              multipleSelection={gem.content.multipleSelection}
            />
          ))}

        {gem.content.usersCanAddOptions && !pollState.pollIsEnded && (
          <div className='user-gem__users-can-add-options'>
            <Input
              size='large'
              type='text'
              value={pollState.inputValue}
              placeholder='Add new option...'
              leftIcon={
                <AddCircleOutlineOutlinedIcon
                  style={{ color: 'var(--color-main-grey)', fontSize: '19px' }}
                />
              }
              onInput={(e) =>
                setPollState({ ...pollState, inputValue: e.target.value })
              }
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
        )}

        {pollState.pollOptions.length > 5 && (
          <Button
            label={pollState.showAllOptions ? 'Show less' : 'Show all'}
            type='base'
            size='extra-small'
            clickHandler={toggleShowAllOptions}
          />
        )}

        <div className='user-gem__poll-total-votes'>
          <div className='user-gem__footer-button'>
            {!pollState.pollIsEnded &&
            pollState.pollOptions.some((option) =>
              option.users.find((u) => u.id === user._id),
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
              {!pollState.pollIsEnded ? (
                <div>
                  {pollState.pollEndTime && 'Poll ends in: '}
                  <span>{pollState.pollEndTime}</span>
                </div>
              ) : (
                <span>Poll is ended!</span>
              )}
            </div>
          </div>
          <div
            className={`user-gem__total-votes ${
              gem.content.hidePeoplesVotes ? 'hide-votes' : ''
            }`}
            onClick={showTotalVotesModal}
          >
            total votes: <span>{pollState.pollVotesAmount}</span>
          </div>
        </div>
      </div>

      {pollState.showPollResultsModal && (
        <PollResultsModal
          pollOptions={pollState.pollOptions}
          closeModal={() =>
            setPollState({ ...pollState, showPollResultsModal: false })
          }
        />
      )}
    </>
  );
}

GemPoll.propTypes = {
  gemId: PropTypes.string.isRequired,
};

export default GemPoll;
