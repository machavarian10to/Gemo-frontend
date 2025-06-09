import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import RadioButton from '@/components/UI/RadioButton';
import { Fade } from '@mui/material';
import { useState } from 'react';
import AlertBox from '@/components/UI/AlertBox';

function BasicInformation() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [alert, setAlert] = useState({ message: '' });
  const [location, setLocation] = useState('');

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
        setLocation(data.display_name);
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
            value={age}
            label='Age'
            placeholder='Enter your age...'
            size='small'
            type='number'
            mandatory
            onInput={(e) => setAge(e.target.value)}
          />

          <div>
            <h4 className='diet-details-input-header'>
              Gender <span className='mandatory'> *</span>
            </h4>
            <div className='basic-information-radio-wrapper'>
              <RadioButton
                label='Male'
                value='Male'
                checked={gender === 'Male'}
                onChange={() => setGender('Male')}
              />
              <RadioButton
                label='Female'
                value='Female'
                checked={gender === 'Female'}
                onChange={() => setGender('Female')}
              />
              <RadioButton
                label='Other'
                value='Other'
                checked={gender === 'Other'}
                onChange={() => setGender('Other')}
              />
            </div>
          </div>

          <div>
            <h4 className='diet-details-input-header'>Location</h4>

            {location ? (
              <>
                <div className='basic-information-location'>{location}</div>
                <Button
                  clickHandler={() => setLocation('')}
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

export default BasicInformation;
