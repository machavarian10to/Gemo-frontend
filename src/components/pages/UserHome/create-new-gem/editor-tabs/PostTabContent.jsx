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
import EmojiPicker from 'emoji-picker-react';
import CustomLink from '@/components/pages/UserHome/create-new-gem/CustomLink';
import useClickOutside from '@/hook/useClickOutside';
import { Fade } from '@mui/material';

function PostTabContent() {
  const initialState = {
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    title: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    showPlaceholder: false,
    showEmojiPicker: false,
    cursorPosition: null,
  };

  const [state, setState] = useState(initialState);
  const [showCustomLink, setShowCustomLink] = useState(false);

  const emojiRef = useRef(null);
  const editorContentRef = useRef(null);

  useClickOutside(emojiRef, () => {
    setState({ ...state, showEmojiPicker: false });
  });

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
              title: fontSize === '24px',
            }));
          } else {
            setState((prevState) => ({ ...prevState, title: false }));
          }
        } else {
          setState((prevState) => ({ ...prevState, title: false }));
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  function inputHandler() {
    if (
      editorContentRef.current.innerHTML.length > 0 &&
      editorContentRef.current.innerHTML !== '<br>'
    ) {
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
      setState({ ...state, title: !state.title });
      if (state.title) {
        document.execCommand(type, false, '3');
        return;
      }
      document.execCommand(type, false, '5');
      return;
    }

    setState((prevState) => ({ ...prevState, [type]: !prevState[type] }));
    document.execCommand(type, false, null);
  }

  const style = {
    bold: {
      color: state.bold ? '#5E5E5E' : 'grey',
      fontSize: '24px',
    },
    italic: {
      color: state.italic ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    underline: {
      color: state.underline ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    strikeThrough: {
      color: state.strikeThrough ? '#5E5E5E' : 'grey',
      fontSize: '24px',
    },
    title: {
      color: state.title ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    bulletList: {
      color: state.insertUnorderedList ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    numberedList: {
      color: state.insertOrderedList ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    horizontal: {
      color: 'grey',
      fontSize: '20px',
    },
    justifyLeft: {
      color: 'grey',
      fontSize: '20px',
    },
    justifyCenter: {
      color: 'grey',
      fontSize: '20px',
    },
    justifyRight: {
      color: 'grey',
      fontSize: '20px',
    },
    showCustomLink: {
      color: 'grey',
      fontSize: '24px',
    },
    emoji: {
      color: 'grey',
      fontSize: '22px',
    },
  };

  const commandButtons = [
    {
      title: 'Bold',
      type: 'bold',
      icon: <FormatBoldIcon style={style.bold} />,
    },
    {
      title: 'Italic',
      type: 'italic',
      icon: <FormatItalicIcon style={style.italic} />,
    },
    {
      title: 'Underline',
      type: 'underline',
      icon: <FormatUnderlinedIcon style={style.underline} />,
    },
    {
      title: 'Strike Through',
      type: 'strikeThrough',
      icon: <StrikethroughSIcon style={style.strikeThrough} />,
    },
    {
      title: 'Title',
      type: 'fontSize',
      icon: <TextFieldsIcon style={style.title} />,
    },
    {
      title: 'Link',
      type: 'createLink',
      icon: <InsertLinkIcon style={style.showCustomLink} />,
    },
    {
      title: 'Horizontal Line',
      type: 'insertHorizontalRule',
      icon: <HorizontalRuleIcon style={style.horizontal} />,
    },
    {
      title: 'Bullet List',
      type: 'insertUnorderedList',
      icon: <FormatListBulletedIcon style={style.bulletList} />,
    },
    {
      title: 'Numbered List',
      type: 'insertOrderedList',
      icon: <FormatListNumberedIcon style={style.numberedList} />,
    },
    {
      title: 'Justify Left',
      type: 'justifyLeft',
      icon: <FormatAlignLeftIcon style={style.justifyLeft} />,
    },
    {
      title: 'Justify Center',
      type: 'justifyCenter',
      icon: <FormatAlignCenterIcon style={style.justifyCenter} />,
    },
    {
      title: 'Justify Right',
      type: 'justifyRight',
      icon: <FormatAlignRightIcon style={style.justifyRight} />,
    },
    {
      title: 'Emoji',
      type: 'showEmojiPicker',
      icon: <EmojiEmotionsOutlinedIcon style={style.emoji} />,
    },
    {
      title: 'Remove styles',
      type: 'removeFormat',
      icon: <HighlightOffIcon style={{ color: 'grey', fontSize: '22px' }} />,
    },
  ];

  return (
    <div className='editor'>
      <div className='editor-header'>
        <button
          style={{ background: state.bold && '#E4E6EB' }}
          title='Bold'
          onClick={() => handleCommandClick('bold')}
        >
          <div className='command-btn'>
            <FormatBoldIcon style={style.bold} />
          </div>
        </button>
        <button
          style={{ background: state.italic && '#E4E6EB' }}
          title='Italic'
          onClick={() => handleCommandClick('italic')}
        >
          <div className='command-btn'>
            <FormatItalicIcon style={style.italic} />
          </div>
        </button>
        <button
          style={{ background: state.underline && '#E4E6EB' }}
          title='Underline'
          onClick={() => handleCommandClick('underline')}
        >
          <div className='command-btn'>
            <FormatUnderlinedIcon style={style.underline} />
          </div>
        </button>
        <button
          style={{ background: state.strikeThrough && '#E4E6EB' }}
          title='Strike Through'
          onClick={() => handleCommandClick('strikeThrough')}
        >
          <div className='command-btn'>
            <StrikethroughSIcon style={style.strikeThrough} />
          </div>
        </button>
        <button
          style={{ background: state.title && '#E4E6EB' }}
          title='Title'
          onClick={() => handleCommandClick('fontSize')}
        >
          <div className='command-btn'>
            <TextFieldsIcon style={style.title} />
          </div>
        </button>
        <button
          title='Link'
          style={{ background: showCustomLink && '#E4E6EB' }}
          onClick={() => handleCommandClick('createLink')}
        >
          <div className='command-btn'>
            <InsertLinkIcon style={style.showCustomLink} />
          </div>
        </button>
        <button
          title='Horizontal Line'
          onClick={() => handleCommandClick('insertHorizontalRule')}
        >
          <div className='command-btn'>
            <HorizontalRuleIcon style={style.horizontal} />
          </div>
        </button>
        <button
          style={{ background: state.insertUnorderedList && '#E4E6EB' }}
          title='Bullet List'
          onClick={() => handleCommandClick('insertUnorderedList')}
        >
          <div className='command-btn'>
            <FormatListBulletedIcon style={style.bulletList} />
          </div>
        </button>
        <button
          style={{ background: state.insertOrderedList && '#E4E6EB' }}
          title='Numbered List'
          onClick={() => handleCommandClick('insertOrderedList')}
        >
          <div className='command-btn'>
            <FormatListNumberedIcon style={style.numberedList} />
          </div>
        </button>
        <button
          title='Justify Left'
          onClick={() => handleCommandClick('justifyLeft')}
        >
          <div className='command-btn'>
            <FormatAlignLeftIcon style={style.justifyLeft} />
          </div>
        </button>
        <button
          title='Justify Center'
          onClick={() => handleCommandClick('justifyCenter')}
        >
          <div className='command-btn'>
            <FormatAlignCenterIcon style={style.justifyCenter} />
          </div>
        </button>
        <button
          title='Justify Right'
          onClick={() => handleCommandClick('justifyRight')}
        >
          <div className='command-btn'>
            <FormatAlignRightIcon style={style.justifyRight} />
          </div>
        </button>
        <button
          ref={emojiRef}
          title='Emoji'
          style={{ background: state.showEmojiPicker && '#E4E6EB' }}
          onClick={() => setState({ ...state, showEmojiPicker: true })}
        >
          <div className='command-btn'>
            <EmojiEmotionsOutlinedIcon style={style.emoji} />
          </div>
        </button>
        <button
          title='Remove styles'
          onClick={() => handleCommandClick('removeFormat')}
        >
          <div className='command-btn'>
            <HighlightOffIcon style={{ color: 'grey', fontSize: '22px' }} />
          </div>
        </button>
      </div>
      <div
        className={`editor-content ${state.showPlaceholder ? 'edit' : ''}`}
        contentEditable='true'
        onInput={inputHandler}
        ref={editorContentRef}
      />

      {showCustomLink && (
        <CustomLink
          showCustomLink={showCustomLink}
          setShowCustomLink={setShowCustomLink}
          cursorPosition={state.cursorPosition}
          inputHandler={inputHandler}
        />
      )}

      {state.showEmojiPicker && (
        <Fade in={true}>
          <div className='emoji-picker-wrapper' ref={emojiRef}>
            <EmojiPicker
              onEmojiClick={(emoji) => insertEmoji(emoji)}
              autoFocusSearch={false}
              width={300}
              height={450}
              theme='light'
              emojiStyle='native'
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        </Fade>
      )}
    </div>
  );
}

export default PostTabContent;
