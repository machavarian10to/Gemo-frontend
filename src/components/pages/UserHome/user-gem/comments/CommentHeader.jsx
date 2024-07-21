import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import useClickOutside from '@/hook/useClickOutside';
import { Fade } from '@mui/material';
import axiosInstance from '@/services/axios';
import { deleteComment } from '@/state/index';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import getTimeDifference from '@/helpers/getTimeDifference';

function CommentHeader({ comment, onEditComment }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [showEditComment, setShowEditComment] = useState(false);
  const [showAuthEditComment, setShowAuthEditComment] = useState(false);

  const editCommentRef = useRef(null);

  useClickOutside(editCommentRef, () => {
    setShowEditComment(false);
    setShowAuthEditComment(false);
  });

  function onDeleteComment() {
    axiosInstance
      .delete(`/api/comments/${comment._id}/gems/${comment.gemId}`)
      .then(() => {
        dispatch(
          deleteComment({ gemId: comment.gemId, commentId: comment._id }),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function showEdit() {
    if (user._id === comment.userId) {
      setShowAuthEditComment(!showAuthEditComment);
    } else {
      setShowEditComment(!showEditComment);
    }
  }

  return (
    <div className='user-gem__comment-details-header'>
      <div className='user-gem__comment-details-header-wrapper'>
        <div className='user-gem__username user-gem__username-comment'>
          @
          <a
            href={`/user/@${comment.userName}`}
            target='_blank'
            rel='noreferrer'
            className='user-gem__username-link'
          >
            {comment.userName}
          </a>
        </div>
        <div className='user-gem__date'>
          <span>•</span>
          <span>{getTimeDifference(new Date(comment.createdAt))}</span>
        </div>
      </div>
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

      {showAuthEditComment && (
        <Fade in={true} timeout={400}>
          <div className='user-gem__comment-edit-wrapper' ref={editCommentRef}>
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
              <span>Edit comment</span>
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
              <span>Delete comment</span>
            </div>
          </div>
        </Fade>
      )}

      {showEditComment && (
        <Fade in={true} timeout={400}>
          <div className='user-gem__comment-edit-wrapper' ref={editCommentRef}>
            <div className='user-gem__comment-edit-item'>
              <VisibilityOffOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Hide comment</span>
            </div>

            <div className='user-gem__comment-edit-item'>
              <BlockOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Block @{comment.userName}</span>
            </div>

            <div className='user-gem__comment-edit-item'>
              <ReportGmailerrorredOutlinedIcon
                style={{
                  fontSize: '22px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Report comment</span>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
}

CommentHeader.propTypes = {
  comment: PropTypes.object.isRequired,
  onEditComment: PropTypes.func.isRequired,
};

export default CommentHeader;
