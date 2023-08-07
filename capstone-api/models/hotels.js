require('dotenv').config();

const { BadRequestError } = require("../utils/errors");
const db = require('../db')
const rapidapikey = '6e3eaf92c2msh051dfb6b48d6e1ap117a81jsnd49091eeccff'
const rapidapihost = process.env.rapidapihost
const axios = require('axios');

class Hotels {
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
        'X-RapidAPI-Key': "54ba29470amsh05ef8fbb5770f93p1e350djsnc7c4dbf60598",
        'X-RapidAPI-Host': rapidapihost
    }
    };

    try {
        const response = await axios.request(options);
        const destId = response.data[0].dest_id;
        console.log(destId)
        return destId
      } catch (error) {
        console.error(error);
        //console.error("Desination ID:", Hotels.destId)
      }

  }

  static async searchHotels(credentials) {
    const requiredFields =
     ["order_by", 
      "adults_number",
      "checkin_date", //2023-09-07 in this format
      "checkout_date",
      "room_number",
      "dest_Id"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    console.log(credentials)
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

        dest_id: '20088325', //'-553173'
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

        // page_number: '0' //uncomment this to add page number 
              
        // Title: Page Number

        // Maximum: 100000

        // Minimum: 0

        // Description: Page number

        // Default: 0
      },
      headers: {
        'X-RapidAPI-Key': "54ba29470amsh05ef8fbb5770f93p1e350djsnc7c4dbf60598",
        'X-RapidAPI-Host': rapidapihost
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      //console.error(error);
      // console.log("destination ID is:", credentials.dest_Id)
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
        'X-RapidAPI-Key': "54ba29470amsh05ef8fbb5770f93p1e350djsnc7c4dbf60598",
        'X-RapidAPI-Host': rapidapihost
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
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
        // throw new BadRequestError("Failed to fetch Hotel Detail");
      }
  }
  
  //Hotel Schema 
  static async getHotelById(id) {
    if (!id) {
      throw new BadRequestError("No id provided");
    }
    const query = `SELECT * FROM hotels WHERE id = $1`;
    const result = await db.query(query, [id]);
    const hotel = result.rows[0];
    return hotel;
  }

  static async addHotel(credentials) {
    const requiredFields = ["name", "city", "price", "check_in", "check_out"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const query = `
      INSERT INTO hotels (name, city, price, check_in, check_out)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      credentials.name,
      credentials.city,
      credentials.price,
      credentials.check_in,
      credentials.check_out,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async updateHotel(id, updates) {
    const query = `
      UPDATE hotels
      SET name = $1, city = $2, price = $3, check_in = $4, check_out = $5
      WHERE id = $6
      RETURNING *
    `;
    const { name, city, price, check_in, check_out } = updates;
    const values = [name, city, price, check_in, check_out, id];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async deleteHotel(id) {
    const query = `
      DELETE FROM hotels
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }


  
}

module.exports = Hotels;
