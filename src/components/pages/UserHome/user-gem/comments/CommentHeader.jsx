import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import useClickOutside from '@/hook/useClickOutside';
import { Fade } from '@mui/material';
import axiosInstance from '@/services/axios';
import { useSelector } from 'react-redux';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import getTimeDifference from '@/helpers/getTimeDifference';
import getUserLevel from '@/helpers/getUserLevel';
import { useTranslation } from 'react-i18next';
import AlertBox from '@/components/UI/AlertBox';

function CommentHeader({
  authorId,
  comment,
  setCommentState,
  setCommentReplyState,
  setGem,
  onEditComment,
  isPinned,
}) {
  const user = useSelector((state) => state.user);

  const [showEditComment, setShowEditComment] = useState(false);
  const [showAuthEditComment, setShowAuthEditComment] = useState(false);

  const [alertBox, setAlertBox] = useState({
    message: '',
    type: '',
  });

  const editCommentRef = useRef(null);

  const { t } = useTranslation();

  useClickOutside(editCommentRef, () => {
    setShowEditComment(false);
    setShowAuthEditComment(false);
  });

  function onDeleteComment() {
    axiosInstance
      .delete(`/api/gems/${comment.gemId}/comments/${comment._id}`)
      .then(({ data }) => {
        setAlertBox({
          message: t('comments.delete_success'),
          type: 'success',
        });
        // TODO: update comments correctly
        const { deletedCount } = data;
        setGem((prev) => ({
          ...prev,
          totalComments: prev.totalComments - deletedCount,
        }));
        setCommentState((prevComments) => ({
          ...prevComments,
          comments: prevComments.comments.filter(
            (prevComment) => prevComment._id !== comment._id,
          ),
        }));
        setCommentReplyState((prevReplies) => ({
          ...prevReplies,
          replies: prevReplies.replies.filter(
            (prevReply) => prevReply._id !== comment._id,
          ),
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function showEdit() {
    if (user._id === comment.author._id) {
      setShowAuthEditComment(!showAuthEditComment);
    } else {
      setShowEditComment(!showEditComment);
    }
  }

  function onPinCommentClick() {
    axiosInstance
      .put(`/api/gems/${comment.gemId}/comments/${comment._id}/pin`, {
        isPinned: !isPinned,
      })
      .then(() => {
        setCommentState((prevComments) => ({
          ...prevComments,
          comments: prevComments.comments.filter(
            (prevComment) => prevComment._id !== comment._id,
          ),
        }));
        setCommentReplyState((prevReplies) => ({
          ...prevReplies,
          replies: prevReplies.replies.filter(
            (prevReply) => prevReply._id !== comment._id,
          ),
        }));

        setAlertBox({
          message: isPinned
            ? t('comments.unpinned_success')
            : t('comments.pinned_success'),
          type: 'success',
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setShowEditComment(false);
        setShowAuthEditComment(false);
      });
  }

  return (
    <>
      {alertBox.message && (
        <AlertBox type={alertBox.type} message={alertBox.message} />
      )}

      <div className='user-gem__comment-details-header'>
        <div className='user-gem__comment-details-header-wrapper'>
          <div
            className={`user-gem__username user-gem__username-comment ${
              comment.isGemAuthor && 'gem-author'
            }`}
          >
            @
            <a
              href={`/user/@${comment.author.username}`}
              target='_blank'
              rel='noreferrer'
              className='user-gem__username-link'
            >
              {comment.author.username}
            </a>
            {comment.isGemAuthor && (
              <LocalPoliceOutlinedIcon
                style={{
                  color: getUserLevel(comment.author.levelDetails.type),
                  fontSize: '13px',
                }}
              />
            )}
          </div>

          {!comment.isGemAuthor && (
            <div className='user-gem__user-date'>
              <LocalPoliceOutlinedIcon
                style={{
                  color: getUserLevel(comment.author.levelDetails.type),
                  fontSize: '14px',
                }}
              />
            </div>
          )}
        </div>

        <div className='user-gem__comment-menu-wrapper'>
          <div className='user-gem__user-date'>
            <span>&#8226;</span>
            <span>{getTimeDifference(new Date(comment.createdAt), t)}</span>
          </div>

          {comment.updated && (
            <div
              className='user-gem__comment-edited'
              title={new Date(comment.updatedAt)}
            >
              <CreateOutlinedIcon
                style={{ fontSize: '15px', color: 'var(--color-grey)' }}
              />
              <span>{t('edited')}</span>
            </div>
          )}

          <div
            className={`user-gem__comment-menu ${
              (showEditComment || showAuthEditComment) && 'active'
            }`}
          >
            <MoreVertOutlinedIcon
              style={{ color: 'var(--color-main-grey)', fontSize: '20px' }}
              onClick={showEdit}
            />
          </div>
          {isPinned && (
            <div className='user-gem__comment-pinned'>
              <PushPinIcon
                style={{
                  fontSize: '18px',
                  color: 'var(--color-main-yellow)',
                }}
              />
            </div>
          )}
        </div>

        {showAuthEditComment && (
          <Fade in={true} timeout={400}>
            <div
              className='user-gem__comment-edit-wrapper'
              ref={editCommentRef}
            >
              {authorId === user._id && (
                <div
                  className='user-gem__comment-edit-item'
                  onClick={onPinCommentClick}
                >
                  <PushPinOutlinedIcon
                    style={{
                      fontSize: '18px',
                      color: 'var(--color-main-yellow)',
                    }}
                  />
                  <span>
                    {isPinned ? t('comments.unpin') : t('comments.pin')}
                  </span>
                </div>
              )}

              <div
                className='user-gem__comment-edit-item'
                onClick={onEditComment}
              >
                <EditOutlinedIcon
                  style={{
                    fontSize: '18px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>{t('comments.edit')}</span>
              </div>

              <div
                className='user-gem__comment-edit-item'
                onClick={onDeleteComment}
              >
                <DeleteOutlineOutlinedIcon
                  style={{
                    fontSize: '18px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>{t('comments.delete')}</span>
              </div>
            </div>
          </Fade>
        )}

        {showEditComment && (
          <Fade in={true} timeout={400}>
            <div
              className='user-gem__comment-edit-wrapper'
              ref={editCommentRef}
            >
              {authorId === user._id && (
                <div
                  className='user-gem__comment-edit-item'
                  onClick={onPinCommentClick}
                >
                  <PushPinOutlinedIcon
                    style={{
                      fontSize: '18px',
                      color: 'var(--color-main-yellow)',
                    }}
                  />
                  <span>{isPinned ? 'Unpin comment' : 'Pin comment'}</span>
                </div>
              )}

              <div className='user-gem__comment-edit-item'>
                <VisibilityOffOutlinedIcon
                  style={{
                    fontSize: '20px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>{t('comments.hide')}</span>
              </div>

              <div className='user-gem__comment-edit-item'>
                <BlockOutlinedIcon
                  style={{
                    fontSize: '20px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>
                  {t('block')} @{comment.author.username}
                </span>
              </div>

              <div className='user-gem__comment-edit-item'>
                <ReportGmailerrorredOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>{t('comments.report')}</span>
              </div>
            </div>
          </Fade>
        )}
      </div>
    </>
  );
}

CommentHeader.propTypes = {
  authorId: PropTypes.string,
  comment: PropTypes.object.isRequired,
  setCommentState: PropTypes.func,
  setCommentReplyState: PropTypes.func,
  setGem: PropTypes.func,
  onEditComment: PropTypes.func.isRequired,
  isPinned: PropTypes.bool,
};

export default CommentHeader;
