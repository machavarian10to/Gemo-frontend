import { useEffect, useState } from 'react';
import SpeechBubble from '@/components/pages/UserHome/top-bar/SpeechBubble';
import GemContainer from '@/components/pages/UserHome/user-gem/GemContainer';
import Fade from '@mui/material/Fade';
import FoodRecommendation from '@/components/pages/UserHome/recommend-food/FoodRecommendation';
import FeaturedGem from '@/components/pages/UserHome/FeaturedGem';
import axiosInstance from '@/services/axios';
import AlertBox from '@/components/UI/AlertBox';
import { setAllGems } from '@/state/index';
import { useSelector, useDispatch } from 'react-redux';
import AnimationStandingChef from '@/components/animations/AnimationStandingChef';
import { useTranslation } from 'react-i18next';

function UserHome() {
  const dispatch = useDispatch();
  const gems = useSelector((state) => state.gems);

  const [gemState, setGemState] = useState({
    limit: 3,
    skip: 0,
  });

  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setGemState((prev) => ({ ...prev, skip: prev.skip + prev.limit }));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`api/gems?limit=${gemState.limit}&skip=${gemState.skip}`)
      .then((response) => {
        dispatch(setAllGems(response.data));
      })
      .catch((error) => {
        console.log(error);
        setAlertBox({
          message: error.response.data,
          type: 'error',
        });
      });
  }, [dispatch, gemState.limit, gemState.skip]);

  const [alertBox, setAlertBox] = useState({ message: '', type: '' });

  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-home'>
          <div className='user-home__container-wrapper'>
            <SpeechBubble />

            <div className='user-home__post-wrapper'>
              {gems.length > 0 ? (
                gems.map((gem) => (
                  <GemContainer key={`${gem._id}-${gem.updatedAt}`} gem={gem} />
                ))
              ) : (
                <div className='user-home__no-gems'>
                  <div className='user-home__chef-animation-wrapper'>
                    <AnimationStandingChef />
                  </div>
                  <p>{t('gem.no_gems')}</p>
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
