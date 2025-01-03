import { useState } from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@mui/material';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from 'axios';
import AlertBox from '@/components/UI/AlertBox';
import { useTranslation } from 'react-i18next';

function ForgetPassword({ setCurrentTab }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const { t } = useTranslation();

  function isValidEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function checkEmail() {
    if (!email.trim()) {
      setEmailError(t('authorization.empty_email'));
      return false;
    }
    if (!isValidEmail()) {
      setEmailError(t('authorization.invalid_email'));
      return false;
    }
    setEmailError('');
    return true;
  }

  function onSendInstructions(e) {
    e.preventDefault();

    if (!checkEmail()) return;

    setIsButtonDisabled(true);
    setAlert({ message: '', type: '' });

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/forget-password`, { email })
      .then((res) => {
        setAlert({
          message: res.data.message,
          type: 'success',
        });
        setEmail('');
      })
      .catch((error) => {
        setAlert({
          message: error.response.data.message,
          type: 'error',
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  }

  function onEmailInput(e) {
    setEmail(e.target.value);
    if (emailError) {
      checkEmail();
    }
  }

  return (
    <Fade in={true} timeout={1000}>
      <form onSubmit={onSendInstructions}>
        <h5>{t('authorization.send_instructions')}</h5>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            label={t('authorization.email')}
            onInput={onEmailInput}
            onBlur={checkEmail}
            value={email}
            state={
              isButtonDisabled ? 'inactive' : emailError ? 'danger' : 'active'
            }
            helperText={emailError}
            placeholder={t('authorization.email_placeholder')}
            leftIcon={
              <EmailOutlinedIcon
                style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
              />
            }
          />
          <Button
            submit
            label={t('authorization.send_instructions_btn')}
            clickHandler={onSendInstructions}
            state={isButtonDisabled ? 'inactive' : 'active'}
          />
          <div className='user-home__auth-footer'>
            <span>{t('authorization.back_to')}</span>
            <span className='link' onClick={() => setCurrentTab('login')}>
              {t('authorization.login')}
            </span>
          </div>
        </div>
        {alert.message && (
          <AlertBox message={alert.message} type={alert.type} />
        )}
      </form>
    </Fade>
  );
}

ForgetPassword.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default ForgetPassword;
