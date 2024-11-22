import Header from '@/components/shared/Header';
import SideBar from '@/components/shared/SideBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Header />

      <div className='outlet-wrapper'>
        <SideBar />

        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
