import { useState } from 'react';
import Button from '@/components/UI/Button';

import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';

import ActivityTracking from '@/components/pages/DietDetails/ActivityTracking';
import BasicInformation from '@/components/pages/DietDetails/BasicInformation';
import FoodPreferences from '@/components/pages/DietDetails/FoodPreferences';
import GoalsMotivation from '@/components/pages/DietDetails/GoalsMotivation';
import HealthConditions from '@/components/pages/DietDetails/HealthConditions';
import LifestyleHabits from '@/components/pages/DietDetails/LifestyleHabits';
import PhysicalAttributes from '@/components/pages/DietDetails/PhysicalAttributes';

function DietDetails() {
  const [activeTab, setActiveTab] = useState('basicInfo');

  const [basicInfo, setBasicInfo] = useState({
    age: '',
    gender: '',
    location: '',
  });

  const onSaveClick = () => {
    // TODO: Logic to save the details
    alert('Details saved');
  };

  return (
    <div>
      <h4 className='diet-details-header'>
        Enter details about you for generating food recommendations:
      </h4>

      <div className='diet-details-container'>
        <div className='diet-details-container-tabs-wrapper'>
          <div className='diet-details-container-tabs'>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'basicInfo' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('basicInfo')}
            >
              <PermIdentityOutlinedIcon className='diet-details-container-tabs-icon' />
              Basic Information
            </div>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'physicalAttributes' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('physicalAttributes')}
            >
              <AccessibilityOutlinedIcon
                style={{ fontSize: '24px' }}
                className='diet-details-container-tabs-icon'
              />
              Physical Attributes
            </div>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'healthConditions' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('healthConditions')}
            >
              <LocalHospitalOutlinedIcon
                style={{ fontSize: '23px' }}
                className='diet-details-container-tabs-icon'
              />
              Health Conditions
            </div>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'foodPreferences' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('foodPreferences')}
            >
              <RestaurantOutlinedIcon
                style={{ fontSize: '23px' }}
                className='diet-details-container-tabs-icon'
              />
              Food Preferences
            </div>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'goalsMotivation' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('goalsMotivation')}
            >
              <OutlinedFlagOutlinedIcon className='diet-details-container-tabs-icon' />
              Goals & Motivation
            </div>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'lifestyleHabits' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('lifestyleHabits')}
            >
              <WorkOutlineOutlinedIcon
                style={{ fontSize: '23px' }}
                className='diet-details-container-tabs-icon'
              />
              Lifestyle & Habits
            </div>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'activityTracking' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('activityTracking')}
            >
              <FitnessCenterOutlinedIcon
                style={{ fontSize: '23px' }}
                className='diet-details-container-tabs-icon'
              />
              Activity Tracking
            </div>
          </div>
        </div>

        {activeTab === 'basicInfo' && (
          <BasicInformation state={basicInfo} setState={setBasicInfo} />
        )}
        {activeTab === 'physicalAttributes' && <PhysicalAttributes />}
        {activeTab === 'healthConditions' && <HealthConditions />}
        {activeTab === 'foodPreferences' && <FoodPreferences />}
        {activeTab === 'goalsMotivation' && <GoalsMotivation />}
        {activeTab === 'lifestyleHabits' && <LifestyleHabits />}
        {activeTab === 'activityTracking' && <ActivityTracking />}
      </div>

      <div className='diet-details-container-save-button'>
        <Button
          size='medium'
          label='Save'
          type='primary'
          clickHandler={onSaveClick}
        />
      </div>
    </div>
  );
}

export default DietDetails;
