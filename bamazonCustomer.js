const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Frogsand1!",
  database: "bamazon_db"
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
});
function storeInit() {
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
      if (err) throw err;
      connection.query(
        "SELECT * FROM products WHERE item_id=?", [parseInt(res.itemID)], function(err, data) {
          if (err) throw err;
          if (data.stock_quantity <= res.itemQuantity) {
            console.log("\nYou have succesfully purchased " + res.itemQuantity + " of " + data.product_name + "!");
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [{
                  stock_quantity: data.stock_quantity -= res.itemQuantity
                },
                {
                  item_id: res.itemID
                }
              ],
              function() {
                connection.end();
              });
          } else {
            console.log("\nERR-Unable to complete your order due to: Insufficient Quantity!");
            //connection.end();
          }
        });
});
}
storeInit();