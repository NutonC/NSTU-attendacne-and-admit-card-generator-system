import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery.hook";

import MaterialTable from "@material-table/core";
import {
  makeStyles,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from "@material-ui/core";
import { tableIcons } from "../../lib/material-table-config";

import {
  httpPostTakeStudentsAttendance,
  httpGetStudentsAttendanceByCourseCodeAndSession,
} from "../../requests/teacher.requests";

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
  attendanceDate: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    margin: "1rem 0",
    padding: "0.7rem",
  },
  statusBox: {
    display: "flex",
    gap: "0.5rem",
  },
}));

export default function StudentAttendanceTable({
  course,
  sessionNumber,
  createdAt,
}) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState("");
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const query = useQuery();

  useEffect(() => {
    const fetchStudentsData = async () => {
      const courseCode = course || query.get("courseCode");
      const session = sessionNumber || query.get("session");
      const students = await httpGetStudentsAttendanceByCourseCodeAndSession(
        courseCode,
        session,
        createdAt
      );

      if (students?.data && students.data.response) {
        let present = 0,
          absent = 0,
          name,
          email,
          semester,
          department;
        setAttendanceDate(students.data.createdAt);
        setData(
          students.data.response.map((student, i) => {
            if (student.status === true) {
              present += 1;
            } else {
              absent += 1;
            }

            if (students.data.exist === true) {
              name = student.studentId.userId.name;
              email = student.studentId.userId.email;
              semester = student.studentId.currentSemesterId.semesterNumber;
              department = `${student.studentId.departmentId.departmentCode.toUpperCase()}`;
            } else {
              name = student.userId.name;
              email = student.userId.email;
              semester = student.currentSemesterId.semesterNumber;
              department = `${student.departmentId.departmentCode.toUpperCase()}`;
            }

            return {
              rowId: i,
              photo: "https://www.w3schools.com/w3images/avatar2.png",
              studentId: student.studentUID ? student.studentUID : undefined,
              studentName: name,
              email: email,
              session: student.sessionId.session,
              status: student.status || false,
              semester: semester,
              department: department,
              courseCode,
            };
          })
        );
        setTotalPresent(present);
        setTotalAbsent(absent);
      }
    };

    fetchStudentsData();
  }, [query, course, createdAt, sessionNumber]);

  return (
    <Grid>
      <Grid item xs={12} className={classes.materialTable}>
        {isLoading ? <CircularProgress /> : <></>}
        {attendanceDate && totalPresent > 0 && (
          <Paper className={classes.attendanceDate}>
            <Typography>
              Attendance was taken for <b>{attendanceDate}</b>
            </Typography>
            <Box className={classes.statusBox}>
              <Typography>
                Total Present <b>{totalPresent}</b>
              </Typography>
              <Typography>
                Total Absent <b>{totalAbsent}</b>
              </Typography>
            </Box>
          </Paper>
        )}
        <MaterialTable
          className={classes.tableStyle}
          style={{ borderRadius: "10px" }}
          title="Students Records for Course Teacher"
          icons={tableIcons}
          columns={[
            {
              title: "Student Photo",
              field: "photo",
              render: (rowData) => (
                <img src={rowData.photo} alt="" style={{ width: "35%" }} />
              ),
              width: "15%",
            },
            { title: "Student ID", field: "studentId" },
            { title: "Student Name", field: "studentName" },
            { title: "Email", field: "email" },
            { title: "Session", field: "session" },
            { title: "Sememster", field: "semester" },
            { title: "Department", field: "department" },
            {
              title: "Status",
              field: "button",
              width: "50%",
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
            selection: true,
            pageSize: 20,
            headerStyle: {
              backgroundColor: "#DEF3FA",
              color: "Black",
              fontWeight: "bold",
            },
          }}
          actions={[
            {
              tooltip: "Submit students attendance",
              icon: tableIcons.Check,
              onClick: async (evt, selectedRows) => {
                const notSelected = data.filter((item) => {
                  return (
                    selectedRows.filter((selected) => {
                      return selected.rowId === item.rowId;
                    }).length === 0
                  );
                });

                const courseCode = query.get("courseCode");
                const session = query.get("session");

                const modifiedSelectedRows = selectedRows.map((selected) => ({
                  ...selected,
                  tableData: { checked: false },
                  status: !selected.status,
                }));

                const updatedRows = [...modifiedSelectedRows, ...notSelected];

                setIsLoading(true);
                const response = await httpPostTakeStudentsAttendance(
                  courseCode,
                  session,
                  updatedRows
                );
                setIsLoading(false);

                if (!response.error) {
                  setData(updatedRows);
                  setAttendanceDate(response.data.createdAt);
                  const updatedPresent = updatedRows.filter(
                    (row) => row.status === true
                  );
                  const updatedAbsent = updatedRows.filter(
                    (row) => row.status === false
                  );
                  setTotalPresent(updatedPresent.length);
                  setTotalAbsent(updatedAbsent.length);

                  alert("Attendance taken " + selectedRows.length + " rows");
                } else {
                  alert(response.message);
                }
              },
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
