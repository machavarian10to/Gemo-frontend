import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import PropTypes from 'prop-types';

function CountDown({ timeLeft, onRecommendationClick }) {
  const { t } = useTranslation();

  function formattedTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours}h : ${minutes}m : ${seconds}s`;
  }

  return (
    <div className='count-down-wrapper'>
      {timeLeft === 0 ? (
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
            <Button
              type='base'
              fillContainer
              label='Get recommendation'
              clickHandler={onRecommendationClick}
            />
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

CountDown.propTypes = {
  timeLeft: PropTypes.number,
  onRecommendationClick: PropTypes.func,
};

export default CountDown;
