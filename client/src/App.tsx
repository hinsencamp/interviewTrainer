import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Dashboard,
  Training,
  TrainingSelection,
  Interview,
  Login
} from "views";

import Authentication from "utils/hoc";
import { GlobalStateProvider } from "utils/dataStore";
import { withSideMenu } from "components/SideMenu";
import routes from "utils/routes";
import style from "./App.module.scss";

function ContentSwitch() {
  return (
    <Switch>
      <Route exact path={routes.login} component={Login} />
      <Authentication>
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
      </Authentication>
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
