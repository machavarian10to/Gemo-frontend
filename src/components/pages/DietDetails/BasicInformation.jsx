import Input from '@/components/UI/Input';
import { Fade } from '@mui/material';

function BasicInformation() {
  return (
    <Fade in={true} timeout={400}>
      <div className='basic-information-container diet-details-content-container'>
        <Input
          name='age'
          value=''
          label='Age'
          placeholder='Enter your age...'
          size='small'
        />
      </div>
    </Fade>
  );
}

export default BasicInformation;
