import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Fade from '@mui/material/Fade';

function MediaTabContent() {
  const [file, setFile] = useState(null);
  const [mediaSrc, setMediaSrc] = useState(null);
  const [isDragOver, setDragOver] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid file type');
    }
  }

  function deleteMedia() {
    setMediaSrc(null);
    setFile(null);
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
      {mediaSrc ? (
        <div className='media-wrapper'>
          <button
            title='delete media'
            className='delete-media-icon'
            onClick={deleteMedia}
          >
            <HighlightOffIcon style={{ color: '#f9a109', fontSize: '25px' }} />
          </button>
          {file.type.includes('video') ? (
            <video controls src={mediaSrc} className='user-media-preview' />
          ) : (
            <img
              alt='user media preview'
              src={mediaSrc}
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
              type='file'
              accept='image/png, image/gif, image/jpeg, image/webp, video/mp4, video/quicktime'
              onChange={handleFileChange}
            />
            <div className='upload-wrapper'>
              <div className='upload-icon'>
                <AddPhotoAlternateOutlinedIcon
                  style={{ color: '#f9a109', fontSize: '80px' }}
                />
              </div>
              <p>
                <span>Drag & Drop </span>media or
                <span> click </span> in this zone to upload
              </p>
            </div>
          </label>
        </Fade>
      )}
    </>
  );
}

export default MediaTabContent;
