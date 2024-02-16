const baseUrl = 'http://localhost:4000/login';

export const getRolUser = (codigo, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      codigo: codigo,
      password: password,
    }),
  };

  return fetch(baseUrl, requestOptions).then(res => res.json());
};
