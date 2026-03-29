const axios = require("axios");

async function getCoordinates(location) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${location}`;

        const response = await axios.get(url, {
    headers: {
        "User-Agent": "HARSH-APP (student@gmail.com)"
    }
});

        if (response.data.length === 0) {
            throw new Error("Location not found");
        }

        return {
            lat: parseFloat(response.data[0].lat),
            lng: parseFloat(response.data[0].lon)
        };

    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = getCoordinates;