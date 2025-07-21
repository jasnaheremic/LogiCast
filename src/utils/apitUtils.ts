export const getHeaders = () => {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json charset=UTF-8',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};
