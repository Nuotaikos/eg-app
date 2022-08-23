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

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) { // admin
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== 'admin') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
    next();
  } else { // fron
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length) {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  }
}
app.use(doAuth)

// AUTH
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});


//  create service 
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

// Read service
// Our app should be able to get and return all data ( the service) in the MySQL database.
app.get("/admin/service", (req, res) => {
  const sql = `
SELECT *                           /*selectinam viska*/
FROM cats
ORDER BY title                     /*rusiuojam pagal title*/
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//delete service
// iš lentelės ištrins konkrečią eilutę pagal parametruose pateiktą ID reikšmę
app.delete("/admin/service/:id", (req, res) => {
  const sql = `
  DELETE FROM cats
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
  });
});

//Edit service
// The PUT route will be responsible for updating any data to our database. (atsakingas už bet kokių duomenų atnaujinimą DB)
app.put("/admin/service/:id", (req, res) => {
  const sql = `
  UPDATE cats
  SET title = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
  });
});


// Create Master
app.post("/admin/master", (req, res) => {
  const sql = `
  INSERT INTO master
  (name_surname, spec, photo, city, cats_id)
  VALUES (?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.name_surname, req.body.spec, req.body.photo, req.body.city, req.body.cat], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, new and shiny product was created', type: 'success' } });
  });
});

//READ Master
//GET -  galimybė gauti ir grąžinti visus duomenis MySQL duomenų bazėje.
app.get("/admin/master", (req, res) => {
  const sql = `
SELECT p.id, name_surname, spec, photo, city, c.title AS cat
FROM master AS p
LEFT JOIN cats AS c
ON c.id = p.cats_id
ORDER BY title
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// delete master
// iš lentelės ištrins konkrečią eilutę pagal parametruose pateiktą ID reikšmę
app.delete("/admin/master/:id", (req, res) => {
  const sql = `
  DELETE FROM master
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Book gone', type: 'success' } });
  });
});

// Edit master
app.put("/admin/master/:id", (req, res) => {
  const sql = `
  UPDATE master
  SET name_surname = ?, spec = ?, photo = ?, city = ?, cats_id = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.name_surname, req.body.spec, req.body.photo, req.body.city, req.body.cat, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Category updated. Now it is as new', type: 'success' } });
  });
});

// delete Photo
app.delete("/admin/photos/:id", (req, res) => {
  const sql = `
  UPDATE master
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, photo gone.', type: 'success' } });
  });
});

//Front
//READ masters
app.get("/master", (req, res) => {
  const sql = `
SELECT b.id, b.name_surname, spec, photo, c.title AS cat, city
FROM master AS b
LEFT JOIN cats AS c
ON c.id = b.cats_id
ORDER BY title
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Autoservisas porte Nr ${port}`);
});
