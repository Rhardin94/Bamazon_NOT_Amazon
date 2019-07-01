-- Makes sure there is no database that already exists
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the database for bamazon functionality
CREATE DATABASE bamazon_db;
-- Creating products table
CREATE TABLE products (
  id INT AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quatity INT(10),
  product_sales DECIMAL(7,2) DEFAULT NULL,
  PRIMARY KEY (id)
);
-- Create departments table
CREATE TABLE departments (
  id INT AUTO_INCREMENT,
  department_name VARCHAR(40) NOT NULL,
  over_head_costs DECIMAL(7,2) NOT NULL,
  PRIMARY KEY (id)
);
