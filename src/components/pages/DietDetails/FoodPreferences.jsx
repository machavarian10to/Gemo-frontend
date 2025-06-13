import { useState } from 'react';
import Input from '@/components/UI/Input';
import Checkbox from '@/components/UI/Checkbox';
import Select from '@/components/UI/Select';
import { Fade } from '@mui/material';

function FoodPreferences() {
  const [showOptions, setShowOptions] = useState(false);
  const [dietType, setDietType] = useState('Select your diet type (if any)');
  const [dislikedFoods, setDislikedFoods] = useState('');

  const [otherDietType, setOtherDietType] = useState('');
  const [otherFavoriteCuisines, setOtherFavoriteCuisines] = useState('');

  const [favoriteCuisines, setFavoriteCuisines] = useState({
    Georgian: false,
    Italian: false,
    Chinese: false,
    Indian: false,
    Mexican: false,
    Japanese: false,
    Mediterranean: false,
    Thai: false,
    French: false,
    Spanish: false,
    American: false,
    Other: false,
  });

  const cuisines = [
    { key: 'Georgian' },
    { key: 'Italian' },
    { key: 'Chinese' },
    { key: 'Indian' },
    { key: 'Mexican' },
    { key: 'Japanese' },
    { key: 'Mediterranean' },
    { key: 'Thai' },
    { key: 'French' },
    { key: 'Spanish' },
    { key: 'Other' },
  ];

  const dietTypeOptions = [
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'pescatarian', name: 'Pescatarian' },
    { id: 'omnivore', name: 'Omnivore' },
    { id: 'keto', name: 'Keto' },
    { id: 'paleo', name: 'Paleo' },
    { id: 'gluten-free', name: 'Gluten-Free' },
    { id: 'dairy-free', name: 'Dairy-Free' },
    { id: 'other', name: 'Other' },
  ];

  const Inputs = [
    {
      name: 'breakfastTime',
      label: 'Breakfast Time',
      placeholder: 'Enter breakfast time...',
    },
    {
      name: 'lunchTime',
      label: 'Lunch Time',
      placeholder: 'Enter lunch time...',
    },
    {
      name: 'dinnerTime',
      label: 'Dinner Time',
      placeholder: 'Enter dinner time...',
    },
    {
      name: 'supperTime',
      label: 'Supper Time',
      placeholder: 'Enter supper time...',
    },
    {
      name: 'brunchTime',
      label: 'Brunch Time',
      placeholder: 'Enter brunch time...',
    },
    {
      name: 'snackTime',
      label: 'Snack Time',
      placeholder: 'Enter snack time...',
    },
  ];

  return (
    <Fade in={true} timeout={400}>
      <div className='diet-details-content-container'>
        <Select
          label='Diet Type'
          selectedOption={dietType}
          options={dietTypeOptions}
          showOptions={showOptions}
          setShowOptions={() => setShowOptions(!showOptions)}
          selectOption={(e) => {
            setDietType(e.target.innerText);
            setShowOptions(false);
          }}
        />

        {dietType === 'Other' && (
          <Input
            fullWidth
            name='otherDietType'
            label='Please specify your diet type'
            placeholder='Enter your diet type...'
            size='small'
            value={otherDietType}
            onInput={(e) => setOtherDietType(e.target.value)}
          />
        )}

        <div>
          <h4 className='diet-details-input-header'>
            Favorite Cuisines <span className='mandatory'>*</span>{' '}
          </h4>
          <div className='diet-details-health-conditions-checkboxes-wrapper'>
            {cuisines.map((cuisine) => (
              <Checkbox
                key={cuisine.key}
                label={cuisine.key}
                checked={favoriteCuisines[cuisine.key]}
                onChange={() => {
                  setFavoriteCuisines((prev) => ({
                    ...prev,
                    [cuisine.key]: !prev[cuisine.key],
                  }));
                }}
              />
            ))}
          </div>
        </div>

        {favoriteCuisines.Other && (
          <Input
            mandatory
            fullWidth
            name='otherFavoriteCuisines'
            label='Please specify other favorite cuisines'
            placeholder='Enter your favorite cuisines...'
            size='small'
            value={otherFavoriteCuisines}
            onInput={(e) => setOtherFavoriteCuisines(e.target.value)}
          />
        )}

        <Input
          fullWidth
          name='other-favorite-cuisines'
          label='Please specify foods you hate or refuse to eat'
          placeholder='Enter your disliked foods...'
          size='small'
          value={dislikedFoods}
          onInput={(e) => setDislikedFoods(e.target.value)}
        />

        <div>
          <h4 className='diet-details-input-header'>Preferred Meal Times</h4>
          <div className='diet-details-health-conditions-checkboxes-wrapper'>
            {Inputs.map((input) => (
              <Input
                key={input.name}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                size='small'
                type='number'
              />
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default FoodPreferences;
