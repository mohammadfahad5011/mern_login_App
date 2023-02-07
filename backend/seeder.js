const mongoose = require("mongoose");
const dotenv = require("dotenv");

const users = require("./dummyData/users");
const UserModal = require("./src/Models/UserModal");
const dbConnection = require("./server");
require("colors");

dotenv.config();

dbConnection();

const importData = async () => {
  try {
    // create user
    const createUsers = await UserModal.insertMany(users);
    console.log("Data Imported !".green.inverse);
    process.exit();
  } catch (error) {
    // res.status(404).send(error.message);
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await UserModal.deleteMany();
    console.log("Data deleted !".red.inverse);
    process.exit();
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error);
    // process.exit(1)
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
