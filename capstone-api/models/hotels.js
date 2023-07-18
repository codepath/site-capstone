const { config } = require('dotenv');
config();

const { BadRequestError } = require("../utils/errors");
const { rapidapikey, rapidapihost } = process.env;
const axios = require('axios');


class Hotels {
  static destId = '';

  //Serach Hotels by locations or name
  //The user must specificy the location or destination 
  //first (this can happen in the homepage)
  static async searchLocations(credentials) {
    const requiredFields = ["location_name"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const options = {
    method: 'GET',
    url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
    params: {
        name: credentials.location_name,
        locale: 'en-us'
    },
    headers: {
        'X-RapidAPI-Key': rapidapikey,
        'X-RapidAPI-Host': rapidapihost
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        Hotels.destId = response.data[0].dest_id;

        return response.data;
      } catch (error) {
        console.error(error);
        throw new BadRequestError("Failed to fetch Search Locations");
      }

  }

  static async searchHotels(credentials) {
    const requiredFields =
     ["order_by", 
      "adults_number",
      "checkin_date", //2023-09-07 in this format
      "checkout_date",
      "room_number"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    
    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v2/hotels/search',
      params: {
        order_by: credentials.order_by,    //Required Parameters 
        // Title: HotelsSearchOrderBy   
        // Enum: 
        // popularity,
        // class_ascending,
        // class_descending,
        // distance,
        // upsort_bh,
        // review_score,
        // price

        adults_number: credentials.adults_number, 
        // Title: Adults Number
        // Maximum: 29
        // Minimum: 1     

        checkin_date: credentials.checkin_date,

        filter_by_currency: 'USD',
        //Keeping it at USD

        dest_id: Hotels.destId, //'-553173'
        //Once the user searches the hotel by location
        //the dest_id field can be updated 

        locale: 'en-us',

        checkout_date: credentials.checkout_date,
        units: 'metric',

        room_number: credentials.room_number,
        // Title: Room Number
        // Maximum: 29
        // Minimum: 1
        // Description: Number of rooms

        dest_type: 'city',  
        //destination can be a variety 
        //we can just set it to city       


        // include_adjacency: 'true', //Optional Parameters 
        // children_number: '2',
        // page_number: '0',
        // children_ages: '5,0',
        // categories_filter_ids: 'class::2,class::4,free_cancellation::1'
      },
      headers: {
        'X-RapidAPI-Key': rapidapikey,
        'X-RapidAPI-Host': rapidapihost
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Failed to fetch Search Hotels");
    }

  }

  //gets specific data per hotel
  
  static async HotelsData(credentials) { 
    console.log("Printing Hotel Data");
    const requiredFields = ["hotel_id"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
      params: {
        hotel_id: credentials.hotel_id,
        locale: 'en-us'
      },
      headers: {
        'X-RapidAPI-Key': rapidapikey,
        'X-RapidAPI-Host': rapidapihost
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Failed to fetch Hotels Data");
    }
  }

  //Hotels Detail 
  static async HotelsDetail(credentials) {

    const requiredFields = ["hotel_id", "checkout_date", "checkin_date"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const options = {
    method: 'GET',
    url: 'https://booking-com.p.rapidapi.com/v2/hotels/details',
    params: {
        hotel_id: credentials.hotel_id,
        currency: 'USD',
        locale: 'en-us',
        checkout_date: credentials.checkout_date,
        checkin_date: credentials.checkin_date
    },
    headers: {
        'X-RapidAPI-Key': rapidapikey,
        'X-RapidAPI-Host': rapidapihost
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new BadRequestError("Failed to fetch Hotel Detail");
      }
  }
  
  
}

module.exports = Hotels;
