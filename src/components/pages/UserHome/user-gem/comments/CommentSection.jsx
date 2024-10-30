import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import AnimationStandingChef from '@/components/animations/AnimationStandingChef';

function CommentSection({
  gemId,
  gemAuthorId,
  comments,
  setComments,
  gemCommentsLength,
  setGemCommentsLength,
}) {
  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-gem__comment-section'>
          <AddComment
            gemId={gemId}
            setComments={setComments}
            setGemCommentsLength={setGemCommentsLength}
            placeholder='Write a comment...'
          />

          {comments.length > 0 ? (
            <>
              <div className='user-gem__comment-list'>
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    gemAuthorId={gemAuthorId}
                    comment={comment}
                    setComments={setComments}
                    setGemCommentsLength={setGemCommentsLength}
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
  gemAuthorId: PropTypes.string,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  gemCommentsLength: PropTypes.number.isRequired,
  setGemCommentsLength: PropTypes.func.isRequired,
};

export default CommentSection;
