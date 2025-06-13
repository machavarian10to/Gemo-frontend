import { useState } from 'react';
import Input from '@/components/UI/Input';
import Checkbox from '@/components/UI/Checkbox';
import Select from '@/components/UI/Select';
import { Fade } from '@mui/material';

function ActivityTracking() {
  const [stepCount, setStepCount] = useState('');
  const [showGymWorkoutOptions, setShowGymWorkoutOptions] = useState(false);
  const [gymWorkoutFrequency, setGymWorkoutFrequency] = useState(
    'Select your gym workout frequency',
  );
  const [exerciseType, setExerciseType] = useState({
    Cardio: false,
    Strength: false,
    Flexibility: false,
    Balance: false,
    'High Intensity': false,
    'Low Intensity': false,
    Other: false,
  });
  const [otherExerciseType, setOtherExerciseType] = useState('');

  const exerciseTypesOptions = [
    { key: 'Cardio' },
    { key: 'Strength' },
    { key: 'Flexibility' },
    { key: 'Balance' },
    { key: 'High Intensity' },
    { key: 'Low Intensity' },
    { key: 'Other' },
  ];

  const gymWorkoutOptions = [
    { id: '1-2', name: '1-2 times a week' },
    { id: '3-4', name: '3-4 times a week' },
    { id: '5+', name: '5 or more times a week' },
    { id: 'never', name: 'I do not go to the gym' },
  ];

  return (
    <Fade in={true} timeout={400}>
      <div className='diet-details-content-container'>
        <Input
          type='number'
          name='step-count'
          label='Please enter your daily step count'
          placeholder='Enter your daily step count...'
          size='small'
          value={stepCount}
          onInput={(e) => setStepCount(e.target.value)}
        />

        <Select
          label='Gym Workout Frequency'
          selectedOption={gymWorkoutFrequency}
          options={gymWorkoutOptions}
          showOptions={showGymWorkoutOptions}
          setShowOptions={() =>
            setShowGymWorkoutOptions(!showGymWorkoutOptions)
          }
          selectOption={(e) => {
            setGymWorkoutFrequency(e.target.innerText);
            setShowGymWorkoutOptions(false);
          }}
        />

        <div>
          <h4 className='diet-details-input-header'>Type of Exercise</h4>
          <div className='diet-details-health-conditions-checkboxes-wrapper'>
            {exerciseTypesOptions.map((exercise) => (
              <Checkbox
                key={exercise.key}
                label={exercise.key}
                checked={exerciseType[exercise.key]}
                onChange={() => {
                  setExerciseType((prev) => ({
                    ...prev,
                    [exercise.key]: !prev[exercise.key],
                  }));
                }}
              />
            ))}
          </div>
        </div>

        {exerciseType.Other && (
          <Input
            fullWidth
            name='otherExerciseType'
            label='Please specify other types of exercise'
            placeholder='Enter your exercise type...'
            size='small'
            value={otherExerciseType}
            onInput={(e) => setOtherExerciseType(e.target.value)}
          />
        )}
      </div>
    </Fade>
  );
}

export default ActivityTracking;
