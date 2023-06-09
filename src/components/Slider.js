import { useState, useEffect } from "react";
import Loading from "./Loading";
import styles from "./Slider.module.scss";
import SliderMovies from "./SliderMovies";

function Slider({ API_byGroup }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moved, setMoved] = useState(0);
  const [cnt, setCnt] = useState(1);
  const [rArrow, setrArrow] = useState("block");
  const [lArrow, setlArrow] = useState("none");

  const getMovies = async () => {
    const json = await (await fetch(API_byGroup)).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  const paintArrow = (cnt, lHide, rHide) => {
    if (cnt === lHide) {
      setlArrow("none");
      setrArrow("block");
    } else if (cnt === rHide) {
      setrArrow("none");
      setlArrow("block");
    } else {
      setrArrow("block");
      setlArrow("block");
    }
  };

  const handleRight = () => {
    if (cnt <= 3) {
      setCnt((curr) => (curr += 1));
      setMoved((curr) => curr - 460 - 5 * cnt);
      paintArrow(cnt, 0, 3);
    }
  };
  const handleLeft = () => {
    if (cnt > 1) {
      setCnt((curr) => (curr -= 1));
      setMoved((curr) => curr + 460 + 5 * (cnt - 1));
      paintArrow(cnt, 2, 5);
    }
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
          <div
            className={styles.sliderWrapper}
            style={{ transform: `translateX(${moved}px)` }}
          >
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
      <div
        className={styles.rightArrow}
        onClick={handleRight}
        style={{ display: `${rArrow}` }}
      >
        ⟩
      </div>
      <div
        className={styles.leftArrow}
        onClick={handleLeft}
        style={{ display: `${lArrow}` }}
      >
        ⟨
      </div>
    </div>
  );
}
export default Slider;
