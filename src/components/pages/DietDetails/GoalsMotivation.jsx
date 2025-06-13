import { useState } from 'react';
import Input from '@/components/UI/Input';
import Select from '@/components/UI/Select';
import { Fade } from '@mui/material';

function GoalsMotivation() {
  const [showPrimaryGoalOptions, setShowPrimaryGoalOptions] = useState(false);
  const [primaryGoal, setPrimaryGoal] = useState('Select your primary goal');
  const [otherPrimaryGoal, setOtherPrimaryGoal] = useState('');
  const [targetWeight, setOtherTargetWeight] = useState('');
  const [showGoalTimelineOptions, setShowGoalTimelineOptions] = useState(false);
  const [goalTimeline, setGoalTimeline] = useState('Select your goal timeline');
  const [otherGoalTimeline, setOtherGoalTimeline] = useState('');

  const goalTimelineOptions = [
    { id: '1_month', name: '1 Month' },
    { id: '3_months', name: '3 Months' },
    { id: '6_months', name: '6 Months' },
    { id: '1_year', name: '1 Year' },
    { id: 'more_than_1_year', name: 'More than 1 Year' },
    { id: 'no_specific_timeline', name: 'No Specific Timeline' },
    { id: 'other', name: 'Other' },
  ];

  const primaryGoalOptions = [
    { id: 'weight_loss', name: 'Weight Loss' },
    { id: 'muscle_gain', name: 'Muscle Gain' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'improve_endurance', name: 'Improve Endurance' },
    { id: 'overall_health', name: 'Overall Health' },
    { id: 'dont_have_goal', name: "I Don't Have a Specific Goal" },
    { id: 'other', name: 'Other' },
  ];

  return (
    <Fade in={true} timeout={400}>
      <div className='diet-details-content-container'>
        <Select
          label='Primary Goal'
          selectedOption={primaryGoal}
          options={primaryGoalOptions}
          showOptions={showPrimaryGoalOptions}
          setShowOptions={() =>
            setShowPrimaryGoalOptions(!showPrimaryGoalOptions)
          }
          selectOption={(e) => {
            setPrimaryGoal(e.target.innerText);
            setShowPrimaryGoalOptions(false);
          }}
        />

        {primaryGoal === 'Other' && (
          <Input
            fullWidth
            name='other-primary-goal'
            label='Please specify your primary goal'
            placeholder='Enter your primary goal...'
            size='small'
            value={otherPrimaryGoal}
            onInput={(e) => setOtherPrimaryGoal(e.target.value)}
          />
        )}

        <Input
          fullWidth
          name='target-weight'
          label='Target Weight'
          placeholder='Enter your target weight...'
          size='small'
          value={targetWeight}
          onInput={(e) => setOtherTargetWeight(e.target.value)}
        />

        <Select
          label='Goal Timeline'
          selectedOption={goalTimeline}
          options={goalTimelineOptions}
          showOptions={showGoalTimelineOptions}
          setShowOptions={() =>
            setShowGoalTimelineOptions(!showGoalTimelineOptions)
          }
          selectOption={(e) => {
            setGoalTimeline(e.target.innerText);
            setShowGoalTimelineOptions(false);
          }}
        />

        {goalTimeline === 'Other' && (
          <Input
            fullWidth
            name='other-goal-timeline'
            label='Please specify your goal timeline'
            placeholder='Enter your goal timeline...'
            size='small'
            value={otherGoalTimeline}
            onInput={(e) => setOtherGoalTimeline(e.target.value)}
          />
        )}
      </div>
    </Fade>
  );
}

export default GoalsMotivation;
