import React, { useEffect, useState } from "react";

import MaterialTable from "@material-table/core";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { tableIcons } from "../../lib/material-table-config";

const useStyles = makeStyles((theme) => ({
  tableStyle: {
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
    zIndex: "2",
  },
  materialTable: {
    padding: "15px 20px",
    fontSize: "17px",
    fontFamily: "normal",
  },

  button: {
    width: "30px",
    height: "40px",
    textTransform: "uppercase",
    fontWeight: "800",
    margin: "5px",
  },
  upperGrid: {
    display: "flex",
    position: "sticky",
    top: "0",
    zIndex: "5",
  },
  statusBox: {
    display: "flex",
    gap: "0.5rem",
  },
}));

export default function SemesterAttendanceHistory({
  semesterNumber,
  attendanceData = [],
}) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    attendanceData.length &&
      setData(
        attendanceData.map((attendanceDetails, i) => ({
          rowId: i,
          session: attendanceDetails.sessionId.session,
          semester: attendanceDetails.semesterId.semesterNumber,
          courseName: attendanceDetails.courseId.courseName,
          courseCode: attendanceDetails.courseId.courseCode.toUpperCase(),
          courseCredit: attendanceDetails.courseId.courseCredit,
          createdAt: new Date(attendanceDetails.createdAt).toLocaleDateString(
            "de-DE"
          ),
          status: attendanceDetails.status,
        }))
      );
  }, [attendanceData]);

  return (
    <Grid>
      <Grid item xs={12} className={classes.materialTable}>
        <MaterialTable
          className={classes.tableStyle}
          style={{ borderRadius: "10px" }}
          title={`All attendance history of semester: ${semesterNumber}`}
          icons={tableIcons}
          columns={[
            { title: "Session", field: "session" },
            { title: "Sememster", field: "semester" },
            { title: "Course Name", field: "courseName" },
            { title: "Course Code", field: "courseCode" },
            { title: "Course Credit", field: "courseCredit" },
            { title: "Date", field: "createdAt" },
            {
              title: "Status",
              field: "button",
              render: (rowData) =>
                rowData && (
                  <Typography
                    variant="h5"
                    color={rowData.status ? "primary" : "secondary"}
                  >
                    {rowData.status ? "P" : "A"}
                  </Typography>
                ),
            },
          ]}
          data={data}
          options={{
            pageSize: 20,
            headerStyle: {
              backgroundColor: "#DEF3FA",
              color: "Black",
              fontWeight: "bold",
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
