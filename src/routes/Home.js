import { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Movie from "../components/Movie";
import Loading from "../components/Loading";

import styles from "./Home.module.scss";
import { Group_key_arr, Group_obj } from "../atom/NavList";
import { Link } from "react-router-dom";

function Home() {
  const [seeAll, setSeeAll] = useState(true);
  const handleSeeAll = (event) => {
    setSeeAll((curr) => !curr);

    if (seeAll === true) {
      event.target.lastChild.innerText = "See All ⟩";
    } else {
      event.target.lastChild.innerText = " ⟩";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.contents}>
          {Group_key_arr.map((group) => {
            return (
              <div key={group} className={styles.group}>
                <div className={styles.title}>
                  <Link to={`/page/${Group_obj[group]}/1`}>
                    <div>
                      <span
                        onMouseEnter={handleSeeAll}
                        onMouseLeave={handleSeeAll}
                      >
                        {group}
                        <span className={styles.seeAll}> ⟩</span>
                      </span>
                    </div>
                  </Link>
                </div>
                <Slider
                  className={styles.slider}
                  API_byGroup={`https://yts.mx/api/v2/list_movies.json?limit=10&${Group_obj[group]}&sort_by=rating`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;
