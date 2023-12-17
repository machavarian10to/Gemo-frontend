import PropTypes from 'prop-types';

function UserAvatar({ size = 40, src }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${src})`,
      }}
      className='avatar'
    ></div>
  );
}

UserAvatar.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
};

export default UserAvatar;
