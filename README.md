## Bamazon_NOT_Amazon is a mock amazon store interfance
### Demo found here: "https://drive.google.com/file/d/1Y4ZtCnFz6rCUDe69aqrM64HyLaljF393/view?usp=sharing"
## Overview
Bamazon is a command line interface (CLI) app that functions as a mock amazon store, and requires node.js, and MySql workbench or mySql utility to function. The user is given the option of running the program with node under three different roles:
* Customer
* Manager
* Supervisor
## How to set up
To use Bamazon, run `git clone https://github.com/Rhardin94/Bamazon_NOT_Amazon.git` in your command line from the desired location for the repo. Once cloned, navigate to the root directory of the repo and run `npm i` to download inquirer and other necessary packages.

While downloading, open MySQL Workbench and run schema.sql and seeds.sql from the db folder. After successfully adding the database, create a .env file with HOST, PORT, USER, PASSWORD, and DATABASE variables based on your connection info.

Once the packages are installed, the user may run `node bamazonCustomer.js`, `node bamazonManager.js`, or `node bamazonSupervisor.js` respectively to experience each role of the app.
## How to use
Bamazon is split into 3 separate roles that interacts with the user differently. First the user must decide between the customer, manager, or supervisor role before launching the corresponding file.

### Customer
On launching the app, the customer is welcomed to the store and presented with a table of products available and prompted to select a product id to begin an order inquiry.

![welcome screen with table and scroll wheel to selected id to order via arrow keys](/assets/screenshots/customer/home.jpg)

Once the customer has selected a product, they are then prompted for the quantity they wish to order.

![store asking for quantity input](/assets/screenshots/customer/quantity.jpg)

If the store has the necessary quantity requested, the customer is informed of their successful order, the cost, and prompted to order again or exit.

![successful order with cost](/assets/screenshots/customer/success.jpg)

If the store does not have the quantity requestion, the order is denied and the insufficient quantity error is shown, prompting the customer to order again or exit.

![insufficient quantity](/assets/screenshots/customer/err.jpg)

If the customer chooses to order again, they are presented with the homescreen. Otherwise, they are given a farewell message.

![Thanks for shopping!](/assets/screenshots/customer/exit.jpg)

### Manager
Upon launch, the manager is prompted with a multitude of functions relevant to their position.

![View products for sale, view low inventory, add inventory, add product](/assets/screenshots/manager/home.jpg)

If the manager selects view products for sale they are presented a table slightly different to the customer and asked to do something else.

![table showing products for sale with stock available](/assets/screenshots/manager/currents.jpg)

If the manager selects "View Low Inventory" they are presented with a table only containing products with a quantity of 5 or less.
The manager is also prompted to add stock to low inventory produts.

![table show low inventory](/assets/screenshots/manager/low.jpg)

If the manager chooses to add stock, they are asked to select a product and quantity of stock.
The manager may also add stock from the home screen.

![prompt to select product and quantity](/assets/screenshots/manager/stock.jpg)
![successfully added stock](/assets/screenshots/manager/added.jpg)

The manager may also add a product by providing the product name, department, cost, and quantity.

![add a product](/assets/screenshots/manager/new.jpg)

The manager may then 'do more managering' or exit, and are given a 'fond' farewell.

![get out!](/assets/screenshots/manager/exit.jpg)

### Supervisor
After launching, the supervisor is prompted with their respective functions.

![view sales by department, add a department](/assets/screenshots/supervisor/home.jpg)

When the supervisor selects 'View Product Sales by Department' they are presented a table with each departments sales and overhead costs, as well as profits.

![sales table](/assets/screenshots/supervisor/sales.jpg)

If the user chooses to add a new department, they must provide the department name and overhead costs.

![add a department](/assets/screenshots/supervisor/add.jpg)

The supervisor may then add more departments, check the product sales again, or exit and are given a 'touching' message

![goodbye, pitiful human!](/assets/screenshots/supervisor/exit.jpg)

Do not be alarmed if your new department does not show up initially, the new department must run down the chain of command; The manager must add new products for the new department to calculate overhead costs properly.

## Tech
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Figlet](https://www.npmjs.com/package/figlet)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [MySQL](https://www.mysql.com/)
* [Table](https://www.npmjs.com/package/table)
