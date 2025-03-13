import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useEffect, useState } from 'react';
import axiosInstance from '@/services/axios';
import { useTranslation } from 'react-i18next';

function FeaturedGem() {
  const [gemData, setGemData] = useState({});

  const { t } = useTranslation();

  useEffect(() => {
    axiosInstance
      .get('api/gems/featured')
      .then((response) => {
        setGemData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='user-home__featured-gem-wrapper'>
      <h4 className='user-home__featured-gem-title'>
        <AutoAwesomeOutlinedIcon
          style={{
            transform: 'rotate(180deg)',
            color: 'var(--color-main-yellow)',
          }}
        />
        {t('gem.featured_gem')}
        <AutoAwesomeOutlinedIcon
          style={{ color: 'var(--color-main-yellow)' }}
        />
      </h4>

      <div className='divider'></div>
      <div className='user-home__featured-gem-titles'>
        <h4>
          {t('gem.title')}: <span>{gemData.title}</span>
        </h4>
        <h4>
          {t('gem.author')}: <span>@{gemData.username}</span>
        </h4>
        <h4>
          {t('gem.reacts_amount')}: <span>{gemData.reactsAmount}</span>
        </h4>
        <h4>
          {t('gem.featured_time_left')}: <span>24h</span>
        </h4>
      </div>
    </div>
  );
}

export default FeaturedGem;
