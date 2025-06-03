import Input from '@/components/UI/Input';
import RadioButton from '@/components/UI/RadioButton';
import { Fade } from '@mui/material';
import { useState } from 'react';

function BasicInformation() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  return (
    <Fade in={true} timeout={400}>
      <div className='diet-details-content-container'>
        <Input
          name='age'
          value={age}
          label='Age'
          placeholder='Enter your age...'
          size='small'
          type='number'
          onInput={(e) => setAge(e.target.value)}
        />

        <h4 className='basic-information-gender-header'>Gender</h4>
        <div className='basic-information-radio-wrapper'>
          <RadioButton
            label='Male'
            value='Male'
            checked={gender === 'Male'}
            onChange={() => setGender('Male')}
          />
          <RadioButton
            label='Female'
            value='Female'
            checked={gender === 'Female'}
            onChange={() => setGender('Female')}
          />
        </div>
      </div>
    </Fade>
  );
}

export default BasicInformation;
