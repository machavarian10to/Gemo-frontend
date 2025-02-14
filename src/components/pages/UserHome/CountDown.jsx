import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';

function CountDown() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!timeLeft) {
      setFinished(true);
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          setFinished(true);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function formattedTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours}h : ${minutes}m : ${seconds}s`;
  }

  return (
    <div className='count-down-wrapper'>
      {finished ? (
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
            <Button fillContainer label='Get recommendation' />
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

          <div className='countdown-date'>{formattedTime(timeLeft)}</div>
        </>
      )}
    </div>
  );
}

export default CountDown;
