import React, { useState, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [userValue, setUserValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const { token, login } = useGlobalState();

  useEffect(() => {
    console.log(history.location.pathname);
    if (token) {
      history.push("/dashboard");
    }
  }, [token, history]);

  function submit() {
    login(userValue, pwValue);
  }

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
            Don't have an account jet? Sign-up for <a href="/">here</a>!
          </span>
        </Card>
      </View.Body>
    </View>
  );
}
