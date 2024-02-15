import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function UserAvatar({ width = 40, height = 40, src }) {
  const user = useSelector((state) => state.user);

  const imageSrc = src || user?.profilePicture;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${imageSrc})`,
      }}
      className='avatar'
    ></div>
  );
}

UserAvatar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string,
};

export default UserAvatar;
