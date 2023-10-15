import { useState, useRef, useEffect } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Picker from '@emoji-mart/react';
import CustomLink from '@/components/UserHome/CustomLink';

function PostTabContent() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikeThrough, setIsStrikeThrough] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);
  const [isJustifyCenter, setIsJustifyCenter] = useState(false);
  const [isJustifyRight, setIsJustifyRight] = useState(false);

  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [showCustomLink, setShowCustomLink] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const editorContentRef = useRef(null);
  const linkUrlRef = useRef(null);

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
        setIsUnderline(document.queryCommandState('underline'));
        setIsStrikeThrough(document.queryCommandState('strikeThrough'));
        setIsBulletList(document.queryCommandState('insertUnorderedList'));
        setIsNumberedList(document.queryCommandState('insertOrderedList'));
        setIsJustifyCenter(document.queryCommandState('justifyCenter'));
        setIsJustifyRight(document.queryCommandState('justifyRight'));

        // Check if the selected text is a title
        const selection = window.getSelection();
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

  function inputHandler(e) {
    if (e.target.innerHTML.length > 0 && e.target.innerHTML !== '<br>') {
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
      case 'justifyCenter':
        setIsJustifyCenter((prevJustifyCenter) => !prevJustifyCenter);
        break;
      case 'justifyRight':
        setIsJustifyRight((prevJustifyRight) => !prevJustifyRight);
        break;
      default:
        break;
    }

    if (type === 'createLink') {
      setShowCustomLink((prevLink) => !prevLink);
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
      fontSize: '23px',
    },
    italic: {
      color: isItalic ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    underline: {
      color: isUnderline ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    strikeThrough: {
      color: isStrikeThrough ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    title: {
      color: isTitle ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    bulletList: {
      color: isBulletList ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    numberedList: {
      color: isNumberedList ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    justifyCenter: {
      color: isJustifyCenter ? '#5E5E5E' : 'grey',
      fontSize: '19px',
    },
    justifyRight: {
      color: isJustifyRight ? '#5E5E5E' : 'grey',
      fontSize: '19px',
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
          <FormatBoldIcon style={style.bold} />
        </button>
        <button
          style={{ background: isItalic && '#E4E6EB' }}
          title='Italic'
          onClick={() => handleCommandClick('italic')}
        >
          <FormatItalicIcon style={style.italic} />
        </button>
        <button
          style={{ background: isUnderline && '#E4E6EB' }}
          title='Underline'
          onClick={() => handleCommandClick('underline')}
        >
          <FormatUnderlinedIcon style={style.underline} />
        </button>
        <button
          style={{ background: isStrikeThrough && '#E4E6EB' }}
          title='Strike through'
          onClick={() => handleCommandClick('strikeThrough')}
        >
          <StrikethroughSIcon style={style.strikeThrough} />
        </button>
        <button
          style={{ background: isTitle && '#E4E6EB' }}
          title='Title'
          onClick={() => handleCommandClick('fontSize')}
        >
          <TextFieldsIcon style={style.title} />
        </button>
        <button
          title='Link'
          style={{ background: showCustomLink && '#E4E6EB' }}
          onClick={() => handleCommandClick('createLink')}
        >
          <InsertLinkIcon style={style.showCustomLink} />
        </button>
        <button
          style={{ background: isBulletList && '#E4E6EB' }}
          title='Bullet list'
          onClick={() => handleCommandClick('insertUnorderedList')}
        >
          <FormatListBulletedIcon style={style.bulletList} />
        </button>
        <button
          style={{ background: isNumberedList && '#E4E6EB' }}
          title='Numbered list'
          onClick={() => handleCommandClick('insertOrderedList')}
        >
          <FormatListNumberedIcon style={style.numberedList} />
        </button>
        <button
          style={{ background: isJustifyCenter && '#E4E6EB' }}
          title='Justify center'
          onClick={() => handleCommandClick('justifyCenter')}
        >
          <FormatAlignCenterIcon style={style.justifyCenter} />
        </button>
        <button
          style={{ background: isJustifyRight && '#E4E6EB' }}
          title='Justify right'
          onClick={() => handleCommandClick('justifyRight')}
        >
          <FormatAlignRightIcon style={style.justifyRight} />
        </button>
        <button
          title='Emoji'
          style={{ background: showEmojiPicker && '#E4E6EB' }}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <EmojiEmotionsOutlinedIcon style={style.emoji} />
        </button>
        <button
          title='Remove styles'
          onClick={() => handleCommandClick('removeFormat')}
        >
          <HighlightOffIcon style={{ color: 'grey', fontSize: '22px' }} />
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
          execCommand={execCommand}
          editorContentRef={editorContentRef}
          showCustomLink={showCustomLink}
          setShowCustomLink={setShowCustomLink}
        />
      )}

      {showEmojiPicker && (
        <div className='emoji-picker'>
          <Picker
            previewPosition='none'
            perLine='7'
            theme='light'
            onEmojiSelect={(emoji) => insertEmoji(emoji)}
            maxFrequentRows='1'
          />
        </div>
      )}
    </div>
  );
}

export default PostTabContent;
