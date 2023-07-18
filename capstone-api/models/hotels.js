const { BadRequestError } = require("../utils/errors");
const { rapidapikey, rapidapihost } = require("../constants");
const axios = require('axios');

class Hotels {
  //gets specific data per hotel
  static async HotelsData() { 
    console.log("Printing Hotel Data");

    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
      params: {
        hotel_id: '1377073',
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
  static async HotelsDetail() {

    const options = {
    method: 'GET',
    url: 'https://booking-com.p.rapidapi.com/v2/hotels/details',
    params: {
        hotel_id: '1676161',
        currency: 'USD',
        locale: 'en-us',
        checkout_date: '2023-09-28',
        checkin_date: '2023-09-27'
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
  //Serach Hotels by locations or name 
  static async searchLocations() {

    const options = {
    method: 'GET',
    url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
    params: {
        name: 'Berlin',
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
        throw new BadRequestError("Failed to fetch Search Locations");
      }

  }
  static async searchHotels() {
    
    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v2/hotels/search',
      params: {
        order_by: 'popularity',    //Required Parameters 
        // Title: HotelsSearchOrderBy   
        // Enum: popularity,
        // class_ascending,
        // class_descending,
        // distance,
        // upsort_bh,
        // review_score,
        // price

        adults_number: '2', 
        // Title: Adults Number
        // Maximum: 29
        // Minimum: 1     

        checkin_date: '2023-09-27',

        filter_by_currency: 'USD',
        //Keeping it at USD

        dest_id: '-553173',
        //Once the user searches the hotel by location
        //the dest_id field can be updated 

        locale: 'en-us',

        checkout_date: '2023-09-28',
        units: 'metric',

        room_number: '1',
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
        'X-RapidAPI-Key': 'd5b79bbf63msh0ce0c9133517274p18ee9ejsn93fc8580b619',
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
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
}

module.exports = Hotels;
