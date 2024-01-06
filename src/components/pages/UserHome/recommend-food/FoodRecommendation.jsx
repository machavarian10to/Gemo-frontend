import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import Button from '@/components/UI/Button';

function FoodRecommendation() {
  return (
    <div className='user-home__food-recommends-wrapper'>
      <div className='user-home__food-recommends-wrapper__title'>
        <RestaurantOutlinedIcon
          style={{ fontSize: '15px', color: 'var(--color-main-yellow)' }}
        />
        <h4>Food recommendation</h4>
      </div>

      <div className='user-home__food-recommends-image'>
        <img src='https://picsum.photos/500/300' alt='recommended-food' />
      </div>

      <div className='user-home__food-recommends-content'>
        <h6>name</h6>
        <h4>title khsad kdjsah dkajshdkjahdsj</h4>

        <h6>description</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatibus, quod, voluptas, quae quia quibusdam voluptatem aliquid
          eaque voluptate quos quas. Quisquam voluptatibus, quod, voluptas, quae
          quia quibusdam voluptatem aliquid eaque voluptate quos quas.
        </p>

        <div className='user-home__food-recommends-content__button'>
          <Button label='Show more' size='medium' type='base' />
        </div>
      </div>
    </div>
  );
}

export default FoodRecommendation;
