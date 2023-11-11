import { useState } from 'react';
import Fade from '@mui/material/Fade';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function PollTabContent() {
  const [pollOptions, setPollOptions] = useState([
    {
      id: 1,
      value: '',
      placeholder: 'Option 1',
      deleteIcon: false,
    },
    {
      id: 2,
      value: '',
      placeholder: 'Option 2',
      deleteIcon: false,
    },
  ]);

  function onInput(e, optionId) {
    const updatedOptions = pollOptions.map((option) => {
      if (option.id === optionId) {
        return {
          ...option,
          value: e.target.value,
        };
      }
      return option;
    });
    setPollOptions(updatedOptions);
  }

  function addOption() {
    const newOption = {
      id: pollOptions.length + 1,
      value: '',
      placeholder: `Option ${pollOptions.length + 1}`,
      deleteIcon: true,
    };
    setPollOptions([...pollOptions, newOption]);
  }

  function deleteOption(optionId) {
    const updatedOptions = pollOptions.filter(
      (option) => option.id !== optionId,
    );
    setPollOptions(updatedOptions);
  }

  return (
    <div className='poll-container'>
      <Fade in={true} timeout={400}>
        <div className='poll'>
          <div className='poll-content'>
            {pollOptions.map((option) => (
              <div
                key={option.id}
                className='option-container'
                draggable='true'
              >
                <DragIndicatorIcon
                  style={{ color: '#333', cursor: 'pointer', opacity: '0.5' }}
                />
                <div className='option-wrapper'>
                  <Input
                    size='extra-small'
                    value={option.value}
                    name={option.placeholder}
                    placeholder={option.placeholder}
                    onInput={(e) => onInput(e, option.id)}
                  />
                </div>
                {option.deleteIcon && (
                  <HighlightOffIcon
                    onClick={() => deleteOption(option.id)}
                    style={{ color: '#333', cursor: 'pointer', opacity: '0.5' }}
                  />
                )}
              </div>
            ))}
          </div>
          <Button clickHandler={addOption} type='base' label='Add Option' />
        </div>
      </Fade>
    </div>
  );
}

export default PollTabContent;
