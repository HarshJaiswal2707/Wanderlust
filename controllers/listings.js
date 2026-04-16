const Listing = require("../model/listing");
const getCoordinates = require("../utils/geocode");
// Pages of all Listing
module.exports.index = async (req, res) => {
    let { search, category } = req.query;
    let query = {};
    // Search filter
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ];
    }
    // Category filter (except Trending)
    if (category && category !== "Trending") {
        query.category = category;
    }
    let allListings;
    if (category === "Trending") {
        // Trending: latest 8 listings
        allListings = await Listing.find({})
            .sort({ createdAt: -1 })
            .limit(8);
    } else {
        // Normal search + category filter
        allListings = await Listing.find(query);
    }
    res.render("listings/index.ejs", { allListings, search, category });
};
//Page display for create listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};
//Listing page will show.
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist ");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};
//New Listing Create
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const { location } = req.body.listing;
    //Forward Geocoding
    const coords = await getCoordinates(location);
    const newListing = new Listing({
        ...req.body.listing,
        coordinates: coords
    });
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};
module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist ");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl.replace('/upload', "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const { location } = req.body.listing;
    const coords = await getCoordinates(location);
    let listing = await Listing.findByIdAndUpdate(
        id,
        {
            ...req.body.listing,
            coordinates: coords
        },
        { new: true }
    );
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { filename, url };
        await listing.save();
    }
    req.flash("success", " updated Listing!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}