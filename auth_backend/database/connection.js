const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth_node",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting DB: " + err);
    return;
  } else {
    console.log("DB Connection Successfull!");
  }
});

module.exports = connection;
