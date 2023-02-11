import React from "react";
import { Grid } from "@material-ui/core";

import Sidebar from "../components/sidebar/Sidebar.component";
import Header from "../components/header/Header.component";
import Footer from "../components/footer/Footer.component";
import Titlebar from "../components/titlebar/Titlebar.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selectors";

import VersityAccountRoutes from "../routes/Versity-account-routes";
import TeacherAccountRoutes from "../routes/Teacher-account-routes";
import ManagementAccountRoutes from "../routes/Management-account-routes";
import StudentAccountRoutes from "../routes/Student-account-routes";

function Account({ currentUser }) {
  return (
    <Grid container>
      <Grid
        item
        xs={2}
        style={{
          background: "#0b132b",
          height: "100vh",
          width: "100%",
          position: "fixed",
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={10}
        style={{ position: "absolute", right: "0", width: "100%" }}
      >
        <Header />
        <Titlebar />
        {currentUser.uType === "versity" && <VersityAccountRoutes />}
        {currentUser.uType === "management" && <ManagementAccountRoutes />}
        {currentUser.uType === "teacher" && <TeacherAccountRoutes />}
        {currentUser.uType === "student" && <StudentAccountRoutes />}
        <Footer />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Account);
