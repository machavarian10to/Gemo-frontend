import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import AnimationStandingChef from '@/components/animations/AnimationStandingChef';

function CommentSection({
  gemId,
  authorId,
  pinnedComment,
  comments,
  setComments,
  setGem,
}) {
  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-gem__comment-section'>
          <AddComment
            gemId={gemId}
            setComments={setComments}
            setGem={setGem}
            placeholder='Write a comment...'
          />

          {comments.length > 0 ? (
            <>
              <div className='user-gem__comment-list'>
                {pinnedComment && (
                  <Comment
                    key={pinnedComment._id}
                    authorId={authorId}
                    comment={pinnedComment}
                    setComments={setComments}
                    setGem={setGem}
                  />
                )}

                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    authorId={authorId}
                    comment={comment}
                    setComments={setComments}
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
                  No comments yet, be the first to leave a tasty one!
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
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  setGem: PropTypes.func.isRequired,
};

export default CommentSection;
