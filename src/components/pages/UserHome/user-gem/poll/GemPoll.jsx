import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axios';
import PollContainer from '@/components/pages/UserHome/user-gem/poll/PollContainer';
import Button from '@/components/UI/Button';
import PollResultsModal from '@/components/pages/UserHome/user-gem/poll/PollResultsModal';
import PropTypes from 'prop-types';
import { updateGem } from '@/state/index';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@/components/UI/Input';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AlertBox from '@/components/UI/AlertBox';
import generateId from '@/helpers/generateId';

function GemPoll({ gem }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [pollState, setPollState] = useState({
    pollOptions: gem.content.pollOptions,
    pollVotesAmount: 0,
    pollIsEnded: false,
    pollEndTime: '',
    showPollResultsModal: false,
    showAllOptions: false,
    inputValue: '',
  });

  const [alert, setAlert] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    const count = pollState.pollOptions.reduce((acc, option) => {
      return acc + option.users.length;
    }, 0);
    setPollState({
      ...pollState,
      pollVotesAmount: count,
      pollEndTime: calculatePollEndTime(),
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
        return `${minutesDifference} minute${
          minutesDifference !== 1 ? 's' : ''
        }`;
      } else {
        setPollState({ ...pollState, pollIsEnded: true });
        return `Poll ended`;
      }
    }
  }, [gem.content.pollDuration, gem.createdAt, pollState]);

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
      (u) => u.username === user.username,
    );

    if (gem.content.multipleSelection) {
      if (userVoted) {
        updatedPollOptions[optionIndex] = {
          ...updatedPollOptions[optionIndex],
          users: updatedPollOptions[optionIndex].users.filter(
            (u) => u.username !== user.username,
          ),
        };
      } else {
        updatedPollOptions[optionIndex] = {
          ...updatedPollOptions[optionIndex],
          users: [
            ...updatedPollOptions[optionIndex].users,
            {
              id: user._id,
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
              ...option.users.filter((u) => u.username !== user.username),
              {
                id: user._id,
              },
            ],
          };
        } else {
          updatedPollOptions[index] = {
            ...option,
            users: option.users.filter((u) => u.username !== user.username),
          };
        }
      });
    }

    setPollState({ ...pollState, pollOptions: updatedPollOptions });
    const data = {
      content: { ...gem.content, pollOptions: updatedPollOptions },
    };
    axiosInstance
      .put(`/api/gems/${gem._id}`, data)
      .then(() => {
        dispatch(
          updateGem({
            ...gem,
            content: { ...gem.content, pollOptions: updatedPollOptions },
          }),
        );
      })
      .catch((err) => console.error(err));
  }

  function removeUserVote() {
    const updatedPollOptions = pollState.pollOptions.map((option) => {
      return {
        ...option,
        users: option.users.filter((u) => u.username !== user.username),
      };
    });
    setPollState({ ...pollState, pollOptions: updatedPollOptions });
    const data = {
      content: { ...gem.content, pollOptions: updatedPollOptions },
    };
    axiosInstance
      .put(`/api/gems/${gem._id}`, data)
      .then(() => {
        dispatch(
          updateGem({
            ...gem,
            content: { ...gem.content, pollOptions: updatedPollOptions },
          }),
        );
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
          value: pollState.inputValue,
          users: [],
        },
      ];
      setPollState({ ...pollState, pollOptions: updatedPollOptions });
      const data = {
        content: { ...gem.content, pollOptions: updatedPollOptions },
      };
      axiosInstance
        .put(`/api/gems/${gem._id}`, data)
        .then(() => {
          dispatch(
            updateGem({
              ...gem,
              content: { ...gem.content, pollOptions: updatedPollOptions },
            }),
          );
          setAlert({
            type: 'success',
            message: 'Option added!',
          });
        })
        .catch((err) => console.error(err));
      setPollState({ ...pollState, inputValue: '' });
      setTimeout(() => {
        setAlert({
          type: '',
          message: '',
        });
      }, 2000);
    }
  }

  return (
    <>
      {alert.message && <AlertBox type={alert.type} message={alert.message} />}

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
                <AddCircleOutlineOutlinedIcon style={{ fontSize: '21px' }} />
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
            label={pollState.showAllOptions ? 'Show less' : 'Show all options'}
            type='base'
            size='extra-small'
            clickHandler={toggleShowAllOptions}
          />
        )}
        <div className='user-gem__poll-total-votes'>
          <div className='user-gem__footer-button'>
            {!pollState.pollIsEnded &&
            gem.content.pollOptions.some((option) =>
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
  gem: PropTypes.object.isRequired,
};

export default GemPoll;
