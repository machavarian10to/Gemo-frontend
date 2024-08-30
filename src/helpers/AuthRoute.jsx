import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Authorization from '@/pages/Authorization';
import { setLogin, setLogout } from '@/state/index';
import PropTypes from 'prop-types';
import authService from '@/services/authService';

const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(setLogin({ user: currentUser }));
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
      setLoading(false);
    }
  }, [user, dispatch]);

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
