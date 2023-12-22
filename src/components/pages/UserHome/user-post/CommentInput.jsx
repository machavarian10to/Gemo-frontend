import PropTypes from 'prop-types';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';

const CommentInput = ({ userComment, setUserComment }) => {
  return (
    <>
      <textarea
        className='user-post__comment-input'
        placeholder='Write a comment'
        value={userComment}
        onChange={(e) => setUserComment(e.target.value)}
      />

      <div className='user-post__comment-icons'>
        <TagFacesOutlinedIcon style={{ color: '#ccc', fontSize: '22px' }} />
        <ImageOutlinedIcon style={{ color: '#ccc', fontSize: '22px' }} />
        <GifBoxOutlinedIcon style={{ color: '#ccc', fontSize: '22px' }} />
      </div>
    </>
  );
};

CommentInput.propTypes = {
  userComment: PropTypes.string.isRequired,
  setUserComment: PropTypes.func.isRequired,
};

export default CommentInput;
