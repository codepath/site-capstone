const { BadRequestError } = require("../utils/errors");
const pool = require("../db"); 
const { Duffel } = require('@duffel/api');
require('dotenv').config();

class Flights {
  static async getFlights(credentials) {
    console.log(credentials)

    const duffel = new Duffel({
      token: "duffel_test_PwMSWPBOo5HwcWsjB95GFF2vwlbMPErj1AYQ53vSFmI",
    });

    const requiredFields = [ 'numTravelers', 'origin', 'destination', 'departure_date', 'arrival_date', 'cabin_class' ];
    
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    function generatePassengers(numTravelers) {
      let passengers = [];
      for (let i = 0; i < numTravelers; i++) {
        passengers.push({ "type": "adult" });
      }
      return passengers;
    }

    const offerRequest = {
        "slices": [
          {
            "origin": credentials.origin,
            "destination": credentials.destination,
            "departure_date": credentials.departure_date
          },
          {
            "origin": credentials.destination,
            "destination": credentials.origin,
            "departure_date": credentials.arrival_date
          }
        ],
        "passengers": generatePassengers(credentials.numTravelers),
        "cabin_class": credentials.cabin_class
    }

    try {
      const offerRequestResponse = await duffel.offerRequests.create(offerRequest);
      let offerRequestId = offerRequestResponse.data.id;

      const fetchOffers = async (offerRequestId) => {
        let offers = [];
        const startTime = Date.now();

        while (true) {
          const offersResponse = await duffel.offers.list({ offer_request_id: offerRequestId, "page[limit]": 1 });
          offers = offersResponse.data;
          if (offers.length > 0 || Date.now() - startTime > 30000) {
            break;
          }
          await new Promise(r => setTimeout(r, 2000));
        }
         offers = offers.filter(offer => offer.slices.every(slice => slice.segments.length === 1));

        offers = offers.map(offer => ({
          id: offer.id,  // Add the id field here
          totalAmount: offer.total_amount,
          totalCurrency: offer.total_currency,
          slices: offer.slices.map(slice => ({
            segments: slice.segments.map(segment => ({
              origin: segment.origin.name,
              destination: segment.destination.name,
              departingAt: segment.departing_at,
              arrivingAt: segment.arriving_at,
              carrier: {
                name: segment.marketing_carrier.name,
                logoUrl: segment.marketing_carrier.logo_symbol_url,
                website: segment.marketing_carrier.conditions_of_carriage_url,
              }
            })),
          })),
        }));

        
        return offers;
      }

      let offers = await fetchOffers(offerRequestId);
      console.log(offers);
      return offers;

    } catch(error) {
      console.error(error);
      throw new Error(`Failed to retrieve flights. Error: ${error.message}`)
    }
  }
  
  static async addFlight(flightData) {
  
    const requiredFields = [flightData.origin, flightData.destination, flightData.departing_at, flightData.arriving_at, flightData.carrier, flightData.carrier.name];
    if (!flightData) {
      throw new BadRequestError(`Invalid request body.`);

    }
    const flightQuery = `
      INSERT INTO flights (origin, destination, departing_at, arriving_at, carrier_name, carrier_logo_url, carrier_website)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    const flightValues = [flightData.origin, flightData.destination, flightData.departing_at, flightData.arriving_at, flightData.carrier.name, flightData.carrier.logoUrl, flightData.carrier.website];
    const flightResult = await pool.query(flightQuery, flightValues);
    const flight = flightResult.rows[0];

    return flight;
  }




}

module.exports = Flights;
