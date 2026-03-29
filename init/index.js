//Express Require
const mongoose = require("mongoose");
//data require which we create
const initData = require("./data.js");
//require listing which we create for model in which schema also defined
const Listing = require("../model/listing.js");
//connection with database
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

//We entered all data into listing collection
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"69bcc4e23c19b54bc5faa3d1",
    }));
    await Listing.insertMany(initData.data);
};
initDB();