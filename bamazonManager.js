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

function managerInit() {
  inquirer
    .prompt([{
      name: "managerAction",
      type: "list",
      message: "Welcome, your excellency. How can I help you?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (response) {
      switch (response.managerAction) {
        case "View Products for Sale":
          listProducts();
          break;
        case "View Low Inventory":
          lowQuantity();
          break;
        case "Add to Inventory":
          addQuantity();
          break;
        case "Add New Product":
          addProduct();
          break;
      }
    })
};
managerInit();

function listProducts() {
  connection.query(
    "SELECT * FROM products",
    function (err, products) {
      console.log("\nCurrent Products:");
      for (let i = 0; i < products.length; i++) {
        console.log("\n" + products[i].item_id + " | " + products[i].product_name + " | $" + products[i].price + "\n");
      }
    }
  )
  inquirer
    .prompt([{
      name: "more",
      type: "confirm",
      message: "Would you like to do something else?"
    }]).then(function (answer) {
      if (answer.more) {
        managerInit();
      } else {
        console.log("Fine then!");
        connection.end();
      }
    })
};

function lowQuantity() {
  connection.query(
    "SELECT * FROM products WHERE stock_quantity < 5",
    function (err, products) {
      console.log("\nLow Quantity Products ");
      for (let j = 0; j < products.length; j++) {
        console.log("\n" + products[j].item_id + " | " + products[j].product_name + " | $" + products[j].price + " | " + products[j].stock_quantity + "\n");
      }
    }
  )
  inquirer
    .prompt([{
      name: "wannaAdd",
      type: "confirm",
      message: "Would you like to add any stock?"
    }]).then(function (response) {
      if (response.wannaAdd) {
        addQuantity();
      } else {
        console.log(figlet.textSync("You are the weakest link, goodbye.", {
          font: "Big",
          horizontalLayout: "default",
          verticalLayout: "default"
        }));
        connection.end();
      }
    })
};

function addQuantity() {
  connection.query(
    "SELECT * FROM products",
    function (err, products) {
      inquirer
        .prompt([{
            name: "whatItem",
            type: "list",
            message: "What item would you like to stock?",
            choices: function () {
              let choicesArray = [];
              for (let l = 0; l < products.length; l++) {
                choicesArray.push(products[l].product_name);
              }
              return choicesArray;
            }
          },
          {
            name: "whatAmount",
            type: "input",
            message: "What quantity would you like to add?",
            validate: function (val) {
              if (!isNaN(val)) {
                return true;
              }
              return false;
            }
          }
        ]).then(function(answer) {
          let chosenItem;
          for (let f = 0; f < products.length; f++) {
            if (products[f].product_name === answer.whatItem) {
              chosenItem = products[f];
            }
          }
          if (answer.whatAmount) {
            console.log(answer.whatAmount);
            console.log("Successfully added " + answer.whatAmount + " units to " + chosenItem.product_name + " stock!");
            let newQuantity = chosenItem.stock_quantity + parseInt(answer.whatAmount);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQuantity
                },
                {
                  product_name: chosenItem.product_name
                }
              ]
            )
          } else {
            console.log("Ruh roh, fix this fix-it-man!");
          }
          moreManagering();
        })
    }
  )
};
function moreManagering() {
  inquirer
    .prompt([
      {
        name: "more",
        type: "confirm",
        message: "Would you like to do more managering?"
      }
    ]).then(function(answer) {
      if (answer.more) {
        managerInit();
      } else {
        console.log(figlet.textSync("Then GET OUT!",
        {
          font: "Big",
          horizontalLayout: "default",
          verticalLayout: "default"
        }));
        connection.end();
      }
    })
}