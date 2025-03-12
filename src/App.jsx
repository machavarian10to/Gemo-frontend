import Header from '@/components/shared/Header';
import Sidebar from '@/components/shared/Sidebar/Main.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import i18n from 'i18next';

function App() {
  const currentMode = useSelector((state) => state.mode);
  const currentLanguage = useSelector((state) => state.language);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentMode);
  }, [currentMode]);

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <div className='app'>
      <Header />

      <div className='outlet-wrapper'>
        <Sidebar />
        <div className='sidebar-container' />

        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
