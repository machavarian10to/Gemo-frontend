import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import RadioButton from '@/components/UI/RadioButton';
import { Fade } from '@mui/material';
import { useState } from 'react';
import AlertBox from '@/components/UI/AlertBox';
import PropTypes from 'prop-types';

function BasicInformation({ state, setState }) {
  const [alert, setAlert] = useState({ message: '' });

  function onLocationRequest() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          setAlert({
            message: `Error getting location - ${error.message}!
            Please enable location services from your browser.`,
          });
        },
      );
    } else {
      setAlert({
        message: 'Geolocation is not supported by this browser.',
      });
    }

    setTimeout(() => {
      setAlert({ message: '' });
    }, 3000);
  }

  function getAddressFromCoordinates(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          location: data.display_name,
        }));
      })
      .catch((error) => {
        setAlert({
          message: 'Error fetching address: ' + error.message,
        });
      });

    setTimeout(() => {
      setAlert({ message: '' });
    }, 3000);
  }

  return (
    <>
      {alert.message && <AlertBox message={alert.message} type='error' />}

      <Fade in={true} timeout={400}>
        <div className='diet-details-content-container'>
          <Input
            name='age'
            value={state.age}
            label='Age'
            placeholder='Enter your age...'
            size='small'
            type='number'
            mandatory
            onInput={(e) =>
              setState((prevState) => ({
                ...prevState,
                age: e.target.value,
              }))
            }
          />

          <div>
            <h4 className='diet-details-input-header'>
              Gender <span className='mandatory'> *</span>
            </h4>
            <div className='diet-information-radio-wrapper'>
              <RadioButton
                label='Male'
                value='Male'
                checked={state.gender === 'Male'}
                onChange={() => {
                  setState((prevState) => ({
                    ...prevState,
                    gender: 'Male',
                  }));
                }}
              />
              <RadioButton
                label='Female'
                value='Female'
                checked={state.gender === 'Female'}
                onChange={() => {
                  setState((prevState) => ({
                    ...prevState,
                    gender: 'Female',
                  }));
                }}
              />
              <RadioButton
                label='Other'
                value='Other'
                checked={state.gender === 'Other'}
                onChange={() => {
                  setState((prevState) => ({
                    ...prevState,
                    gender: 'Other',
                  }));
                }}
              />
            </div>
          </div>

          <div>
            <h4 className='diet-details-input-header'>Location</h4>

            {state.location ? (
              <>
                <div className='basic-information-location'>
                  {state.location}
                </div>
                <Button
                  clickHandler={() => {
                    setState((prevState) => ({
                      ...prevState,
                      location: '',
                    }));
                  }}
                  label='Clear location'
                  type='base'
                />
              </>
            ) : (
              <Button
                clickHandler={onLocationRequest}
                label='Request location access'
                type='base'
              />
            )}
          </div>
        </div>
      </Fade>
    </>
  );
}

BasicInformation.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
};

export default BasicInformation;
