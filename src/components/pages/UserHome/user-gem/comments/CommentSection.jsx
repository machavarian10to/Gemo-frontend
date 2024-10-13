import AddComment from '@/components/pages/UserHome/user-gem/comments/AddComment';
import Comment from '@/components/pages/UserHome/user-gem/comments/Comment';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axios';
import Skeleton from 'react-loading-skeleton';
import AnimationStandingChef from '@/components/animations/AnimationStandingChef';

function CommentSection({ gemId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/gems/${gemId}/comments`);
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [gemId]);

  function onClickShowMoreComments() {
    // setComments(gem.comments);
  }

  function handleUpdateComment(updatedComment) {
    // setComments((prevComments) =>
    //   prevComments.map((comment) =>
    //     comment._id === updatedComment._id ? updatedComment : comment,
    //   ),
    // );
  }

  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-gem__comment-section'>
          <AddComment
            gemId={gemId}
            placeholder='Write a tasty comment...'
            setComments={setComments}
          />

          {loading ? (
            <div className='user-gem-comment-skeleton-wrapper'>
              <div className='user-gem-comment-skeleton'>
                <Skeleton circle width={30} height={30} />
                <Skeleton height={70} containerClassName='flex-1' />
              </div>
              <div className='user-gem-comment-skeleton'>
                <Skeleton circle width={30} height={30} />
                <Skeleton height={70} containerClassName='flex-1' />
              </div>
            </div>
          ) : comments.length > 0 ? (
            <>
              <div className='user-gem__comment-list'>
                {comments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>

              <div
                className='user-gem__comment-show-more-comments'
                onClick={onClickShowMoreComments}
              >
                show more comments
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
};

export default CommentSection;
