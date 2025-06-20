import { useRef } from 'react';
import Fade from '@mui/material/Fade';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Select from '@/components/UI/Select';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@/components/UI/Checkbox';
import PropTypes from 'prop-types';
import generateId from '@/helpers/generateId';
import { useTranslation } from 'react-i18next';

function TabContentPoll({ pollTabState, setPollTabState }) {
  const draggedOption = useRef(null);
  const draggedOverOption = useRef(null);

  const { t } = useTranslation();

  function onMultipleOptionCheck(e) {
    setPollTabState((prev) => ({
      ...prev,
      multipleSelection: e.target.checked,
    }));
  }

  function onHidePeopleVotes(e) {
    setPollTabState((prev) => ({
      ...prev,
      hidePeoplesVotes: e.target.checked,
    }));
  }

  function onUsersCanAddOptions(e) {
    setPollTabState((prev) => ({
      ...prev,
      usersCanAddOptions: e.target.checked,
    }));
  }

  function onInput(e, optionId) {
    const updatedOptions = pollTabState.pollOptions.map((option) => {
      if (option.id === optionId) {
        return {
          ...option,
          value: e.target.value,
        };
      }
      return option;
    });
    setPollTabState((prev) => ({
      ...prev,
      pollOptions: updatedOptions,
    }));
  }

  function addOption() {
    const newOption = {
      id: generateId(),
      value: '',
      placeholder: `${t('option')} ${pollTabState.pollOptions.length + 1}`,
      deleteIcon: true,
    };
    setPollTabState((prev) => ({
      ...prev,
      pollOptions: [...prev.pollOptions, newOption],
    }));
  }

  function deleteOption(optionId) {
    const updatedOptions = pollTabState.pollOptions.filter(
      (option) => option.id !== optionId,
    );
    const sortedOptions = handleSort(updatedOptions);
    setPollTabState((prev) => ({
      ...prev,
      pollOptions: sortedOptions,
    }));
  }

  function handleSort(options) {
    const clonedOptions = [...options];
    clonedOptions.forEach((option, index) => {
      if (index > 0) {
        option.deleteIcon = true;
      } else {
        option.deleteIcon = false;
      }
      option.placeholder = `${t('option')} ${index + 1}`;
    });
    return clonedOptions;
  }

  function onDragStart(e, optionId) {
    draggedOption.current = optionId;
    e.target.style.opacity = '0.25';
  }

  function onDragEnter(optionId) {
    draggedOverOption.current = optionId;
    const draggedOptionIndex = pollTabState.pollOptions.findIndex(
      (option) => option.id === draggedOption.current,
    );
    const draggedOverOptionIndex = pollTabState.pollOptions.findIndex(
      (option) => option.id === draggedOverOption.current,
    );
    const updatedOptions = [...pollTabState.pollOptions];
    updatedOptions[draggedOptionIndex] =
      pollTabState.pollOptions[draggedOverOptionIndex];
    updatedOptions[draggedOverOptionIndex] =
      pollTabState.pollOptions[draggedOptionIndex];
    const sortedOptions = handleSort(updatedOptions);
    setPollTabState((prev) => ({
      ...prev,
      pollOptions: sortedOptions,
    }));
  }

  function onDragEnd(e) {
    e.target.style.opacity = '1';
  }

  function selectDuration(e) {
    const updatedOptions = pollTabState.pollDurations.options.map((option) => {
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
    setPollTabState((prev) => ({
      ...prev,
      pollDurations: {
        ...prev.pollDurations,
        selectedDuration: e.target.innerText,
        showDurations: false,
        options: updatedOptions,
      },
    }));
  }

  return (
    <div className='poll-container'>
      <Fade in={true} timeout={400}>
        <div className='poll'>
          <div className='poll-content'>
            {pollTabState.pollOptions.map((option) => (
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
                  style={{
                    color: 'var(--text-main-color)',
                    cursor: 'pointer',
                    opacity: '0.5',
                  }}
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
                    style={{
                      color: 'var(--color-grey)',
                      cursor: 'pointer',
                      opacity: '0.5',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className='poll-footer'>
            <div className='button-component-wrapper'>
              <Button
                clickHandler={addOption}
                type='base'
                label={t('add_option')}
              />
            </div>
            <div className='select-component-wrapper'>
              <div className='poll-tab-content-multi-select'>
                <Checkbox
                  checked={pollTabState.multipleSelection}
                  label={t('gem.poll_checkboxes.multiple')}
                  onChange={onMultipleOptionCheck}
                />
                <Checkbox
                  checked={pollTabState.usersCanAddOptions}
                  label={t('gem.poll_checkboxes.allow_add')}
                  onChange={onUsersCanAddOptions}
                />
                <Checkbox
                  checked={pollTabState.hidePeoplesVotes}
                  label={t('gem.poll_checkboxes.hide_votes')}
                  onChange={onHidePeopleVotes}
                />
              </div>

              <Select
                label={t('gem.poll_duration')}
                selectedOption={pollTabState.pollDurations.selectedDuration}
                options={pollTabState.pollDurations.options}
                showOptions={pollTabState.pollDurations.showDurations}
                selectOption={selectDuration}
                setShowOptions={() =>
                  setPollTabState((prev) => ({
                    ...prev,
                    pollDurations: {
                      ...prev.pollDurations,
                      showDurations: !prev.pollDurations.showDurations,
                    },
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

TabContentPoll.propTypes = {
  pollTabState: PropTypes.object.isRequired,
  setPollTabState: PropTypes.func.isRequired,
};

export default TabContentPoll;
