import React from "react";
import { Link } from "react-router-dom";

// TODO: dont use ids for navigation, ids' are SEARCH param!
// https://usehooks.com/useRouter/
export default function TrainingSelection() {
  const foo = ["ap1i_24Biwg6WSP13qIn", "dJ1i_24Biwg6WSP13qIn"];
  return (
    <div>
      TrainingSelection
      <Link
        to={{ pathname: "/trainer/", search: `?ids=${JSON.stringify(foo)}` }}
      >
        About
      </Link>
    </div>
  );
}
