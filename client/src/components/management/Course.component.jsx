import React, { useState, useEffect } from "react";
import ManagementTable from "./Management-table.component";
import CustomSelect from "./CustomSelect.component";

import { httpGetRegisterManagementCredential } from "../../requests/management.requests";
import { CircularProgress } from "@material-ui/core";

export default function Course() {
  const [departmentData, setDepartmentData] = useState([]);
  const [semesterData, setSemesterData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const departmentData = await httpGetRegisterManagementCredential(
        "department"
      );
      const semesterData = await httpGetRegisterManagementCredential(
        "semester"
      );
      const courseData = await httpGetRegisterManagementCredential("course");
      setIsLoading(false);

      if (departmentData?.data?.length > 0) {
        setDepartmentData(departmentData.data);
      }

      if (semesterData?.data?.length > 0) {
        setSemesterData(semesterData.data);
      }

      if (courseData?.data?.length > 0) {
        setCourseData(courseData.data);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <ManagementTable
      tableType={"course"}
      tableColumns={[
        {
          title: "Course Name",
          field: "courseName",
          width: "30%",
          validate: (rowData) => {
            if (rowData.courseName === undefined || rowData.courseName === "") {
              return "Required";
            }
            return true;
          },
        },
        {
          title: "Course Code",
          field: "courseCode",
          width: "15%",

          validate: (rowData) => {
            if (rowData.courseCode === undefined || rowData.courseCode === "") {
              return "Required";
            }
            return true;
          },
        },
        {
          title: "Course Credit",
          field: "courseCredit",
          editComponent: (props) => (
            <CustomSelect
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              selectionData={[1, 1.5, 2, 3, 4]}
              customTitle={"Course Credit"}
            />
          ),
          validate: (rowData) => {
            if (
              rowData.courseCredit === undefined ||
              rowData.courseCredit === ""
            ) {
              return "Required";
            }
            return true;
          },
        },
        {
          title: "Department Code",
          field: "departmentCode",
          editComponent: (props) => (
            <CustomSelect
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              selectionData={departmentData.map(
                (data, i) => data.departmentCode
              )}
              customTitle={"Department Code"}
            />
          ),

          validate: (rowData) => {
            if (
              rowData.departmentCode === undefined ||
              rowData.departmentCode === ""
            ) {
              return "Required";
            }
            return true;
          },
        },
        {
          title: "Semester Number",
          field: "semesterNumber",
          editComponent: (props) => (
            <CustomSelect
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              selectionData={semesterData.map((data) => data.semesterNumber)}
              customTitle={"Semester"}
            />
          ),
          validate: (rowData) => {
            if (
              rowData.semesterNumber === undefined ||
              rowData.semesterNumber === ""
            ) {
              return "Required";
            }
            return true;
          },
        },
        {
          title: "Date of creation",
          field: "createdAt",
          type: "date",
          initialEditValue: new Date(),
          editable: "never",
        },
      ]}
      tableData={courseData.map((data, i) => ({
        rowId: i,
        courseName: data.courseName,
        courseCode: data.courseCode.toUpperCase(),
        courseCredit: data.courseCredit,
        departmentCode: data.departmentId.departmentCode.toUpperCase(),
        semesterNumber: data.semesterId.semesterNumber,
        createdAt: new Date(data.createdAt).toLocaleDateString("de-DE"),
      }))}
    />
  );
}
