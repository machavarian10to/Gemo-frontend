import { useEffect, useState } from 'react';
import SpeechBubble from '@/components/pages/UserHome/top-bar/SpeechBubble';
import GemContainer from '@/components/pages/UserHome/user-gem/GemContainer';
import Fade from '@mui/material/Fade';
import FoodRecommendation from '@/components/pages/UserHome/recommend-food/FoodRecommendation';
import FeaturedGem from '@/components/pages/UserHome/FeaturedGem';
import axiosInstance from '@/services/axios';
import LoadingAnimation from '@/components/UI/LoadingAnimation';

function UserHome() {
  useEffect(() => {
    axiosInstance
      .get('/api/gems')
      .then((response) => {
        console.log(response.data);
        setGems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [gems, setGems] = useState([]);

  if (gems.length === 0) {
    return <LoadingAnimation />;
  }

  return (
    <Fade in={true} timeout={600}>
      <div className='user-home'>
        <div className='user-home__container-wrapper'>
          <SpeechBubble />

          <div className='user-home__post-wrapper'>
            {gems.map((gem) => (
              <GemContainer key={gem._id} gem={gem} />
            ))}
          </div>
        </div>

        <div className='user-home__food-recommendation-wrapper'>
          {/* <FoodRecommendation /> */}
          {/* <FeaturedGem /> */}
        </div>
      </div>
    </Fade>
  );
}
export default UserHome;
