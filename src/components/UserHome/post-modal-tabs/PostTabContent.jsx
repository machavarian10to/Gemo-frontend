import { useState, useRef, useEffect } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
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
  const [justifyLeft, setJustifyLeft] = useState(false);
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
    linkElement.addEventListener('click', (e) => {
      window.open(linkElement.href, '_blank');
      e.preventDefault();
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
    // const selection = window.getSelection();
    // if (selection.rangeCount > 0) {
    //   const range = selection.getRangeAt(0);
    //   const clonedSelection = range.cloneContents();
    //   const div = document.createElement('div');
    //   div.appendChild(clonedSelection);
    //   const hasBTag = div.querySelector('b') !== null;
    //   const hasITag = div.querySelector('i') !== null;
    // }

    // console.log('selection: ', selection);
    // console.log('selected text: ', selection.toString());
    // console.log('range: ', range);

    // console.log('selected contains node: ', selection.containsNode());
    // console.log('anchor child nodes: ', selection.anchorNode.childNodes);
    // console.log('base: ', selection.baseNode);
    // console.log('extend: ', selection.extendNode);
    // console.log('focus', selection.focusNode);

    inputRef.current?.focus();

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
      color: bold ? '#100F16' : 'grey',
      fontSize: '23px',
    },
    italic: {
      color: italic ? '#100F16' : 'grey',
      fontSize: '22px',
    },
    underline: {
      color: underline ? '#100F16' : 'grey',
      fontSize: '21px',
    },
    strikeThrough: {
      color: strikeThrough ? '#100F16' : 'grey',
      fontSize: '22px',
    },
    title: {
      color: title ? '#100F16' : 'grey',
      fontSize: '22px',
    },
    bulletList: {
      color: bulletList ? '#100F16' : 'grey',
      fontSize: '22px',
    },
    numberedList: {
      color: numberedList ? '#100F16' : 'grey',
      fontSize: '22px',
    },
    justifyLeft: {
      color: justifyLeft ? '#100F16' : 'grey',
      fontSize: '19px',
    },
    justifyCenter: {
      color: justifyCenter ? '#100F16' : 'grey',
      fontSize: '19px',
    },
    justifyRight: {
      color: justifyRight ? '#100F16' : 'grey',
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
        <button title='Bold' onClick={() => handleClick('bold')}>
          <FormatBoldIcon style={style.bold} />
        </button>
        <button title='Italic' onClick={() => handleClick('italic')}>
          <FormatItalicIcon style={style.italic} />
        </button>
        <button title='Underline' onClick={() => handleClick('underline')}>
          <FormatUnderlinedIcon style={style.underline} />
        </button>
        <button
          title='Strike through'
          onClick={() => handleClick('strikeThrough')}
        >
          <StrikethroughSIcon style={style.strikeThrough} />
        </button>
        <button title='Title' onClick={() => handleClick('fontSize')}>
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
          title='Bullet list'
          onClick={() => handleClick('insertUnorderedList')}
        >
          <FormatListBulletedIcon style={style.bulletList} />
        </button>
        <button
          title='Numbered list'
          onClick={() => handleClick('insertOrderedList')}
        >
          <FormatListNumberedIcon style={style.numberedList} />
        </button>
        <button title='Justify left' onClick={() => handleClick('justifyLeft')}>
          <FormatAlignLeftIcon style={style.justifyLeft} />
        </button>
        <button
          title='Justify center'
          onClick={() => handleClick('justifyCenter')}
        >
          <FormatAlignCenterIcon style={style.justifyCenter} />
        </button>
        <button
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
