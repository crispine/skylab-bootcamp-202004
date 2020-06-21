const { models: { Stores } } = require("gluttony-data")
const axios = require("axios")

module.exports = (latitude, longitude) => {
    return axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
            params: {
                key: process.env.PLACES_API_KEY,
                location: `${latitude},${longitude}`,
                type: "restaurant",
                rankby: "distance"
            }
        })
        .then(({ data: { results }, status }) => {
            if (status === 200 && results.length) {
                return results[0]
            } else {
                throw new Error('Nothing found')
            }
        })
        .then(result => {
            return {
                id: result.id,
                name: result.name,
                type: "restaurant",
                location: result.place_id,
                coordinates: {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                },
                thumbnail: result.icon
            }
        })
        .then(store => {
            Stores.findById(store.id, (error, persistedStore) => {
                if (error) throw error
                if (!persistedStore) Stores.create(store)
            })

            return store.coordinates
        })
        .catch(console.log)
}