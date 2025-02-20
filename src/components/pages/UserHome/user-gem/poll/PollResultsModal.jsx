import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import { Fade } from '@mui/material';
import useClickOutside from '@/hook/useClickOutside';
import { useRef, useState, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import axiosInstance from '@/services/axios';
import getTimeDifference from '@/helpers/getTimeDifference';
import getUserLevel from '@/helpers/getUserLevel';
import { useTranslation } from 'react-i18next';

function PollResultsModal({ pollOptions, closeModal }) {
  const modalContentRef = useRef();
  const [activeOption, setActiveOption] = useState(pollOptions[0].id);
  const [usersDetails, setUsersDetails] = useState([]);

  const { t } = useTranslation();

  useClickOutside(modalContentRef, () => closeModal());

  useEffect(() => {
    const fetchUserDetails = async () => {
      const selectedOption = pollOptions.find(
        (option) => option.id === activeOption,
      );
      const userIds = selectedOption.users.map((user) => user.id);

      if (userIds.length > 0) {
        try {
          const response = await axiosInstance.get('/api/users', {
            params: { userIds },
          });
          setUsersDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        setUsersDetails([]);
      }
    };

    fetchUserDetails();
  }, [activeOption, pollOptions]);

  return (
    <Fade in={true} timeout={600}>
      <div className='modal'>
        <div className='modal-content' ref={modalContentRef}>
          <div className='modal-header'>
            <h4>{t('gem.poll_results')}</h4>
            <button onClick={closeModal}>
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
              />
            </button>
          </div>

          <div className='poll-results__modal-content-wrapper'>
            <div className='poll-results__options-wrapper'>
              {pollOptions.map((option) => (
                <div
                  key={option.id}
                  className={`poll-results__option ${
                    activeOption === option.id ? 'active-option' : ''
                  }`}
                  onClick={() => setActiveOption(option.id)}
                >
                  <div className='poll-results__option-wrapper'>
                    <div className='poll-results__option-value'>
                      {option.value}
                    </div>
                    <span>
                      {`${option.users.length} ${
                        option.users.length > 1 ? t('gem.votes') : t('gem.vote')
                      }`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className='poll-results__votes'>
              {pollOptions.find((option) => option.id === activeOption).users
                .length === 0 ? (
                <div className='poll-results__no-votes'>
                  {t('gem.no_votes')}.
                </div>
              ) : (
                usersDetails.map((user) => (
                  <div key={user._id} className='poll-results__user-wrapper'>
                    <div>
                      <UserAvatar
                        width={30}
                        height={30}
                        src={user.profilePhoto}
                      />
                    </div>

                    <div className='poll-results-header'>
                      <div className='user-gem_reacts-username-info'>
                        <div className='user-gem__username'>
                          @
                          <a
                            href={`/user/@${user.username}`}
                            target='_blank'
                            rel='noreferrer'
                            className='user-gem__username-link'
                          >
                            {user.username}
                          </a>
                        </div>
                        <div className='user-gem__user-date'>
                          <LocalPoliceOutlinedIcon
                            style={{
                              color: getUserLevel(user.levelDetails.type),
                              fontSize: '14px',
                            }}
                          />
                        </div>
                      </div>

                      <div className='user-gem__user-vote-timestamp'>
                        <span>&#8226;</span>
                        {getTimeDifference(
                          new Date(
                            pollOptions
                              .find((option) => option.id === activeOption)
                              .users.find((u) => u.id === user._id)?.timestamp,
                          ),
                          t,
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

PollResultsModal.propTypes = {
  pollOptions: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default PollResultsModal;
