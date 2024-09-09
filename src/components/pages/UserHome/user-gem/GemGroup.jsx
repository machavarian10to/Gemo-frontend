import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

function GemGroup() {
  return (
    <div className='user-gem__group'>
      <PeopleAltOutlinedIcon
        style={{ color: 'var(--color-grey)', fontSize: '22px' }}
      />
      <span>&gt;</span>
      <div className='user-gem__group-image-wrapper'>
        <div className='user-gem__group-image'>
          <img src='https://picsum.photos/500/300' alt='post' />
        </div>
      </div>
      <div className='user-gem__group-name'>food</div>
    </div>
  );
}

export default GemGroup;
