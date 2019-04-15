const dotenv = require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
connection.connect(function(err) {
  try {
  console.log("Connected as id " + connection.threadId);
  } catch(err) {
    console.log(err);
  } finally {
    console.log("Successfully Connected!");
  }
});
function initStore() {
  connection.query(
    "SELECT * FROM products", function(err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "itemID",
            type: "rawlist",
            message: "Welcome to Bamazon! Select a product ID to begin.",
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
    if (response.buyMore[0]) {
      initStore();
    } else {
      console.log("Thank you for shopping with us! Have a wonderful day!");
      connection.end();
    }
  })
};
initStore();
/*function storeInit() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "itemID",
        message: "Welcome to Bamazon! Select a product ID to begin.",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      },
      {
        type: "input",
        name: "itemQuantity",
        message: "What quantity of that item would you like to purchase?",
        validate: function(value) {
          if (!isNaN(value)) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(err, res) {
      try {
        let selectedID = parseInt(res.itemID);
        console.log(selectedID);
      connection.query(
        "SELECT * FROM products WHERE item_id=?", [selectedID], function(err, data) {
          for (let i = 0; i < data.length; i++) {
          if (data[i].stock_quantity <= res.itemQuantity) {
            console.log("\nYou have succesfully purchased " + res.itemQuantity + " of " + data[i].product_name + "!");
            //storeBuy();
            return res.itemQuantity && data[i].stock_quantity && res.itemID;
          } else {
            console.log("\nERR-Unable to complete your order due to: Insufficient Quantity!");
            //connection.end();
          }
        }
        });
      } catch(err) {
        console.log(err);
      } finally {
        console.log("Success, moron!");
      }
      });
}
/*function storeBuy() {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [{
        stock_quantity: data[i].stock_quantity -= res.itemQuantity
      },
      {
        item_id: res.itemID
      }
    ],
    function() {
      connection.end();
    });
}
/*try {
connection.query("SELECT * FROM products WHERE item_id=?", [1], function(err, data) {
  for (let i = 0; i < data.length; i++) {
  console.log(data[i].item_id + data[i].product_name + data[i].department_name + data[i].price + data[i].stock_quantity);
  console.log(data);
  }
})
} catch(err) {
  console.log(err);
} finally {
  console.log("Query Success!");
  connection.end();
}*/