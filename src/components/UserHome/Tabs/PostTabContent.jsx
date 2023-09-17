import FormatBoldIcon from '@mui/icons-material/FormatBold';

function PostTabContent() {
  return (
    <div className='editor'>
      <div className='editor-header'>
        <button>
          <FormatBoldIcon style={{ color: 'grey' }} />
        </button>
      </div>
      <textarea
        placeholder='Add any additional info if you want...'
        maxLength={200}
      ></textarea>
    </div>
  );
}

export default PostTabContent;
