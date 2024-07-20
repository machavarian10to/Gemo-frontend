import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function CommentSection({ gem }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(gem.comments.slice(0, 2));
  }, [gem.comments]);

  function onClickShowMoreComments() {
    setComments(gem.comments);
  }

  function handleAddComment(newComment) {
    setComments((prevComments) => [newComment, ...prevComments]);
  }

  function handleUpdateComment(updatedComment) {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment,
      ),
    );
  }

  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-gem__comment-section'>
          <AddComment
            gem={gem}
            placeholder='Write a tasty comment...'
            onAddComment={handleAddComment}
          />

          {comments.length > 0 && (
            <div className='user-gem__comment-list'>
              {comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  onUpdateComment={handleUpdateComment}
                />
              ))}
            </div>
          )}

          {comments.length > 1 && comments.length !== gem.comments.length && (
            <div
              className='user-gem__comment-show-more-comments'
              onClick={onClickShowMoreComments}
            >
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
