import { useState, useEffect } from "react";
import Loading from "./Loading";
import styles from "./Slider.module.scss";
import SliderMovies from "./SliderMovies";

function Slider({ API_byGroup }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    const json = await (await fetch(API_byGroup)).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.sliderWrapper}>
            {movies.map((movie) => (
              <SliderMovies
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                year={movie.year}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Slider;
