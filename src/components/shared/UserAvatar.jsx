import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function UserAvatar({ width = 40, height = 40, src }) {
  const user = useSelector((state) => state.user);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchUserPhoto = async (photoSrc) => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/auth/user-profile-photo?url=${encodeURIComponent(photoSrc)}`,
          { responseType: 'arraybuffer' },
        );
        const base64String = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        const contentType = response.headers['content-type'];
        setImageSrc(`data:${contentType};base64,${base64String}`);
      } catch (error) {
        console.error('Error fetching the profile image:', error);
        setImageSrc('assets/default-avatar.png');
      }
    };

    if (src) {
      if (src.includes('googleusercontent.com')) {
        fetchUserPhoto(src);
      } else {
        if (src === 'assets/default-avatar.png') {
          return setImageSrc(`${import.meta.env.VITE_API_URL}/${src}`);
        }
        setImageSrc(src);
      }
    } else if (user.googleId) {
      fetchUserPhoto(user.profilePhoto);
    } else {
      const defaultImage =
        user.profilePhoto === 'assets/default-avatar.png'
          ? `${import.meta.env.VITE_API_URL}/${user.profilePhoto}`
          : user.profilePhoto;
      setImageSrc(defaultImage);
    }
  }, [src, user.googleId, user.profilePhoto]);

  return (
    <>
      {imageSrc ? (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundImage: `url('${imageSrc}')`,
          }}
          className='avatar'
        ></div>
      ) : (
        <SkeletonTheme baseColor='var(--bg-main-color)'>
          <Skeleton circle width={width} height={height} />
        </SkeletonTheme>
      )}
    </>
  );
}

UserAvatar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string,
};

export default UserAvatar;
