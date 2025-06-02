import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useState } from 'react';

function DietDetails() {
  const [activeTab, setActiveTab] = useState('basicInfo');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h4 className='diet-details-header'>Enter details about you:</h4>

      <div className='diet-details-container'>
        <div className='diet-details-container-tabs-wrapper'>
          <div className='diet-details-container-tabs'>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'basicInfo' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('basicInfo')}
            >
              <PermIdentityOutlinedIcon className='diet-details-container-tabs-icon' />
              Basic Information
            </div>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'physicalAttributes' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('physicalAttributes')}
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
              onClick={() => handleTabClick('healthConditions')}
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
              onClick={() => handleTabClick('foodPreferences')}
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
              onClick={() => handleTabClick('goalsMotivation')}
            >
              <OutlinedFlagOutlinedIcon className='diet-details-container-tabs-icon' />
              Goals & Motivation
            </div>
            <div
              className={`diet-details-container-tabs-item ${
                activeTab === 'lifestyleHabits' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('lifestyleHabits')}
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
              onClick={() => handleTabClick('activityTracking')}
            >
              <FitnessCenterOutlinedIcon
                style={{ fontSize: '23px' }}
                className='diet-details-container-tabs-icon'
              />
              Activity Tracking
            </div>
          </div>
        </div>

        <div className='diet-details-container-inputs-wrapper'>
          {activeTab === 'basicInfo' && (
            <div className='diet-details-container-inputs'>
              <h5>Basic Information</h5>
              {/* Add input fields for basic information here */}
            </div>
          )}
          {activeTab === 'physicalAttributes' && (
            <div className='diet-details-container-inputs'>
              <h5>Physical Attributes</h5>
              {/* Add input fields for physical attributes here */}
            </div>
          )}
          {activeTab === 'healthConditions' && (
            <div className='diet-details-container-inputs'>
              <h5>Health Conditions</h5>
              {/* Add input fields for health conditions here */}
            </div>
          )}
          {activeTab === 'foodPreferences' && (
            <div className='diet-details-container-inputs'>
              <h5>Food Preferences</h5>
              {/* Add input fields for food preferences here */}
            </div>
          )}
          {activeTab === 'goalsMotivation' && (
            <div className='diet-details-container-inputs'>
              <h5>Goals & Motivation</h5>
              {/* Add input fields for goals and motivation here */}
            </div>
          )}
          {activeTab === 'lifestyleHabits' && (
            <div className='diet-details-container-inputs'>
              <h5>Lifestyle & Habits</h5>
              {/* Add input fields for lifestyle and habits here */}
            </div>
          )}
          {activeTab === 'activityTracking' && (
            <div className='diet-details-container-inputs'>
              <h5>Activity Tracking</h5>
              {/* Add input fields for activity tracking here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DietDetails;
