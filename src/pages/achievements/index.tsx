import Notice from "../../components/notice";
import React, { useEffect, useState } from "react";
import AchievementsRow from "../../components/achievements/row";
import AchievementsFilter from "../../components/achievements/filter";
import ThemeLayout from "../../components/theme/layout";
import {
  Achievements,
  AchievementsFilterProperties,
} from "../../types/achievements";
import achievementsData from "../../../data/achievements/achievements.json";
import Link from "@docusaurus/Link";

import style from "./style.module.scss";

export default function AchievementsPage() {
  const achievements = useAchievements();
  const [filtered, setFiltered] = useState<Achievements[]>([]);
  const [filter, setFilter] = useState<AchievementsFilterProperties>();

  useEffect(() => {
    if (!filter?.year && !filter?.comp) {
      setFiltered(achievements);
      return;
    }
    setFiltered(
      achievements?.map((a) => ({
        ...a,
        competitions: a.competitions.filter(
          (v) =>
            (!filter?.year || a?.year.toString() === filter.year) &&
            (!filter?.comp || v?.code === filter.comp)
        ),
      })).filter((v) => v.competitions.length > 0)
    );
  }, [achievements.length, filter]);

  const totalAwards = filtered.reduce(
    (sum, a) => sum + a.competitions.reduce((s, c) => s + c.awards.length, 0),
    0
  );

  return (
    <ThemeLayout title="Achievements">
      <div className={style.hero}>
        <div className={style.heroAccent} />
        <h1 className={style.heroTitle}>Achievements</h1>
        <p className={style.heroSub}>Over a decade of competition results</p>
      </div>

      <Notice>
        Only achievements from 2016 onwards are displayed. Earlier results may be found{" "}
        <Link href="https://www.sst.edu.sg/cca/robotics-apex/">here</Link>.
      </Notice>

      <AchievementsFilter
        achievements={achievements}
        onUpdate={(filter) => setFilter(filter)}
      />

      {filtered.length > 0 && (
        <p className={style.resultCount}>{totalAwards} award{totalAwards !== 1 ? "s" : ""}</p>
      )}

      <div className={style.awards}>
        {filtered?.map((a, i) => (
          <React.Fragment key={i}>
            <div className={style.yearHeader}>
              <span className={style.yearNumber}>{a.year}</span>
              <div className={style.yearRule} />
            </div>
            {a.competitions.map((e, i) => (
              <AchievementsRow
                achievementCompetition={e}
                key={`${e.code}${a.year}${i}`}
                year={a.year}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </ThemeLayout>
  );
}

const useAchievements = () => {
  return achievementsData as Achievements[];
};
