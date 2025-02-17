import { useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./Movie.css";

import ErrorMessage from "../errors/ErrorMessage";

import { getOneMovie,destroyMovie } from "../../api/fetch";

function Movie() {
  const [movie, setMovie] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();
  

  function handleDelete(id) {
    destroyMovie(id)
    .then(() => navigate("/movies"))
    .catch((error) => {
      console.error(error);
      setLoadingError(true);
    });
  }

  let navigate = useNavigate();

  useEffect(() => {
    getOneMovie(id)
      .then((response) => {
        setMovie(response);
        if (Object.keys(response).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((error) => {
        setLoadingError(true);
      });
  }, [id]);

  return (
    <section className="movies-movie-wrapper">
      <h2>{movie.title}</h2>
      <section className="movies-movie">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {movie.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {movie.listedIn}
              </p>
              <p>
                <span>Country:</span> {movie.country}
              </p>
              <p>
                <span>Rating:</span> {movie.rating}
              </p>
              <p>
                <span>Date Added:</span> {movie.dateAdded}
              </p>
            </aside>
            <article>
              <p>{movie.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(movie.id)}>
                Remove Movie
              </button>
              <Link to={`/movies/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Movie;
