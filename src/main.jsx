import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App.jsx';
import '@/index.css';
import UserHome from '@/pages/UserHome';
import DiscussionPage from '@/pages/DiscussionPage';
import EmailVerification from '@/components/pages/Authorization/EmailVerification';
import GoogleCallback from '@/components/pages/Authorization/GoogleCallback';
import ResetPassword from '@/components/pages/Authorization/ResetPassword';
import authReducer from '@/state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AuthRoute from '@/helpers/AuthRoute';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <App />
      </AuthRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <AuthRoute>
            <UserHome />
          </AuthRoute>
        ),
      },
      {
        path: 'discussion',
        element: (
          <AuthRoute>
            <DiscussionPage />
          </AuthRoute>
        ),
      },
    ],
  },
  {
    path: '/email-verify',
    element: <EmailVerification />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/google/callback',
    element: <GoogleCallback />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
);
