import React, { useState } from "react";
import { SearchInput } from "evergreen-ui";
import useGlobalState from "utils/dataStore";
import styles from "./Filter.module.scss";

export default function Filter() {
  const { searchTerm, setQuestions } = useGlobalState();
  const [input, setInput] = useState(searchTerm);

  const handleChange = value => {
    setQuestions(value);
    setInput(value);
  };

  return (
    <div className={styles.filter}>
      <SearchInput onChange={e => handleChange(e.target.value)} value={input} />
    </div>
  );
}
