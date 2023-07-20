const DEVELOPMENT_API_BASE_URL = "http://localhost:3002";
const API_BASE_URL = process.env.NODE_ENV === "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL;


class ApiClient {
    constructor(remoteHostUrl) {
      this.remoteHostUrl = remoteHostUrl;
    //   this.token = null;
    }
  
    // setToken(token) {
    //   this.token = token;
    // }
  
    async request({ endpoint, method = 'GET', data = {} }) {
      const url = `${this.remoteHostUrl}/${endpoint}`;
      const headers = {
        "Content-Type": "application/json"
      };
  
    // if (this.token) {
    //     headers["Authorization"] = `Bearer ${this.token}`;
    //     headers["User-ID"] = `${this.token.id}`;
    //  }
  
      try {
        const res = await axios({ url, method, data, headers });
        return { data: res.data, error: null };
      } catch (error) {
        console.error({ errorResponse: error.response });
        const message = error?.response?.data?.error?.message;
        return { data: null, error: message || String(error) };
      }
    }
    //Hotel API
    async hotelsLocation(credentials) {
        return await this.request({ endpoint: 'api/hotels-location', method: 'POST', data: credentials });
    }

    async hotelsSearch(credentials) {
        return await this.request({ endpoint: 'api/hotels-search', method: 'POST', data: credentials });
    }

    async hotelsData(credentials) {
        return await this.request({ endpoint: 'api/hotels-data', method: 'POST', data: credentials });
    }

    async hotelsDetail(credentials) {
        return await this.request({ endpoint: 'api/hotels-detail', method: 'POST', data: credentials });
    }

    //Hotel Schema

    async hotelById(credentials) {
        return await this.request({ endpoint: 'api/hotels/:id', method: 'GET', data: credentials });
    }

    async addAHotel(credentials) {
        return await this.request({ endpoint: 'api/hotels', method: 'POST', data: credentials });
    }

    async updateHotel(credentials) {
        return await this.request({ endpoint: 'api/hotels/:id', method: 'PUT', data: credentials });
    }
    async deleteHotel(credentials) {
      return await this.request({ endpoint: 'api/hotels/:id', method: 'DELETE', data: credentials });
    }

    // Users

    async getUsers(credentials) {
     return await this.request({ endpoint: 'api/users', method: 'GET', data: credentials });
    }

    async getUserById(credentials) {
      return await this.request({ endpoint: 'api/users/:id', method: 'GET', data: credentials });
     }

    async loginUser(credentials) {
      return await this.request({ endpoint: 'api/login', method: 'POST', data: credentials });
    }
    async registerUser(credentials) {
      return await this.request({ endpoint: 'api/register', method: 'POST', data: credentials });
    }

    async updateUser(credentials) {
      return await this.request({ endpoint: 'api/users/:id', method: 'PUT', data: credentials });
    }

    async deleteUser(credentials) {
      return await this.request({ endpoint: 'api/users/:id', method: 'DELETE', data: credentials });
    }

    //Itinerary 

    async getItineraryById(credentials) {
      return await this.request({ endpoint: 'api/itineraries/:id', method: 'GET', data: credentials });
    }
    async addItinerary(credentials) {
      return await this.request({ endpoint: 'api/itineraries', method: 'POST', data: credentials });
    }
    async updateItinerary(credentials) {
      return await this.request({ endpoint: 'api/itineraries/:id', method: 'PUT', data: credentials });
    }
    async deleteItinerary(credentials) {
      return await this.request({ endpoint: 'api/itineraries/:id', method: 'DELETE', data: credentials });
    }

    //Itinerary Activities (Do last if time allows)
    
    async getActivitiesForItinerary(credentials) {
      return await this.request({ endpoint: 'api/itineraries/:id/activities', method: 'GET', data: credentials });
    }
    async addActivityToItinerary(credentials) {
      return await this.request({ endpoint: 'api/itineraries/:id/activities', method: 'POST', data: credentials });
    }
    async updateActivityInItinerary(credentials) {
      return await this.request({ endpoint: 'api/itineraries/:id/activities/:activityId', method: 'PUT', data: credentials });
    }
    async deleteActivityInItinerary(credentials) {
      return await this.request({ endpoint: 'api/itineraries/:id/activities/:activityId', method: 'DELETE', data: credentials });
    }

     //Favorites 

     async getFavoritesById(credentials) {
      return await this.request({ endpoint: 'api/favorites/:id', method: 'GET', data: credentials });
    }
    async addFavorite(credentials) {
      return await this.request({ endpoint: 'api/favorites', method: 'POST', data: credentials });
    }
    async updateFavorite(credentials) {
      return await this.request({ endpoint: 'api/favorites/:id', method: 'PUT', data: credentials });
    }
    async deleteFavorite(credentials) {
      return await this.request({ endpoint: 'api/favorites/:id', method: 'DELETE', data: credentials });
    }

     //Activities 

     async getActivityById(credentials) {
      return await this.request({ endpoint: 'api/activities/:id', method: 'GET', data: credentials });
    }
    async addActivity(credentials) {
      return await this.request({ endpoint: 'api/activities', method: 'POST', data: credentials });
    }
    async updateActivity(credentials) {
      return await this.request({ endpoint: 'api/activities/:id', method: 'PUT', data: credentials });
    }
    async deleteActivity(credentials) {
      return await this.request({ endpoint: 'api/activities/:id', method: 'DELETE', data: credentials });
    }


    //Schema Table 
    async printTableInfo() {
      return await this.request({ endpoint: '/tableinfo', method: 'GET' });
    }


    





}