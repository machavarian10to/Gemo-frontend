import { useEffect, useState } from 'react';
import SpeechBubble from '@/components/pages/UserHome/top-bar/SpeechBubble';
import GemContainer from '@/components/pages/UserHome/user-gem/GemContainer';
import Fade from '@mui/material/Fade';
import FoodRecommendation from '@/components/pages/UserHome/recommend-food/FoodRecommendation';
import FeaturedGem from '@/components/pages/UserHome/FeaturedGem';
import axiosInstance from '@/services/axios';
import LoadingAnimation from '@/components/animations/LoadingAnimation';
import AlertBox from '@/components/UI/AlertBox';

function UserHome() {
  useEffect(() => {
    axiosInstance
      .get('/api/gems')
      .then((response) => {
        setGems(response.data);
      })
      .catch((error) => {
        setAlertBox({
          message: error.response.data.message,
          type: 'error',
        });
      });
  }, []);

  const [gems, setGems] = useState([]);
  const [alertBox, setAlertBox] = useState({ message: '', type: '' });

  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-home'>
          <div className='user-home__container-wrapper'>
            <SpeechBubble />

            <div className='user-home__post-wrapper'>
              {gems.length > 0 ? (
                gems.map((gem) => <GemContainer key={gem._id} gem={gem} />)
              ) : (
                <div className='user-home__gems-loading-wrapper'>
                  <LoadingAnimation />
                </div>
              )}
            </div>
          </div>

          <div className='user-home__food-recommendation-wrapper'>
            {/* <FoodRecommendation /> */}
            {/* <FeaturedGem /> */}
          </div>
        </div>
      </Fade>

      {alertBox.message && (
        <AlertBox message={alertBox.message} type={alertBox.type} />
      )}
    </>
  );
}
export default UserHome;
