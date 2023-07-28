const { config } = require('dotenv');
config();

const { BadRequestError } = require("../utils/errors");
const authorization = "fsq31LDK9vloB6M3nFx1hNBD1pEvLDgar9CFbNcXfKbxVfw="
const axios = require('axios');


class ThingsToDo {
    //search places must be called first and the user has to select the places they want
    //you have to store the fsq_id for each place the user selects 
    //this will be used in other endpoints to get more information like place detail
    //or for place photos 
    static async searchPlaces(credentials) {  
        console.log('Credentials', credentials) 

        const requiredFields = ["query", "min_price", "max_price", "near", "sort"];
        requiredFields.forEach((field) => {
           // console.log("cred",credentials)
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

       
        try {
            const results = await axios.request(options)  
            return results
        } catch(error) {
            console.error(error);
            return null
        }

      
    }
    //After calling search places 
    //you take the fsq_id and find more info about the place 
    static async placesDetail(credentials) {
    
        const requiredFields = ["fsq_id"];
        requiredFields.forEach((field) => {
        if (!credentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
        }
        });

        const options = {
        method: 'GET',
        url: `https://api.foursquare.com/v3/places/${credentials.fsq_id}`,
        params: {
            fields: 'fsq_id,name,location,categories,related_places,link,description,website,rating,price,photos'
            //what the json response will contain this wont be changed
        },
        headers: {
            accept: 'application/json',
            Authorization: authorization
        }
        };

        try {
            const results = await axios.request(options)  
            return results
        } catch(error) {
            console.error(error);
            return null
        }
    

    }
    static async placesPhotos(credentials) {

        const requiredFields = ["fsq_id", "limit", "sort", "classifications"];
        requiredFields.forEach((field) => {
        if (!credentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
        }
        });


        const options = {
        method: 'GET',
        url: `https://api.foursquare.com/v3/places/${credentials.fsq_id}/photos`,
        params: {limit: credentials.limit, sort: credentials.sort, classifications: credentials.classifications},
        //Limit: The specified number of photos per page. Returns 10 photos by default, up to a maximum number of 50.
        //Change this as needed

        //Sort: Specifies the order in which results are listed. Possible values are:
        // popular (default) - sorts results based on their popularity among Foursquare users
        // newest - sorts results from most recently added to least recently added
        //Change this as needed


        //Classifications: 
        // Restricts the results to photos matching the specified classifications, 
        //separated by a comma. 

        //Possible values are:

        // food - photos of food
        // indoor - photos of indoors
        // menu - photos of menus
        // outdoor - photos of storefronts, outdoors, and exteriors
        //change this as needed 


        headers: {
            accept: 'application/json',
            Authorization: authorization
        }
        };


        try {
            const results = await axios.request(options)  
            return results
        } catch(error) {
            console.error(error);
            return null
        }


    }
}

module.exports = ThingsToDo;