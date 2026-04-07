require("dotenv").config();
const User = require("../model/user");
const mongoose = require("mongoose");
const Listing = require("../model/listing");
const {data:sampleListings}=require("../init/data");

const MONGO_URL = process.env.ATLASDB_URL;

async function main(){
    await mongoose.connect(MONGO_URL);
}
main()
.then(()=>{
    console.log("connected to DB");
    initDB();
})
.catch((err)=>{
    console.log(err);
});

const initDB = async()=>{
    await Listing.deleteMany({});
  const user = await User.findOne(); // ek valid user uthao

    const updatedListings = sampleListings.map((obj) => ({
        ...obj,
        owner: user._id, 
    }));

    await Listing.insertMany(updatedListings);

    console.log("Database Seeded!");
};

