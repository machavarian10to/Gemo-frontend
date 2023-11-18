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

  const [pollDuration, setPollDuration] = useState({
    selectedOption: '3 days',
    showOptions: false,
    options: [
      {
        id: useId(),
        name: '1 Day',
      },
      {
        id: useId(),
        name: '2 Days',
      },
      {
        id: useId(),
        name: '3 Days',
        selected: true,
      },
      {
        id: useId(),
        name: '4 Days',
      },
      {
        id: useId(),
        name: '5 Days',
      },
    ],
  });

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

  function selectDuration(e) {
    const updatedOptions = pollDuration.options.map((option) => {
      if (option.name === e.target.innerText) {
        return {
          ...option,
          selected: true,
        };
      }
      return {
        ...option,
        selected: false,
      };
    });
    setPollDuration((prev) => ({
      ...prev,
      selectedOption: e.target.innerText,
      showOptions: false,
      options: updatedOptions,
    }));
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
            <div className='button-component-wrapper'>
              <Button clickHandler={addOption} type='base' label='Add Option' />
            </div>
            <div className='select-component-wrapper'>
              <Select
                label='Poll duration'
                selectedOption={pollDuration.selectedOption}
                options={pollDuration.options}
                showOptions={pollDuration.showOptions}
                selectOption={selectDuration}
                setShowOptions={() =>
                  setPollDuration((prev) => ({
                    ...prev,
                    showOptions: !prev.showOptions,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default PollTabContent;
