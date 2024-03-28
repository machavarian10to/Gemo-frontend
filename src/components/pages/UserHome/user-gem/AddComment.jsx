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

const AddComment = ({ placeholder, value = '' }) => {
  const [userComment, setUserComment] = useState(value);

  const [showEmojis, setShowEmojis] = useState(false);
  const emojiPickerRef = useRef(null);

  const [file, setFile] = useState(null);
  const [mediaSrc, setMediaSrc] = useState(null);

  const [showGifs, setShowGifs] = useState(false);
  const gifTabRef = useRef(null);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  useClickOutside(gifTabRef, () => {
    setShowGifs(false);
  });

  function addEmoji(postEmoji) {
    setUserComment((prev) => prev + postEmoji.emoji);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function deleteMedia() {
    setMediaSrc(null);
    setFile(null);
  }

  return (
    <>
      <div className='user-post__comment-section-user-comment'>
        <UserAvatar width='45' />
        <div className='user-post__comment-section-input'>
          <div className='user-post__comment-input-wrapper'>
            <textarea
              className='user-post__comment-input'
              placeholder={placeholder}
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />

            <div className='user-post__comment-icons'>
              <TagFacesOutlinedIcon
                style={{
                  color: showEmojis
                    ? 'var(--color-main-yellow)'
                    : 'var(--color-light-grey)',
                  fontSize: '22px',
                }}
                onClick={() => setShowEmojis((prev) => !prev)}
              />
              <label className='user-post__comment-input-label'>
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
                  color: showGifs
                    ? 'var(--color-main-yellow)'
                    : 'var(--color-light-grey)',
                  fontSize: '22px',
                }}
                onClick={() => setShowGifs((prev) => !prev)}
              />
            </div>

            {showEmojis && (
              <div
                className='user-post__comment-input-emoji-picker-wrapper'
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

            {showGifs && (
              <div
                className='add-comment__gif-container-wrapper'
                ref={gifTabRef}
              >
                <GifContainer />
              </div>
            )}
          </div>
        </div>

        <div className='user-post__add-comment-btn'>
          <SendOutlinedIcon
            style={{
              color:
                userComment.length > 0
                  ? 'var(--color-main-yellow)'
                  : 'var(--color-light-grey)',
              fontSize: '23px',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {mediaSrc && (
        <div className='user-post__comment-image-preview'>
          <button
            title='delete media'
            className='delete-media-icon'
            onClick={deleteMedia}
          >
            <HighlightOffIcon
              style={{ color: 'var(--color-main-yellow)', fontSize: '18px' }}
            />
          </button>
          {file?.type.includes('video') ? (
            <video controls src={mediaSrc} className='user-media-preview' />
          ) : (
            <img src={mediaSrc} alt='user-post__comment-preview' />
          )}
        </div>
      )}
    </>
  );
};

AddComment.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default AddComment;
