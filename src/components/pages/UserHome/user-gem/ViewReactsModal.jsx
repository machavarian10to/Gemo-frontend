import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import { Fade } from '@mui/material';
import useClickOutside from '@/hook/useClickOutside';
import { useRef, useState, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import Input from '@/components/UI/Input';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import getTimeDifference from '@/helpers/getTimeDifference';
import axiosInstance from '@/services/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import getUserLevel from '@/helpers/getUserLevel';
import { useTranslation } from 'react-i18next';

function ViewReactsModal({ gemId, commentId, closeModal }) {
  const modalContentRef = useRef();
  useClickOutside(modalContentRef, () => closeModal());

  const [activeTab, setActiveTab] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [reacts, setReacts] = useState([]);
  const [filteredReacts, setFilteredReacts] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    if (commentId) {
      axiosInstance
        .get(`/api/gems/${gemId}/comments/${commentId}/reacts`)
        .then(({ data }) => {
          setReacts(data);
          setFilteredReacts(data);
        })
        .catch((err) => console.error(err));
    } else {
      axiosInstance
        .get(`/api/gems/${gemId}/reacts`)
        .then(({ data }) => {
          setReacts(data);
          setFilteredReacts(data);
        })
        .catch((err) => console.error(err));
    }
  }, [commentId, gemId]);

  function onSearchUsernames(e) {
    const searchInput = e.target.value.toLowerCase();
    setSearchValue(e.target.value.toLowerCase());

    if (searchInput.trim() === '') {
      setFilteredReacts(reacts);
    } else {
      const updatedReacts = reacts.map((react) => ({
        ...react,
        users: react.users.filter((user) =>
          user.username.toLowerCase().includes(searchInput),
        ),
      }));
      setFilteredReacts(updatedReacts);
    }
  }

  return (
    <Fade in={true} timeout={600}>
      <div className='modal'>
        <div className='modal-content' ref={modalContentRef}>
          <div className='modal-header'>
            <h4>{t('view_reacts')}</h4>
            <button onClick={closeModal}>
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
              />
            </button>
          </div>
          {filteredReacts.length > 0 ? (
            <>
              <div className='modal-reactions'>
                <div
                  className={`modal-reactions-header ${
                    activeTab === 'all' ? 'active' : ''
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  <div>{t('all')}</div>
                  <div className='modal-reactions-react-amount'>
                    {filteredReacts
                      .map((react) => react.users.length)
                      .reduce((a, b) => a + b, 0)}
                  </div>
                </div>
                {filteredReacts.map((react) => (
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
                        style={{
                          color: 'var(--color-main-grey)',
                          fontSize: '15px',
                        }}
                      />
                    }
                    placeholder={t('search_by_username')}
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
                      {filteredReacts.map((react) => (
                        <div key={react._id}>
                          {react.users.map((user) => (
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
                                    src={user.profilePhoto}
                                    width={40}
                                    height={40}
                                  />
                                </div>
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
                                        color: getUserLevel(user.levelType),
                                        fontSize: '9px',
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className='user-view-reacts-timestamp'>
                                <span>&#8226;</span>
                                <span>
                                  {getTimeDifference(
                                    new Date(user.timestamp),
                                    t,
                                  )}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='modal-reactions-list-all'>
                      {filteredReacts
                        .find((react) => react._id === activeTab)
                        .users.map((user) => (
                          <div
                            className='modal-reactions-user-react'
                            key={user._id}
                          >
                            <div className='modal-reactions-user-wrapper'>
                              <div className='modal-reactions-user-with-emoji'>
                                <div className='modal-reactions-emoji'>
                                  {
                                    filteredReacts.find(
                                      (react) => react._id === activeTab,
                                    ).emoji
                                  }
                                </div>
                                <UserAvatar
                                  src={user.profilePhoto}
                                  width={40}
                                  height={40}
                                />
                              </div>
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
                                      color: getUserLevel(user.levelType),
                                      fontSize: '9px',
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='user-view-reacts-timestamp'>
                              <span>&#8226;</span>
                              <span>
                                {getTimeDifference(new Date(user.timestamp), t)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className='modal-no-reactions-skeleton'>
              <SkeletonTheme baseColor='var(--bg-main-color)'>
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
              </SkeletonTheme>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
}

ViewReactsModal.propTypes = {
  gemId: PropTypes.string,
  commentId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default ViewReactsModal;
