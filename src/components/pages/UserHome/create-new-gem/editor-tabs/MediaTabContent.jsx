import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';

function MediaTabContent({ mediaTabState, setMediaTabState }) {
  const [isDragOver, setDragOver] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setMediaTabState((prevState) => ({
        ...prevState,
        file: file,
        fileName: file.name,
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaTabState((prevState) => ({
          ...prevState,
          mediaSrc: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setMediaTabState((prevState) => ({
        ...prevState,
        file: file,
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaTabState((prevState) => ({
          ...prevState,
          mediaSrc: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid file type');
    }
  }

  function deleteMedia() {
    setMediaTabState({
      ...mediaTabState,
      file: null,
      fileName: null,
      mediaSrc: null,
    });
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragOver(false);
  }

  return (
    <>
      {mediaTabState.mediaSrc ? (
        <div className='media-wrapper'>
          <button
            title='delete media'
            className='delete-media-icon'
            onClick={deleteMedia}
          >
            <HighlightOffIcon
              style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
            />
          </button>
          {mediaTabState.file?.type.includes('video') ? (
            <video
              controls
              src={mediaTabState.mediaSrc}
              className='user-media-preview'
            />
          ) : (
            <img
              alt='user media preview'
              src={mediaTabState.mediaSrc}
              className='user-media-preview'
            />
          )}
        </div>
      ) : (
        <Fade in={true} timeout={400}>
          <label
            className={`media-drop-zone ${isDragOver ? 'dragover' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              hidden
              accept='image/*, video/*'
              type='file'
              onChange={handleFileChange}
            />
            <div className='upload-wrapper'>
              <div className='upload-icon'>
                <AddPhotoAlternateOutlinedIcon
                  style={{ color: 'var(--color-light-grey)', fontSize: '80px' }}
                />
              </div>
              <p>Drag & Drop media or click in this zone to upload</p>
            </div>
          </label>
        </Fade>
      )}
    </>
  );
}

MediaTabContent.propTypes = {
  mediaTabState: PropTypes.object.isRequired,
  setMediaTabState: PropTypes.func.isRequired,
};

export default MediaTabContent;
