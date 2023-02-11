import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import ManagementTable from "./Management-table.component";
import CustomSelect from "./CustomSelect.component";

import { httpGetRegisterManagementCredential } from "../../requests/management.requests";

export default function Semester() {
  const [semesterData, setSemesterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const semesterData = await httpGetRegisterManagementCredential(
        "semester"
      );
      setIsLoading(false);

      if (semesterData?.data?.length > 0) {
        setSemesterData(semesterData.data);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <ManagementTable
      tableType={"semester"}
      tableColumns={[
        {
          title: "Semester Number",
          field: "semesterNumber",
          editComponent: (props) => (
            <CustomSelect
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              selectionData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
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
          title: "Date of Creation",
          field: "createdAt",
          type: "date",
          initialEditValue: new Date(),
          editable: "never",
        },
      ]}
      tableData={semesterData.map((data, i) => ({
        rowId: i,
        semesterNumber: data.semesterNumber,
        createdAt: new Date(data.createdAt).toLocaleDateString("de-DE"),
      }))}
    />
  );
}
