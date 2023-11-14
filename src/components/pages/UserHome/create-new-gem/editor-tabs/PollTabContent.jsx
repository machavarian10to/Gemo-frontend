import { useId, useRef, useState } from 'react';
import Fade from '@mui/material/Fade';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Select from '@/components/UI/Select';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function PollTabContent() {
  const [pollOptions, setPollOptions] = useState([
    {
      id: useId(),
      value: '',
      placeholder: 'Option 1',
      deleteIcon: false,
    },
    {
      id: useId(),
      value: '',
      placeholder: 'Option 2',
      deleteIcon: false,
    },
  ]);

  const [requiredDays, setRequiredDays] = useState([
    {
      id: useId(),
      name: 'Day 1',
    },
    {
      id: useId(),
      name: 'Day 2',
    },
    {
      id: useId(),
      name: 'Day 3',
    },
    {
      id: useId(),
      name: 'Day 4',
    },
    {
      id: useId(),
      name: 'Day 5',
    },
  ]);

  const draggedOption = useRef(null);
  const draggedOverOption = useRef(null);

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

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
      id: generateId(),
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
    const sortedOptions = handleSort(updatedOptions);
    setPollOptions(sortedOptions);
  }

  function handleSort(options) {
    const clonedOptions = [...options];
    clonedOptions.forEach((option, index) => {
      if (index > 1) {
        option.deleteIcon = true;
      } else {
        option.deleteIcon = false;
      }
      option.placeholder = `Option ${index + 1}`;
    });
    return clonedOptions;
  }

  function onDragStart(e, optionId) {
    draggedOption.current = optionId;
    e.target.style.opacity = '0.25';
  }

  function onDragEnter(optionId) {
    draggedOverOption.current = optionId;
    const draggedOptionIndex = pollOptions.findIndex(
      (option) => option.id === draggedOption.current,
    );
    const draggedOverOptionIndex = pollOptions.findIndex(
      (option) => option.id === draggedOverOption.current,
    );
    const updatedOptions = [...pollOptions];
    updatedOptions[draggedOptionIndex] = pollOptions[draggedOverOptionIndex];
    updatedOptions[draggedOverOptionIndex] = pollOptions[draggedOptionIndex];
    const sortedOptions = handleSort(updatedOptions);
    setPollOptions(sortedOptions);
  }

  function onDragEnd(e) {
    e.target.style.opacity = '1';
  }

  return (
    <div className='poll-container'>
      <Fade in={true} timeout={400}>
        <div className='poll'>
          <div className='poll-content'>
            {pollOptions.map((option) => (
              <div
                draggable
                className='option-container'
                key={option.id}
                onDragStart={(e) => onDragStart(e, option.id)}
                onDragEnter={() => onDragEnter(option.id)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={onDragEnd}
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
          <div className='poll-footer'>
            <Button clickHandler={addOption} type='base' label='Add Option' />

            <div className='select-component-wrapper'>
              <Select
                label='Poll duration'
                defaultValue='2 days'
                options={requiredDays}
              />
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default PollTabContent;
