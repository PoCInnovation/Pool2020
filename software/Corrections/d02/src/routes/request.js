const express = require('express');
const router = express.Router();

router.get('/poc/user/:login', async (request, response, next) => {
  const {login} = request.params;
  const users = await requestUsers();
  let url

  for (let i = 0; i != users.length; i++)
    if (users[i].login == login)
      url = users[i].html_url
  if (url)
    response.status(200).redirect(url);
  else
    response.status(404).send("user not found");
});

router.get('/poc/repos/star', async (request, response, next) => {
  const repos = await requestRepos();
  let nb_star = 0

  for (let i = 0; i != repos.length; i++)
    nb_star += repos[i].stargazers_count
  response.status(200).send(nb_star.toString());
});

router.get('/poc/repo/:repo_name', async (request, response, next) => {
  const {repo_name} = request.params;
  const repos = await requestRepos();
  let found_repo

  for (let i = 0; i != repos.length; i++)
      if (repos[i].name == repo_name)
        found_repo = repos[i]
  if (found_repo)
    response.status(200).send(found_repo);
  else
    response.status(404).send("repo not found");
});

module.exports = router;