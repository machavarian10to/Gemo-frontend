import { useState } from 'react';
import Input from '@/components/UI/Input';
import RadioButton from '@/components/UI/RadioButton';
import { Fade } from '@mui/material';

function LifestyleHabits() {
  const [sleepHoursFrom, setSleepHoursFrom] = useState('');
  const [sleepHoursTo, setSleepHoursTo] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [mealFrequency, setMealFrequency] = useState('');
  const [snackingHabits, setSnackingHabits] = useState('');

  const mealFrequencyOptions = ['1', '2', '3', '4', '4+'];

  return (
    <Fade in={true} timeout={400}>
      <div className='diet-details-content-container'>
        <div className='diet-details-sleep-hours-container'>
          <Input
            mandatory
            type='number'
            name='sleep-hours-from'
            label='Sleep Hours (From)'
            placeholder='Enter your sleep hours from...'
            size='small'
            value={sleepHoursFrom}
            onInput={(e) => setSleepHoursFrom(e.target.value)}
          />

          <Input
            mandatory
            type='number'
            name='sleep-hours-to'
            label='Sleep Hours (To)'
            placeholder='Enter your sleep hours to...'
            size='small'
            value={sleepHoursTo}
            onInput={(e) => setSleepHoursTo(e.target.value)}
          />
        </div>

        <Input
          mandatory
          type='number'
          name='water-intake'
          label='Water Intake (liters/day)	'
          placeholder='Enter your water intake in liters...'
          size='small'
          value={waterIntake}
          onInput={(e) => setWaterIntake(e.target.value)}
        />

        <div>
          <h4 className='diet-details-input-header'>
            Meal Frequency (Day)<span className='mandatory'> *</span>
          </h4>
          <div className='diet-information-radio-wrapper'>
            {mealFrequencyOptions.map((option) => (
              <RadioButton
                key={option}
                label={`${option} meal${option > 1 ? 's' : ''}`}
                value={option}
                checked={mealFrequency === option}
                onChange={() => setMealFrequency(option)}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className='diet-details-input-header'>Snacking Habits</h4>
          <div className='diet-information-radio-wrapper'>
            <RadioButton
              label='Frequent'
              value='frequent'
              checked={snackingHabits === 'frequent'}
              onChange={() => setSnackingHabits('frequent')}
            />
            <RadioButton
              label='Occasional'
              value='occasional'
              checked={snackingHabits === 'occasional'}
              onChange={() => setSnackingHabits('occasional')}
            />
            <RadioButton
              label='Rarely'
              value='rarely'
              checked={snackingHabits === 'rarely'}
              onChange={() => setSnackingHabits('rarely')}
            />
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default LifestyleHabits;
