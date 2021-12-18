import generateAuthorization from '../utils/generateAuthorization';

const authenticateGithub = (username, personalToken) => {
  const token = generateAuthorization(username, personalToken);
  return fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then(async resp => {
    const respJson = await resp.json();
    return {
      ...respJson,
      token,
    };
  });
};

export default authenticateGithub;
