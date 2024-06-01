import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';

function CommentSection({ gem }) {
  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-gem__comment-section'>
          <AddComment gem={gem} placeholder='Write a comment...' />

          {gem.comments.length > 0 && (
            <div className='user-gem__comment-list'>
              {gem.comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>
          )}
          {gem.comments.length > 2 && (
            <div className='user-gem__comment-show-more-comments'>
              show more comments
            </div>
          )}
        </div>
      </Fade>
    </>
  );
}

CommentSection.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default CommentSection;
