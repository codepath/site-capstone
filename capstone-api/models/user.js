const { BadRequestError } = require("../utils/errors");
const pool = require('../db');
const { addHotel, deleteHotel } = require('./hotels');
const { addActivity, deleteActivity } = require('./activities');
const { v4: uuidv4 } = require('uuid');
const { addFlight } = require("./flights")

class User {
  //User Functions
  static async getAllUsers() {
    const query = `SELECT * FROM users`;
    const result = await pool.query(query);
    const users = result.rows;
    return users;
  }

  static async getUserById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    const user = result.rows[0];
    return user;
  }

  static async updateUser(id, updates) {
    const { email, password, phone_number } = updates;
    const query = `
      UPDATE users
      SET email = $1, password = $2, phone_number = $3
      WHERE id = $4
    `;
    await pool.query(query, [email, password, phone_number, id]);
  }

  static async deleteUser(id) {
    const query = `DELETE FROM users WHERE id = $1`;
    await pool.query(query, [id]);
  }
  

  //Itinerary Array

  static async addHotelWithActivitiesToItinerary(credentials) {
      const {userId, hotelData, activities, flightData} = credentials;
      console.log(credentials);

      if (!hotelData || !hotelData.name || !hotelData.city || !hotelData.price || !hotelData.check_in || !hotelData.check_out) {
        throw new BadRequestError("Hotel data is missing or invalid.");
      }

      if (!activities) {
        throw new BadRequestError("Activities is invalid");
      }

      if (!flightData ) {
        throw new BadRequestError("Flight data is missing or invalid.");
      }

      
      // Step 1: Add the hotel and get its primary key (id) and add flights 
      const flight = await addFlight(flightData);
      const flightId = flight.id;

      const hotel = await addHotel(hotelData);
      const hotelId = hotel.id;

      // Step 2: Add activities to the activity table and get their primary keys (ids)
      const activityIds = [];
      for (const activity of activities) {
        const activityObj = await addActivity(activity);
        activityIds.push(activityObj.id); 
      }

      const itineraryId = uuidv4(); // Generate a unique itineraryId using UUID
      const itinerary = {
        itineraryId, // Add the generated itineraryId to the itinerary object
        hotel: hotelId,
        activities: activityIds,
        flight: flightId,
      };
  
      // Step 4: Add the itinerary to the user's itineraries array
      const query = `
        UPDATE users
        SET itineraries = itineraries || $1
        WHERE id = $2
      `;
      await pool.query(query, [JSON.stringify([itinerary]), userId]);
  
      return itinerary;
  }

  static async getUserItineraries(userId) {

    const query = `SELECT itineraries FROM users WHERE id = $1`;
    const result = await pool.query(query, [userId]);
    const user = result.rows[0];
    if (!user) {
      throw new BadRequestError("User not found.");
    }
  
    const itineraries = user.itineraries || [];
    const itinerariesWithDetails = [];
  
    for (const itinerary of itineraries) {
      // Fetch hotel details from the 'hotels' table using hotel primary key (id)
      const hotelQuery = `SELECT * FROM hotels WHERE id = $1`;
      const hotelResult = await pool.query(hotelQuery, [itinerary.hotel]);
      const hotel = hotelResult.rows[0];

      const flightQuery = `SELECT * FROM flights WHERE id = $1`;
      const flightResult = await pool.query(flightQuery, [itinerary.flight]);
      const flight = flightResult.rows[0];
  
      // Fetch activity details from the 'activities' table using activity primary keys (ids)
      const activityIds = itinerary.activities || [];
      const activities = [];
      for (const activityId of activityIds) {
        const activityQuery = `SELECT * FROM activities WHERE id = $1`;
        const activityResult = await pool.query(activityQuery, [activityId]);
        const activity = activityResult.rows[0];
        if (activity) {
          activities.push(activity);
        }
      }
  
      // Add the itinerary details (hotel and activities) along with the itineraryId to the array if it has at least one activity
      if (activities.length > 0) {
        const itineraryWithDetails = {
          itineraryId: itinerary.itineraryId,
          hotel,
          activities,
          flight
        };
        itinerariesWithDetails.push(itineraryWithDetails);
      }
    }
  
    return itinerariesWithDetails;
  }
  
  
  static async deleteUserItinerary(userId, itineraryId) {
    try {
      // Step 1: Fetch the user's itineraries
      const getUserQuery = `SELECT itineraries FROM users WHERE id = $1`;
      const getUserResult = await pool.query(getUserQuery, [userId]);
      const userItineraries = getUserResult.rows[0]?.itineraries || [];

      console.log("userItineraries:", userItineraries);

      // Parse the JSON string into an array
      const parsedItineraries = Array.isArray(userItineraries)
      ? userItineraries
      : JSON.parse(userItineraries);

      // Step 2: Find and remove the itinerary with the matching itineraryId
      const updatedItineraries = parsedItineraries.filter(
        itinerary => itinerary.itineraryId !== itineraryId
      );
  
      // Step 3: Update the user's itineraries array
      const updateUserQuery = `UPDATE users SET itineraries = $1 WHERE id = $2`;
      await pool.query(updateUserQuery, [JSON.stringify(updatedItineraries), userId]);
  
  
      return "Itinerary deleted successfully";
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      throw new BadRequestError("Failed to delete itinerary.");
    }
  }
  
  

  // Favorites Array


  static async addHotelWithActivitiesToFavorites(credentials) {

    const {userId, hotelData, activities, flightData} = credentials;
    console.log(credentials)

    if (!flightData) {
      throw new BadRequestError("Flight data is missing or invalid.");
    }


    if (!hotelData || !hotelData.name || !hotelData.city || !hotelData.price || !hotelData.check_in || !hotelData.check_out) {
      throw new BadRequestError("Hotel data is missing or invalid.");
    }

    if (!activities) {
      throw new BadRequestError("Invalid Activity");
    }

    // Step 1: Add the hotel and get its primary key (id) and Flight
    const flight = await addFlight(flightData);
    const flightId = flight.id;

    const hotel = await addHotel(hotelData);
    const hotelId = hotel.id; 

    // Step 2: Add activities to the activity table and get their primary keys (ids)
    const activityIds = [];
    for (const activity of activities) {
      const activityObj = await addActivity(activity);
      activityIds.push(activityObj.id); 
    }

    const favoriteId = uuidv4(); // Generate a unique favoriteId using UUID
    const favorite = {
      favoriteId, // Add the generated favoriteId to the favorite object
      hotel: hotelId,
      activities: activityIds,
      flight: flightId
    };

    // Step 4: Add the favorite to the user's favorites array
    const query = `
      UPDATE users
      SET favorites = favorites || $1
      WHERE id = $2
    `;
    await pool.query(query, [JSON.stringify([favorite]), userId]);

  return favorite;
  }


  static async deleteUserFavorite(userId, favoriteId) {
    try {
      const getUserQuery = `SELECT favorites FROM users WHERE id = $1`;
      const getUserResult = await pool.query(getUserQuery, [userId]);
      const userFavorites = getUserResult.rows[0]?.favorites || [];
      
      // Find and remove the favorite with the matching favoriteId
      const updatedFavorites = userFavorites.filter(
        favorite => favorite.favoriteId !== favoriteId
      );
  
      // Update the user's favorites array
      const updateUserQuery = `UPDATE users SET favorites = $1 WHERE id = $2`;
      await pool.query(updateUserQuery, [JSON.stringify(updatedFavorites), userId]);

  
      return "Favorite deleted successfully";
    } catch (error) {
      console.error("Error deleting favorite:", error);
      throw new BadRequestError("Failed to delete favorite.");
    }
  }
  

  static async getUserFavorites(userId) {
    const query = `SELECT favorites FROM users WHERE id = $1`;
    const result = await pool.query(query, [userId]);
    const user = result.rows[0];
    if (!user) {
      throw new BadRequestError("User not found.");
    }
  
    const favorites = user.favorites || [];
    const favoritesWithDetails = [];
  
    for (const favorite of favorites) {
      // Fetch hotel details from the 'hotels' table using hotel primary key (id)
      const hotelQuery = `SELECT * FROM hotels WHERE id = $1`;
      const hotelResult = await pool.query(hotelQuery, [favorite.hotel]);
      const hotel = hotelResult.rows[0];
  
      const flightQuery = `SELECT * FROM flights WHERE id = $1`;
      const flightResult = await pool.query(flightQuery, [favorite.flight]);
      const flight = flightResult.rows[0];
  
      // Fetch activity details from the 'activities' table using activity primary keys (ids)
      const activityIds = favorite.activities || [];
      const activities = [];
      for (const activityId of activityIds) {
        const activityQuery = `SELECT * FROM activities WHERE id = $1`;
        const activityResult = await pool.query(activityQuery, [activityId]);
        const activity = activityResult.rows[0];
        if (activity) {
          activities.push(activity);
        }
      }
  
      // Add the favorite details (hotel and activities) along with the favoriteId to the array if it has at least one activity
      if (activities.length > 0) {
        const favoriteWithDetails = {
          favoriteId: favorite.favoriteId,
          hotel,
          activities,
          flight
        };
        favoritesWithDetails.push(favoriteWithDetails);
      }
    }
  
    return favoritesWithDetails;
  }
  
}

const printTableColumns = async () => {
  const tableQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'codepath_capstone';";
  const tablesResult = await pool.query(tableQuery);
  const tables = tablesResult.rows;

  for (let table of tables) {
    const columnQuery = `SELECT column_name FROM information_schema.columns WHERE table_name = '${table.table_name}' AND table_schema = 'codepath_capstone';`;
    const columnResult = await pool.query(columnQuery);
    const columns = columnResult.rows;
    console.log(`Table: ${table.table_name}`);
    console.log(`Columns: ${columns.map(c => c.column_name).join(', ')}`);
  }
};

module.exports = { User, printTableColumns };
