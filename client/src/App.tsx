import React, { ComponentClass } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  Dashboard,
  Training,
  TrainingSelection,
  Interview,
  Login
} from "views";
import { GlobalStateProvider } from "utils/dataStore";

import SideMenu from "components/SideMenu";

import routes from "utils/routes";

import style from "./App.module.scss";

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
      <Route exact path={routes.root} component={withSideMenu(Dashboard)} />
      <Route
        exact
        path={routes.dashboard}
        component={withSideMenu(Dashboard)}
      />
      <Route
        exact
        path={routes.trainings}
        component={withSideMenu(TrainingSelection)}
      />
      <Route
        exact
        path={routes.trainer + "/:type"}
        component={withSideMenu(Training)}
      />
      <Route
        exact
        path={routes.interview}
        component={withSideMenu(Interview)}
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
