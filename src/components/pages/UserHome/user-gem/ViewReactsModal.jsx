import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Fade } from '@mui/material';
import useClickOutside from '@/hook/useClickOutside';
import { useRef, useState, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import Input from '@/components/UI/Input';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import getTimeDifference from '@/helpers/getTimeDifference';
import axiosInstance from '@/services/axios';
import Skeleton from 'react-loading-skeleton';

function ViewReactsModal({ gemId, closeModal }) {
  const modalContentRef = useRef();
  useClickOutside(modalContentRef, () => closeModal());

  const [activeTab, setActiveTab] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [reacts, setReacts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/gems/${gemId}/reacts`)
      .then(({ data }) => {
        setReacts(data);
      })
      .catch((err) => console.error(err));
  }, [gemId]);

  function onSearchUsernames(e) {
    setSearchValue(e.target.value);
  }

  return (
    <Fade in={true} timeout={600}>
      <div className='modal'>
        <div className='modal-content' ref={modalContentRef}>
          <div className='modal-header'>
            <h4>View Reacts</h4>
            <button onClick={closeModal}>
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
              />
            </button>
          </div>
          {reacts.length > 0 ? (
            <>
              <div className='modal-reactions'>
                <div
                  className={`modal-reactions-header ${
                    activeTab === 'all' ? 'active' : ''
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  <div>All</div>
                  <div className='modal-reactions-react-amount'>
                    {reacts
                      .map((react) => react.users.length)
                      .reduce((a, b) => a + b, 0)}
                  </div>
                </div>
                {reacts.map((react) => (
                  <div
                    key={react._id}
                    className={`modal-reactions-header ${
                      activeTab === react._id ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(react._id)}
                  >
                    <div>{react.emoji}</div>
                    <div className='modal-reactions-react-amount'>
                      {react.users.length}
                    </div>
                  </div>
                ))}
              </div>

              {activeTab === 'all' && (
                <div className='user-gem__search-usernames-input'>
                  <Input
                    leftIcon={
                      <AlternateEmailIcon
                        style={{ color: 'var(--color-grey)', fontSize: '15px' }}
                      />
                    }
                    placeholder='Search by username...'
                    size='small'
                    value={searchValue}
                    onInput={onSearchUsernames}
                  />
                </div>
              )}

              <div className='modal-reactions-list'>
                <div className='modal-reactions-container'>
                  {activeTab === 'all' ? (
                    <div className='modal-reactions-user-reacts-list'>
                      {reacts.map((react) => (
                        <div key={react._id}>
                          {react.users.map((user) => (
                            <>
                              <div
                                key={user._id}
                                className='modal-reactions-user-react'
                              >
                                <div className='modal-reactions-user-wrapper'>
                                  <div className='modal-reactions-user-with-emoji'>
                                    <div className='modal-reactions-emoji'>
                                      {react.emoji}
                                    </div>
                                    <UserAvatar
                                      key={user._id}
                                      src={user.profilePhoto}
                                      width={40}
                                      height={40}
                                    />
                                  </div>
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
                                </div>

                                <div className='user-view-reacts-timestamp'>
                                  <span>&#8226;</span>
                                  <span>
                                    {getTimeDifference(
                                      new Date(user.timestamp),
                                    )}
                                  </span>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='modal-reactions-list-all'>
                      {reacts
                        .find((react) => react._id === activeTab)
                        .users.map((user) => (
                          <>
                            <div
                              className='modal-reactions-user-react'
                              key={user._id}
                            >
                              <div className='modal-reactions-user-wrapper'>
                                <div className='modal-reactions-user-with-emoji'>
                                  <div className='modal-reactions-emoji'>
                                    {
                                      reacts.find(
                                        (react) => react._id === activeTab,
                                      ).emoji
                                    }
                                  </div>
                                  <UserAvatar
                                    key={user._id}
                                    src={user.profilePhoto}
                                    width={40}
                                    height={40}
                                  />
                                </div>
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
                              </div>
                              <div className='user-view-reacts-timestamp'>
                                <span>&#8226;</span>
                                <span>
                                  {getTimeDifference(new Date(user.timestamp))}
                                </span>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className='modal-no-reactions-skeleton'>
              <div className='modal-reactions-header-skeleton'>
                <Skeleton width={60} height={40} />
                <Skeleton width={60} height={40} />
                <Skeleton width={60} height={40} />
                <Skeleton width={60} height={40} />
                <Skeleton width={60} height={40} />
                <Skeleton width={60} height={40} />
                <Skeleton width={60} height={40} />
              </div>

              <Skeleton height={30} style={{ marginTop: '15px' }} />

              <div className='modal-reactions-wrapper-skeleton'>
                <div className='modal-reaction-skeleton'>
                  <Skeleton width={40} height={40} circle />
                  <Skeleton width={300} count={1} />
                </div>
                <div className='modal-reaction-skeleton'>
                  <Skeleton width={40} height={40} circle />
                  <Skeleton width={300} count={1} />
                </div>
                <div className='modal-reaction-skeleton'>
                  <Skeleton width={40} height={40} circle />
                  <Skeleton width={300} count={1} />
                </div>
                <div className='modal-reaction-skeleton'>
                  <Skeleton width={40} height={40} circle />
                  <Skeleton width={300} count={1} />
                </div>
                <div className='modal-reaction-skeleton'>
                  <Skeleton width={40} height={40} circle />
                  <Skeleton width={300} count={1} />
                </div>
                <div className='modal-reaction-skeleton'>
                  <Skeleton width={40} height={40} circle />
                  <Skeleton width={300} count={1} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
}

ViewReactsModal.propTypes = {
  gemId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ViewReactsModal;
