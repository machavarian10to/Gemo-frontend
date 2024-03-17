import { useSelector, useDispatch } from 'react-redux';
import Authorization from '@/pages/Authorization';
import { setLogin } from '@/state/index';
import PropTypes from 'prop-types';

const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!user) {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      dispatch(setLogin({ user: JSON.parse(storedUser), token: storedToken }));
      localStorage.removeItem('user');
    } else {
      return <Authorization />;
    }
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthRoute;
