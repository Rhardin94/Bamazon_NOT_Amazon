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
connection.connect(function(err) {
  try {
  console.log("Connected as id " + connection.threadId);
  } catch(err) {
    console.log(err);
  } finally {
    console.log("Successfully Connected!");
  }
});
//Main function that allows user to order items from the bamazon catalogue.
function initStore() {
  connection.query(
    "SELECT * FROM products", function(err, results) {
      if (err) throw err;
      console.log(figlet.textSync("Welcome to Bamazon!",
      {
        font: "Big",
        horizontalLayout: "default",
        verticalLayout: "default"
      })); 
      console.log("Here's a list of our current products in stock:")
      for (let f = 0; f < results.length; f++) {
        console.log("\n" + results[f].item_id + " | " + results[f].product_name + " | $" + results[f].price + "\n");
      }
      inquirer
        .prompt([
          {
            name: "itemID",
            type: "rawlist",
            message: "Select a product ID to begin.",
            choices: function() { //populate choices with actual Database info
              let choicesArray = [];
              for (let i = 0; i < results.length; i++) {
                choicesArray.push(JSON.stringify(results[i].item_id));
              }
              return choicesArray;
            }
          },
          {
            name: "itemQuantity",
            type: "input",
            message: "What quantity of that item would you like to order?",
            validate: function(val) {
              if (!isNaN(val)) {
                return true;
              }
              return false;
            }
          }
        ]).then(function(answers) {
          //Check if IDs match to correspond to DB
          let chosenItem;
          for (let j = 0; j < results.length; j++) {
            if (results[j].item_id === parseInt(answers.itemID)) {
              chosenItem = results[j];
            }
          }
          //Check if quantity requested in order is available
          if (chosenItem.stock_quantity >= parseInt(answers.itemQuantity)) {
            console.log("Successfully ordered " + answers.itemQuantity + " of " + chosenItem.product_name + " for $" + (chosenItem.price * answers.itemQuantity));
            let newQuantity = chosenItem.stock_quantity - parseInt(answers.itemQuantity);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQuantity
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) throw err;
                anotherBuy();
              }
            )
          } else {
            console.log("ERR-Insufficient Quantity!");
            anotherBuy();
          }
        })
    }
  )
};
//Checks if user wants to order more or exit the store.
function anotherBuy() {
  inquirer
  .prompt([
    {
      name: "buyMore",
      message: "Would you like to place another order or exit the store?",
      type: "list",
      choices: ["Place another order", "Exit"]
    }
  ]).then(function(response) {
    if (response.buyMore[0]) { //If they chose to place another order, run the initStore program again.
      initStore();
    } else { //Or end the connection/program
      console.log("Thank you for shopping with us! Have a wonderful day!");
      connection.end();
    }
  })
};
initStore();