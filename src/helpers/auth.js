export const checkUserAuth = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};
