import { useEffect } from 'react';
import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import AnimationStandingChef from '@/components/animations/AnimationStandingChef';
import { useTranslation } from 'react-i18next';
import axiosInstance from '@/services/axios';

function CommentSection({
  gemId,
  authorId,
  pinnedComment,
  commentState,
  setCommentState,
  setGem,
}) {
  const { t } = useTranslation();

  const { comments } = commentState;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/gems/${gemId}/comments?limit=${commentState.limit}&skip=${commentState.skip}`,
        );
        setCommentState((prev) => ({
          ...prev,
          comments: [...prev.comments, ...data],
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [commentState, setCommentState, gemId]);

  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-gem__comment-section'>
          <AddComment
            gemId={gemId}
            setCommentState={setCommentState}
            placeholder={`${t('comments.write_comment')}`}
          />

          {comments.length > 0 ? (
            <>
              <div className='user-gem__comment-list'>
                {/* {pinnedComment && (
                  <Comment
                    key={pinnedComment._id}
                    authorId={authorId}
                    comment={pinnedComment}
                    setCommentState={setCommentState}
                    setGem={setGem}
                    isPinned
                  />
                )} */}

                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    authorId={authorId}
                    comment={comment}
                    setCommentState={setCommentState}
                    setGem={setGem}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className='user-gem__no-comments-wrapper'>
              <div className='user-home__no-gems'>
                <div
                  id='user-gem__no-comment-animation'
                  className='user-home__chef-animation-wrapper'
                >
                  <AnimationStandingChef />
                </div>
                <p id='user-gem__no-comments-text'>
                  {t('comments.no_comments')}
                </p>
              </div>
            </div>
          )}
        </div>
      </Fade>
    </>
  );
}

CommentSection.propTypes = {
  gemId: PropTypes.string.isRequired,
  authorId: PropTypes.string,
  pinnedComment: PropTypes.object,
  commentState: PropTypes.object.isRequired,
  setCommentState: PropTypes.func.isRequired,
  setGem: PropTypes.func.isRequired,
};

export default CommentSection;
