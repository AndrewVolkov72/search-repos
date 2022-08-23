import React, { FC } from "react";
import { IProfile } from "../../models/IProfile";
import { ReactComponent as Company } from "../../image/profile/company.svg";
import { ReactComponent as Location } from "../../image/profile/location.svg";
import { ReactComponent as Anchor } from "../../image/profile/link.svg";
import { ReactComponent as Repo } from "../../image/profile/repo.svg";
import { ReactComponent as Subs } from "../../image/profile/subs.svg";
import { ReactComponent as Logo } from "../../image/Logo.svg";
import s from "./Profile.module.css";

export const Profile:FC<IProfile> = ({name, login, avatar_url, followers, blog, company, location, html_url, public_repos}) => {
  return (
    <div className={s.main}>
      <div className="">
        <img className={s.img} src={avatar_url} alt={name} />
      </div>
      <div className={s.title}>
        {name !== null && <p className={s.name}>{name}</p>}
        <p className={s.subname}>{login}</p>
        <div className={s.wrapper}>
          <Logo className={s.logo}/>
          <a className={s.link} href={html_url} target="_blank">Ссылка на GitHub</a>
        </div>
      </div>
      {public_repos > 0 && <div className={[s.pepo, s.wrapper].join(' ')}>
        <Repo className={s.icon} />
        <p>Репозиториев</p>
        <span className={s.repos}>{public_repos}</span>
      </div>}
      {followers > 0 &&
        <div className={[s.follow, s.wrapper].join(' ')}>
          <Subs className={s.icon}/>
          <div className={s.subs}><p>Подписчиков: {followers}</p></div>
        </div>}
      <div className="">
        {company !== null && <div className={[s.info, s.wrapper].join(' ')}>
          <Company className={s.icon}/>
          <p>{company}</p>
        </div>}
        {location !== null && <div className={[s.info, s.wrapper].join(' ')}>
          <Location className={s.icon}/>
          <p>{location}</p>
        </div>}
        {blog !== '' && <div className={[s.info, s.wrapper].join(' ')}>
          <Anchor className={s.icon}/>
          <a className={s.link} href={blog} target="_blank">{blog}</a>
        </div>}
      </div>
    </div>
  );
};
