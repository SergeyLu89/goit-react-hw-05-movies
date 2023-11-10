import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const KEY = '0347cf19b71674ad49f472515ed975cd';

export const getTrending = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${KEY}`);
  return response.data.results;
};

export const getDetails = async movieId => {
  const response = await axios.get(`movie/${movieId}?api_key=${KEY}`);
  return response.data;
};
export const getCast = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits?api_key=${KEY}`);
  return response.data.cast;
};

export const getReviews = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews?api_key=${KEY}`);
  return response.data.results;
};
export const getMoviesForQuery = async queryValue => {
  const response = await axios.get(
    `search/movie?query=${queryValue}&api_key=${KEY}`
  );
  return response.data.results;
};
