const { BadRequestError } = require("../utils/errors");
const { rapidapikey, rapidapihost } = require("../constants");
const axios = require('axios');

class Hotels {
  static async hotelsList() { // Mark the method as async
    console.log("entered");

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
      throw new BadRequestError("Failed to fetch hotels");
    }
  }
}

module.exports = Hotels;
