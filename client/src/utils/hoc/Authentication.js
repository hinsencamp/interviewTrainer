import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect, useLocation } from "react-router-dom";

import { isAuthenticated } from "../api";

import useGlobalState from "utils/dataStore";

export default function Authentication(props) {
  const { user } = useGlobalState();
  const location = useLocation();
  const [forceRedirect, setForceRedirect] = useState(null);

  useEffect(() => {
    if (!user.token) {
      setForceRedirect(true);
    }
  }, [user.token]);

  useEffect(() => {
    //check for authentication
    console.log("user", user);
    isAuthenticated(user).then(isAuthenticated =>
      setForceRedirect(!isAuthenticated)
    );
  }, []);

  //Set redirect back to default
  useEffect(() => {
    if (forceRedirect) {
      setForceRedirect(false);
    }
  }, [forceRedirect]);

  function renderReturns() {
    if (forceRedirect === null) {
      // show empty page until we know if we need to redirect to login screen
      return null;
    } else if (forceRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { referrer: location.pathname }
          }}
          push={true}
        />
      );
    } else {
      return props.children;
    }
  }

  return renderReturns();
}
