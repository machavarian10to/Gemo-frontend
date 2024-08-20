import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Authorization from '@/pages/Authorization';
import { setLogin } from '@/state/index';
import PropTypes from 'prop-types';
import authService from '@/services/authService';

const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        const token = authService.getToken('accessToken');

        if (currentUser) {
          dispatch(setLogin({ user: currentUser, token }));
        }
      } catch (error) {
        console.log('Failed to fetch user', error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, dispatch]);

  if (!user) {
    return <Authorization />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
