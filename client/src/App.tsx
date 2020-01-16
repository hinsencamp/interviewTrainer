import React from "react";
import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Dashboard,
  Training,
  TrainingSelection,
  Interview,
  Login
} from "views";
import { useAuth } from "utils/hooks";
import useGlobalState from "utils/dataStore";

import { GlobalStateProvider } from "utils/dataStore";
import SideMenu from "components/SideMenu";
import routes from "utils/routes";
import style from "./App.module.scss";

interface IPrivateRoute {
  exact: boolean;
  path: string;
  Component: Element;
}

function PrivateRoute(props: any): any {
  const { token } = useGlobalState();
  const { Component } = props;
  return (
    <Route
      {...props}
      render={({ location }) =>
        !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function withSideMenu(Component: any) {
  return () => (
    <div className={style.app}>
      <SideMenu />
      <Component />
    </div>
  );
}

function ContentSwitch() {
  return (
    <Switch>
      <Route exact path={routes.login} component={Login} />
      <PrivateRoute
        exact
        path={routes.root}
        Component={withSideMenu(Dashboard)}
      />
      <PrivateRoute
        exact
        path={routes.dashboard}
        Component={withSideMenu(Dashboard)}
      />
      <PrivateRoute
        exact
        path={routes.trainings}
        Component={withSideMenu(TrainingSelection)}
      />
      <PrivateRoute
        exact
        path={routes.trainer + "/:type"}
        Component={withSideMenu(Training)}
      />
      <PrivateRoute
        exact
        path={routes.interview}
        Component={withSideMenu(Interview)}
      />
    </Switch>
  );
}

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <ContentSwitch />
      </BrowserRouter>
    </GlobalStateProvider>
  );
};

export default App;
