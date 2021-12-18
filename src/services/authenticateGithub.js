import generateAuthorization from '../utils/generateAuthorization';

const authenticateGithub = (username, personalToken) => {
  return fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: generateAuthorization(username, personalToken),
    },
  }).then(resp => resp.json());
};

export default authenticateGithub;
