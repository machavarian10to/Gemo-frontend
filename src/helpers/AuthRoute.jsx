import { useSelector } from 'react-redux';
import Authorization from '@/pages/Authorization';
import PropTypes from 'prop-types';

const AuthRoute = ({ children }) => {
  const token = useSelector((state) => state.token);

  // TODO: make a request to the server to get the user data
  if (!token) {
    return <Authorization />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthRoute;
