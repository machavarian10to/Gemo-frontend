import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsIcon from '@mui/icons-material/Sms';
import SettingsIcon from '@mui/icons-material/Settings';
import GradeIcon from '@mui/icons-material/Grade';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';

function SideBar() {
  return (
    <div className='sidebar'>
      <span>Home</span>
      <span>Discussion</span>
      <span>Messages</span>
      <span>Notifications</span>
      <span>Saved</span>
      <span>Video</span>
      <span> Events</span>
      <span>Settings</span>
    </div>
  );
}

export default SideBar;
