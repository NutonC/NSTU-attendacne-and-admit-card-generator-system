import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import ManagementTable from "./Management-table.component";

import { httpGetRegisterManagementCredential } from "../../requests/management.requests";

export default function Department() {
  const [departmentData, setDepartmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const departmentData = await httpGetRegisterManagementCredential(
        "department"
      );
      setIsLoading(false);

      if (departmentData?.data?.length > 0) {
        setDepartmentData(departmentData.data);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <ManagementTable
      tableType={"department"}
      tableColumns={[
        {
          title: "Department Name",
          field: "departmentName",
          width: "55%",
          validate: (rowData) => {
            if (
              rowData.departmentName === undefined ||
              rowData.departmentName === ""
            ) {
              return "Required";
            }
            return true;
          },
        },
        {
          title: "Department Code",
          field: "departmentCode",
          width: "25%",
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
          initialEditValue: new Date(),
          editable: "never",
          width: "25%",
        },
      ]}
      tableData={departmentData.map((data, i) => ({
        rowId: i,
        departmentName: data.departmentName,
        departmentCode: data.departmentCode.toUpperCase(),
        createdAt: new Date(data.createdAt).toLocaleDateString("de-DE"),
      }))}
    />
  );
}
