import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Post from '@/components/pages/UserHome/user-post/Post';

function FeaturedGem() {
  return (
    <div className='user-home__featured-gem-wrapper'>
      <h4>
        <AutoAwesomeOutlinedIcon
          style={{
            transform: 'rotate(180deg)',
            color: 'var(--color-main-yellow)',
          }}
        />
        Gem of the Day
        <AutoAwesomeOutlinedIcon
          style={{ color: 'var(--color-main-yellow)' }}
        />
      </h4>

      <div className='user-home__featured-gem'>
        <Post />
      </div>
    </div>
  );
}

export default FeaturedGem;
