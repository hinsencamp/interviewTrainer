import React, { useContext, createContext } from "react";

import style from "./View.module.scss";

const ViewContext = createContext(null);

export default function View({ centeredContent, ...props }) {
  return (
    <ViewContext.Provider value={{ centeredContent }}>
      <div className={`${style.view} ${centeredContent && style.centered}`}>
        {props.children}
      </div>
    </ViewContext.Provider>
  );
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
  const viewContext = useContext(ViewContext);

  return (
    <div
      className={`${style.body} ${viewContext.centeredContent &&
        style.bodyCentered}`}
    >
      {props.children}
    </div>
  );
}

View.Header = Header;
View.Body = Body;
