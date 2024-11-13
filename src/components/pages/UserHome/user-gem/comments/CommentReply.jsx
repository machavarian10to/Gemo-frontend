import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axios';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Skeleton from 'react-loading-skeleton';

function CommentReply({
  gemId,
  authorId,
  parentComment,
  commentId,
  setComments,
  setGem,
}) {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/gems/${gemId}/comments/${commentId}`)
      .then(({ data }) => setComment(data))
      .catch((err) => console.error(err));
  }, [gemId, commentId]);

  return (
    <>
      {comment ? (
        <div className='user-gem__comment-reply-container'>
          <div className='user-gem_comment-reply-wrapper'>
            <div className='user-gem__comment-replying-to'>
              <ReplyOutlinedIcon style={{ fontSize: '18px' }} />
              reply to <span>@{parentComment.author.username}</span>
            </div>
            <div className='user-gem__comment-reply-highlight'>
              <div
                style={{
                  marginBottom:
                    parentComment.media?.gifSrc || parentComment.media?.fileSrc
                      ? '5px'
                      : '0',
                }}
              >
                {parentComment.content}
              </div>

              {parentComment.media?.gifSrc && (
                <div className='user-gem__comment-media'>
                  <img src={parentComment.media.gifSrc} alt='gif' />
                </div>
              )}

              {parentComment.media?.fileSrc && (
                <div className='user-gem__comment-media'>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/assets/${
                      parentComment.media.fileSrc
                    }`}
                    alt='comment-media'
                  />
                </div>
              )}
            </div>
          </div>

          <Comment
            authorId={authorId}
            comment={comment}
            setComments={setComments}
            setGem={setGem}
          />
        </div>
      ) : (
        <div className='user-gem__reply-comment-wrapper'>
          <Skeleton height={15} width={'40%'} />
          <Skeleton height={30} />
          <div className='user-gem__reply-comment-skeleton'>
            <Skeleton circle width={30} height={30} />
            <Skeleton height={70} containerClassName='flex-1' />
          </div>
        </div>
      )}
    </>
  );
}

CommentReply.propTypes = {
  gemId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  parentComment: PropTypes.object.isRequired,
  commentId: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
  setGem: PropTypes.func.isRequired,
};

export default CommentReply;
