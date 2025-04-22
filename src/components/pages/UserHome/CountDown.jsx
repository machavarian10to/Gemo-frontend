import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import axiosInstance from '@/services/axios';

function CountDown() {
  const { t } = useTranslation();

  const [time, setTime] = useState({
    left: 0,
    canRecommend: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/food/recommendation-status',
        );
        const { timeLeft, canRecommend } = response.data;
        setTime({
          left: timeLeft,
          canRecommend,
        });
      } catch (error) {
        console.error('Error fetching countdown data:', error);
      }
    };

    fetchData();
  }, []);

  function formattedTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours}h : ${minutes}m : ${seconds}s`;
  }

  return (
    <div className='count-down-wrapper'>
      {!time.canRecommend ? (
        <>
          <div className='count-down-new-food-wrapper'>
            <LunchDiningOutlinedIcon
              style={{
                color: 'var(--color-main-yellow)',
                fontSize: '1.4rem',
                marginTop: '6px',
              }}
            />
            <h3 className='count-down-new-food-text'>
              click here to get new food recommendation:
            </h3>
          </div>
          <div className='count-down-new-food-button'>
            <Button type='base' fillContainer label='Get recommendation' />
          </div>
        </>
      ) : (
        <>
          <div className='count-down-title-wrapper'>
            <div className='count-down-icon'>
              <TimerOutlinedIcon
                style={{
                  color: 'var(--color-main-yellow)',
                  fontSize: '1.5rem',
                }}
              />
            </div>
            <h3 className='countdown-title'>{t('countdown')}</h3>
          </div>

          <div className='countdown-date'>{formattedTime(time.left)}</div>
        </>
      )}
    </div>
  );
}

export default CountDown;
