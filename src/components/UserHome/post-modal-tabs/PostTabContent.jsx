import { useState, useRef } from 'react';
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

  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);

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
    inputRef.current.focus();
    modifyText('insertText', false, emoji.native);
  }

  function createLink() {
    setLink(!link);
    // modifyText("insertHTML", false, "<a href='"+href+"'>"+selected+"</a>");
    // modifyText('createLink', false, url);
  }

  function linkTitleHandler(e) {
    setLinkTitle(e.target.value);
  }

  function linkUrlHandler(e) {
    setLinkUrl(e.target.value);
  }

  function linkPreview() {
    console.log('link preview');
    // window.open(`https://${linkUrl}`, '_blank');
  }

  function addLinkHandler() {
    inputRef.current.focus();
    if (!linkTitle.length) {
      setLinkTitle(linkUrl);
    }

    modifyText(
      'insertHTML',
      false,
      `<a href='https://${linkUrl}' target='_blank'>${linkTitle}</a>`,
    );
    setLink(false);
    setLinkTitle('');
    setLinkUrl('');
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
    inputRef.current.focus();

    if (type === 'bold') {
      setBold(!bold);
    } else if (type === 'italic') {
      setItalic(!italic);
    } else if (type === 'underline') {
      setUnderline(!underline);
    } else if (type === 'strikeThrough') {
      setStrikeThrough(!strikeThrough);
    } else if (type === 'title') {
      setTitle(!title);
    } else if (type === 'insertUnorderedList') {
      setBulletList(!bulletList);
      setNumberedList(false);
    } else if (type === 'insertOrderedList') {
      setNumberedList(!numberedList);
      setBulletList(false);
    } else if (type === 'justifyLeft') {
      setJustifyLeft(!justifyLeft);
      setJustifyCenter(false);
      setJustifyRight(false);
    } else if (type === 'justifyCenter') {
      setJustifyCenter(!justifyCenter);
      setJustifyLeft(false);
      setJustifyRight(false);
    } else if (type === 'justifyRight') {
      setJustifyRight(!justifyRight);
      setJustifyLeft(false);
      setJustifyCenter(false);
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
    emoji: {
      color: showEmojiPicker ? '#100F16' : 'grey',
      fontSize: '20px',
    },
  };

  return (
    <div className='editor'>
      <div className='editor-header'>
        <button onClick={() => handleClick('bold')}>
          <FormatBoldIcon style={style.bold} />
        </button>
        <button onClick={() => handleClick('italic')}>
          <FormatItalicIcon style={style.italic} />
        </button>
        <button onClick={() => handleClick('underline')}>
          <FormatUnderlinedIcon style={style.underline} />
        </button>
        <button onClick={() => handleClick('strikeThrough')}>
          <StrikethroughSIcon style={style.strikeThrough} />
        </button>
        <button onClick={() => handleClick('fontSize')}>
          <TextFieldsIcon style={style.title} />
        </button>
        <button onClick={toggleEmojiPicker}>
          <EmojiEmotionsOutlinedIcon style={style.emoji} />
        </button>
        <button onClick={() => handleClick('insertUnorderedList')}>
          <FormatListBulletedIcon style={style.bulletList} />
        </button>
        <button onClick={() => handleClick('insertOrderedList')}>
          <FormatListNumberedIcon style={style.numberedList} />
        </button>
        <button onClick={() => handleClick('justifyLeft')}>
          <FormatAlignLeftIcon style={style.justifyLeft} />
        </button>
        <button onClick={() => handleClick('justifyCenter')}>
          <FormatAlignCenterIcon style={style.justifyCenter} />
        </button>
        <button onClick={() => handleClick('justifyRight')}>
          <FormatAlignRightIcon style={style.justifyRight} />
        </button>
        <button onClick={() => handleClick('createLink')}>
          <InsertLinkIcon style={{ color: 'grey', fontSize: '22px' }} />
        </button>
        <button onClick={() => handleClick('removeFormat')}>
          <HighlightOffIcon style={{ color: 'grey', fontSize: '18px' }} />
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
        <div className='link-inputs-wrapper'>
          <div className='link-inputs'>
            <input
              onChange={linkTitleHandler}
              value={linkTitle}
              type='text'
              placeholder='Enter the title of link'
              className='link-title-field'
            />
            <input
              onChange={linkUrlHandler}
              value={linkUrl}
              type='text'
              placeholder='Enter the URL'
              className='link-url-field'
            />
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
          />
        </div>
      )}
    </div>
  );
}

export default PostTabContent;
