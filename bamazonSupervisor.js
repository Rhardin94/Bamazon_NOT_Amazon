//Importing all required module to make app work
const dotenv = require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const table = require("table");
//Create connection with mysql database to retrieve and manipulate data
const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
//Checking the connection
connection.connect(function (err) {
  try {
    console.log("Connected as id " + connection.threadId);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Successfully Connected!");
  }
});
function superInit() {

};
function deptSales() {
  let query = "SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS product_sales,  SUM(p.product_sales) - d.over_head_costs AS total_profits ";
  query += "FROM departments d INNER JOIN products p ";
  query += "WHERE d.department_name = p.department_name ";
  query += "GROUP BY d.department_id, d.department_name";
  connection.query(query, function(err, results) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      console.log(results[i].department_id + " | " + results[i].department_name + " | " + results[i].over_head_costs + " | " + results[i].product_sales + " | " + results[i].total_profits);
    } 
  })
}
deptSales();