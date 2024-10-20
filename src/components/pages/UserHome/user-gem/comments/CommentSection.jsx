import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import AnimationStandingChef from '@/components/animations/AnimationStandingChef';

function CommentSection({ gemId, comments, setComments, commentsAmount }) {
  function onClickShowMoreComments() {
    // setComments(gem.comments);
  }

  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-gem__comment-section'>
          <AddComment
            gemId={gemId}
            setComments={setComments}
            placeholder='Write a tasty comment...'
          />

          {comments.length > 0 ? (
            <>
              <div className='user-gem__comment-list'>
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    setComments={setComments}
                  />
                ))}
              </div>

              {commentsAmount > 3 && (
                <div
                  className='user-gem__comment-show-more-comments'
                  onClick={onClickShowMoreComments}
                >
                  show more comments
                </div>
              )}
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
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentsAmount: PropTypes.number.isRequired,
};

export default CommentSection;
