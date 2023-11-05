import { useState } from 'react';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
function MediaTabContent() {
  const [file, setFile] = useState(null);
  const [mediaSrc, setMediaSrc] = useState(null);
  const [isDragOver, setDragOver] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];
    console.log(file);
    console.log(file.name);
    console.log(Math.floor(file.size / 1000000));
    console.log(file.type);
    if (file) {
      const imageLink = URL.createObjectURL(file);
      setFile(file);
      setMediaSrc(imageLink);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageLink = URL.createObjectURL(file);
      setFile(file);
      setMediaSrc(imageLink);
    } else {
      alert('Please upload a valid file type');
    }
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

      {mediaSrc ? (
        <div className='media-view'>
          {file.type.includes('video') ? (
            <video controls src={mediaSrc} />
          ) : (
            <img alt='user uploading media' src={mediaSrc} />
          )}
        </div>
      ) : (
        <div className='upload-wrapper'>
          <div className='upload-icon'>
            <NoteAddOutlinedIcon
              style={{ color: '#f9a109', fontSize: '60px' }}
            />
          </div>
          <p>
            <span>drag & drop </span>media or
            <span> click </span>here to upload
          </p>
        </div>
      )}
    </label>
  );
}

export default MediaTabContent;
