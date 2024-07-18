import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import { useState } from 'react';

function CommentSection({ gem }) {
  const [comments, setComments] = useState(gem.comments.slice(0, 2));
  const [showMoreComments, setShowMoreComments] = useState(false);

  console.log('comments', comments);
  function onClickShowMoreComments() {
    if (showMoreComments) {
      setComments(gem.comments.slice(0, 2));
    } else {
      setComments(gem.comments);
    }
    setShowMoreComments(!showMoreComments);
  }

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
            <div
              className='user-gem__comment-show-more-comments'
              onClick={onClickShowMoreComments}
            >
              {showMoreComments ? 'Show less comments' : 'Show more comments'}
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
