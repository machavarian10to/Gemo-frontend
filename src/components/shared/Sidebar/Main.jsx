import OpenedSidebar from '@/components/shared/Sidebar/OpenedSidebar';
import ClosedSidebar from '@/components/shared/Sidebar/ClosedSidebar';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useState } from 'react';

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    localStorage.getItem('sidebar') === 'open',
  );

  const onSidebarToggle = () => {
    setIsSidebarOpen((prev) => {
      localStorage.setItem('sidebar', prev ? 'closed' : 'open');
      return !prev;
    });
  };

  return (
    <div className={`sidebar ${!isSidebarOpen ? 'closed-sidebar' : ''}`}>
      {isSidebarOpen ? <OpenedSidebar /> : <ClosedSidebar />}

      <div className='sidebar-toggle' onClick={onSidebarToggle}>
        <KeyboardArrowLeftOutlinedIcon
          style={{
            fontSize: '1.1rem',
            borderRadius: '50%',
            border: '1px solid var(--color-grey)',
            color: 'var(--color-grey)',
            backgroundColor: '#fff',
            rotate: isSidebarOpen ? '0deg' : '180deg',
            transition: 'all 0.3s ease',
            boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    </div>
  );
}

export default SideBar;
