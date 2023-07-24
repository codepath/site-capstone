const { config } = require('dotenv');
config();

const { BadRequestError } = require("../utils/errors");
const { authorization } = process.env;
const axios = require('axios');


class ThingsToDo {

    static async searchPlaces(credentials) {   

        const requiredFields = ["query", "min_price", "max_price", "near", "sort"];
        requiredFields.forEach((field) => {
        if (!credentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
        }
        });


        const options = {
        method: 'GET',
        url: 'https://api.foursquare.com/v3/places/search',
        params: {
            query: credentials.query,
            //A string to be matched against all content for this place, 
            //including but not limited to venue name, category,
            // telephone number, taste, and tips.

            fields: 'description,fsq_id,name,location,categories,related_places,link,website,rating,price,photos',
            //These wont change 

            min_price: credentials.min_price,
            max_price: credentials.max_price,
            //Restricts results to only those places within the specified price range. 
            //Valid values range between 1 (most affordable) to 4 (most expensive), inclusive.


            near: credentials.near,
            //A string naming a locality in the world (e.g., "Chicago, IL"). 
            //If the value is not geocodable, returns an error.
            //can also enter just chicago, lets leave it at city

            sort: credentials.sort,
            //Specifies the order in which results are listed. Possible values are:
            // relevance (default)
            // rating
            // distance

            limit: '10'
            // The number of results to return, up to 50. Defaults to 10.
            //(If you want more results feel free to change this number)
        },
        headers: {
            accept: 'application/json',
            Authorization: authorization
        }
        };

        axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });

    }
}

module.exports = ThingsToDo;