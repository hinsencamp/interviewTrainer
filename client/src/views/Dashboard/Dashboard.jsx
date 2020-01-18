import React from "react";

import useGlobalState from "utils/dataStore";
import View from "components/View";

import { isAuthenticated } from "../../utils/api";

export default function Dashboard() {
  const { user } = useGlobalState();

  // React.useEffect(() => {
  //   console.log(user);
  //   isAuthenticated(user).then(res => console.log(res));
  // }, []);

  return (
    <View>
      <View.Header headline={`Welcome ${user.name}`} />
      <View.Body>{/*  */}</View.Body>
    </View>
  );
}
