import { useState } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@/state/index';

function Translator() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);

  const [showOptions, setShowOptions] = useState(false);
  const [chosenLanguage, setChosenLanguage] = useState(language);

  function onTranslateClick(e) {
    e.stopPropagation();
    setShowOptions(!showOptions);
  }

  function onChooseLanguage(language) {
    dispatch(setLanguage(language));
    setChosenLanguage(language);
    setShowOptions(false);
  }

  return (
    <>
      <div
        className={`header-options-item ${showOptions ? 'active' : ''}`}
        onClick={onTranslateClick}
      >
        <TranslateIcon
          style={{
            fontSize: '22px',
            color: 'var(--color-main-yellow)',
          }}
        />
        <span>{chosenLanguage}</span>
        <ArrowDropDownOutlinedIcon
          style={{
            fontSize: '22px',
            color: 'var(--color-main-yellow)',
            transform: showOptions ? 'rotate(180deg)' : 'rotate(0)',
          }}
        />
      </div>

      {showOptions && (
        <Fade timeout={500} in={true}>
          <div
            className='language-options'
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className='language-option'
              onClick={() => onChooseLanguage('ქართული')}
            >
              <span className='fi fi-ge'></span>
              <span>ქართული</span>
            </div>
            <div
              className='language-option'
              onClick={() => onChooseLanguage('English')}
            >
              <span className='fi fi-gb'></span>
              <span>English</span>
            </div>
            <div
              className='language-option'
              onClick={() => onChooseLanguage('Spanish')}
            >
              <span className='fi fi-es'></span>
              <span>Spanish</span>
            </div>
          </div>
        </Fade>
      )}
    </>
  );
}

export default Translator;
