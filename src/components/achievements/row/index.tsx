import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { AchievementsCompetition } from "../../../types/achievements";
import { CompetitionCodes } from "../../../types/competitions";
import style from "./style.module.scss";

export default function AchievementsRow({
  achievementCompetition,
  year,
}: {
  achievementCompetition: AchievementsCompetition;
  year: number;
}) {
  const resolveURL = (url: string) => {
    if (!url.startsWith("http"))
      return `https://raw.githubusercontent.com/roboapex/roboapex.github.io/main/data/achievements/${year.toString()}/${
        achievementCompetition.code
      }_${achievementCompetition.region}/${url}`;
    return url;
  };

  const competition = CompetitionCodes[achievementCompetition.code];
  const regionDetails = competition?.region?.[achievementCompetition.region] ?? {
    name: achievementCompetition.region || achievementCompetition.code,
    website: "",
  };

  const onImageUnavailable = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    key?: string
  ) => {
    e.target["src"] = `https://cataas.com/cat/cute?_=${year}${
      achievementCompetition.code
    }${key ?? "logo"}`;
    e.target["alt"] = "cute cat because we got no image :>";
    e.target["title"] = "cute cat because we got no image :>";
    e.target["remove"]();
  };

  return (
    <div className={style.row}>
      <div className={style.details}>
        <div className={style.logoWrap}>
          <img
            src={`https://raw.githubusercontent.com/roboapex/roboapex.github.io/main/data/competitions/${achievementCompetition.code}_${achievementCompetition.region}.png`}
            onError={onImageUnavailable}
            alt={`${regionDetails.name} logo`}
            title={regionDetails.name}
            className={style.logo}
          />
        </div>
        <span className={style.code}>{achievementCompetition.code.toUpperCase()}</span>
        <h2 className={style.compName}>
          {regionDetails.name} <span className={style.compYear}>{year}</span>
        </h2>
        {achievementCompetition.desc && (
          <p className={style.desc}>{achievementCompetition.desc}</p>
        )}
        {regionDetails.website && (
          <Link href={regionDetails.website} className={style.visitLink}>
            Visit website <i className="fas fa-external-link-alt" />
          </Link>
        )}
      </div>

      <div className={style.cards}>
        {achievementCompetition.awards.map((comp, i) => (
          <div key={i} className={style.card}>
            <div className={style.cardImage}>
              <img
                className={style.image}
                src={resolveURL(`${comp.team}.png`)}
                onError={(e) => onImageUnavailable(e, `${i}`)}
                alt={comp.team}
                title={comp.team}
              />
            </div>
            <div className={style.cardBody}>
              <div className={style.award}>
                <i className={clsx("fas fa-trophy", style.trophyIcon)} />
                <span className={style.awardTitle}>{comp.title}</span>
              </div>
              {comp.category && (
                <span className={style.category}>{comp.category}</span>
              )}
              <div className={style.recipients}>
                {comp.recipients.map((r, j) => (
                  <span key={j} className={style.recipient}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {achievementCompetition.media?.map((img, i) => (
          <img
            key={i}
            src={resolveURL(img.url)}
            alt={img.caption}
            title={img.caption}
            className={style.mediaImg}
          />
        ))}
      </div>
    </div>
  );
}
