import { getReviews } from 'api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';
import { Loader } from 'components/Loader/Loader';

const Reviews = () => {
  const { movieId } = useParams();
  const [filmReview, setFilmReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fechMoviesReview = async () => {
      try {
        setIsLoading(true);

        const data = await getReviews(movieId);

        setFilmReview(data);
      } catch (error) {
        console.error(error);
        // setError(error.message);
        alert(`${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fechMoviesReview();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      {filmReview !== null && filmReview.length !== 0 ? (
        <ul className={css.reviewsList}>
          {filmReview.map(({ author, content, id }) => (
            <li key={id} className={css.reviewsListItem}>
              <h4 className={css.reviewsListItemSubtitle}>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default Reviews;
