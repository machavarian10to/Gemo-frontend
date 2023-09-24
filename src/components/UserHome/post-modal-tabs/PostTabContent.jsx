import { useState } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import TitleIcon from '@mui/icons-material/Title';

function PostTabContent() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [title, setTitle] = useState(false);
  const [bulletList, setBulletList] = useState(false);
  const [numberedList, setNumberedList] = useState(false);
  const [quote, setQuote] = useState(false);

  const style = {
    bold: {
      color: bold ? '#100F16' : 'grey',
    },
    italic: {
      color: italic ? '#100F16' : 'grey',
    },
    underline: {
      color: underline ? '#100F16' : 'grey',
    },
    title: {
      color: title ? '#100F16' : 'grey',
    },
    bulletList: {
      color: bulletList ? '#100F16' : 'grey',
    },
    numberedList: {
      color: numberedList ? '#100F16' : 'grey',
    },
    quote: {
      color: quote ? '#100F16' : 'grey',
    },
  };

  return (
    <div className='editor'>
      <div className='editor-header'>
        <button onClick={() => setBold((prev) => !prev)}>
          <FormatBoldIcon style={style.bold} />
        </button>
        <button onClick={() => setItalic((prev) => !prev)}>
          <FormatItalicIcon style={style.italic} />
        </button>
        <button onClick={() => setUnderline((prev) => !prev)}>
          <FormatUnderlinedIcon style={style.underline} />
        </button>
        <button onClick={() => setTitle((prev) => !prev)}>
          <TitleIcon style={style.title} />
        </button>
        <button onClick={() => setBulletList((prev) => !prev)}>
          <FormatListBulletedIcon style={style.bulletList} />
        </button>
        <button onClick={() => setNumberedList((prev) => !prev)}>
          <FormatListNumberedIcon style={style.numberedList} />
        </button>
        <button>
          <InsertLinkIcon style={{ color: 'grey' }} />
        </button>
        <button onClick={() => setQuote((prev) => !prev)}>
          <FormatQuoteIcon style={style.quote} />
        </button>
      </div>
      <textarea
        placeholder='Additional info (optional)'
        maxLength={200}
      ></textarea>
    </div>
  );
}

export default PostTabContent;
