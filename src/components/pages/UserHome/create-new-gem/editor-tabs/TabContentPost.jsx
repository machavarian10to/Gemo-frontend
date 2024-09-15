import { useState, useRef, useEffect } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Fade } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import CommandButton from '../CommandButton';
import CustomLink from '@/components/pages/UserHome/create-new-gem/CustomLink';
import useClickOutside from '@/hook/useClickOutside';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import PropTypes from 'prop-types';
import GifContainer from '@/components/UI/GifContainer';

function TabContentPost({ postTabState, setPostTabState }) {
  const initialState = {
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    fontSize: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    showPlaceholder: false,
    showEmojiPicker: false,
    gifs: false,
    cursorPosition: null,
  };

  const [state, setState] = useState(initialState);
  const [showCustomLink, setShowCustomLink] = useState(false);

  const emojiRef = useRef(null);
  const editorContentRef = useRef(null);
  const fileInputRef = useRef(null);
  const gifRef = useRef(null);

  useClickOutside(emojiRef, () => {
    setState({ ...state, showEmojiPicker: false });
  });

  useClickOutside(gifRef, () => {
    setState({ ...state, gifs: false });
  });

  useEffect(() => {
    if (postTabState.content.body) {
      editorContentRef.current.innerHTML = postTabState.content.body;
      setState({ ...state, showPlaceholder: true });
    }
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (
        editorContentRef.current &&
        editorContentRef.current.contains(document.activeElement)
      ) {
        setState((prevState) => ({
          ...prevState,
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          strikeThrough: document.queryCommandState('strikeThrough'),
          insertUnorderedList: document.queryCommandState(
            'insertUnorderedList',
          ),
          insertOrderedList: document.queryCommandState('insertOrderedList'),
        }));
        const selection = window.getSelection();
        // check if the selected text is a link
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          if (container.nodeType === Node.TEXT_NODE) {
            const parent = container.parentElement;
            if (parent.tagName === 'A') {
              setState((prevState) => ({ ...prevState, underline: false }));
            } else {
              setState((prevState) => ({
                ...prevState,
                underline: document.queryCommandState('underline'),
              }));
            }
          } else {
            setState((prevState) => ({
              ...prevState,
              underline: document.queryCommandState('underline'),
            }));
          }
        } else {
          setState((prevState) => ({ ...prevState, underline: false }));
        }
        // Check if the selected text is a title
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          if (container.nodeType === Node.TEXT_NODE) {
            const fontSize = window.getComputedStyle(
              container.parentElement,
            ).fontSize;
            setState((prevState) => ({
              ...prevState,
              fontSize: fontSize === '23px',
            }));
          } else {
            setState((prevState) => ({ ...prevState, fontSize: false }));
          }
        } else {
          setState((prevState) => ({ ...prevState, fontSize: false }));
        }
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  function inputHandler() {
    if (editorContentRef.current.innerHTML === '<br>') {
      editorContentRef.current.innerHTML = '';
    }

    setPostTabState((prevState) => ({
      ...prevState,
      content: {
        body: editorContentRef.current.innerHTML,
      },
    }));

    if (editorContentRef.current.innerHTML.length > 0) {
      setState({ ...state, showPlaceholder: true });
    } else {
      setState({ ...state, showPlaceholder: false });
    }
  }

  function insertEmoji(emojiData) {
    editorContentRef.current?.focus();
    document.execCommand('insertText', false, emojiData.emoji);
  }

  function handleCommandClick(type) {
    editorContentRef.current?.focus();
    if (type === 'createLink') {
      setShowCustomLink(true);
      setState({
        ...state,
        cursorPosition: window.getSelection().getRangeAt(0),
      });
      return;
    }
    if (type === 'fontSize') {
      setState({ ...state, fontSize: !state.fontSize });
      if (state.fontSize) {
        document.execCommand(type, false, '3');
        return;
      }
      document.execCommand(type, false, '5');
      return;
    }
    if (type === 'addMedia') {
      fileInputRef.current.click();
      return;
    }
    if (type === 'gif') {
      setState({ ...state, gifs: !state.gifs });
      return;
    }
    setState((prevState) => ({ ...prevState, [type]: !prevState[type] }));
    document.execCommand(type, false, null);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostTabState((prevState) => ({
        ...prevState,
        media: {
          ...prevState.media,
          file: file,
        },
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostTabState((prevState) => ({
          ...prevState,
          media: {
            ...prevState.media,
            mediaSrc: e.target.result,
            gifSrc: null,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  function deleteMedia() {
    setPostTabState((prevState) => ({
      ...prevState,
      media: {
        mediaSrc: null,
        file: null,
        gifSrc: null,
      },
    }));
  }

  const commandStyles = {
    bold: {
      color: state.bold ? 'var(--bg-shade-32)' : 'grey',
      fontSize: '22px',
    },
    italic: {
      color: state.italic ? 'var(--bg-shade-32)' : 'grey',
      fontSize: '20px',
    },
    underline: {
      color: state.underline ? 'var(--bg-shade-32)' : 'grey',
      fontSize: '20px',
    },
    strikeThrough: {
      color: state.strikeThrough ? 'var(--bg-shade-32)' : 'grey',
      fontSize: '21px',
    },
    fontSize: {
      color: state.fontSize ? 'var(--bg-shade-32)' : 'grey',
      fontSize: '20px',
    },
    bulletList: {
      color: state.insertUnorderedList ? 'var(--bg-shade-32)' : 'grey',
      fontSize: '20px',
    },
    numberedList: {
      color: state.insertOrderedList ? 'var(--bg-shade-32)' : 'grey',
      fontSize: '20px',
    },
    horizontal: {
      color: 'grey',
      fontSize: '18px',
    },
    justifyLeft: {
      color: 'grey',
      fontSize: '18px',
    },
    justifyCenter: {
      color: 'grey',
      fontSize: '18px',
    },
    justifyRight: {
      color: 'grey',
      fontSize: '18px',
    },
    showCustomLink: {
      color: 'grey',
      fontSize: '21px',
    },
    emoji: {
      color: 'grey',
      fontSize: '21px',
    },
    gifs: {
      color: 'grey',
      fontSize: '20px',
    },
    addMedia: {
      color: 'grey',
      fontSize: '20px',
    },
  };

  const commandButtons = [
    {
      title: 'Bold',
      type: 'bold',
      icon: <FormatBoldIcon style={commandStyles.bold} />,
    },
    {
      title: 'Italic',
      type: 'italic',
      icon: <FormatItalicIcon style={commandStyles.italic} />,
    },
    {
      title: 'Underline',
      type: 'underline',
      icon: <FormatUnderlinedIcon style={commandStyles.underline} />,
    },
    {
      title: 'Strike Through',
      type: 'strikeThrough',
      icon: <StrikethroughSIcon style={commandStyles.strikeThrough} />,
    },
    {
      title: 'Title',
      type: 'fontSize',
      icon: <TextFieldsIcon style={commandStyles.fontSize} />,
    },
    {
      title: 'Link',
      type: 'createLink',
      icon: <InsertLinkIcon style={commandStyles.showCustomLink} />,
    },
    {
      title: 'Horizontal Line',
      type: 'insertHorizontalRule',
      icon: <HorizontalRuleIcon style={commandStyles.horizontal} />,
    },
    {
      title: 'Bullet List',
      type: 'insertUnorderedList',
      icon: <FormatListBulletedIcon style={commandStyles.bulletList} />,
    },
    {
      title: 'Numbered List',
      type: 'insertOrderedList',
      icon: <FormatListNumberedIcon style={commandStyles.numberedList} />,
    },
    {
      title: 'Justify Left',
      type: 'justifyLeft',
      icon: <FormatAlignLeftIcon style={commandStyles.justifyLeft} />,
    },
    {
      title: 'Justify Center',
      type: 'justifyCenter',
      icon: <FormatAlignCenterIcon style={commandStyles.justifyCenter} />,
    },
    {
      title: 'Justify Right',
      type: 'justifyRight',
      icon: <FormatAlignRightIcon style={commandStyles.justifyRight} />,
    },
    {
      title: 'Add Media',
      type: 'addMedia',
      icon: <ImageOutlinedIcon style={commandStyles.addMedia} />,
    },
    {
      title: 'Gifs',
      type: 'gifs',
      icon: <GifBoxOutlinedIcon style={commandStyles.gifs} />,
    },
    {
      title: 'Emoji',
      type: 'showEmojiPicker',
      icon: <EmojiEmotionsOutlinedIcon style={commandStyles.emoji} />,
    },
  ];

  return (
    <Fade in={true} timeout={400}>
      <div>
        <div className='editor'>
          <div className='editor-header'>
            {commandButtons.map((button) => {
              return (
                <CommandButton
                  key={button.title}
                  title={button.title}
                  icon={button.icon}
                  type={button.type}
                  isActive={
                    button.type === 'createLink'
                      ? showCustomLink
                      : state[button.type]
                  }
                  handleCommandClick={handleCommandClick}
                />
              );
            })}
          </div>
          <div
            className={`editor-content ${state.showPlaceholder ? 'edit' : ''}`}
            contentEditable='true'
            onInput={inputHandler}
            ref={editorContentRef}
          />
          {showCustomLink && (
            <CustomLink
              inputHandler={inputHandler}
              showCustomLink={showCustomLink}
              setShowCustomLink={setShowCustomLink}
              cursorPosition={state.cursorPosition}
            />
          )}
          {state.showEmojiPicker && (
            <div className='emoji-picker-wrapper' ref={emojiRef}>
              <EmojiPicker
                onEmojiClick={(emoji) => insertEmoji(emoji)}
                previewConfig={{ showPreview: false }}
                autoFocusSearch={false}
                emojiStyle='native'
                theme='light'
              />
            </div>
          )}
          {state.gifs && (
            <div
              className='post-tab-content__gif-container-wrapper'
              ref={gifRef}
            >
              <GifContainer setGif={setPostTabState} showGifs={setState} />
            </div>
          )}
        </div>

        {postTabState?.media?.gifSrc && (
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
            <div className='selected-gif'>
              <img src={postTabState.media.gifSrc} alt='selected gif' />
            </div>
          </div>
        )}

        <input
          type='file'
          accept='image/*, video/*'
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        {postTabState?.media?.mediaSrc && (
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
            {postTabState.media.file.type.includes('video') ? (
              <video
                controls
                src={postTabState.media.mediaSrc}
                className='user-media-preview'
              />
            ) : (
              <img
                alt='user media preview'
                src={postTabState.media.mediaSrc}
                className='user-media-preview'
              />
            )}
          </div>
        )}
      </div>
    </Fade>
  );
}

TabContentPost.propTypes = {
  postTabState: PropTypes.object.isRequired,
  setPostTabState: PropTypes.func.isRequired,
};

export default TabContentPost;
