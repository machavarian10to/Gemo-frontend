import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import axiosInstance from '@/services/axios';
import ViewReactsModal from '@/components/pages/UserHome/user-gem/ViewReactsModal';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CommentSection from '@/components/pages/UserHome/user-gem/comments/CommentSection';
import { useTranslation } from 'react-i18next';
import Tooltip from '@/components/UI/Tooltip';

function GemFooter({ gemInfo }) {
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);

  const emojiPickerRef = useRef(null);

  const { t } = useTranslation();

  const [showEmojis, setShowEmojis] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gem, setGem] = useState(gemInfo);
  const [commentState, setCommentState] = useState({
    comments: [],
    limit: 5,
    skip: 0,
  });

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  useEffect(() => {
    if (showReactionsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showReactionsModal]);

  function onEmojiClick(emoji) {
    axiosInstance
      .put(`/api/gems/${gem._id}/reacts`, {
        emoji,
        userId: user._id,
      })
      .then(({ data }) => {
        setGem(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setShowEmojis(false);
      });
  }

  function onShowMoreCommentsClick() {
    axiosInstance
      .get(
        `/api/gems/${gem._id}/comments?limit=${commentState.limit}&skip=${
          commentState.skip + commentState.limit
        }`,
      )
      .then(({ data }) => {
        setCommentState((prev) => ({
          ...prev,
          comments: [...prev.comments, ...data],
          skip: prev.skip + prev.limit,
        }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function onFavoritesClick() {
    axiosInstance
      .put(`/api/gems/${gem._id}/favorites`, {
        userId: user._id,
      })
      .then(({ data }) => {
        setGem((prev) => ({
          ...prev,
          favorites: data.favorites,
        }));
      })
      .catch((err) => console.error(err));
  }

  async function toggleCommentSection() {
    setShowCommentSection((prev) => !prev);
    if (!showCommentSection) {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/api/gems/${gem._id}/comments?limit=${commentState.limit}&skip=${commentState.skip}`,
        );
        setCommentState((prev) => ({
          ...prev,
          comments: data.filter(
            (comment) =>
              comment._id !==
              commentState.comments.map((comment) => comment._id),
          ),
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setCommentState({
        comments: [],
        limit: 5,
        skip: 0,
      });
    }
  }

  return (
    <>
      {gem.reacts.length > 0 && (
        <>
          <div className='user-gem__emoji-list'>
            {gem.reacts.map((react) => (
              <div
                key={react._id}
                className={`user-gem__emoji-wrapper ${
                  react.users.some(
                    (reactingUser) => reactingUser.userId === user._id,
                  )
                    ? 'active-emoji'
                    : ''
                }`}
                onClick={() => onEmojiClick(react.emoji)}
              >
                <div className='user-gem__emoji'>{react.emoji}</div>
                <div className='user-gem__emoji-count'>
                  {react.users.length}
                </div>
              </div>
            ))}
            <div
              className='user-gem__view-reactions'
              onClick={() => setShowReactionsModal(true)}
            >
              <EmojiEmotionsOutlinedIcon
                style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: 'var(--color-grey)',
                  marginTop: '2px',
                }}
              />
              <div>{t('view_all')}</div>
            </div>
          </div>
        </>
      )}

      {showReactionsModal && (
        <ViewReactsModal
          gemId={gem._id}
          closeModal={() => setShowReactionsModal(false)}
        />
      )}

      <div className='user-gem__footer'>
        <div
          className={`user-gem__footer-container ${
            showEmojis ? 'active-section' : ''
          }`}
          onClick={() => setShowEmojis((prev) => !prev)}
        >
          <AddReactionOutlinedIcon style={{ fontSize: '19px' }} />
          <span>{t('react')}</span>
          <span>
            {gem.reacts
              .map((react) => react.users.length)
              .reduce((a, b) => a + b, 0)}
          </span>
        </div>
        <div
          className={`user-gem__footer-container ${
            showCommentSection ? 'active-section' : ''
          }`}
          onClick={toggleCommentSection}
        >
          <SmsOutlinedIcon style={{ fontSize: '19px' }} />
          <span>{t('comment')}</span>
          <span>{gem.totalComments}</span>
        </div>

        <div className='user-gem__footer-container'>
          <AutorenewOutlinedIcon style={{ fontSize: '19px' }} />
          <span>{t('share')}</span>
          <span>0</span>
        </div>
        <div className='user-gem__footer-container'>
          <ForwardToInboxOutlinedIcon style={{ fontSize: '20px' }} />
          <span>{t('send')}</span>
          <span>0</span>
        </div>

        <div className='user-gem__footer-container' onClick={onFavoritesClick}>
          <Tooltip
            text={
              gem.favorites.some((fav) => fav === user._id)
                ? t('remove_from_favorites')
                : t('add_to_favorites')
            }
          >
            {gem.favorites.some((fav) => fav === user._id) ? (
              <StarRateIcon
                style={{ fontSize: '19px', color: 'var(--color-main-yellow)' }}
              />
            ) : (
              <StarBorderOutlinedIcon style={{ fontSize: '19px' }} />
            )}
          </Tooltip>
        </div>

        {showEmojis && (
          <div className='user-gem__emoji-picker-wrapper' ref={emojiPickerRef}>
            <EmojiPicker
              onEmojiClick={(react) => onEmojiClick(react.emoji)}
              previewConfig={{ showPreview: false }}
              autoFocusSearch={false}
              emojiStyle='native'
              theme={mode}
            />
            {/* // TODO: Implement custom emoji creation
            <div className='user-gem__custom-emoji'>
              <EmojiEmotionsOutlinedIcon style={{ fontSize: '18px' }} />
              <div>create custom emoji</div>
            </div> */}
          </div>
        )}
      </div>
      {showCommentSection && (
        <>
          <CommentSection
            gemId={gem._id}
            authorId={gem.author._id}
            pinnedComment={gem.pinnedComment}
            commentState={commentState}
            setCommentState={setCommentState}
            setGem={setGem}
            loading={loading}
          />

          {gem.totalComments > commentState.comments.length && (
            <div
              className='user-gem__see-all-comments'
              onClick={onShowMoreCommentsClick}
            >
              <KeyboardArrowUpOutlinedIcon
                style={{
                  fontSize: '18px',
                  color: 'var(--color-main-yellow)',
                  transform: 'rotate(180deg)',
                }}
              />
              <span>{t('comments.show_more_comments')}</span>
            </div>
          )}
        </>
      )}
    </>
  );
}

GemFooter.propTypes = {
  gemInfo: PropTypes.object.isRequired,
};

export default GemFooter;
