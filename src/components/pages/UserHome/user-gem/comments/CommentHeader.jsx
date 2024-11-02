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
import getTimeDifference from '@/helpers/getTimeDifference';
import getUserLevel from '@/helpers/getUserLevel';

function CommentHeader({
  gemAuthorId,
  comment,
  setComments,
  setGemCommentsLength,
  onEditComment,
}) {
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
      .delete(`/api/gems/${comment.gemId}/comments/${comment._id}`)
      .then(() => {
        setGemCommentsLength((prevLength) => prevLength - 1);
        setComments((prevComments) =>
          prevComments.filter((prevComment) => prevComment._id !== comment._id),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function showEdit() {
    if (user._id === comment.commentAuthor._id) {
      setShowAuthEditComment(!showAuthEditComment);
    } else {
      setShowEditComment(!showEditComment);
    }
  }

  return (
    <div className='user-gem__comment-details-header'>
      <div className='user-gem__comment-details-header-wrapper'>
        <div
          className={`user-gem__username user-gem__username-comment ${
            comment.isGemAuthor && 'gem-author'
          }`}
        >
          @
          <a
            href={`/user/@${comment.commentAuthor.username}`}
            target='_blank'
            rel='noreferrer'
            className='user-gem__username-link'
          >
            {comment.commentAuthor.username}
          </a>
          {comment.isGemAuthor && (
            <LocalPoliceOutlinedIcon
              style={{
                color: getUserLevel(comment.commentAuthor.levelDetails.type),
                fontSize: '9px',
                marginLeft: '5px',
              }}
            />
          )}
        </div>

        {!comment.isGemAuthor && (
          <div className='user-comment__date'>
            <LocalPoliceOutlinedIcon
              style={{
                color: getUserLevel(comment.commentAuthor.levelDetails.type),
                fontSize: '9px',
              }}
            />
          </div>
        )}
      </div>

      <div className='user-gem__comment-menu-wrapper'>
        <div className='user-gem__date'>
          <span>{getTimeDifference(new Date(comment.createdAt))}</span>
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
      </div>

      {showAuthEditComment && (
        <Fade in={true} timeout={400}>
          <div className='user-gem__comment-edit-wrapper' ref={editCommentRef}>
            {gemAuthorId === user._id && (
              <div className='user-gem__comment-edit-item'>
                <PushPinOutlinedIcon
                  style={{
                    fontSize: '18px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>Pin comment</span>
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
            {gemAuthorId === user._id && (
              <div className='user-gem__comment-edit-item'>
                <PushPinOutlinedIcon
                  style={{
                    fontSize: '18px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>Pin comment</span>
              </div>
            )}

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
              <span>Block @{comment.commentAuthor.username}</span>
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
  gemAuthorId: PropTypes.string,
  comment: PropTypes.object.isRequired,
  setComments: PropTypes.func,
  setGemCommentsLength: PropTypes.func,
  onEditComment: PropTypes.func.isRequired,
};

export default CommentHeader;
