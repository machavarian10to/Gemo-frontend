import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import GemContainer from '@/components/pages/UserHome/user-gem/GemContainer';
import PropTypes from 'prop-types';

function FeaturedGem({ gem }) {
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

      <div className='divider'></div>
      <div className='user-home__featured-gem'>
        <GemContainer gem={gem} />
      </div>
    </div>
  );
}

FeaturedGem.propTypes = {
  gem: PropTypes.object,
};

export default FeaturedGem;
