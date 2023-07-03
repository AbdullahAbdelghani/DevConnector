import { Request, Response } from "express";
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
app.use(express.json());

//connect DataBase
connectDB();

//Define Routes
app.use("/api/users", require("./routes/api/users.ts"));
app.use("/api/auth", require("./routes/api/auth.ts"));
app.use("/api/profile", require("./routes/api/profile.ts"));
app.use("/api/posts", require("./routes/api/posts.ts"));

//init midleware
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_: Request, res: Response) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
