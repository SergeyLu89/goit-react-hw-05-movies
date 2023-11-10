import { getDetails } from 'api/api';
import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

import Cast from 'components/Cast/Cast';
import Reviews from 'components/Reviews/Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const location = useLocation();
  const backLonkRef = useRef(location.state?.from ?? '/');
  useEffect(() => {
    if (!movieId) return;
    const fechMoviesDetails = async () => {
      try {
        setIsLoading(true);

        const data = await getDetails(movieId);

        setFilmDetails(data);
      } catch (error) {
        // setError(error.message);
        alert(`${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fechMoviesDetails();
  }, [movieId]);
  return isLoading ? (
    <Loader />
  ) : (
    filmDetails !== null && (
      <div className={css.movieDetailsBlok}>
        <Link className={css.movieDetailsLinkBack} to={backLonkRef.current}>
          ◀ Back
        </Link>{' '}
        <h1 className={css.movieDetailsTitle}>{filmDetails.title}</h1>
        <img
          className={css.movieDetailsImg}
          src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`}
          alt={filmDetails.title}
        />
        <h3 className={css.movieDetailsSlogan}>
          Slogan: "{filmDetails.tagline}"
        </h3>
        <p className={css.movieDetailsDescr}>{filmDetails.overview}</p>
        <ul className={css.movieDetailsList}>
          <li className={css.movieDetailsListItem}>
            Language: {filmDetails.original_language}
          </li>
          <li className={css.movieDetailsListItem}>
            {' '}
            Release date: {filmDetails.release_date}
          </li>
          <li className={css.movieDetailsListItem}>
            Rating: {filmDetails.vote_average}
          </li>
        </ul>
        <div className={css.movieDetailsLinkBox}>
          <Link className={css.movieDetailsLink} to="cast">
            Cast
          </Link>
          <Link className={css.movieDetailsLink} to="reviews">
            Reviews
          </Link>
        </div>
        <div>
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
