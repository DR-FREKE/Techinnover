"use strict";
import express from "express";
import mongoose from "mongoose";
import { Server } from "http";
import fs from "fs";
import path from "path";
import cors from "cors";
import UserApi from "./Router/user.router";

const app = express();
const http = Server(app);
const dbURL =
  "mongodb://techinnover:solagbaby96@ds035533.mlab.com:35533/techinnover";

app.use(cors());
app.use("/Uploads", express.static("Uploads"));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
//parse request of content-type: application/json
app.use(express.json());

//parse request of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api", UserApi);

//handle connection to database using mongoose
mongoose.connect(
  dbURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("error");
    }
  }
);
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const server = http.listen(port, "localhost", () => {
  console.log(`app listening on port ${server.address().port}`);
});
