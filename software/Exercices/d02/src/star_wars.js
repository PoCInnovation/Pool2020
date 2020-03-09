const axios = require('axios');

const fetchFilm = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`api/films/${id}/`).then((res) => {
      resolve(res.data);
    }).catch(reject);
  });
};

const fetchPlanet = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://swapi.co/api/planets/${id}/`).then((res) => {
      resolve(res.data);
    }).catch(reject);
  });
};

const fetchFilmAndPlanets = (episode) => {
  return new Promise((resolve, reject) => {
    fetchFilm(episode).then((film) => {
      Promise.all(film.planets.map((link) => {
        const id = link.slice(link.slice(0, -1).lastIndexOf('/') + 1, -1);
        return fetchPlanet(id);
      })).then((planets) => {
        resolve({
          ...film,
          planets,
        });
      }).catch(reject);
    }).catch(reject);
  });
};

module.exports = {
  fetchFilm,
  fetchPlanet,
  fetchFilmAndPlanets,
};
