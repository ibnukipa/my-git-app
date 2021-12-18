import * as Base64 from 'base-64';

const generateAuthorization = (username, password) => {
  return `Basic ${Base64.encode(`${username}:${password}`)}`;
};

export default generateAuthorization;
