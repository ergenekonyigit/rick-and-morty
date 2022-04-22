import axios from "axios";

export const getCharacters = (page = 1, name) => {
  if (!page) {
    return;
  }
  if (name) {
    return axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}&&name=${name}`
    );
  } else {
    return axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
  }
};

export const getEpisodes = (page = 1) => {
  console.log('page', page)
  if (!page) {
    return;
  }
  return axios.get(`https://rickandmortyapi.com/api/episode/?page=${page}`);
};
