import { getCast } from 'api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import { Loader } from 'components/Loader/Loader';

const Cast = () => {
  const { movieId } = useParams();
  const [filmCast, setFilmCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fechMoviesCast = async () => {
      try {
        setIsLoading(true);

        const data = await getCast(movieId);

        setFilmCast(data);
      } catch (error) {
        // setError(error.message);
        alert(`${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fechMoviesCast();
  }, [movieId]);
  return isLoading ? (
    <Loader />
  ) : (
    <ul className={css.castList}>
      {filmCast !== null &&
        filmCast.map(({ id, name, character, profile_path }) => (
          <li key={id} className={css.castListItem}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700'
              }
              alt="poster"
              width="120"
            />

            <h4 className={css.castListSubtitle}>{name}</h4>
            <p className={css.castListDescr}>{character}</p>
          </li>
        ))}
    </ul>
  );
};

export default Cast;
