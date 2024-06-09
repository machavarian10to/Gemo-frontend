import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import useClickOutside from '@/hook/useClickOutside';
import { Fade } from '@mui/material';
import axiosInstance from '@/services/axios';
import { deleteComment } from '@/state/index';
import { useDispatch } from 'react-redux';

function CommentHeader({ comment }) {
  const dispatch = useDispatch();

  const [showEditComment, setShowEditComment] = useState(false);

  const editCommentRef = useRef(null);

  useClickOutside(editCommentRef, () => {
    setShowEditComment(false);
  });

  function getTimeDifference(date) {
    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime - date);
    const secondsDifference = Math.round(timeDifference / 1000);
    const minutesDifference = Math.round(secondsDifference / 60);
    const hoursDifference = Math.round(minutesDifference / 60);
    const daysDifference = Math.round(hoursDifference / 24);

    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${
        minutesDifference !== 1 ? 's' : ''
      } ago`;
    } else {
      return `just now`;
    }
  }

  function onDeleteComment() {
    axiosInstance
      .delete(`/api/gems/${comment.gemId}/comments/${comment._id}`)
      .then((res) => {
        dispatch(
          deleteComment({ gemId: comment.gemId, commentId: comment._id }),
        );
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
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
      <div className={`user-gem__comment-menu ${showEditComment && 'active'}`}>
        <MoreVertOutlinedIcon
          style={{ color: 'var(--color-main-grey)', fontSize: '20px' }}
          onClick={() => setShowEditComment((prev) => !prev)}
        />
      </div>

      {showEditComment && (
        <Fade in={showEditComment} timeout={400}>
          <div className='user-gem__comment-edit-wrapper' ref={editCommentRef}>
            <div className='user-gem__comment-edit-item'>
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
    </div>
  );
}

CommentHeader.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentHeader;
