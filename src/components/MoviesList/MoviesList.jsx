import { Link, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';
const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.moviesList}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.movieListItem}>
          <Link
            state={{ from: location }}
            className={css.movieListItemLink}
            to={`/movies/${id}`}
          >
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700'
              }
              alt={title}
              width="150"
            />
            <p className={css.movieListItemTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
