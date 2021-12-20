const getGithubCommits = ({ownerSlug, repoSlug, page, perPage = 20, token}) => {
  return fetch(
    `https://api.github.com/repos/${ownerSlug}/${repoSlug}/commits?page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: token,
      },
    },
  ).then(resp => resp.json());
};

export default getGithubCommits;
