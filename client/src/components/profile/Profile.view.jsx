import React from "react";
import { Container, Grid } from "@material-ui/core";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import Identity from "./Identity.component";
import Contact from "./Contact.component";

function ProfileView({ currentUser }) {
  const {
    name,
    versityName,
    teacherTitle,
    departmentName,
    departmentCode,
    semesterData,
    session,
    email,
    phone,
    teacherUID,
    studentUID,
  } = currentUser;
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Identity
            name={name}
            teacherTitle={teacherTitle}
            versityName={versityName}
            departmentName={departmentName}
            departmentCode={departmentCode}
            semesterData={semesterData}
            session={session}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Contact
            email={email}
            phone={phone}
            teacherUID={teacherUID}
            studentUID={studentUID}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(ProfileView);
