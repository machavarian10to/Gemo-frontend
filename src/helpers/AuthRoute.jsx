import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Authorization from '@/pages/Authorization';
import { setLogin, setLogout } from '@/state/index';
import PropTypes from 'prop-types';
import authService from '@/services/authService';
import i18n from 'i18next';

const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const language = useSelector((state) => state.language);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode || 'dark');
    i18n.changeLanguage(language || 'en');
  }, [mode, language]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(setLogin({ user: currentUser }));
        } else {
          dispatch(setLogout());
        }
      } catch (error) {
        dispatch(setLogout());
        console.log('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      // if (!user.dietDetails) {
      //   navigate('/diet-details');
      // }
      setLoading(false);
    }
  }, [user, dispatch, navigate]);

  if (loading) {
    return;
  }

  if (!user) {
    return <Authorization />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
