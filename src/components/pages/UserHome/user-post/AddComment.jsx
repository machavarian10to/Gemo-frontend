import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '@/hook/useClickOutside';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import SendIcon from '@mui/icons-material/Send';
import UserAvatar from '@/components/shared/UserAvatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';

const AddComment = () => {
  useEffect(() => {
    fetchGifs('cooking');
  }, []);

  const [userComment, setUserComment] = useState('');

  const [showEmojis, setShowEmojis] = useState(false);
  const emojiPickerRef = useRef(null);

  const [file, setFile] = useState(null);
  const [mediaSrc, setMediaSrc] = useState(null);

  const [showGifs, setShowGifs] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [searchGifValue, setSearchGifValue] = useState('');
  const gifTabRef = useRef(null);

  useClickOutside(emojiPickerRef, () => {
    setShowEmojis(false);
  });

  useClickOutside(gifTabRef, () => {
    setShowGifs(false);
  });

  function addEmoji(postEmoji) {
    setUserComment((prev) => prev + postEmoji.emoji);
  }

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

  function deleteMedia() {
    setMediaSrc(null);
    setFile(null);
  }

  function fetchGifs(searchValue) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&q=${searchValue}&limit=20&offset=0&rating=g&lang=en`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setGifs(data.data));
  }

  function searchGifs(e) {
    if (e.code === 'Enter') {
      if (!searchGifValue) fetchGifs('cooking');
      fetchGifs(searchGifValue);
    }
    return;
  }

  return (
    <>
      <div className='user-post__comment-section-user-comment'>
        <UserAvatar
          size='32'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s'
        />
        <div className='user-post__comment-section-input'>
          <div className='user-post__comment-input-wrapper'>
            <textarea
              className='user-post__comment-input'
              placeholder='Write a comment...'
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />

            <div className='user-post__comment-icons'>
              <TagFacesOutlinedIcon
                style={{
                  color: showEmojis ? '#f9a109' : '#ccc',
                  fontSize: '22px',
                }}
                onClick={() => setShowEmojis((prev) => !prev)}
              />
              <label className='user-post__comment-input-label'>
                <input
                  hidden
                  type='file'
                  accept='image/png, image/gif, image/jpeg, image/webp, video/mp4, video/quicktime'
                  onChange={handleFileChange}
                />
                <ImageOutlinedIcon
                  style={{ color: '#ccc', fontSize: '22px' }}
                />
              </label>
              <GifBoxOutlinedIcon
                style={{
                  color: showGifs ? '#f9a109' : '#ccc',
                  fontSize: '22px',
                }}
                onClick={() => setShowGifs((prev) => !prev)}
              />
            </div>

            {showEmojis && (
              <div
                className='user-post__comment-input-emoji-picker-wrapper'
                ref={emojiPickerRef}
              >
                <EmojiPicker
                  onEmojiClick={(emoji) => addEmoji(emoji)}
                  previewConfig={{ showPreview: false }}
                  autoFocusSearch={false}
                  emojiStyle='native'
                  theme='light'
                  height={450}
                  width={300}
                />
              </div>
            )}

            {showGifs && (
              <div
                className='user-post__comment-gif-tab-wrapper'
                ref={gifTabRef}
              >
                <div className='user-post__comment-gif-tab'>
                  <div className='search-gifs-wrapper' onKeyDown={searchGifs}>
                    <Input
                      value={searchGifValue}
                      leftIcon={
                        <SearchIcon
                          style={{
                            color: 'rgba(130, 130, 130, 0.6)',
                            fontSize: '18px',
                          }}
                        />
                      }
                      size='extra-small'
                      placeholder='Search most delicious gifs...'
                      onInput={(e) => setSearchGifValue(e.target.value)}
                    />
                  </div>
                  <div className='gifs-wrapper'>
                    {gifs.map((gif) => (
                      <div className='gif' key={gif.id}>
                        <img
                          src={gif.images.fixed_height.url}
                          alt={gif.title}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='user-post__add-comment-btn'>
          <SendIcon
            style={{
              color: userComment.length > 0 ? '#f9a109' : '#ccc',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {mediaSrc && (
        <div className='user-post__comment-image-preview'>
          <button
            title='delete media'
            className='delete-media-icon'
            onClick={deleteMedia}
          >
            <HighlightOffIcon style={{ color: '#f9a109', fontSize: '18px' }} />
          </button>
          {file?.type.includes('video') ? (
            <video controls src={mediaSrc} className='user-media-preview' />
          ) : (
            <img src={mediaSrc} alt='user-post__comment-preview' />
          )}
        </div>
      )}
    </>
  );
};

export default AddComment;
