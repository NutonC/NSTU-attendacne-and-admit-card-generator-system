import React, { useState, useEffect } from "react";

import ManagementTable from "./Management-table.component";
import CustomSelect from "./CustomSelect.component";
import { CircularProgress } from "@material-ui/core";

import {
  httpGetManagementTokens,
  httpGetRegisterManagementCredential,
} from "../../requests/management.requests";

const GenerateTeacherToken = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [teacherTokenData, setTeacherTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeacherTokenData = async () => {
      setIsLoading(true);
      const departmentData = await httpGetRegisterManagementCredential(
        "department"
      );
      const tokenData = await httpGetManagementTokens("teacher");
      setIsLoading(false);

      if (departmentData?.data?.length > 0) {
        setDepartmentData(departmentData.data);
      }

      if (tokenData?.data?.length > 0) {
        setTeacherTokenData(tokenData.data);
      }
    };

    fetchTeacherTokenData();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <ManagementTable
      tableType={"teacher"}
      tableColumns={[
        {
          title: "Token Type",
          field: "tokenType",
          editable: "never",
        },
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
      tableData={teacherTokenData.map((tokenData, i) => ({
        rowId: i,
        tokenType: tokenData.tokenType,
        tokenCode: tokenData.tokenCode,
        departmentCode: tokenData.departmentId.departmentCode.toUpperCase(),
        createdAt: new Date(tokenData.createdAt).toLocaleDateString("de-DE"),
        expiredAt: new Date(tokenData.expiredAt).toLocaleDateString("de-DE"),
      }))}
    />
  );
};

export default GenerateTeacherToken;
