import React from "react";

import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
  Icon
} from "@blueprintjs/core";

import style from "./User.module.scss";
import useGlobalState from "utils/dataStore";

interface Props {
  className: "string";
}

export default function User(props: Props) {
  const { user, logout } = useGlobalState();
  // button
  // name
  // image
  //dropdown
  // your profile
  // account settings
  // logout

  // possible:
  // title badge - Admin, user, premium User

  function renderUserMenu() {
    return (
      <Menu>
        <MenuItem icon="user" text="Your Profile" />
        <MenuItem icon="cog" text="Account Settings" />
        <MenuDivider />
        <MenuItem
          icon="log-out"
          text="Logout"
          intent="danger"
          onClick={logout}
        />
      </Menu>
    );
  }

  return (
    <Popover {...props} content={renderUserMenu()} position={Position.BOTTOM}>
      <Button className={style.userButton} minimal large>
        <div className={style.userButtonText}>
          <span className={style.userText}>{user.name} </span>{" "}
          <Icon iconSize={25} icon="user" />
        </div>
      </Button>
    </Popover>
  );
}
