import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import TitleIcon from '@mui/icons-material/Title';

function PostTabContent() {
  return (
    <div className='editor'>
      <div className='editor-header'>
        <button>
          <FormatBoldIcon style={{ color: 'grey' }} />
        </button>
        <button>
          <FormatItalicIcon style={{ color: 'grey' }} />
        </button>
        <button>
          <FormatUnderlinedIcon style={{ color: 'grey' }} />
        </button>
        <button>
          <TitleIcon style={{ color: 'grey' }} />
        </button>
        <button>
          <FormatListBulletedIcon style={{ color: 'grey' }} />
        </button>
        <button>
          <FormatListNumberedIcon style={{ color: 'grey' }} />
        </button>
        <button>
          <InsertLinkIcon style={{ color: 'grey' }} />
        </button>
        <button>
          <FormatQuoteIcon style={{ color: 'grey' }} />
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
