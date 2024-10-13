import { useState, useRef, useEffect } from 'react';
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
import { updateGem, updateGemComment } from '@/state/index.js';
import axiosInstance from '@/services/axios';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

const AddComment = ({
  gem,
  placeholder,
  value = '',
  gif,
  fileName,
  commentId,
  gemId,
  hideEditComment,
  setComments,
  focus,
  comment,
}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    userComment: value,
    showEmojis: false,
    gifs: false,
    isButtonDisabled: true,
    media: {
      file: null,
      fileName: fileName || null,
      mediaSrc: null,
      gifSrc: gif || null,
    },
  });

  const emojiPickerRef = useRef(null);
  const gifTabRef = useRef(null);
  const textAreaRef = useRef(null);

  useClickOutside(emojiPickerRef, () => {
    setState((prev) => ({ ...prev, showEmojis: false }));
  });

  useClickOutside(gifTabRef, () => {
    setState((prev) => ({ ...prev, gifs: false }));
  });

  useEffect(() => {
    if (
      state.userComment.trim().length > 0 ||
      state.media.fileName ||
      state.media.gifSrc
    ) {
      setState((prev) => ({ ...prev, isButtonDisabled: false }));
    } else {
      setState((prev) => ({ ...prev, isButtonDisabled: true }));
    }
  }, [state.media.fileName, state.media.gifSrc, state.userComment]);

  useEffect(() => {
    if (focus) {
      textAreaRef.current.focus();
    }
  }, [focus]);

  function onClickHandler() {
    if (state.isButtonDisabled) return;

    const commentData = { userId: user._id };

    if (state.userComment.trim().length > 0)
      commentData.content = state.userComment;

    if (state.media.gifSrc) commentData.media = { gifSrc: state.media.gifSrc };

    const formData = new FormData();
    formData.append('comment', JSON.stringify(commentData));

    if (state.media.file) {
      formData.append('file', state.media.file);
    }

    axiosInstance
      .post(`/api/gems/${gemId}/comments`, commentData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
        setState((prev) => ({
          ...prev,
          userComment: '',
          media: {
            file: null,
            mediaSrc: null,
            gifSrc: null,
          },
          isButtonDisabled: true,
        }));
      })
      .catch((err) => console.error(err));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setState((prev) => ({
        ...prev,
        media: {
          file,
          fileName: file.name,
        },
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setState((prev) => ({
          ...prev,
          media: {
            ...prev.media,
            mediaSrc: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(file);
      setState((prev) => ({ ...prev, isButtonDisabled: false }));
    }
  }

  function deleteMedia() {
    setState((prev) => ({
      ...prev,
      media: {
        file: null,
        mediaSrc: null,
        gifSrc: null,
      },
      isButtonDisabled: true,
    }));
  }

  return (
    <>
      {comment && (
        <div className='user-gem_comment-reply-wrapper'>
          <div className='user-gem__comment-replying-to'>
            <ReplyOutlinedIcon style={{ fontSize: '18px' }} />
            reply to <span>@{comment.userName}</span>
          </div>
          <div className='user-gem__comment-reply-highlight'>
            <div
              style={{
                marginBottom: comment.gif || comment.fileName ? '5px' : '0',
              }}
            >
              {comment.body}
            </div>
            {comment.gif && (
              <div className='user-gem__comment-media'>
                <img src={comment.gif} alt='gif' />
              </div>
            )}

            {comment.fileName && (
              <img
                src={`${import.meta.env.VITE_API_URL}/assets/${
                  comment.fileName
                }`}
                alt='comment-media'
              />
            )}
          </div>
        </div>
      )}

      <div className='user-gem__comment-section-user-comment'>
        <div>
          <UserAvatar width={35} height={35} />
        </div>
        <div className='user-gem__comment-section-input'>
          <div className='user-gem__comment-input-wrapper'>
            <textarea
              ref={textAreaRef}
              className='user-gem__comment-input'
              placeholder={placeholder}
              value={state.userComment}
              onChange={(e) =>
                setState((prev) => ({ ...prev, userComment: e.target.value }))
              }
            />

            <div className='user-gem__comment-icons'>
              <TagFacesOutlinedIcon
                style={{
                  color: state.showEmojis
                    ? 'var(--color-main-yellow)'
                    : 'var(--color-light-grey)',
                  fontSize: '22px',
                }}
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    showEmojis: !prev.showEmojis,
                  }))
                }
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
                  color: state.gifs
                    ? 'var(--color-main-yellow)'
                    : 'var(--color-light-grey)',
                  fontSize: '22px',
                }}
                onClick={() => setState((prev) => ({ ...prev, gifs: true }))}
              />
            </div>

            {state.showEmojis && (
              <div
                className='user-gem__comment-input-emoji-picker-wrapper'
                ref={emojiPickerRef}
              >
                <EmojiPicker
                  onEmojiClick={(emoji) =>
                    setState((prev) => ({
                      ...prev,
                      userComment: prev.userComment + emoji.emoji,
                    }))
                  }
                  previewConfig={{ showPreview: false }}
                  autoFocusSearch={false}
                  emojiStyle='native'
                  theme='light'
                />
              </div>
            )}

            {state.gifs && (
              <div
                className='add-comment__gif-container-wrapper'
                ref={gifTabRef}
              >
                <GifContainer setGif={setState} showGifs={setState} />
              </div>
            )}
          </div>
        </div>

        <div className='user-gem__add-comment-btn' onClick={onClickHandler}>
          <SendOutlinedIcon
            style={{
              color: !state.isButtonDisabled
                ? 'var(--color-main-yellow)'
                : 'var(--color-light-grey)',
              fontSize: '23px',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {(state.media.fileName || state.media.gifSrc) && (
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
          {state.media.file?.type.includes('video') ? (
            <video
              controls
              src={state.media.mediaSrc}
              className='user-media-preview'
            />
          ) : (
            <img
              src={
                state.media.mediaSrc ||
                state.media.gifSrc ||
                `${import.meta.env.VITE_API_URL}/assets/${state.media.fileName}`
              }
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
  gif: PropTypes.string,
  fileName: PropTypes.string,
  commentId: PropTypes.string,
  gemId: PropTypes.string,
  hideEditComment: PropTypes.func,
  setComments: PropTypes.func,
  focus: PropTypes.bool,
  comment: PropTypes.object,
};

export default AddComment;
