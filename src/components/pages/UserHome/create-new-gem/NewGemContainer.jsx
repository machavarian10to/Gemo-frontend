import { useState } from 'react';
import PropTypes from 'prop-types';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CollectionsIcon from '@mui/icons-material/Collections';
import PollIcon from '@mui/icons-material/Poll';
import GifBoxIcon from '@mui/icons-material/GifBox';
import TabContentPost from '@/components/pages/UserHome/create-new-gem/editor-tabs/TabContentPost';
import TabContentMedia from '@/components/pages/UserHome/create-new-gem/editor-tabs/TabContentMedia';
import TabContentPoll from '@/components/pages/UserHome/create-new-gem/editor-tabs/TabContentPoll';
import TabContentEvent from '@/components/pages/UserHome/create-new-gem/editor-tabs/TabContentEvent';
import TabContentGif from '@/components/pages/UserHome/create-new-gem/editor-tabs/TabContentGif';
import Button from '@/components/UI/Button';
import axios from '@/services/axios';
import AlertBox from '@/components/UI/AlertBox';
import { setGem, updateGem } from '@/state/index';
import { useSelector, useDispatch } from 'react-redux';
import generateId from '@/helpers/generateId';
import { useTranslation } from 'react-i18next';

export default function NewGemContainer({
  gem,
  closeModal,
  activeTab,
  handleActiveTab,
}) {
  const { t } = useTranslation();

  const pollDurationOptions = [
    {
      id: generateId(),
      name: `${t('gem.poll_durations.one')}`,
      time: 1,
    },
    {
      id: generateId(),
      name: `${t('gem.poll_durations.two')}`,
      time: 2,
    },
    {
      id: generateId(),
      name: `${t('gem.poll_durations.three')}`,
      time: 3,
    },
    {
      id: generateId(),
      name: `${t('gem.poll_durations.week')}`,
      time: 7,
    },
    {
      id: generateId(),
      name: `${t('gem.poll_durations.none')}`,
      time: 0,
      selected: true,
    },
  ];

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [alertBox, setAlertBox] = useState({
    message: '',
    type: '',
    duration: 3000,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [titleState, setTitleState] = useState({
    gemTitle: gem ? gem.title : '',
    charCount: gem ? gem.title.length : 0,
  });

  const [postTabState, setPostTabState] = useState(
    gem && gem.type === 'post'
      ? { content: gem.content, media: gem.media }
      : {
          content: {
            body: null,
          },
          media: {
            file: null,
            mediaSrc: null,
            gifSrc: null,
          },
        },
  );

  const [mediaTabState, setMediaTabState] = useState(
    gem && gem.type === 'media'
      ? gem.media
      : {
          file: null,
          mediaSrc: null,
        },
  );

  const [pollTabState, setPollTabState] = useState(
    gem && gem.type === 'poll'
      ? {
          ...gem.content,
          pollOptions: gem.content.pollOptions.map((option, index) => ({
            ...option,
            deleteIcon: index > 0 ? true : false,
          })),
          pollDurations: {
            showDurations: false,
            selectedDuration: gem.content.pollDuration,
            options: pollDurationOptions,
          },
        }
      : {
          multipleSelection: false,
          hidePeoplesVotes: false,
          usersCanAddOptions: false,
          pollOptions: [
            {
              id: generateId(),
              value: '',
              placeholder: `${t('option')} 1`,
              deleteIcon: false,
            },
          ],
          pollDurations: {
            showDurations: false,
            selectedDuration: `${t('gem.poll_durations.none')}`,
            options: pollDurationOptions,
          },
        },
  );

  const [eventTabState, setEventTabState] = useState(
    gem && gem.type === 'event'
      ? { content: gem.content, media: gem.media }
      : {
          media: {
            file: null,
            mediaSrc: null,
          },
          startDate: new Date(),
          location: '',
          description: '',
        },
  );

  const [gifTabState, setGifTabState] = useState(
    gem && gem.type === 'gif' ? gem.content : { gifSrc: '', title: '' },
  );

  async function clickHandler() {
    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('title', titleState.gemTitle.trim());

    if (
      (activeTab === 'media' && !mediaTabState.file) ||
      (activeTab === 'gif' && !gifTabState.gifSrc) ||
      (activeTab === 'poll' &&
        pollTabState.pollOptions.filter((option) => option.value).length ===
          0) ||
      (activeTab === 'event' &&
        !eventTabState.startDate &&
        !eventTabState.location &&
        !eventTabState.description &&
        !eventTabState.file)
    ) {
      formData.append('type', 'post');
    } else {
      formData.append('type', activeTab);
    }

    if (activeTab === 'post') {
      if (postTabState.media?.file) {
        formData.append('file', postTabState.media.file);
      }
      if (postTabState.media?.gifSrc) {
        formData.append('gifSrc', postTabState.media.gifSrc);
      }
      if (postTabState.content?.body) {
        formData.append('content', JSON.stringify(postTabState.content));
      }
    } else if (activeTab === 'media') {
      if (mediaTabState.file) {
        formData.append('file', mediaTabState.file);
      }
    } else if (activeTab === 'poll') {
      let options = [];
      pollTabState.pollOptions.forEach((option) => {
        if (option.value) {
          options.push({
            id: option.id,
            value: option.value,
            users: [],
          });
        }
      });
      if (options.length === 0) {
        setAlertBox({
          message: `${t('fill_fields')}`,
          type: 'error',
        });
        return;
      }
      const content = {
        pollOptions: options,
        pollDuration: pollTabState.pollDurations.selectedDuration,
        time: pollTabState.pollDurations.options.find(
          (option) =>
            option.name === pollTabState.pollDurations.selectedDuration,
        ).time,
      };
      if (pollTabState.multipleSelection) content.multipleSelection = true;
      if (pollTabState.hidePeoplesVotes) content.hidePeoplesVotes = true;
      if (pollTabState.usersCanAddOptions) content.usersCanAddOptions = true;

      formData.append('content', JSON.stringify(content));
    } else if (activeTab === 'event') {
      if (
        !eventTabState.media.file ||
        !eventTabState.startDate ||
        !eventTabState.location ||
        !eventTabState.description
      ) {
        setAlertBox({
          message: `${t('fill_fields')}`,
          type: 'error',
        });
        return;
      }
      const content = {
        startDate: eventTabState.startDate,
        location: eventTabState.location,
        description: eventTabState.description,
        going: [],
        interested: [],
      };
      formData.append('file', eventTabState.media.file);
      formData.append('content', JSON.stringify(content));
    } else if (activeTab === 'gif') {
      if (gifTabState.gifSrc) {
        formData.append('content', JSON.stringify(gifTabState));
      }
    }

    try {
      if (!gem) {
        const res = await axios.post('/api/gems', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        dispatch(setGem(res.data));
      } else {
        const res = await axios.put(`/api/gems/${gem._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setAlertBox({
          message: `${t('gem.edited_success')}`,
          type: 'success',
          duration: 1000,
        });
        setTimeout(() => {
          dispatch(updateGem(res.data));
        }, 1000);
      }
      setAlertBox({
        message: gem
          ? `${t('gem.edited_success')}`
          : `${t('gem.created_success')}`,
        type: 'success',
      });
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      console.log(error);
      setAlertBox({
        message: error.response.data,
        type: 'error',
      });
      setIsButtonDisabled(false);
    }
  }

  function setTitle(e) {
    setTitleState({
      gemTitle: e.target.value,
      charCount: e.target.value.length,
    });
  }

  return (
    <div className='create-post-container'>
      {alertBox.message && (
        <AlertBox
          duration={alertBox.duration}
          message={alertBox.message}
          type={alertBox.type}
        />
      )}

      <div className='post-container-header'>
        <div
          className={`post ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => handleActiveTab('post')}
        >
          <PostAddIcon style={{ fontSize: '17px' }} />
          <div>{t('gem.post')}</div>
        </div>

        <div
          className={`media ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => handleActiveTab('media')}
        >
          <CollectionsIcon style={{ fontSize: '17px' }} />
          <div>{t('gem.media')}</div>
        </div>

        <div
          className={`poll ${activeTab === 'poll' ? 'active' : ''}`}
          onClick={() => handleActiveTab('poll')}
        >
          <PollIcon style={{ fontSize: '17px' }} />
          <div>{t('gem.poll')}</div>
        </div>

        {/* <div
          className={`event ${activeTab === 'event' ? 'active' : ''}`}
          onClick={() => handleActiveTab('event')}
        >
          <EditCalendarIcon style={{ fontSize: '17px' }} />
          <div>{t('gem.event')}</div>
        </div> */}

        <div
          className={`gif ${activeTab === 'gif' ? 'active' : ''}`}
          onClick={() => handleActiveTab('gif')}
        >
          <GifBoxIcon style={{ fontSize: '17px' }} />
          <div>{t('gem.gif')}</div>
        </div>
      </div>

      <div className='active-tab-content'>
        <div className='post-title-wrapper'>
          <textarea
            name='post-title'
            className='title'
            placeholder={t('gem.title')}
            maxLength={200}
            onChange={(e) => setTitle(e)}
            value={titleState.gemTitle}
          />
          <span>{titleState.charCount}/200</span>
        </div>

        {activeTab === 'post' ? (
          <TabContentPost
            postTabState={postTabState}
            setPostTabState={setPostTabState}
          />
        ) : activeTab === 'media' ? (
          <TabContentMedia
            mediaTabState={mediaTabState}
            setMediaTabState={setMediaTabState}
          />
        ) : activeTab === 'poll' ? (
          <TabContentPoll
            pollTabState={pollTabState}
            setPollTabState={setPollTabState}
          />
        ) : activeTab === 'event' ? (
          <TabContentEvent
            eventTabState={eventTabState}
            setEventTabState={setEventTabState}
          />
        ) : activeTab === 'gif' ? (
          <TabContentGif
            gifTabState={gifTabState}
            setGifTabState={setGifTabState}
          />
        ) : null}

        <Button
          fillContainer
          label={t('gem.post_btn')}
          state={
            titleState.charCount === 0 ||
            titleState.gemTitle.trim() === '' ||
            isButtonDisabled
              ? 'inactive'
              : 'active'
          }
          clickHandler={clickHandler}
        />
      </div>
    </div>
  );
}

NewGemContainer.propTypes = {
  gem: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  handleActiveTab: PropTypes.func.isRequired,
};
