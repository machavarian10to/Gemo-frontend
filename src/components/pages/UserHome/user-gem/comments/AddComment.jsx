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
import { useSelector } from 'react-redux';
import axiosInstance from '@/services/axios';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useTranslation } from 'react-i18next';

const AddComment = ({
  placeholder,
  gemId,
  comment,
  setCommentState,
  setCommentReplyState,
  setShowEditComment,
  setShowCommentReply,
  isReply,
  focus,
}) => {
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);

  const { t } = useTranslation();

  const [state, setState] = useState({
    userComment: !isReply && comment?.content ? comment.content : '',
    showEmojis: false,
    gifs: false,
    isButtonDisabled: true,
    media: {
      file: null,
      mediaSrc: null,
      fileSrc:
        !isReply && comment?.media?.fileSrc ? comment.media.fileSrc : null,
      gifSrc: !isReply && comment?.media?.gifSrc ? comment.media.gifSrc : null,
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
      state.media.file ||
      state.media.fileSrc ||
      state.media.gifSrc
    ) {
      setState((prev) => ({ ...prev, isButtonDisabled: false }));
    } else {
      setState((prev) => ({ ...prev, isButtonDisabled: true }));
    }
  }, [
    state.userComment,
    state.media.file,
    state.media.fileSrc,
    state.media.gifSrc,
  ]);

  useEffect(() => {
    if (focus) {
      textAreaRef.current.focus();
    }
  }, [focus]);

  const addReplyToComments = (comments, parentId, newReply) => {
    return comments.map((comment) => {
      if (comment._id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToComments(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
  };

  function onClickHandler() {
    if (state.isButtonDisabled) return;

    const commentData = { userId: user._id };

    if (state.userComment.trim().length > 0)
      commentData.content = state.userComment;

    if (state.media.gifSrc) commentData.gifSrc = state.media.gifSrc;

    const formData = new FormData();
    formData.append('comment', JSON.stringify(commentData));

    if (state.media.file) {
      formData.append('file', state.media.file);
    }

    let apiMethod = 'post';
    let apiUrl = `/api/gems/${gemId}/comments`;

    if (isReply) {
      apiUrl = `/api/gems/${gemId}/comments/${comment._id}/reply`;
    } else if (!isReply && comment) {
      apiMethod = 'put';
      apiUrl = `/api/gems/${gemId}/comments/${comment._id}`;
    }

    axiosInstance[apiMethod](apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(({ data }) => {
        if (apiMethod === 'put') {
          // update comment
          if (isReply) {
            setCommentReplyState((prev) => {
              return {
                ...prev,
                replies: prev.replies.map((reply) =>
                  reply._id === data._id ? data : reply,
                ),
              };
            });
            setCommentState((prev) => {
              return {
                ...prev,
                comments: addReplyToComments(prev.comments, comment._id, data),
              };
            });
          }
        } else if (isReply) {
          setCommentReplyState((prev) => {
            return {
              ...prev,
              replies: [...prev.replies, data],
            };
          });
          setCommentState((prev) => {
            return {
              ...prev,
              comments: addReplyToComments(prev.comments, comment._id, data),
            };
          });
        } else {
          setCommentState((prev) => {
            return {
              ...prev,
              comments: [...prev.comments, data],
            };
          });
        }
        resetState();
        if (setShowEditComment) setShowEditComment(false);
        if (setShowCommentReply) setShowCommentReply(false);
      })
      .catch((err) => console.error(err));
  }

  function resetState() {
    setState((prev) => ({
      ...prev,
      userComment: '',
      media: {
        file: null,
        fileSrc: null,
        mediaSrc: null,
        gifSrc: null,
      },
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setState((prev) => ({
          ...prev,
          media: {
            ...prev.media,
            file,
            gifSrc: null,
            mediaSrc: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(file);
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
    }));
  }

  return (
    <>
      {comment && isReply && (
        <div className='user-gem_comment-reply-wrapper'>
          <div className='user-gem__comment-replying-to'>
            <ReplyOutlinedIcon style={{ fontSize: '18px' }} />
            {t('comments.reply_to')} <span>@{comment.author.username}</span>
          </div>
          <div className='user-gem__comment-reply-highlight'>
            <div
              style={{
                marginBottom:
                  comment.media?.gifSrc || comment.media?.fileSrc ? '5px' : '0',
              }}
            >
              {comment.content}
            </div>

            {comment.media?.gifSrc && (
              <div className='user-gem__comment-media'>
                <img src={comment.media.gifSrc} alt='gif' />
              </div>
            )}

            {comment.media?.fileSrc && (
              <div className='user-gem__comment-media'>
                <img
                  src={`${import.meta.env.VITE_API_URL}/assets/${
                    comment.media.fileSrc
                  }`}
                  alt='comment-media'
                />
              </div>
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
            <div className='textarea-container'>
              <textarea
                ref={textAreaRef}
                className='user-gem__comment-input'
                value={state.userComment}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, userComment: e.target.value }))
                }
              />
              {!state.userComment && (
                <div className='placeholder-text'>{placeholder}</div>
              )}

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
                    style={{
                      color: 'var(--color-light-grey)',
                      fontSize: '22px',
                    }}
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
                  theme={mode}
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

      {(state.media.mediaSrc || state.media.fileSrc || state.media.gifSrc) && (
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
          <img
            src={
              state.media.mediaSrc ||
              state.media.gifSrc ||
              `${import.meta.env.VITE_API_URL}/assets/${state.media.fileSrc}`
            }
            alt='user-gem__comment-preview'
          />
        </div>
      )}
    </>
  );
};

AddComment.propTypes = {
  gemId: PropTypes.string,
  comment: PropTypes.object,
  setCommentState: PropTypes.func,
  setCommentReplyState: PropTypes.func,
  setShowEditComment: PropTypes.func,
  setShowCommentReply: PropTypes.func,
  isReply: PropTypes.bool,
  placeholder: PropTypes.string,
  focus: PropTypes.bool,
};

export default AddComment;
