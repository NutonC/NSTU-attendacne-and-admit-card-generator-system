import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery.hook";

import { Grid, makeStyles } from "@material-ui/core";
import { VisibilityOutlined } from "@material-ui/icons";
import { tableIcons } from "../../lib/material-table-config";
import MaterialTable from "@material-table/core";

import PopupModalButton from "../popup-modal-button/Popup-modal-button.component";
import StudentAttendanceTable from "./Student-attendance-table.component";

import { httpGetCourseClasses } from "../../requests/teacher.requests";

const useStyles = makeStyles((theme) => ({
  materialTable: {
    padding: "15px 20px",
    fontSize: "17px",
    fontFamily: "normal",
  },
}));

const PreviousClasses = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const query = useQuery();

  useEffect(() => {
    const fetchStudentsData = async () => {
      const courseCode = query.get("courseCode");
      const session = query.get("session");
      const previousClasses = await httpGetCourseClasses(courseCode, session);

      if (previousClasses?.data && previousClasses.data.length) {
        setData(
          previousClasses.data.map((classDetails, i) => ({
            rowId: i,
            courseName: `${
              classDetails.courseId.courseName
            } - ${classDetails.courseId.courseCode.toUpperCase()}`,
            courseCode: classDetails.courseId.courseCode,
            session: classDetails.sessionId.session,
            totalAbsent: classDetails.totalAbsent,
            totalPresent: classDetails.totalPresent,
            realDate: classDetails.createdAt,
            createdAt: new Date(classDetails.createdAt).toLocaleDateString(
              "de-DE"
            ),
          }))
        );
      }
    };

    fetchStudentsData();
  }, [query]);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.materialTable}>
        <MaterialTable
          style={{ borderRadius: "10px" }}
          title="Previous Classes"
          icons={tableIcons}
          columns={[
            {
              title: "Course Name",
              field: "courseName",
              width: "30%",
            },
            {
              title: "Session",
              field: "session",
            },
            {
              title: "Total Absent",
              field: "totalAbsent",
            },
            {
              title: "Total Present",
              field: "totalPresent",
            },
            {
              title: "Date of Creation",
              field: "createdAt",
              type: "date",
              initialEditValue: new Date(),
              editable: "never",
            },
            {
              title: "All Details",
              field: "button",
              render: (rowData) =>
                rowData && (
                  <PopupModalButton
                    startIcon={<VisibilityOutlined />}
                    title={"Previous attendance records"}
                    modal={
                      <StudentAttendanceTable
                        course={rowData.courseCode}
                        sessionNumber={rowData.session}
                        createdAt={rowData.realDate}
                      />
                    }
                  >
                    View
                  </PopupModalButton>
                ),
            },
          ]}
          data={data}
          options={{
            paging: true,
            pageSize: 20, // make initial page size
            emptyRowsWhenPaging: false, // To avoid of having empty rows
            pageSizeOptions: [20, 25, 30, 35],
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
  );
};

export default PreviousClasses;
