import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import ManagementTable from "./Management-table.component";

import { httpGetRegisterManagementCredential } from "../../requests/management.requests";

export default function Hall() {
  const [hallData, setHallData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const hallData = await httpGetRegisterManagementCredential("hall");
      setIsLoading(false);

      if (hallData?.data?.length > 0) {
        setHallData(hallData.data);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <ManagementTable
      tableType={"hall"}
      tableColumns={[
        {
          title: "Hall Name",
          field: "hallName",
          validate: (rowData) => {
            if (rowData.hallName === undefined || rowData.hallName === "") {
              return "Required";
            }
            return true;
          },
        },
        {
          title: "Hall Code",
          field: "hallCode",
          validate: (rowData) => {
            if (rowData.hallCode === undefined || rowData.hallCode === "") {
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
      tableData={hallData.map((data, i) => ({
        rowId: i,
        hallName: data.hallName,
        hallCode: data.hallCode.toUpperCase(),
        createdAt: new Date(data.createdAt).toLocaleDateString("de-DE"),
      }))}
    />
  );
}
