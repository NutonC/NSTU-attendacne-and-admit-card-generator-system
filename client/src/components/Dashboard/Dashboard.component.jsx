import React from "react";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import CircleChart from "./PieChart.component";
import BarCharts from "./BarChart.component";

export default function Dashboard() {
  return (
    <Container>
      <Paper style={{ padding: "30px 20px" }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography>Still In Development ...</Typography>
          </Grid>
          <Grid item xs={6}>
            <CircleChart />
          </Grid>
          <Grid item xs={6}>
            <BarCharts />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
