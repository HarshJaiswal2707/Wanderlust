require("dotenv").config({ path: "../.env" });
const User = require("../model/user");
const mongoose = require("mongoose");
const Listing = require("../model/listing");
const { data: sampleListings } = require("../init/data");

const MONGO_URL = process.env.ATLASDB_URL;
const categories = [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Castles",
    "Farms",
    "Arctic",
    "Domes",
    "Boats"
];
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => {
        console.log("connected to DB");
        initDB();
    })
    .catch((err) => {
        console.log(err);
    });

const initDB = async () => {
    await Listing.deleteMany({});
    const user = await User.findOne(); // ek valid user uthao

    const updatedListings = sampleListings.map((obj) => ({
        ...obj,
        owner: user._id,
        category: categories[
            Math.floor(Math.random() * categories.length)
        ]
    }));

    await Listing.insertMany(updatedListings);

    console.log("Database Seeded!");
    mongoose.connection.close();
};

