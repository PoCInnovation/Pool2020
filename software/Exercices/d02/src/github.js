const axios = require('axios').default;

const displayUsers = (users) => {
  users.forEach((user) => {
    console.log(`${user.login}'s user page is ${user.html_url}`)
  });
};

const requestUsers = async () => {
  const response = await axios.get("https://api.github.com/orgs/PoCInnovation/members")
  return response.data
};

const requestRepos = async () => {
  const response = await axios.get("https://api.github.com/orgs/PoCInnovation/repos")
  return response.data
};

module.exports = {
  displayUsers,
  requestUsers,
  requestRepos,
};
