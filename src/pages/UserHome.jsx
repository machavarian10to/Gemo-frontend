import SpeechBubble from '@/components/pages/UserHome/top-bar/SpeechBubble';
import Post from '@/components/pages/UserHome/user-post/Post';
import Fade from '@mui/material/Fade';
import FoodRecommendation from '@/components/pages/UserHome/recommend-food/FoodRecommendation';
import FeaturedGem from '@/components/pages/UserHome/FeaturedGem';

function UserHome() {
  return (
    <Fade in={true} timeout={600}>
      <div className='user-home'>
        <div className='user-home__container-wrapper'>
          <SpeechBubble />

          <div className='user-home__post-wrapper'>
            <Post />
            <Post />
            <Post />
          </div>
        </div>

        <div className='user-home__food-recommendation-wrapper'>
          <FoodRecommendation />
          <FeaturedGem />
        </div>
      </div>
    </Fade>
  );
}
export default UserHome;
