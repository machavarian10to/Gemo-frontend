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

function PostTabContent() {
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
              fontSize: fontSize === '24px',
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
      setState({ ...state, fontSize: !state.fontSize });
      if (state.fontSize) {
        document.execCommand(type, false, '3');
        return;
      }
      document.execCommand(type, false, '5');
      return;
    }
    setState((prevState) => ({ ...prevState, [type]: !prevState[type] }));
    document.execCommand(type, false, null);
  }

  const commandStyles = {
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
    fontSize: {
      color: state.fontSize ? '#5E5E5E' : 'grey',
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
    removeFormat: {
      color: 'grey',
      fontSize: '22px',
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
      title: 'Emoji',
      type: 'showEmojiPicker',
      icon: <EmojiEmotionsOutlinedIcon style={commandStyles.emoji} />,
    },
    {
      title: 'Remove styles',
      type: 'removeFormat',
      icon: <HighlightOffIcon style={commandStyles.removeFormat} />,
    },
  ];

  return (
    <Fade in={true} timeout={400}>
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
          <Fade in={true}>
            <div className='emoji-picker-wrapper' ref={emojiRef}>
              <EmojiPicker
                onEmojiClick={(emoji) => insertEmoji(emoji)}
                previewConfig={{ showPreview: false }}
                autoFocusSearch={false}
                emojiStyle='native'
                theme='light'
                height={450}
                width={300}
              />
            </div>
          </Fade>
        )}
      </div>
    </Fade>
  );
}

export default PostTabContent;