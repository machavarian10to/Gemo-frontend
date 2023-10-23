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
import Picker from '@emoji-mart/react';
import 'emoji-picker-element';
import CustomLink from '@/components/UserHome/CustomLink';

function PostTabContent() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikeThrough, setIsStrikeThrough] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);

  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [showCustomLink, setShowCustomLink] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [selection, setSelection] = useState(null);

  const editorContentRef = useRef(null);
  const linkUrlRef = useRef(null);

  // const style = document.createElement('style');
  // style.textContent = `#nav .bar { background-color: #F9A109; }`;
  // emojiPicker?.shadowRoot?.appendChild(style);

  useEffect(() => {
    const emojiPicker = document.querySelector('em-emoji-picker');
    const styleTag = emojiPicker?.shadowRoot.querySelector('style');

    if (styleTag) {
      styleTag.textContent += `
        #nav .bar {
          background-color: #F9A109;
        }
        #nav button[aria-selected] {
          color: #F9A109;
        }
        .option:hover{
          background-color: #F9A109;
        }
        .menu input[type="radio"]:checked + .option {
          box-shadow: 0 0 0 2px #F9A109;
        }
        .search input[type="search"]:focus {
          background-color: rgb(var(--em-rgb-input));
          box-shadow: inset 0 0 0 1.5px #F9A109, 0 1px 3px rgba(65, 69, 73, .2);
        }
      `;
    }
  }, [showEmojiPicker, setShowEmojiPicker]);

  useEffect(() => {
    if (showCustomLink) {
      linkUrlRef.current?.focus();
    }
  }, [showCustomLink]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (
        editorContentRef.current &&
        editorContentRef.current.contains(document.activeElement)
      ) {
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsStrikeThrough(document.queryCommandState('strikeThrough'));
        setIsBulletList(document.queryCommandState('insertUnorderedList'));
        setIsNumberedList(document.queryCommandState('insertOrderedList'));

        const selection = window.getSelection();

        // check if the selected text is a link and setUnderline to false
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          if (container.nodeType === Node.TEXT_NODE) {
            const parent = container.parentElement;
            if (parent.tagName === 'A') {
              setIsUnderline(false);
            } else {
              setIsUnderline(document.queryCommandState('underline'));
            }
          } else {
            setIsUnderline(document.queryCommandState('underline'));
          }
        } else {
          setIsUnderline(document.queryCommandState('underline'));
        }

        // Check if the selected text is a title
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          if (container.nodeType === Node.TEXT_NODE) {
            const fontSize = window.getComputedStyle(
              container.parentElement,
            ).fontSize;
            setIsTitle(fontSize === '24px');
          } else {
            setIsTitle(false);
          }
        } else {
          setIsTitle(false);
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
      setShowPlaceholder(true);
    } else {
      setShowPlaceholder(false);
    }
  }

  function execCommand(command, defaultUi, value) {
    document.execCommand(command, defaultUi, value);
  }

  function insertEmoji(emoji) {
    editorContentRef.current?.focus();
    execCommand('insertText', false, emoji.native);
  }

  function handleCommandClick(type) {
    editorContentRef.current?.focus();

    switch (type) {
      case 'bold':
        setIsBold((prevBold) => !prevBold);
        break;
      case 'italic':
        setIsItalic((prevItalic) => !prevItalic);
        break;
      case 'underline':
        setIsUnderline((prevUnderline) => !prevUnderline);
        break;
      case 'strikeThrough':
        setIsStrikeThrough((prevStrikeThrough) => !prevStrikeThrough);
        break;
      case 'insertUnorderedList':
        setIsBulletList((prevBulletList) => !prevBulletList);
        break;
      case 'insertOrderedList':
        setIsNumberedList((prevNumberedList) => !prevNumberedList);
        break;
      default:
        break;
    }

    if (type === 'createLink') {
      setShowCustomLink((prevLink) => !prevLink);
      setSelection(window.getSelection());
      return;
    }

    if (type === 'fontSize') {
      setIsTitle((prevIsTitle) => !prevIsTitle);
      if (isTitle) {
        execCommand(type, false, '3');
        return;
      }
      execCommand(type, false, '5');
      return;
    }
    execCommand(type, false, null);
  }

  const style = {
    bold: {
      color: isBold ? '#5E5E5E' : 'grey',
      fontSize: '24px',
    },
    italic: {
      color: isItalic ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    underline: {
      color: isUnderline ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    strikeThrough: {
      color: isStrikeThrough ? '#5E5E5E' : 'grey',
      fontSize: '24px',
    },
    title: {
      color: isTitle ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    horizontal: {
      color: 'grey',
      fontSize: '20px',
    },
    bulletList: {
      color: isBulletList ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    numberedList: {
      color: isNumberedList ? '#5E5E5E' : 'grey',
      fontSize: '22px',
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

  return (
    <div className='editor'>
      <div className='editor-header'>
        <button
          style={{ background: isBold && '#E4E6EB' }}
          title='Bold'
          onClick={() => handleCommandClick('bold')}
        >
          <div className='command-btn'>
            <FormatBoldIcon style={style.bold} />
          </div>
        </button>
        <button
          style={{ background: isItalic && '#E4E6EB' }}
          title='Italic'
          onClick={() => handleCommandClick('italic')}
        >
          <div className='command-btn'>
            <FormatItalicIcon style={style.italic} />
          </div>
        </button>
        <button
          style={{ background: isUnderline && '#E4E6EB' }}
          title='Underline'
          onClick={() => handleCommandClick('underline')}
        >
          <div className='command-btn'>
            <FormatUnderlinedIcon style={style.underline} />
          </div>
        </button>
        <button
          style={{ background: isStrikeThrough && '#E4E6EB' }}
          title='Strike Through'
          onClick={() => handleCommandClick('strikeThrough')}
        >
          <div className='command-btn'>
            <StrikethroughSIcon style={style.strikeThrough} />
          </div>
        </button>
        <button
          style={{ background: isTitle && '#E4E6EB' }}
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
          style={{ background: isBulletList && '#E4E6EB' }}
          title='Bullet List'
          onClick={() => handleCommandClick('insertUnorderedList')}
        >
          <div className='command-btn'>
            <FormatListBulletedIcon style={style.bulletList} />
          </div>
        </button>
        <button
          style={{ background: isNumberedList && '#E4E6EB' }}
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
          title='Horizontal Line'
          onClick={() => handleCommandClick('insertHorizontalRule')}
        >
          <div className='command-btn'>
            <HorizontalRuleIcon style={style.horizontal} />
          </div>
        </button>
        <button
          title='Emoji'
          style={{ background: showEmojiPicker && '#E4E6EB' }}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
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
        className={`editor-content ${showPlaceholder ? 'edit' : ''}`}
        contentEditable='true'
        role='textbox'
        spellCheck='true'
        onInput={inputHandler}
        ref={editorContentRef}
      ></div>

      {showCustomLink && (
        <CustomLink
          editorContentRef={editorContentRef}
          showCustomLink={showCustomLink}
          setShowCustomLink={setShowCustomLink}
          selection={selection}
          inputHandler={inputHandler}
        />
      )}

      {showEmojiPicker && (
        <div className='emoji-picker-wrapper'>
          <Picker
            previewPosition='none'
            perLine='7'
            theme='light'
            onEmojiSelect={(emoji) => insertEmoji(emoji)}
            maxFrequentRows='1'
          />
          {/* <emoji-picker
            onClick={(emoji) => console.log(emoji)}
            class='light'
          ></emoji-picker> */}
        </div>
      )}
    </div>
  );
}

export default PostTabContent;
