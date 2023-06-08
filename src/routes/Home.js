import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import styles from "./Home.module.scss";
import { Group_key_arr, Group_obj } from "../atom/NavList";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.contents}>
          {Group_key_arr.map((group) => {
            return (
              <div key={group}>
                <div className={styles.title}>
                  <div className={styles.titleBox}>
                    <Link to={`/page/${Group_obj[group]}/1`}>
                      <div>
                        <span>{group}</span>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <Slide
                ytsApi={`https://yts.mx/api/v2/list_movies.json?limit=10&${Group_obj[group]}&sort_by=rating`}
              /> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;
