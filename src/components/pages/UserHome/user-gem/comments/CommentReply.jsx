import PropTypes from 'prop-types';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useTranslation } from 'react-i18next';

function CommentReply({
  authorId,
  parentComment,
  comment,
  setCommentState,
  setGem,
}) {
  const { t } = useTranslation();
  return (
    <>
      <div className='user-gem__comment-reply-container'>
        <div className='user-gem_comment-reply-wrapper'>
          <div className='user-gem__comment-replying-to'>
            <ReplyOutlinedIcon style={{ fontSize: '18px' }} />
            {t('comments.reply_to')}{' '}
            <span>@{parentComment.author.username}</span>
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
          setCommentState={setCommentState}
          setGem={setGem}
        />
      </div>
    </>
  );
}

CommentReply.propTypes = {
  authorId: PropTypes.string.isRequired,
  parentComment: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  setCommentState: PropTypes.func.isRequired,
  setGem: PropTypes.func.isRequired,
};

export default CommentReply;
