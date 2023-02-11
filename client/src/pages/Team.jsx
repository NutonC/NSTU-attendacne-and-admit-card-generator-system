import React from "react";
import {
  Grid,
  Container,
  Paper,
  Typography,
  Link,
  makeStyles,
} from "@material-ui/core";
import { LanguageOutlined } from "@material-ui/icons";

import Navbar from "../components/navbar/Navbar.component";
import ProfilePicture from "../assets/profile.png";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5vh 0",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
    borderRadius: "10px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1b3133",
  },
  desc: {
    fontSize: "14px",
    lineHeight: "1.71rem",
    color: "#6c757d",
    marginTop: "2vh",
  },
}));

export default function Team() {
  const aboutData = [
    {
      name: "Pranta Barua",
      pic: "https://avatars1.githubusercontent.com/pranta-barua007",
      url: "https://pranta.netlify.app",
      title: "Full Stack Developer",
      desc: "Managed data flows & Lead Architect of the app",
    },
    {
      name: "Shachin Chakma",
      pic: "https://avatars1.githubusercontent.com/Shachin-Chakma",
      url: "https://github.com/Shachin-Chakma",
      title: "Front-end Developer",
      desc: "Managed UI",
    },
    {
      name: "Nuton Chakma",
      pic: "https://avatars1.githubusercontent.com/NutonC",
      url: "https://github.com/NutonC",
      title: "Front-end Developer",
      desc: "Managed UI",
    },
  ];
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={4} className={classes.root}>
          {aboutData.map((data, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper className={classes.paper} style={{ height: "auto" }}>
                <img
                  src={data.pic || ProfilePicture}
                  alt=""
                  style={{
                    height: "160px",
                    width: "160px",
                    border: "4px solid #ecf0f4",
                    borderRadius: "50%",
                    marginBottom: "3vh",
                  }}
                />
                <Typography className={classes.heading} variant="h4">
                  {data.name}
                </Typography>
                <Typography variant="h5">{data.title}</Typography>
                <Typography className={classes.desc} variant="body1">
                  {data.desc}
                </Typography>
                {data.url && (
                  <Link href={data.url} target="_blank" rel="noreferrer">
                    <LanguageOutlined />
                  </Link>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
