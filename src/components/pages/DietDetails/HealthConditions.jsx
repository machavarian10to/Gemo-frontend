import Checkbox from '@/components/UI/Checkbox';
import { Fade } from '@mui/material';
import { useState } from 'react';
import Input from '@/components/UI/Input';

function HealthConditions() {
  const [allergies, setAllergies] = useState({
    peanuts: false,
    milk: false,
    eggs: false,
    wheat: false,
    soy: false,
    fish: false,
    gluten: false,
    sesame: false,
    shellfish: false,
    corn: false,
    mustard: false,
    lupin: false,
    potato: false,
    tomato: false,
    peas: false,
  });

  const [intolerance, setIntolerance] = useState({
    lactose: false,
    gluten: false,
    fructose: false,
    histamine: false,
  });

  const [otherAllergy, setOtherAllergy] = useState('');
  const [otherIntolerance, setOtherIntolerance] = useState('');

  const allergyFoods = [
    { key: 'peanuts' },
    { key: 'milk' },
    { key: 'eggs' },
    { key: 'wheat' },
    { key: 'soy' },
    { key: 'fish' },
    { key: 'gluten' },
    { key: 'sesame' },
    { key: 'shellfish' },
    { key: 'corn' },
    { key: 'mustard' },
    { key: 'lupin' },
    { key: 'potato' },
    { key: 'tomato' },
    { key: 'peas' },
    { key: 'other' },
  ];

  const intoleranceFoods = [
    { key: 'lactose' },
    { key: 'gluten' },
    { key: 'fructose' },
    { key: 'histamine' },
    { key: 'other' },
  ];

  return (
    <Fade in={true} timeout={400}>
      <div className='diet-details-content-container'>
        <h4 className='diet-details-input-header'>Allergies</h4>
        <div className='diet-details-health-conditions-checkboxes-wrapper'>
          {allergyFoods.map((food) => (
            <Checkbox
              key={food.key}
              label={food.key}
              checked={allergies[food.key]}
              onChange={() => {
                setAllergies((prev) => ({
                  ...prev,
                  [food.key]: !prev[food.key],
                }));
              }}
            />
          ))}
        </div>

        {allergies.other && (
          <textarea
            name='other-allergy'
            className='diet-details-health-conditions-others-textarea'
            placeholder='Please specify other allergies...'
            onChange={(e) => setOtherAllergy(e.target.value)}
            value={otherAllergy}
          />
        )}

        <h4 className='diet-details-input-header'>Intolerance</h4>
        <div className='diet-details-health-conditions-checkboxes-wrapper'>
          {intoleranceFoods.map((food) => (
            <Checkbox
              key={food.key}
              label={food.key}
              checked={intolerance[food.key]}
              onChange={() => {
                setIntolerance((prev) => ({
                  ...prev,
                  [food.key]: !prev[food.key],
                }));
              }}
            />
          ))}
        </div>

        {intolerance.other && (
          <textarea
            name='other-intolerance'
            className='diet-details-health-conditions-others-textarea'
            placeholder='Please specify other intolerance...'
            onChange={(e) => setOtherIntolerance(e.target.value)}
            value={otherIntolerance}
          />
        )}
      </div>
    </Fade>
  );
}

export default HealthConditions;
