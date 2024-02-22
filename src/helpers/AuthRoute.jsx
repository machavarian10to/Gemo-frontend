import { useSelector } from 'react-redux';
import Authorization from '@/pages/Authorization';
import PropTypes from 'prop-types';

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Authorization />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthRoute;
