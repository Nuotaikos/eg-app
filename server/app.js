const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json()); //analizuoja gaunamas užklausas su JSON naudingosiomis apkrovomis

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lama",
});

app.listen(port, () => {
  console.log(`Serveris veikia porte Nr ${port}`);
});
