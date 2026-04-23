import ThemeButton from "../../theme/button";
import React from "react";
import style from "./style.module.scss";

const stats = [
  { number: "15+", label: "Years Active", colorClass: style.yellow },
  { number: "100+", label: "Awards Won", colorClass: style.red },
  { number: "10+", label: "Competitions", colorClass: style.blue },
];

export default function HomeStats() {
  return (
    <section className={style.main}>
      <div className={style.overlay} />
      <div className={style.grid}>
        {stats.map((s) => (
          <div key={s.label} className={`${style.stat} ${s.colorClass}`}>
            <span className={style.number}>{s.number}</span>
            <span className={style.label}>{s.label}</span>
          </div>
        ))}
      </div>
      <ThemeButton path="/achievements" color="secondary">
        View Achievements
      </ThemeButton>
    </section>
  );
}
