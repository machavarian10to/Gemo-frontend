import PropTypes from 'prop-types';

function UserAvatar({ width = 40, height = 40, src }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${src})`,
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
