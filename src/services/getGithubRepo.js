const getGithubRepo = ({repoOwner, repoSlug, token}) => {
  return fetch(`https://api.github.com/repos/${repoOwner}/${repoSlug}`, {
    headers: {
      Authorization: token,
    },
  }).then(resp => resp.json());
};

export default getGithubRepo;
