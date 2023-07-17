const { BadRequestError } = require("../utils/errors");
const { rapidapikey, rapidapihost } = require("../constants");
const axios = require('axios');

class Hotels {
   //This is all the Hotel Data from Booking.com

  static async HotelsData() { // Mark the method as async
    console.log("Printing Hotel Data");

    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
      params: {
        hotel_id: '1377073',
        locale: 'en-gb'
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
        currency: 'AED',
        locale: 'en-gb',
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
        locale: 'en-gb'
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
}

module.exports = Hotels;
