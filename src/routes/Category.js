import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Movie from "../components/Movie";
import styles from "./Category.module.scss";

function Category() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const { group, page } = useParams();

  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?page=${page}&${group}&sort_by=rating`
    );
    const json = await response.json();
    console.log(json);
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMovies();
  }, [group, page]);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.contents}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                medium_cover_image={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
