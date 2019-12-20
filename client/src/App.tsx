import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Dashboard, Training, TrainingSelection, Interview } from "views";
import { GlobalStateProvider } from "utils/dataStore";

import SideMenu from "components/SideMenu";

import routes from "utils/routes";

import style from "./App.module.scss";

function ContentSwitch() {
  return (
    <Switch>
      <Route exact path={routes.root} component={Dashboard} />
      <Route exact path={routes.dashboard} component={Dashboard} />
      <Route exact path={routes.trainings} component={TrainingSelection} />
      <Route exact path={routes.trainer + "/:type"} component={Training} />
      <Route exact path={routes.interview} component={Interview} />
    </Switch>
  );
}

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <div className={style.app}>
          <SideMenu />
          <ContentSwitch />
        </div>
      </BrowserRouter>
    </GlobalStateProvider>
  );
};

export default App;
