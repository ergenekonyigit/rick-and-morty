import axios from "axios";

export const getCharacters = (page = 0, name) => {
  if (name) {
    return axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}&&name=${name}`
    );
  } else {
    return axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
  }
};

export const getEpisodes = (page) => {
  return axios.get(`https://rickandmortyapi.com/api/episode/?page=${page}`);
};
