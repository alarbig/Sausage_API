
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
# Sausage REST API

Hello! This is a small side project that I decided to create while I am learning JavaScript. The goal of this project was to be a large catalogue of the worlds sausages. This is still very much a work in progress, but overtime I would like to add breakdowns by regions, recipes list and more. 


## Features

- Country of Origin
- Image links
- Type of sausage
- Descriptions


## Installation

To install this project you will need to first have Node.js installed, as well as MySQL and have an account created within MySQL. This project uses Sequelize.  
Once that is completed, git clone this repo. In the future this API will be hosted on an external website, so there will be no need for a installation. But if you would like to play around with this these are the steps needed. 

```bash
  cd Sausage_API
  npm i (to install the needed packages)
  In your terminal you need need to create the DB and tables
    - mysql -u (your user name) -p 
    (once logged in you can then run the SQL command to establish the DB)
    - CREATE DATABASE sausage_db;
    - to confirm the database has been created you can run the commmand, SHOW DATABASE;
```
Now you need to setup your .env file. 
```bash
    DB_NAME=Sausage_db
    DB_USER=(your MySQL username)
    DB_PASSWORD=(your user account password)
    PORT=(whatever you want, I set mine to 3000)
```
Once that is setup to run the server run the command:
```bash
    npm start
```
And now it should be running! You can Make POST, PUT, DELETE, and GET with your tool of choice. I have been using [Insomnia](https://insomnia.rest/) but that is just a personal preference. 
## Demo

https://www.awesomescreenshot.com/video/23970455?key=fd4886d66b11a6d7959a9d058ee36bad


## Screenshots



