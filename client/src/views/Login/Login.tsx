import React, { useState, ChangeEvent } from "react";
import {
  H3,
  Divider,
  InputGroup,
  Button,
  Card,
  Elevation
} from "@blueprintjs/core";

import View from "components/View";
import useGlobalState from "utils/dataStore";
import style from "./Login.module.scss";

export default function Login() {
  const [userValue, setUserValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const { fetchToken } = useGlobalState();

  function submit() {
    // send credentials
    console.log(userValue, pwValue);
    fetchToken(userValue, pwValue);
    // receive token in return
    // put token in header
  }

  //TODO: secure routes through authentication
  // before routing there, check if token is valid.

  return (
    <View centeredContent>
      <View.Body>
        <Card className={style.loginCard} elevation={Elevation.TWO}>
          <H3>Login</H3>
          <InputGroup
            className={style.inputGroup}
            leftIcon="user"
            placeholder="Username"
            value={userValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUserValue(event.target.value)
            }
          />
          <InputGroup
            className={style.inputGroup}
            placeholder="Password"
            leftIcon="lock"
            type="password"
            value={pwValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPwValue(event.target.value)
            }
          />
          <Button onClick={submit}>Login</Button>
          <Divider />
          <span className=".bp3-text-muted">
            Don't have an account jet? Sign-up for <a>here</a>!
          </span>
        </Card>
      </View.Body>
    </View>
  );
}
