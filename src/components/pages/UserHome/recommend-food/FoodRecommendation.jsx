import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import Fade from '@mui/material/Fade';
import { useEffect } from 'react';
import axiosInstance from '@/services/axios';
import PropTypes from 'prop-types';

function FoodRecommendation({ recommendation }) {
  return (
    <Fade in={true} timeout={600}>
      <div className='user-home__food-recommends-wrapper'>
        <div className='user-home__food-recommends-wrapper__title'>
          <RestaurantOutlinedIcon
            style={{ fontSize: '15px', color: 'var(--color-main-yellow)' }}
          />
          <h4>Food recommendation</h4>
        </div>

        <div className='user-home__food-recommends-image'>
          <img src={recommendation.image} alt='recommended-food' />
        </div>

        <div className='user-home__food-recommends-content'>
          <h6>name</h6>
          <h4>{recommendation.name}</h4>

          <h6>description</h6>
          <p>{recommendation.description}</p>
        </div>
      </div>
    </Fade>
  );
}

FoodRecommendation.propTypes = {
  recommendation: PropTypes.object,
};

export default FoodRecommendation;
