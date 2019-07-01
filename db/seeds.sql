-- Use new bamazon database
use bamazon_db;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("RC Helicopter", "Electronics", 199.99, 12),
("Phone Car Charger", "Electronics", 19.00, 5),
("Jumper Cables", "Auto", 59.95, 6),
("Xbox One", "Electronics", 269.99, 5),
("PS4", "Electronics", 249.99, 3),
("Handbag by Fucci", "Clothing", 599.99, 10),
("Flip Flop Sandals", "Shoes", 10.99, 22),
("Avengers: Infinity War", "Electronics", 25.99, 7),
("Cards Against Humanity", "Toys/Games", 29.95, 7),
("Dog Bed", "Pets", 50.45, 9),
("Umbrella", "Outdoors", 30.99, 12),
("Can Opener", "Kitchen", 12.99, 14);

INSERT INTO departments(department_name, over_head_costs)
VALUES("Electronics", 1000.00),
("Auto", 500.00),
("Clothing", 1500),
("Shoes", 400.00),
("Toys/Games", 400.00),
("Pets", 600.00),
("Outdoors", 400.00);