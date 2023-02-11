import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { tableIcons } from "../../lib/material-table-config";
import MaterialTable from "@material-table/core";

import { httpPostRegisterManagementCredential } from "../../requests/management.requests";
import { httpPostCreateRegistrationToken } from "../../requests/versity.requests";

const useStyles = makeStyles((theme) => ({
  materialTable: {
    padding: "30px 30px",
    fontSize: "17px",
    fontFamily: "normal",
  },
}));

function ManagementTable({ tableType, tableData = [], tableColumns = [] }) {
  const classes = useStyles();

  const [data, setData] = useState(tableData);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.materialTable}>
        <MaterialTable
          style={{ borderRadius: "10px" }}
          title={`All ${tableType} Records....`}
          icons={tableIcons}
          columns={tableColumns}
          data={data}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          editable={{
            onRowAdd: (newRow) =>
              new Promise(async (resolve, reject) => {
                //send req to server to add credentials
                let response;
                if (tableType === "teacher" || tableType === "student") {
                  response = await httpPostCreateRegistrationToken(tableType, {
                    ...newRow,
                  });
                } else {
                  response = await httpPostRegisterManagementCredential(
                    tableType,
                    {
                      ...newRow,
                    }
                  );
                }

                if (response.error || !response) {
                  alert(response.message);
                  return reject();
                }

                let updatedRows;

                if (tableType === "teacher" || tableType === "student") {
                  updatedRows = [
                    {
                      id: Math.floor(Math.random() * 100),
                      tokenCode: response.data.tokenCode,
                      tokenType: response.data.tokenType,
                      expiredAt: response.data.expiredAt,
                      ...newRow,
                    },
                    ...data,
                  ];
                } else {
                  updatedRows = [
                    { id: Math.floor(Math.random() * 100), ...newRow },
                    ...data,
                  ];
                }

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
            pageSizeOptions: [20, 25, 30, 35],
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
  );
}

export default ManagementTable;
