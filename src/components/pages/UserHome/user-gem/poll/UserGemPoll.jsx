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

function UserGemPoll({ gem }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [pollOptions, setPollOptions] = useState(gem.body.pollOptions);
  const [pollVotesAmount, setPollVotesAmount] = useState(0);
  const [pollIsEnded, setPollIsEnded] = useState(false);
  const [pollEndTime, setPollEndTime] = useState('');
  const [showPollResultsModal, setShowPollResultsModal] = useState(false);
  const [showAllOptions, setShowAllOptions] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [alert, setAlert] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    const count = pollOptions.reduce((acc, option) => {
      return acc + option.users.length;
    }, 0);
    setPollVotesAmount(count);
    setPollEndTime(calculatePollEndTime());

    function calculatePollEndTime() {
      if (gem.body.pollDuration === '- None -') return;

      const gemCreatedAt = new Date(gem.createdAt);
      const pollDurationInDays = gem.body.pollDuration[0];
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

  function onOptionChange(optionId) {
    const updatedPollOptions = [...pollOptions];
    const optionIndex = updatedPollOptions.findIndex(
      (option) => option.id === optionId,
    );
    const userVoted = updatedPollOptions[optionIndex].users.find(
      (u) => u.username === user.username,
    );

    if (gem.body.multipleSelection) {
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
              username: user.username,
              userPhoto: user.profilePicture,
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
                username: user.username,
                userPhoto: user.profilePicture,
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

    setPollOptions(updatedPollOptions);
    const data = {
      body: { ...gem.body, pollOptions: updatedPollOptions },
    };
    axiosInstance
      .put(`/api/gems/${gem._id}`, data)
      .then(() => {
        dispatch(
          updateGem({
            ...gem,
            body: { ...gem.body, pollOptions: updatedPollOptions },
          }),
        );
      })
      .catch((err) => console.error(err));
  }

  function removeUserVote() {
    const updatedPollOptions = pollOptions.map((option) => {
      return {
        ...option,
        users: option.users.filter((u) => u.username !== user.username),
      };
    });
    setPollOptions(updatedPollOptions);
    const data = {
      body: { ...gem.body, pollOptions: updatedPollOptions },
    };
    axiosInstance
      .put(`/api/gems/${gem._id}`, data)
      .then(() => {
        dispatch(
          updateGem({
            ...gem,
            body: { ...gem.body, pollOptions: updatedPollOptions },
          }),
        );
      })
      .catch((err) => console.error(err));
  }

  function showTotalVotesModal() {
    if (gem.body.hidePeoplesVotes) return;
    setShowPollResultsModal(true);
  }

  function toggleShowAllOptions() {
    setShowAllOptions(!showAllOptions);
  }

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const updatedPollOptions = [
        ...pollOptions,
        {
          id: generateId(),
          value: inputValue,
          users: [],
        },
      ];
      setPollOptions(updatedPollOptions);
      const data = {
        body: { ...gem.body, pollOptions: updatedPollOptions },
      };
      axiosInstance
        .put(`/api/gems/${gem._id}`, data)
        .then(() => {
          dispatch(
            updateGem({
              ...gem,
              body: { ...gem.body, pollOptions: updatedPollOptions },
            }),
          );
          setAlert({
            type: 'success',
            message: 'Option added!',
          });
        })
        .catch((err) => console.error(err));
      setInputValue('');
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
        {pollOptions
          .slice(0, showAllOptions ? pollOptions.length : 5)
          .map((option) => (
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
        {gem.body.usersCanAddOptions && !pollIsEnded && (
          <div className='user-gem__users-can-add-options'>
            <Input
              size='large'
              type='text'
              value={inputValue}
              placeholder='Add new option...'
              leftIcon={
                <AddCircleOutlineOutlinedIcon style={{ fontSize: '21px' }} />
              }
              onInput={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
        )}
        {pollOptions.length > 5 && (
          <Button
            label={showAllOptions ? 'Show less' : 'Show all options'}
            type='base'
            size='extra-small'
            clickHandler={toggleShowAllOptions}
          />
        )}
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

      {showPollResultsModal && (
        <PollResultsModal
          pollOptions={pollOptions}
          closeModal={() => setShowPollResultsModal(false)}
        />
      )}
    </>
  );
}

UserGemPoll.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default UserGemPoll;
