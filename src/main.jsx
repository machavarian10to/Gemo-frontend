import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App.jsx';
import Authorization from '@/pages/Authorization';
import UserHome from '@/pages/UserHome';
import DiscussionPage from '@/pages/DiscussionPage';
import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <UserHome />,
      },
      {
        path: 'discussion',
        element: <DiscussionPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Authorization />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
