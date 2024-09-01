import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserAvatar({ width = 40, height = 40, src }) {
  const user = useSelector((state) => state.user);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (src) {
      setImageSrc(src);
    } else if (user.googleId) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/auth/get-user-profile-photo?url=${encodeURIComponent(
            user.profilePhoto,
          )}`,
          { responseType: 'arraybuffer' },
        )
        .then((res) => {
          const base64String = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );
          const contentType = res.headers['content-type'];
          const dataUrl = `data:${contentType};base64,${base64String}`;
          setImageSrc(dataUrl);
        })
        .catch((err) => {
          console.error('Error fetching the profile image:', err);
        });
    } else {
      const image =
        user.profilePhoto === 'assets/default-avatar.png'
          ? `${import.meta.env.VITE_API_URL}/${user.profilePhoto}`
          : user.profilePhoto;
      setImageSrc(image);
    }
  }, [src, user.googleId, user.profilePhoto]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url('${imageSrc}')`,
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
