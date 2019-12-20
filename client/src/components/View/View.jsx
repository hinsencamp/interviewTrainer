import React from "react";

import style from "./View.module.scss";

export default function View(props) {
  return <div className={style.view}>{props.children}</div>;
}

function Header(props) {
  return (
    <div className={style.header}>
      {props.headline && <h1 className={style.h1}>{props.headline}</h1>}
      {props.children}
    </div>
  );
}

function Body(props) {
  return <div className={style.body}>{props.children}</div>;
}

View.Header = Header;
View.Body = Body;
