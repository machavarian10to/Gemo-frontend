import Header from '@/components/shared/Header';
import Sidebar from '@/components/shared/Sidebar/Main.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function App() {
  const mode = useSelector((state) => state.mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

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
