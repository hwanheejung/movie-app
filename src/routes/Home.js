import {useState, useEffect} from "react";
import Movie from "../components/Movie";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import styles from "./Home.module.scss";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5?sort_by=year");
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <Nav />
          <div className={styles.contents}>{movies.map(movie =>
            <Movie key={movie.id}
                  id={movie.id}
                  medium_cover_image={movie.medium_cover_image}
                  title={movie.title}
                  summary={movie.summary}
                  genres={movie.genres}/>
          
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;