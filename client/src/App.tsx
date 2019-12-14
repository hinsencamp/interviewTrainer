import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Button } from "evergreen-ui";

import { GlobalStateProvider } from "utils/dataStore";
import List from "components/List";
import Filter from "components/Filter";
import { Trainer } from "components/Trainer";

import style from "./App.module.scss";

function Search() {
  return (
    <div className={style.search}>
      <div className={style.header}>
        <Filter />
        <Button appearance="minimal" iconBefore="play" marginLeft={5}>
          <Link to="/trainer/questions">Start Training</Link>
        </Button>
      </div>

      <div className={style.container}>
        <List />
      </div>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <div className={style.app}>
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route path="/trainer/:questionType">
              <Trainer />
            </Route>
          </Switch>
        </div>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;
