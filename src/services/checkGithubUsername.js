const checkGithubUsername = username => {
  return fetch(`https://api.github.com/users/${username}`).then(resp =>
    resp.json(),
  );
};

export default checkGithubUsername;
