import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Fade } from '@mui/material';
import useClickOutside from '@/hook/useClickOutside';
import { useRef, useState } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';

function ViewReactsModal({ reacts, closeModal }) {
  const modalContentRef = useRef();
  useClickOutside(modalContentRef, () => closeModal());

  const [activeTab, setActiveTab] = useState('all');

  return (
    <Fade in={true} timeout={600}>
      <div className='modal'>
        <div className='modal-content' ref={modalContentRef}>
          <div className='modal-header'>
            <h4>View Reactions</h4>
            <button onClick={closeModal}>
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
              />
            </button>
          </div>

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

          <div className='modal-reactions-list'>
            <div className='modal-reactions-container'>
              {activeTab === 'all' ? (
                <div className='modal-reactions-user-reacts-list'>
                  {reacts.map((react) => (
                    <div key={react._id}>
                      {react.users.map((user) => (
                        <>
                          <div className='modal-reactions-user-react'>
                            <div className='modal-reactions-user-with-emoji'>
                              <div className='modal-reactions-emoji'>
                                {react.emoji}
                              </div>
                              <UserAvatar
                                key={user._id}
                                src={user.userPhoto}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className='user-gem__username'>
                              @
                              <a
                                href={`/user/@${user.userName}`}
                                target='_blank'
                                rel='noreferrer'
                                className='user-gem__username-link'
                              >
                                {user.userName}
                              </a>
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
                          <div className='modal-reactions-user-with-emoji'>
                            <div className='modal-reactions-emoji'>
                              {
                                reacts.find((react) => react._id === activeTab)
                                  .emoji
                              }
                            </div>
                            <UserAvatar
                              key={user._id}
                              src={user.userPhoto}
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className='user-gem__username'>
                            @
                            <a
                              href={`/user/@${user.userName}`}
                              target='_blank'
                              rel='noreferrer'
                              className='user-gem__username-link'
                            >
                              {user.userName}
                            </a>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

ViewReactsModal.propTypes = {
  reacts: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ViewReactsModal;
