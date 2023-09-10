import SideBar from '@/components/SideBar';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='app'>
      <SideBar />
      <div className='outlet'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
