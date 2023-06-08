import propTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./SliderMovies.module.scss";

function SliderMovies({ id, coverImg, title, genres, year }) {
  return (
    <div className={styles.sliderContainer}>
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} />
        <h2>{title}</h2>
        <p>{year}</p>
        <ul>{genres && genres.map((g) => <li key={g}>{g}</li>)}</ul>
      </Link>
    </div>
  );
}
SliderMovies.propTypes = {
  id: propTypes.number.isRequired,
  coverImg: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  year: propTypes.number.isRequired,
  genres: propTypes.arrayOf(propTypes.string).isRequired,
};

export default SliderMovies;
