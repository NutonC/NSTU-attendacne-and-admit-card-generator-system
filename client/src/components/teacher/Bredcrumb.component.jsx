import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

// function handleClick(event) {
//   event.preventDefault();
// }

export default function ActiveLastBreadcrumb() {
  let history = useHistory();
  const handleClick = () => {
    history.push("/account/classes");
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" onClick={handleClick}>
        classes
      </Link>

      <Link color="textPrimary" aria-current="page">
        container-classes
      </Link>
    </Breadcrumbs>
  );
}
