import React from "react";
import Link from "@docusaurus/Link";
import K from "../../../../constants";
import style from "./style.module.scss";

export default function HomeSocial() {
  return (
    <section className={style.main}>
      <div className={style.content}>
        <p className={style.overline}>Stay Connected</p>
        <h1 className={style.heading}>Find us online.</h1>
        <div className={style.icons}>
          {K.socials.map((e) => (
            <Link href={e.url} key={`${e.handle}-${e.platform}`} className={style.iconLink}>
              <div className={style.icon} style={{ borderColor: e.color }}>
                <i className={e.icon} style={{ color: e.color }} />
              </div>
              <span className={style.platform}>{e.platform}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
