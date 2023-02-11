import React, { useState, useEffect } from "react";

import ManagementTable from "./Management-table.component";
import CustomSelect from "./CustomSelect.component";
import { CircularProgress } from "@material-ui/core";

import {
  httpGetManagementTokens,
  httpGetRegisterManagementCredential,
} from "../../requests/management.requests";

const GenerateStudentToken = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [semesterData, setSemesterData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [studentTokenData, setStudentTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudentTokenData = async () => {
      setIsLoading(true);
      const departmentData = await httpGetRegisterManagementCredential(
        "department"
      );
      const semesterData = await httpGetRegisterManagementCredential(
        "semester"
      );
      const sessionData = await httpGetRegisterManagementCredential("session");
      const tokenData = await httpGetManagementTokens("student");
      setIsLoading(false);

      if (departmentData?.data?.length > 0) {
        setDepartmentData(departmentData.data);
      }

      if (semesterData?.data?.length > 0) {
        setSemesterData(semesterData.data);
      }

      if (sessionData?.data?.length > 0) {
        setSessionData(sessionData.data);
      }

      if (tokenData?.data?.length > 0) {
        setStudentTokenData(tokenData.data);
      }
    };

    fetchStudentTokenData();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <ManagementTable
      tableType={"student"}
      tableColumns={[
        { title: "Token Type", field: "tokenType", editable: "never" },
        {
          title: "Token Code",
          field: "tokenCode",
          editable: "never",
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
          title: "Session",
          field: "session",
          editComponent: (props) => (
            <CustomSelect
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              selectionData={sessionData.map((data, i) => data.session)}
              customTitle={"Session"}
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
          title: "Semester",
          field: "semesterNumber",
          editComponent: (props) => (
            <CustomSelect
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              selectionData={semesterData.map((data) => data.semesterNumber)}
              customTitle={"Semester"}
            />
          ),
        },
        {
          title: "Date of Creation",
          field: "createdAt",
          type: "date",
          initialEditValue: new Date().toLocaleDateString("de-DE"),
          editable: "never",
        },
        {
          title: "Date of Expiration",
          field: "expiredAt",
          type: "date",
          editable: "never",
        },
      ]}
      tableData={studentTokenData.map((tokenData, i) => ({
        rowId: i,
        tokenType: tokenData.tokenType,
        tokenCode: tokenData.tokenCode,
        departmentCode: tokenData.departmentId.departmentCode.toUpperCase(),
        semesterNumber: tokenData.semesterId.semesterNumber,
        session: tokenData.sessionId.session,
        createdAt: new Date(tokenData.createdAt).toLocaleDateString("de-DE"),
        expiredAt: new Date(tokenData.expiredAt).toLocaleDateString("de-DE"),
      }))}
    />
  );
};

export default GenerateStudentToken;
