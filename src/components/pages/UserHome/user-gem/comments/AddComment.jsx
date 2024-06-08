import { useState, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import UserAvatar from '@/components/shared/UserAvatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import GifContainer from '@/components/UI/GifContainer';
import { useSelector, useDispatch } from 'react-redux';
import { updateGem } from '@/state/index.js';
import axiosInstance from '@/services/axios';

const AddComment = ({ gem, placeholder, value = '' }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userComment, setUserComment] = useState(value);

  const [showEmojis, setShowEmojis] = useState(false);
  const emojiPickerRef = useRef(null);

  const [media, setMedia] = useState({
    file: null,
    fileName: null,
    mediaSrc: null,
    gifSrc: null,
  });

  const [showGifs, setShowGifs] = useState({ gifs: null });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const gifTabRef = useRef(null);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  useClickOutside(gifTabRef, () => {
    setShowGifs(false);
  });

  function addComment() {
    if (isButtonDisabled) return;

    const commentData = {
      userId: user._id,
      userName: user.username,
      userPhoto: user.profilePicture,
    };

    if (userComment.trim().length > 0) commentData.comment = userComment;

    if (media.gifSrc) commentData.gif = media.gifSrc;

    if (media.file) {
      const formData = new FormData();
      commentData.fileName = media.fileName;
      formData.append('comment', JSON.stringify(commentData));
      formData.append('file', media.file);
    }

    axiosInstance
      .post(`/api/comments/${gem._id}`, commentData)
      .then((res) => {
        console.log(res);
        dispatch(
          updateGem({ ...gem, comments: [...gem.comments, commentData] }),
        );
      })
      .catch((err) => console.error(err));

    setUserComment('');
    setMedia({
      file: null,
      mediaSrc: null,
      gifSrc: null,
    });
    setIsButtonDisabled(true);
  }

  function handleCommentChange(e) {
    setUserComment(e.target.value);
    if (e.target.value.trim().length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }

  function addEmoji(postEmoji) {
    setUserComment((prev) => prev + postEmoji.emoji);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setMedia((prev) => ({
        ...prev,
        file,
        fileName: file.name,
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setMedia((prev) => ({
          ...prev,
          mediaSrc: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
      setIsButtonDisabled(false);
    }
  }

  function deleteMedia() {
    setMedia({
      file: null,
      mediaSrc: null,
      gif: null,
    });
    setIsButtonDisabled(true);
  }

  return (
    <>
      <div className='user-gem__comment-section-user-comment'>
        <UserAvatar width={45} />
        <div className='user-gem__comment-section-input'>
          <div className='user-gem__comment-input-wrapper'>
            <textarea
              className='user-gem__comment-input'
              placeholder={placeholder}
              value={userComment}
              onChange={(e) => handleCommentChange(e)}
            />

            <div className='user-gem__comment-icons'>
              <TagFacesOutlinedIcon
                style={{
                  color: showEmojis
                    ? 'var(--color-main-yellow)'
                    : 'var(--color-light-grey)',
                  fontSize: '22px',
                }}
                onClick={() => setShowEmojis((prev) => !prev)}
              />
              <label className='user-gem__comment-input-label'>
                <input
                  hidden
                  type='file'
                  accept='image/png, image/gif, image/jpeg, image/webp, video/mp4, video/quicktime'
                  onChange={handleFileChange}
                />
                <ImageOutlinedIcon
                  style={{ color: 'var(--color-light-grey)', fontSize: '22px' }}
                />
              </label>
              <GifBoxOutlinedIcon
                style={{
                  color: showGifs.gifs
                    ? 'var(--color-main-yellow)'
                    : 'var(--color-light-grey)',
                  fontSize: '22px',
                }}
                onClick={() =>
                  setShowGifs((prev) => {
                    setIsButtonDisabled(false);
                    return { gifs: !prev.gifs };
                  })
                }
              />
            </div>

            {showEmojis && (
              <div
                className='user-gem__comment-input-emoji-picker-wrapper'
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

            {showGifs.gifs && (
              <div
                className='add-comment__gif-container-wrapper'
                ref={gifTabRef}
              >
                <GifContainer setGif={setMedia} showGifs={setShowGifs} />
              </div>
            )}
          </div>
        </div>

        <div className='user-gem__add-comment-btn' onClick={addComment}>
          <SendOutlinedIcon
            style={{
              color: !isButtonDisabled
                ? 'var(--color-main-yellow)'
                : 'var(--color-light-grey)',
              fontSize: '23px',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {(media.mediaSrc || media.gifSrc) && (
        <div className='user-gem__comment-image-preview'>
          <button
            title='delete media'
            className='delete-media-icon'
            onClick={deleteMedia}
          >
            <HighlightOffIcon
              style={{ color: 'var(--color-main-yellow)', fontSize: '18px' }}
            />
          </button>
          {media.file?.type.includes('video') ? (
            <video
              controls
              src={media.mediaSrc}
              className='user-media-preview'
            />
          ) : (
            <img
              src={media.mediaSrc || media.gifSrc}
              alt='user-gem__comment-preview'
            />
          )}
        </div>
      )}
    </>
  );
};

AddComment.propTypes = {
  gem: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default AddComment;
