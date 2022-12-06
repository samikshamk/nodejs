require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT;


app.get("/", (req, res) => {
    res.send("Assessment by TribeHired");
  });
  
  app.listen(port, () => {
    console.log(`Server Connected to ${port}`);
  });