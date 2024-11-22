import Header from '@/components/shared/Header';
import Sidebar from '@/components/shared/Sidebar/Main.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Header />

      <div className='outlet-wrapper'>
        <Sidebar />

        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
