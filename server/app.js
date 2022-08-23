const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const md5 = require('js-md5');
const uuid = require('uuid');
app.use(cors());
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "egzaminas",
});

// const doAuth = function (req, res, next) {
//   if (0 === req.url.indexOf('/admin')) { // admin
//     const sql = `
//       SELECT
//       name, role
//       FROM users
//       WHERE session = ?
//   `;
//     con.query(
//       sql, [req.headers['authorization'] || ''],
//       (err, results) => {
//         if (err) throw err;
//         if (!results.length || results[0].role !== 'admin') {
//           res.status(401).send({});
//           req.connection.destroy();
//         } else {
//           next();
//         }
//       }
//     );
//   } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
//     next();
//   } else { // fron
//     const sql = `
//       SELECT
//       name, role
//       FROM users
//       WHERE session = ?
//   `;
//     con.query(
//       sql, [req.headers['authorization'] || ''],
//       (err, results) => {
//         if (err) throw err;
//         if (!results.length) {
//           res.status(401).send({});
//           req.connection.destroy();
//         } else {
//           next();
//         }
//       }
//     );
//   }
// }
// app.use(doAuth)

// // AUTH
// app.get("/login-check", (req, res) => {
//   let sql;
//   let requests;
//   if (req.query.role === 'admin') {
//     sql = `
//       SELECT
//       name
//       FROM users
//       WHERE session = ? AND role = ?
//       `;
//     requests = [req.headers['authorization'] || '', req.query.role];
//   } else {
//     sql = `
//       SELECT
//       name
//       FROM users
//       WHERE session = ?
//       `;
//     requests = [req.headers['authorization'] || ''];
//   }
//   con.query(sql, requests, (err, result) => {
//     if (err) throw err;
//     if (!result.length) {
//       res.send({ msg: 'error' });
//     } else {
//       res.send({ msg: 'ok' });
//     }
//   });
// });

// app.post("/login", (req, res) => {
//   const key = uuid.v4();
//   const sql = `
//   UPDATE users
//   SET session = ?
//   WHERE name = ? AND pass = ?
// `;
//   con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
//     if (err) throw err;
//     if (!result.affectedRows) {
//       res.send({ msg: 'error', key: '' });
//     } else {
//       res.send({ msg: 'ok', key });
//     }
//   });
// });


// CATEGORIES
// function to make a POST req to the server to insert data to MySQL db
app.post("/admin/service", (req, res) => {
  const sql = `
  INSERT INTO cats
  (title) 
  VALUES (?)
  `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, new Cat was created', type: 'success' } });
  });
});

app.listen(port, () => {
  console.log(`Autoservisas porte Nr ${port}`);
});
