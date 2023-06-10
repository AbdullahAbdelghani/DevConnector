import { Request, Response } from "express";
const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect DataBase
connectDB();

//init midleware
app.use(express.json({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Heey Gentlemen");
});

//Define Routes
app.use("/api/users", require("./routes/api/users.ts"));
app.use("/api/auth", require("./routes/api/auth.ts"));
app.use("/api/profile", require("./routes/api/profile.ts"));
app.use("/api/posts", require("./routes/api/posts.ts"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
