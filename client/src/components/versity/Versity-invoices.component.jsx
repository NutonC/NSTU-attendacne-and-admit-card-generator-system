import React, { useEffect, useState } from "react";

import MaterialTable from "@material-table/core";
import { makeStyles, Grid, Button, Link } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { tableIcons } from "../../lib/material-table-config";

const useStyles = makeStyles((theme) => ({
  tableStyle: {
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
    zIndex: "2",
  },
  materialTable: {
    padding: "15px 20px",
    fontSize: "17px",
    fontFamily: "normal",
  },

  button: {
    width: "30px",
    height: "40px",
    textTransform: "uppercase",
    fontWeight: "800",
    margin: "5px",
  },
  upperGrid: {
    display: "flex",
    position: "sticky",
    top: "0",
    zIndex: "5",
  },
  statusBox: {
    display: "flex",
    gap: "0.5rem",
  },
}));

export default function VersityInvoices({ invoicesData = [] }) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    invoicesData.length &&
      setData(
        invoicesData.map((invoice, i) => ({
          rowId: i,
          name: invoice.name,
          country: invoice.address.country,
          city: invoice.address.city,
          street: invoice.address.line1,
          postalCode: invoice.address.postal_code,
          invoiceUrl: invoice.invoice_url,
        }))
      );
  }, [invoicesData]);

  return (
    <Grid>
      <Grid item xs={12} className={classes.materialTable}>
        <MaterialTable
          className={classes.tableStyle}
          style={{ borderRadius: "10px" }}
          title={"Invoices"}
          icons={tableIcons}
          columns={[
            { title: "Name", field: "name" },
            { title: "Country", field: "country" },
            { title: "City", field: "city" },
            { title: "Street", field: "street" },
            { title: "Postal Code", field: "postalCode" },
            {
              title: "Invoice",
              field: "invoiceUrl",
              render: (rowData) =>
                rowData && (
                  <Link target="_blank" href={rowData.invoiceUrl}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CloudDownloadIcon />}
                    >
                      Download
                    </Button>
                  </Link>
                ),
            },
          ]}
          data={data}
          options={{
            pageSize: 20,
            headerStyle: {
              backgroundColor: "#DEF3FA",
              color: "Black",
              fontWeight: "bold",
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
