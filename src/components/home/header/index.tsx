import React, { useEffect, useState } from "react";
import ThemeButton from "../../theme/button";
import useBaseUrl from "@docusaurus/useBaseUrl";

import style from "./style.module.scss";

const NUMBER_OF_IMAGES = 6;

export default function HomeHeader() {
  const [imageIndex, setImageIndex] = useState(0);
  const bgUrl = useBaseUrl(`/img/home/header/${imageIndex}.jpg`);

  useEffect(() => {
    const int = setInterval(() => {
      setImageIndex((i) => (i + 1 <= NUMBER_OF_IMAGES - 1 ? i + 1 : 0));
    }, 7000);
    return () => clearInterval(int);
  }, []);

  return (
    <section className={style.header} style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className={style.overlay} />

      <div className={style.content}>
        <div className={style.accentLine} />
        <h1 className={style.title}>
          <span className={style.robotics}>Robotics</span>
          <span className={style.apex}>@APEX</span>
        </h1>
        <p className={style.tagline}>
          Founded in 2010 — Singapore's leading student robotics CCA at SST.
        </p>
        <div className={style.buttons}>
          <ThemeButton path="https://www.instagram.com/roboapex/">Follow Us</ThemeButton>
          <ThemeButton
            path="/achievements"
            color="secondary"
            type="outline"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
          >
            Our Achievements
          </ThemeButton>
        </div>
      </div>

      <div className={style.indicators}>
        {[...Array(NUMBER_OF_IMAGES)].map((_, i) => (
          <button
            key={i}
            className={`${style.dot} ${imageIndex === i ? style.dotActive : ""}`}
            onClick={() => setImageIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className={style.scrollHint}>
        <span />
      </div>
    </section>
  );
}
