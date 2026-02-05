import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import startupDB from "./startup/db.js";
startupDB();
import startupRoutes from "./startup/routes.js";
startupRoutes(app);

app.get("/", (req, res) => {
  res.send("Api is running...");
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
