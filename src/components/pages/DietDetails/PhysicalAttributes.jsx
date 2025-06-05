import { useState } from 'react';
import Input from '@/components/UI/Input';
import RadioButton from '@/components/UI/RadioButton';
import Select from '@/components/UI/Select';
import { Fade } from '@mui/material';

function PhysicalAttributes() {
  const [weight, setWeight] = useState('kg');
  const [height, setHeight] = useState('cm');
  const [bodyType, setBodyType] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    'Select your activity level',
  );

  return (
    <Fade in={true} timeout={400}>
      <div className='diet-details-content-container'>
        <div className='diet-details-physical-attributes-attributes-wrapper'>
          <Input
            fullWidth
            mandatory
            type='number'
            name='weight'
            label='Weight'
            placeholder='Enter your weight...'
            size='small'
            value={weight}
            onInput={(e) => setWeight(e.target.value)}
          />

          <div className='diet-details-physical-radio-wrapper'>
            <RadioButton
              label='kg'
              value='kg'
              checked={weight === 'kg'}
              onChange={() => setWeight('kg')}
            />
            <RadioButton
              label='lb'
              value='lb'
              checked={weight === 'lb'}
              onChange={() => setWeight('lb')}
            />
          </div>
        </div>

        <div className='diet-details-physical-attributes-attributes-wrapper'>
          <Input
            fullWidth
            mandatory
            type='number'
            name='height'
            label='Height'
            placeholder='Enter your height...'
            size='small'
            value={height}
            onInput={(e) => setHeight(e.target.value)}
          />

          <div className='diet-details-physical-radio-wrapper'>
            <RadioButton
              label='cm'
              value='cm'
              checked={height === 'cm'}
              onChange={() => setHeight('cm')}
            />
            <RadioButton
              label='ft'
              value='ft'
              checked={height === 'ft'}
              onChange={() => setHeight('ft')}
            />
          </div>
        </div>

        <div>
          <h4 className='diet-details-input-header'>
            Body type <span className='mandatory'> *</span>
          </h4>
          <div className='basic-information-radio-wrapper'>
            <RadioButton
              label='Ectomorph'
              value='Ectomorph'
              checked={bodyType === 'Ectomorph'}
              onChange={() => setBodyType('Ectomorph')}
            />
            <RadioButton
              label='Mesomorph'
              value='Mesomorph'
              checked={bodyType === 'Mesomorph'}
              onChange={() => setBodyType('Mesomorph')}
            />
            <RadioButton
              label='Endomorph'
              value='Endomorph'
              checked={bodyType === 'Endomorph'}
              onChange={() => setBodyType('Endomorph')}
            />
          </div>
        </div>

        <div>
          <Select
            selectedOption={selectedActivityLevel}
            options={[
              { id: 'sedentary', name: 'Sedentary (little or no exercise)' },
              {
                id: 'lightly_active',
                name: 'Lightly active (light exercise/sports 1-3 days a week)',
              },
              {
                id: 'moderately_active',
                name: 'Moderately active (moderate exercise/sports 3-5 days a week)',
              },
              {
                id: 'very_active',
                name: 'Very active (hard exercise/sports 6-7 days a week)',
              },
              {
                id: 'extra_active',
                name: 'Extra active (very hard exercise/sports & physical job or training twice a day)',
              },
            ]}
            showOptions={showOptions}
            setShowOptions={() => setShowOptions(!showOptions)}
            selectOption={(e) => {
              console.log('Selected activity level:', e.target.innerText);
              setSelectedActivityLevel(e.target.innerText);
              setShowOptions(false);
            }}
          />
        </div>
      </div>
    </Fade>
  );
}

export default PhysicalAttributes;
