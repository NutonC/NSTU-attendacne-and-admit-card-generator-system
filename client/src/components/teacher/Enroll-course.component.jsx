import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Select,
  MenuItem,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { tableIcons } from "../../lib/material-table-config";
import MaterialTable from "@material-table/core";
import CustomSelect from "../management/CustomSelect.component";

import {
  httpPostTeacherEnrolledCourses,
  httpGetTeacherEnrolledCourses,
} from "../../requests/teacher.requests";
import { httpGetRegisterManagementCredential } from "../../requests/management.requests";

const useStyles = makeStyles((theme) => ({
  materialTable: {
    padding: "20px 0px",
    fontSize: "17px",
    fontFamily: "normal",
  },
}));

export function CourseSelect({ value, onChange }) {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      const fetchedData = await httpGetRegisterManagementCredential("course");
      if (fetchedData?.data?.length > 0) {
        setCourseData(fetchedData.data);
      }
    };

    fetchCourseData();

    return () => {
      setCourseData([]);
    };
  }, []);

  return (
    <Select
      style={{ minWidth: "200px" }}
      value={value || ""}
      onChange={onChange}
      defaultValue={""}
    >
      <MenuItem disabled>Select course</MenuItem>
      {courseData.map((data, i) => (
        <MenuItem key={i} value={data.courseCode}>
          {`${data.courseName} - ${data.courseCode}`}
        </MenuItem>
      ))}
    </Select>
  );
}

const EnrollCourse = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [session, setSession] = useState([]);
  let history = useHistory();

  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionData = await httpGetRegisterManagementCredential("session");
      if (sessionData?.data?.length > 0) {
        setSession(sessionData.data.map((data, i) => data.session));
      }
    };

    fetchSessionData();

    return () => {
      setSession([]);
    };
  }, []);

  useEffect(() => {
    const fetchTeacherErolledData = async () => {
      const teacherErolledData = await httpGetTeacherEnrolledCourses();
      if (teacherErolledData?.data?.length > 0) {
        setData(
          teacherErolledData.data.map((teacherCourse, i) => ({
            rowId: i,
            course: `${
              teacherCourse?.courseId?.courseName
            } - ${teacherCourse?.courseId?.courseCode.toUpperCase()}`,
            courseCode: teacherCourse?.courseId?.courseCode,
            session: teacherCourse?.sessionId?.session,
            createdAt: new Date(teacherCourse.createdAt).toLocaleDateString(
              "de-DE"
            ),
          }))
        );
      }
    };

    fetchTeacherErolledData();

    return () => {
      setData([]);
    };
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} className={classes.materialTable}>
          <MaterialTable
            style={{ borderRadius: "10px" }}
            title={"Enroll Course"}
            icons={tableIcons}
            columns={[
              {
                title: "Course Name",
                field: "course",
                editComponent: (props) => (
                  <CourseSelect
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                  />
                ),
              },
              {
                title: "Session",
                field: "session",
                editComponent: (props) => (
                  <CustomSelect
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    selectionData={session}
                  />
                ),
                validate: (rowData) => {
                  if (rowData.session === undefined || rowData.session === "") {
                    return "Required";
                  }
                  return true;
                },
              },
              {
                title: "Date of Creation",
                field: "createdAt",
                type: "date",
                initialEditValue: new Date(),
                editable: "never",
              },
            ]}
            data={data}
            onRowClick={(evt, selectedRow) => {
              setSelectedRow(selectedRow);
              history.push(
                `/account/classes/students?courseCode=${selectedRow.courseCode}&session=${selectedRow.session}`
              );
            }}
            editable={{
              onRowAdd: (newRow) =>
                new Promise(async (resolve, reject) => {
                  const response = await httpPostTeacherEnrolledCourses(
                    newRow.course,
                    newRow.session
                  );

                  if (response.error || !response) {
                    alert(response.message);
                    return reject();
                  }

                  const updatedRows = [
                    ...data,
                    { rowId: Math.floor(Math.random() * 100), ...newRow },
                  ];

                  setTimeout(() => {
                    setData(updatedRows);
                    resolve();
                  }, 2000);
                }),
              // onRowDelete: (selectedRow) =>
              //   new Promise(async (resolve, reject) => {
              //     //send data for deleteion to server
              //     const req = await httpDeleteStudent(selectedRow);
              //     if (!req.data) {
              //       alert(req.message);
              //       reject();
              //     }

              //     const index = selectedRow.tableData.id;
              //     const updatedRows = [...data];
              //     updatedRows.splice(index, 1);
              //     setTimeout(() => {
              //       setData(updatedRows);
              //       // success msg
              //       resolve();
              //     }, 2000);
              //   }),
              // onRowUpdate: (updatedRow, oldRow) =>
              //   new Promise(async (resolve, reject) => {
              //     //send data to server for update
              //     const req = await httpPutUpdateStudent(updatedRow);
              //     if (!req.data) {
              //       alert(req.message);
              //       reject();
              //     }

              //     const index = oldRow.tableData.id;
              //     const updatedRows = [...data];
              //     updatedRows[index] = updatedRow;

              //     setTimeout(() => {
              //       setData(updatedRows);
              //       resolve();
              //     }, 2000);
              //   }),
            }}
            options={{
              paging: true,
              pageSize: 20, // make initial page size
              emptyRowsWhenPaging: false, // To avoid of having empty rows
              pageSizeOptions: [6, 12, 20, 50],
              rowStyle: (rowData) => ({
                backgroundColor:
                  selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
              }),
              headerStyle: {
                backgroundColor: "#DEF3FA",
                color: "Black",
                fontWeight: "bold",
              },
              actionsColumnIndex: -1,
              addRowPosition: "first",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EnrollCourse;
