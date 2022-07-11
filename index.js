const { application } = require("express");
const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mysqlnode",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

const app = express();

// Create database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE mysqlnode";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database created");
  });
});

// Create Table
app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee table created");
  });
});

// Insert employee
app.get("/employee1", (req, res) => {
  let post = {
    name: "Lamidi Hassan Taiwo",
    designation: "Senior FullStack Developer",
  };
  let sql = "INSERT INTO employee SET ?";
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee added");
  });
});

//Get employee
app.get("/getemployee", (req, res) => {
  let sql = "SELECT * from employee";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("Employee details fetched");
  });
});

// update employee
app.get("/updateemployee/:id", (req, res) => {
  let newName = "Lamidi Taiwo";
  let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id} `;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee updated");
  });
});

// delete employee
app.get("/deleteemployee/:id", (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.json("Employee Deleted");
  });
});

app.listen("3000", () => {
  console.log("Server started at 3000");
});
