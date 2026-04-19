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

  console.log(achievementCompetition);

  const onImageUnavailable = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    key?: string
  ) => {
    e.target["src"] = `https://cataas.com/cat/cute?_=${year}${
      achievementCompetition.code
    }${key ?? "logo"}`;
    e.target["alt"] = "cute cat because we got no image :>";
    e.target["title"] = "cute cat because we got no image :>";
    e.target["remove"](); // TEMP: remove cats image for applications
  };

  return (
    <div className={style.row}>
      <div className={style.details}>
        <img
          src={`https://raw.githubusercontent.com/roboapex/roboapex.github.io/main/data/competitions/${achievementCompetition.code}_${achievementCompetition.region}.png`}
          onError={onImageUnavailable}
          alt={`${regionDetails.name}'s Logo`}
          title={regionDetails.name}
          className={style.logo}
        />
        <h2>
          {regionDetails.name} {year}
        </h2>
        <p>{achievementCompetition.desc}</p>
        <Link
          href={regionDetails.website ?? ""}
        >
          Visit Website
        </Link>
      </div>
      <div className={style.cards}>
        {achievementCompetition.awards.map((comp, i) => (
          <div key={i} className={clsx("card", "shadow--3", style.card)}>
            <div className="card__image">
              <img
                className={style.image}
                src={resolveURL(`${comp.team}.png`)}
                onError={(e) => {
                  onImageUnavailable(e, `${i}`);
                }}
                alt={comp.team}
                title={comp.team}
              />
            </div>
            <div className="card__body">
              <h3>
                <i color="#f2ba2c" className="fas fa-trophy" /> {comp.title}
              </h3>
              <p style={{ marginTop: -10, fontSize: 15 }}>{comp.category}</p>
              <b style={{ fontSize: 15 }}>{comp.recipients.join(" | ")}</b>
            </div>
          </div>
        ))}
        {achievementCompetition.media?.map((img, i) => (
          <img
            key={i}
            src={resolveURL(img.url)}
            alt={img.caption}
            title={img.caption}
          />
        ))}
      </div>
    </div>
  );
}
