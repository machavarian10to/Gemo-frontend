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
import Button from '@/components/Button';

function PostTabContent() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strikeThrough, setStrikeThrough] = useState(false);
  const [title, setTitle] = useState(false);
  const [bulletList, setBulletList] = useState(false);
  const [numberedList, setNumberedList] = useState(false);
  const [justifyCenter, setJustifyCenter] = useState(false);
  const [justifyRight, setJustifyRight] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [link, setLink] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [showInvalidLinkError, setShowInvalidLinkError] = useState(false);

  const [edit, setEdit] = useState(false);

  const inputRef = useRef(null);
  const linkUrlRef = useRef(null);

  useEffect(() => {
    if (link) {
      linkUrlRef.current?.focus();
    }
  }, [link]);

  useEffect(() => {
    const handleSelectionChange = () => {
      setBold(document.queryCommandState('bold'));
      setItalic(document.queryCommandState('italic'));
      setUnderline(document.queryCommandState('underline'));
      setStrikeThrough(document.queryCommandState('strikeThrough'));
      setTitle(document.queryCommandState('fontSize'));
      setBulletList(document.queryCommandState('insertUnorderedList'));
      setNumberedList(document.queryCommandState('insertOrderedList'));
      setJustifyCenter(document.queryCommandState('justifyCenter'));
      setJustifyRight(document.queryCommandState('justifyRight'));
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  function inputHandler(e) {
    if (e.target.innerHTML.length > 0 && e.target.innerHTML !== '<br>') {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }

  function modifyText(command, defaultUi, value) {
    document.execCommand(command, defaultUi, value);
  }

  function toggleEmojiPicker() {
    setShowEmojiPicker((prev) => !prev);
  }

  function insertEmoji(emoji) {
    inputRef.current?.focus();
    modifyText('insertText', false, emoji.native);
  }

  function createLink() {
    setLink((prevLink) => !prevLink);
  }

  function linkTitleHandler(e) {
    setLinkTitle(e.target.value);
  }

  function linkUrlHandler(e) {
    setLinkUrl(e.target.value);
  }

  function enterKeyPress(e) {
    if (e.key === 'Enter') {
      addLinkHandler();
    }
  }

  function addLinkHandler() {
    inputRef.current?.focus();

    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!urlRegex.test(linkUrl)) {
      setShowInvalidLinkError(true);
      linkUrlRef.current?.focus();
      return;
    }

    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    const linkElement = document.createElement('a');
    linkElement.href = linkUrl.startsWith('https://')
      ? linkUrl
      : `https://${linkUrl}`;
    linkElement.className = 'link';
    linkElement.rel = 'noopener noreferrer';
    linkElement.addEventListener('click', () => {
      window.open(linkElement.href, '_blank');
      // linkElement.classList.toggle('show-preview');
    });
    linkElement.textContent = linkTitle.length ? linkTitle : linkUrl;
    range.insertNode(linkElement);
    range.setEndAfter(linkElement);
    range.setStartAfter(linkElement);

    selection.removeAllRanges();
    selection.addRange(range);

    setLink(false);
    if (link) {
      setLinkTitle('');
      setLinkUrl('');
      setShowInvalidLinkError(false);
    }
  }

  function handleClick(type) {
    inputRef.current?.focus();

    switch (type) {
      case 'bold':
        setBold((prevBold) => !prevBold);
        break;
      case 'italic':
        setItalic((prevItalic) => !prevItalic);
        break;
      case 'underline':
        setUnderline((prevUnderline) => !prevUnderline);
        break;
      case 'strikeThrough':
        setStrikeThrough((prevStrikeThrough) => !prevStrikeThrough);
        break;
      case 'insertUnorderedList':
        setBulletList((prevBulletList) => !prevBulletList);
        break;
      case 'insertOrderedList':
        setNumberedList((prevNumberedList) => !prevNumberedList);
        break;
      case 'justifyCenter':
        setJustifyCenter((prevJustifyCenter) => !prevJustifyCenter);
        break;
      case 'justifyRight':
        setJustifyRight((prevJustifyRight) => !prevJustifyRight);
        break;
      default:
        break;
    }

    if (type === 'createLink') {
      createLink();
      return;
    }

    if (type === 'fontSize') {
      setTitle(!title);
      if (title) {
        modifyText(type, false, '3');
        return;
      }
      modifyText(type, false, '5');
      return;
    }

    modifyText(type, false, null);
  }

  const style = {
    bold: {
      color: bold ? '#5E5E5E' : 'grey',
      fontSize: '23px',
    },
    italic: {
      color: italic ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    underline: {
      color: underline ? '#5E5E5E' : 'grey',
      fontSize: '21px',
    },
    strikeThrough: {
      color: strikeThrough ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    title: {
      color: title ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    bulletList: {
      color: bulletList ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    numberedList: {
      color: numberedList ? '#5E5E5E' : 'grey',
      fontSize: '22px',
    },
    justifyCenter: {
      color: justifyCenter ? '#5E5E5E' : 'grey',
      fontSize: '19px',
    },
    justifyRight: {
      color: justifyRight ? '#5E5E5E' : 'grey',
      fontSize: '19px',
    },
    link: {
      color: 'grey',
      fontSize: '22px',
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
          style={{ background: bold && '#E4E6EB' }}
          title='Bold'
          onClick={() => handleClick('bold')}
        >
          <FormatBoldIcon style={style.bold} />
        </button>
        <button
          style={{ background: italic && '#E4E6EB' }}
          title='Italic'
          onClick={() => handleClick('italic')}
        >
          <FormatItalicIcon style={style.italic} />
        </button>
        <button
          style={{ background: underline && '#E4E6EB' }}
          title='Underline'
          onClick={() => handleClick('underline')}
        >
          <FormatUnderlinedIcon style={style.underline} />
        </button>
        <button
          style={{ background: strikeThrough && '#E4E6EB' }}
          title='Strike through'
          onClick={() => handleClick('strikeThrough')}
        >
          <StrikethroughSIcon style={style.strikeThrough} />
        </button>
        <button
          style={{ background: title && '#E4E6EB' }}
          title='Title'
          onClick={() => handleClick('fontSize')}
        >
          <TextFieldsIcon style={style.title} />
        </button>
        <button
          title='Link'
          style={{ background: link && '#E4E6EB' }}
          onClick={() => handleClick('createLink')}
        >
          <InsertLinkIcon style={style.link} />
        </button>
        <button
          style={{ background: bulletList && '#E4E6EB' }}
          title='Bullet list'
          onClick={() => handleClick('insertUnorderedList')}
        >
          <FormatListBulletedIcon style={style.bulletList} />
        </button>
        <button
          style={{ background: numberedList && '#E4E6EB' }}
          title='Numbered list'
          onClick={() => handleClick('insertOrderedList')}
        >
          <FormatListNumberedIcon style={style.numberedList} />
        </button>
        <button
          style={{ background: justifyCenter && '#E4E6EB' }}
          title='Justify center'
          onClick={() => handleClick('justifyCenter')}
        >
          <FormatAlignCenterIcon style={style.justifyCenter} />
        </button>
        <button
          style={{ background: justifyRight && '#E4E6EB' }}
          title='Justify right'
          onClick={() => handleClick('justifyRight')}
        >
          <FormatAlignRightIcon style={style.justifyRight} />
        </button>
        <button
          title='Emoji'
          style={{ background: showEmojiPicker && '#E4E6EB' }}
          onClick={toggleEmojiPicker}
        >
          <EmojiEmotionsOutlinedIcon style={style.emoji} />
        </button>
        <button
          title='Remove styles'
          onClick={() => handleClick('removeFormat')}
        >
          <HighlightOffIcon style={{ color: 'grey', fontSize: '20px' }} />
        </button>
      </div>
      <div
        className={`editor-content ${edit ? 'edit' : ''}`}
        contentEditable='true'
        role='textbox'
        spellCheck='true'
        onInput={inputHandler}
        ref={inputRef}
      ></div>

      {link && (
        <div className='link-inputs-wrapper' onKeyDown={enterKeyPress}>
          <div className='link-inputs'>
            <input
              tabIndex={2}
              onChange={linkTitleHandler}
              value={linkTitle}
              placeholder='Enter the title of link'
            />
            <input
              tabIndex={1}
              onChange={linkUrlHandler}
              value={linkUrl}
              placeholder='Enter the URL'
              ref={linkUrlRef}
            />
            {showInvalidLinkError && (
              <p className='not-valid-link'>Link is not valid!</p>
            )}
          </div>
          <Button
            label='Add'
            size='extra-small'
            state={linkUrl.length ? 'active' : 'inactive'}
            clickHandler={addLinkHandler}
          />
        </div>
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
