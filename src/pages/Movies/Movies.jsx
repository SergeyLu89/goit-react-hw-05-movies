import { getMoviesForQuery } from 'api/api';
import { Loader } from 'components/Loader/Loader';
import MoviesList from 'components/MoviesList/MoviesList';
import SearchForm from 'components/SearchForm/SearchForm';
import css from './Movies.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get('query');
  const [foundMovie, setFoundMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!queryValue) return;
    const fechMoviesForQuery = async () => {
      try {
        setIsLoading(true);
        const data = await getMoviesForQuery(queryValue);

        setFoundMovie(data);
      } catch (error) {
        console.error(error);
        // setError(error.message);
        alert(`${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fechMoviesForQuery();
  }, [queryValue]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <SearchForm setSearchParams={setSearchParams} />
      {foundMovie !== null && <MoviesList movies={foundMovie} />}
      {foundMovie !== null && foundMovie.length === 0 && (
        <h3 className={css.moviePageSybtitle}>Nothing found 😢</h3>
      )}
    </div>
  );
};

export default Movies;
