import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api";
import useGlobalState from "utils/dataStore";
import { usePrevious } from "utils/hooks";

import { Skeleton } from "views";
import { withSideMenu } from "components/SideMenu";

export default function Authentication({ children }: any) {
  const { user, token } = useGlobalState();
  const prevToken = usePrevious(token);

  const location = useLocation();
  const [forceRedirect, setForceRedirect] = useState<null | boolean>(null);

  useEffect(() => {
    if (user.userId && token) {
      isAuthenticated(user.userId, token).then((isAuthenticated: Boolean) =>
        setForceRedirect(!isAuthenticated)
      );
    }
  }, [user, token]);

  // Logout redirect
  useEffect(() => {
    if (prevToken && !token) {
      setForceRedirect(true);
    }
  }, [token]);

  //Set redirect back to default
  useEffect(() => {
    if (forceRedirect) {
      setForceRedirect(false);
    }
  }, [forceRedirect]);

  function renderReturns() {
    if (forceRedirect === null) {
      // show empty page until we know if we need to redirect to login screen
      return withSideMenu(Skeleton)();
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
      return children;
    }
  }

  return renderReturns();
}
