import 'url-search-params-polyfill';

import { useLocation } from "@docusaurus/router";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  Achievements,
  AchievementsFilterProperties,
} from "../../../types/achievements";
import { CompetitionCodes } from "../../../types/competitions";
import style from "./style.module.css";

export default function AchievementsFilter({
  achievements,
  onUpdate,
}: {
  achievements: Achievements[];
  onUpdate: (filter: AchievementsFilterProperties) => void;
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [filter, setFilter] = useState<AchievementsFilterProperties>({
    year: searchParams.get("year"),
    comp: searchParams.get("comp"),
  });

  useEffect(() => {
    searchParams.set("year", filter.year);
    if (filter.year === null) searchParams.delete("year");
    searchParams.set("comp", filter.comp);
    if (filter.comp === null) searchParams.delete("comp");
    history.pushState(
      null,
      "",
      window.location.pathname +
        (!!searchParams.toString() ? "?" : "") +
        searchParams.toString()
    );
    onUpdate(filter);
  }, [filter]);

  const hasFilter = !!filter.year || !!filter.comp;

  return (
    <div className={style.bar}>
      <span className={style.label}>
        <i className="fas fa-filter" />
        Filter
      </span>

      <div className={style.dropdowns}>
        <div className="dropdown dropdown--hoverable">
          <button className={clsx("button", "button--sm", filter.year ? style.active : style.inactive)}>
            {filter.year || "Year"}
            <i className={clsx("fas fa-chevron-down", style.chevron)} />
          </button>
          <ul className="dropdown__menu">
            <li>
              <a className="dropdown__link" href="javascript:void(0)"
                onClick={() => setFilter((f) => ({ ...f, year: null }))}>
                All years
              </a>
            </li>
            {achievements?.map((e, i) => (
              <li key={i}>
                <a className="dropdown__link" href="javascript:void(0)"
                  onClick={() => setFilter((f) => ({ ...f, year: e.year.toString() }))}>
                  {e.year}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="dropdown dropdown--hoverable">
          <button className={clsx("button", "button--sm", filter.comp ? style.active : style.inactive)}>
            {filter.comp ? filter.comp.toUpperCase() : "Competition"}
            <i className={clsx("fas fa-chevron-down", style.chevron)} />
          </button>
          <ul className="dropdown__menu">
            <li>
              <a className="dropdown__link" href="javascript:void(0)"
                onClick={() => setFilter((f) => ({ ...f, comp: null }))}>
                All competitions
              </a>
            </li>
            {Object.entries(CompetitionCodes).map(([code], i) => (
              <li key={i}>
                <a className="dropdown__link" href="javascript:void(0)"
                  onClick={() => setFilter((f) => ({ ...f, comp: code }))}>
                  {code.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {hasFilter && (
        <button
          className={clsx("button", "button--sm", style.clear)}
          onClick={() => setFilter({ year: null, comp: null })}
        >
          Clear
        </button>
      )}
    </div>
  );
}
