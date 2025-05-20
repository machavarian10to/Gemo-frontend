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
import InfiniteScroll from '@/components/shared/InfiniteScroll';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import CountDown from '@/components/pages/UserHome/CountDown';

function UserHome() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [alertBox, setAlertBox] = useState({ message: '', type: '' });
  const [hasMore, setHasMore] = useState(true);
  const [gemState, setGemState] = useState({
    limit: 20,
    skip: 0,
  });
  const [timeLeft, setTimeLeft] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const gems = useSelector((state) => state.gems);

  const { t } = useTranslation();

  const loadMore = () => {
    if (!hasMore) return;
    setGemState((prev) => ({
      ...prev,
      skip: prev.skip + prev.limit,
    }));
  };

  useEffect(() => {
    if (!hasMore) return;
    axiosInstance
      .get(`api/gems?limit=${gemState.limit}&skip=${gemState.skip}`)
      .then((response) => {
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          dispatch(setAllGems(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertBox({
          message: error.response.data,
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, gemState.limit, gemState.skip, hasMore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/food/recommendation-status',
        );
        setTimeLeft(response.data.timeLeft);
      } catch (error) {
        console.error('Error fetching countdown data:', error);
      }
    };

    fetchData();
  }, []);

  const onRecommendationClick = async () => {
    try {
      const response = await axiosInstance.get('/api/food/recommendation');
      setRecommendation(response.data);

      const statusResponse = await axiosInstance.get(
        '/api/food/recommendation-status',
      );
      setTimeLeft(statusResponse.data.timeLeft);
    } catch (error) {
      console.error('Error fetching food recommendation data:', error);
      setAlertBox({
        message: error.response.data,
        type: 'error',
      });
    }
  };

  return (
    <>
      <Fade in={true} timeout={600}>
        <div className='user-home'>
          <div className='user-home__container-wrapper'>
            <SpeechBubble />

            <div className='user-home__post-wrapper'>
              {loading ? (
                <SkeletonTheme baseColor='var(--bg-secondary-color)'>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '30px',
                    }}
                  >
                    <Skeleton height={300} width={570} />
                    <Skeleton height={300} width={570} />
                    <Skeleton height={300} width={570} />
                  </div>
                </SkeletonTheme>
              ) : (
                <>
                  {gems.length > 0 ? (
                    gems.map((gem) => <GemContainer key={gem._id} gem={gem} />)
                  ) : (
                    <div className='user-home__no-gems'>
                      <div className='user-home__chef-animation-wrapper'>
                        <AnimationStandingChef />
                      </div>
                      <p>{t('gem.no_gems')}</p>
                    </div>
                  )}
                  <InfiniteScroll loadMore={loadMore} />
                </>
              )}
            </div>
          </div>

          <div className='user-home__right-container-wrapper'>
            <CountDown
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              onRecommendationClick={onRecommendationClick}
            />

            {timeLeft > 0 && (
              <FoodRecommendation recommendation={recommendation} />
            )}

            <FeaturedGem />
            {/* Wallet */}
            {/* <Trending /> */}
            {/* Ads */}
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
