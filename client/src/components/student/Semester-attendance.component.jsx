import React, { useEffect, useState } from "react";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Logo from "../../assets/logo-2.png";
import StampsizePhoto from "../../assets/stamp.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: "borderBox",
    padding: "20px",
    background: "skyblue",
    width: "80%",
    margin: "30px auto",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  studentIdentity: {
    marginTop: "40px",
    width: "70%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },

  bottomGrid: {
    margin: "30px",
  },
  flexDiv1: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    JustifyContent: "space-between",
    gap: "1em",
  },
  table: {
    maxWidth: "80%",
    margin: "0 auto",
    "& .MuiTableCell-root": {
      border: "1px solid black",
    },
    marginTop: "30px",
  },
  borderItem: {
    minWidth: "140px",
    minHeight: "20px",
    border: "1px dashed black",
    padding: "10px",
    margin: "5px 10px",
  },
  GridItem: {
    display: "flex",
    alignItems: "center",
  },
  percentageContainer: {
    width: "70%",
    margin: "0 auto",
  },
}));

const SemesterAttendance = ({ currentUser, attendanceData = [] }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [toatlAttendancePercentage, setToatlAttendancePercentage] = useState(0);

  useEffect(() => {
    const calculateCurrenSemesterAttendance = () => {
      const result = attendanceData.flatMap((payload) => [
        { ...payload.courseId, ...payload },
      ]);
      const courseCodes = _.intersectionBy(result, "courseCode");

      const calculated = courseCodes.map((doc) =>
        result.filter((course) => doc.courseCode === course.courseCode)
      );

      const tempStore = new Map();
      const finalData = [];
      let totalPercenatage = 0;

      for (let attendance of calculated) {
        let present = 0;
        attendance.map((courseData) => {
          if (courseData.status) {
            present += 1;
          }

          tempStore.set("temp", {
            courseCode: courseData.courseCode,
            courseCredit: courseData.courseCredit,
            totalClasses: attendance.length,
            present,
            percentage: Math.floor((present / attendance.length) * 100),
          });

          return 0;
        });
        finalData.push(tempStore.get("temp"));
      }

      for (let credentials of finalData) {
        totalPercenatage = totalPercenatage + credentials.percentage;
      }

      setToatlAttendancePercentage(
        Math.floor(totalPercenatage / finalData.length)
      );
      setData(finalData);
    };

    attendanceData.length && calculateCurrenSemesterAttendance();
  }, [attendanceData]);

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img
            src={Logo}
            alt={"Logo"}
            style={{ height: "150px", width: "auto" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{currentUser.versityName}</Typography>
          <Grid className={classes.flexDiv1}>
            <Typography variant="h6">Session: {currentUser.session}</Typography>
            <Typography variant="h6">
              Semster: {currentUser.currentSemesterData}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <img
            src={StampsizePhoto}
            alt={"Logo"}
            style={{ height: "150px", width: "auto" }}
          />
        </Grid>
      </Grid>

      <Grid container className={classes.studentIdentity}>
        <Grid item xs={12} className={classes.GridItem}>
          <Typography>Name</Typography>
          <Typography className={classes.borderItem}>
            {currentUser.name}
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.GridItem}>
          <Typography>Fathers Name</Typography>
          <Typography className={classes.borderItem}>
            {currentUser.fathersName}
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.GridItem}>
          <Typography>Mothers Name</Typography>
          <Typography className={classes.borderItem}>
            {currentUser.mothersName}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.GridItem}>
          <Typography>Department Name</Typography>
          <Typography className={classes.borderItem}>
            {currentUser.departmentName}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.GridItem}>
          <Typography>Roll</Typography>
          <Typography className={classes.borderItem}>
            {currentUser && currentUser.studentUID}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.GridItem}>
          <Typography>Name of the Hall</Typography>
          <Typography
            style={{
              border: "1px dashed black",
              padding: "10px 200px",
              margin: "5px 10px",
            }}
          >
            &nbsp;
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.GridItem}>
          <Typography>Date of Commencement of Examination</Typography>
          <Typography
            style={{
              border: "1px dashed black",
              padding: "10px 100px",
              margin: "5px 10px",
            }}
          >
            &nbsp;
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>SL</TableCell>
                  <TableCell align="center">Course Code</TableCell>
                  <TableCell align="center">Course Credit</TableCell>
                  <TableCell align="center">Number of Classes held</TableCell>
                  <TableCell align="center">
                    Number of classes attended
                  </TableCell>
                  <TableCell align="center">Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{i}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.courseCode}
                    </TableCell>
                    <TableCell align="center">{row.courseCredit}</TableCell>
                    <TableCell align="center">{row.totalClasses}</TableCell>
                    <TableCell align="center">{row.present}</TableCell>
                    <TableCell align="center">{row.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container className={classes.percentageContainer}>
        <Grid item xs={12} className={classes.GridItem}>
          <Typography>Total Percentage of Attendacne</Typography>
          <Typography className={classes.borderItem}>
            {toatlAttendancePercentage}%
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.bottomGrid}>
        <Grid item xs={6}>
          <Typography>..........</Typography>
          <Typography>Chairman</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>..........</Typography>
          <Typography>Provost</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SemesterAttendance;
