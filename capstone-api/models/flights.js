const { BadRequestError } = require("../utils/errors");
const db = require("../db"); 
const  Duffel = require('@duffel/api');

const duffel = new Duffel({
    token: process.env.duffle_api
  })

class Flights {
  static async getOffer() {
    
    const offerRequest = await duffel.offerRequests.create({
        "slices": [
        {
            "origin": 'LHR',
            "destination": 'JFK',
            "departure_date": "2024-02-01T13:53:53.036Z"
        },
        ],
        "passengers": [{ "type": "adult" }],
        "cabin_class": null
    })
    
    const offers = await duffel.offers.list(offerRequest.data.id) 
    }
}

module.exports = Flights;
