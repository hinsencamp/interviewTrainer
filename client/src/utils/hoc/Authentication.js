import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api";
import useGlobalState from "utils/dataStore";

export default function Authentication(props) {
  const { user, token } = useGlobalState();
  const location = useLocation();
  const [forceRedirect, setForceRedirect] = useState(null);

  useEffect(() => {
    if (user.userId && token) {
      isAuthenticated(user.userId, token).then(isAuthenticated =>
        setForceRedirect(!isAuthenticated)
      );
    }
  }, [user, token]);

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
