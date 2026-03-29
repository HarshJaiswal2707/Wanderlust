const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const getCoordinates = require("../utils/geocode");
// creation listing collection
const Listing = require("../model/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
router
    .route("/")
    .get(wrapAsync(listingController.index))
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    .post(isLoggedIn, upload.single("listing[image][url]"), validateListing, wrapAsync(listingController.createListing));
//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner,upload.single("listing[image][url]"), validateListing, wrapAsync(listingController.updateLisitng))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Show route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editForm));

module.exports = router;