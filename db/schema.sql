CREATE DATABASE friends_db;
USE friends_db;

CREATE TABLE IF NOT EXISTS profiles (
   name VARCHAR(25),
   photo VARCHAR(255),
   scores VARCHAR(100)
);