require("dotenv").config()

const ConnectDB = require("./db/connect");

const Destination = require("./models/TravelModel")
const User = require("./models/UserModel")

const destinationJson = require("./travel.json")
const userJson = require("./user.json")


const Start = async()=>{
  try {
    await ConnectDB(process.env.MONGODB_URL);

    await  Destination.deleteMany();
    await  Destination.create(destinationJson);

    await User.deleteMany();
    await User.create(userJson)
    console.log("success")
  } catch (error) {
    console.log(error)
  }
}

Start()