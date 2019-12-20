import React from "react";
import { Link } from "react-router-dom";
import routes from "utils/routes";

import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";

import style from "./SideMenu.module.scss";

export default function SideMenu() {
  return (
    <div className={style.sideMenu}>
      <div className={style.header}>
        <div className={style.brand}>Brand</div>
      </div>
      <div className={style.body}>
        <ul>
          <li className={style.menuElement}>
            <Link to={{ pathname: routes.dashboard }}>
              <Icon
                icon={IconNames.CHART}
                // intent={Intent.PRIMARY}
                className={style.icon}
              />
              Dashboard
            </Link>
          </li>
          <li className={style.menuElement}>
            <Link to={{ pathname: routes.trainings }}>
              <Icon icon={IconNames.LEARNING} className={style.icon} />
              Train
            </Link>
          </li>
          <li className={style.menuElement}>
            <Link to={{ pathname: routes.interview }}>
              <Icon icon={IconNames.SAVED} className={style.icon} />
              Interview
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
