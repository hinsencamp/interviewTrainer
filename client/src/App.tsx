import React from "react";
import { GlobalStateProvider } from "utils/dataStore";
import List from "components/List";
import Filter from "components/Filter";

import style from "./App.module.scss";

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <div className={style.app}>
        <div className={style.search}>
          <Filter />
          <div className={style.container}>
            <List />
          </div>
        </div>
      </div>
    </GlobalStateProvider>
  );
};

export default App;
