import { useState } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@/state/index';
import { useTranslation } from 'react-i18next';

function Translator() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const language = useSelector((state) => state.language);

  const [showOptions, setShowOptions] = useState(false);
  const [chosenLanguage, setChosenLanguage] = useState(language);

  function onTranslateClick(e) {
    e.stopPropagation();
    setShowOptions(!showOptions);
  }

  function onChangeLanguage(language) {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language);
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
        <span>
          {chosenLanguage === 'ka'
            ? 'ქართული'
            : chosenLanguage === 'en'
            ? 'English'
            : chosenLanguage === 'ru'
            ? 'Русский'
            : 'Español'}
        </span>
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
              onClick={() => onChangeLanguage('ka')}
            >
              <span className='fi fi-ge'></span>
              <span>ქართული</span>
            </div>
            <div
              className='language-option'
              onClick={() => onChangeLanguage('en')}
            >
              <span className='fi fi-gb'></span>
              <span>English</span>
            </div>
            <div
              className='language-option'
              onClick={() => onChangeLanguage('ru')}
            >
              <span className='fi fi-ru'></span>
              <span>Русский</span>
            </div>
            <div
              className='language-option'
              onClick={() => onChangeLanguage('es')}
            >
              <span className='fi fi-es'></span>
              <span>Español</span>
            </div>
          </div>
        </Fade>
      )}
    </>
  );
}

export default Translator;
