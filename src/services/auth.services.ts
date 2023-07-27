const baseUrl = 'http://localhost:3001/users';

export const getMorty = () => {
  return fetch(baseUrl).then(res => res.json());
};
