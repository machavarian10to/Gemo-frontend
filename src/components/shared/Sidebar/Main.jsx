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
            fontSize: '1.4rem',
            borderRadius: '50%',
            color: 'var(--color-main-grey)',
            backgroundColor: 'var(--bg-secondary-color)',
            rotate: isSidebarOpen ? '0deg' : '180deg',
          }}
        />
      </div>
    </div>
  );
}

export default SideBar;
