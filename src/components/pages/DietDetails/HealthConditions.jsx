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

  const [chronicConditions, setChronicConditions] = useState({
    diabetes: false,
    hypertension: false,
    'high cholesterol': false,
    'heart disease': false,
  });

  const [otherAllergy, setOtherAllergy] = useState('');
  const [otherIntolerance, setOtherIntolerance] = useState('');
  const [otherChronicCondition, setOtherChronicCondition] = useState('');
  const [medications, setMedications] = useState('');

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

  const chronicConditionsMap = [
    { key: 'diabetes' },
    { key: 'hypertension' },
    { key: 'high cholesterol' },
    { key: 'heart disease' },
    { key: 'other' },
  ];

  return (
    <Fade in={true} timeout={400}>
      <div className='diet-details-content-container'>
        <div>
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

        <div>
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

        <div>
          <h4 className='diet-details-input-header'>Chronic Conditions</h4>
          <div className='diet-details-health-conditions-checkboxes-wrapper'>
            {chronicConditionsMap.map((condition) => (
              <Checkbox
                key={condition.key}
                label={condition.key}
                checked={chronicConditions[condition.key]}
                onChange={() => {
                  setChronicConditions((prev) => ({
                    ...prev,
                    [condition.key]: !prev[condition.key],
                  }));
                }}
              />
            ))}
          </div>
        </div>

        {chronicConditions.other && (
          <textarea
            name='other-chronic-condition'
            className='diet-details-health-conditions-others-textarea'
            placeholder='Please specify other chronic conditions...'
            onChange={(e) => setOtherChronicCondition(e.target.value)}
            value={otherChronicCondition}
          />
        )}

        <div>
          <h4 className='diet-details-input-header'>Medications (if any)</h4>
          <textarea
            name='medications'
            className='diet-details-health-conditions-others-textarea'
            placeholder='Please specify any medications you are currently taking...'
            onChange={(e) => setMedications(e.target.value)}
            value={medications}
          />
        </div>
      </div>
    </Fade>
  );
}

export default HealthConditions;
