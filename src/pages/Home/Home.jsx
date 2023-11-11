import React, { useEffect, useState } from 'react';
import css from './Home.module.css';
import { getTrending } from 'api/api';
import MoviesList from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState(null);

  useEffect(() => {
    const fechMovies = async () => {
      try {
        setIsLoading(true);
        const data = await getTrending();

        setMovies(data);
      } catch (error) {
        // setError(error.message);
        alert(`${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fechMovies();
  }, []);

  return (
    <div>
      <h1 className={css.homeTitle}>Trending today</h1>
      {isLoading && <Loader />}
      {movies !== null && <MoviesList movies={movies} />}
    </div>
  );
};

export default Home;
