-- Database: onehealth

-- DROP DATABASE IF EXISTS onehealth;

CREATE DATABASE onehealth
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Creating the schemas
CREATE SCHEMA customer_management;
CREATE SCHEMA medication_management;
CREATE SCHEMA manufacturer_management;

-- Creating the manufacturer table
CREATE TABLE manufacturer_management.manufacturer (
    manufacturer_code INTEGER PRIMARY KEY NOT NULL UNIQUE,
    manufacturer_name VARCHAR(50),
    reward VARCHAR(500),
    points_needed INTEGER
);

-- Creating the medication table
CREATE TABLE medication_management.medication (
    ndc VARCHAR(15) PRIMARY KEY NOT NULL UNIQUE,
    brand_name VARCHAR(100),
    generic_name VARCHAR(100),
    manufacturer_code INTEGER,
    indication VARCHAR(1000),
    CONSTRAINT fk_manufacturer FOREIGN KEY (manufacturer_code) REFERENCES manufacturer_management.manufacturer (manufacturer_code)
);

-- Creating the customer_profile table
CREATE TABLE customer_management.customer_profile (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    age INTEGER,
    medical_history VARCHAR(1000),
    account_created DATE NOT NULL DEFAULT CURRENT_DATE,
    ndc VARCHAR(15) NOT NULL,
    total_points INTEGER,
    CONSTRAINT fk_ndc FOREIGN KEY (ndc) REFERENCES medication_management.medication (ndc)
);