import React, { useEffect, useState } from "react";
import { Select, MenuItem, CircularProgress } from "@material-ui/core";
import ManagementTable from "./Management-table.component";

import { getPreviousYears } from "../../utils/date.util";
import { httpGetRegisterManagementCredential } from "../../requests/management.requests";

export function SessionSelect({ value, onChange }) {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const resultantYears = getPreviousYears(new Date().getFullYear(), 7);
    setYears(resultantYears);
  }, []);

  return (
    <Select style={{ width: "200px" }} value={value || ""} onChange={onChange}>
      <MenuItem disabled>Select session</MenuItem>
      {years.map((year, i) => (
        <MenuItem key={i} value={`${year}-${year + 1}`}>
          {year} - {year + 1}
        </MenuItem>
      ))}
    </Select>
  );
}

export default function Session() {
  const [sessionData, setSessionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const sessionData = await httpGetRegisterManagementCredential("session");
      setIsLoading(false);

      if (sessionData?.data?.length > 0) {
        setSessionData(sessionData.data);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <ManagementTable
      tableType={"session"}
      tableColumns={[
        {
          title: "Session Number",
          field: "session",
          editComponent: (props) => (
            <SessionSelect
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
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
      tableData={sessionData.map((data, i) => ({
        rowId: i,
        session: data.session,
        createdAt: new Date(data.createdAt).toLocaleDateString("de-DE"),
      }))}
    />
  );
}
