import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({endpoint, method = `GET`, data = {}}) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    console.log("url is: " , url)
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    } else {
      this.token = window.localStorage.getItem("token");
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      console.log(this.token);
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async fetchUserFromToken() {
    return await this.request({endpoint: `auth/me`, method: `GET` });
  }

  async getNutrition() {
    return await this.request({ endpoint: `nutrition/`, method: `GET` });
  }

  async createPost(data, point) {
    return await this.request({
      endpoint: point + `/`,
      method: `POST`,
      data: data,
    });
  }

  async loginUser(credentials) {
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: credentials,
    });
  }

  async signupUser(credentials) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: credentials,
    });
  }
}

export default new ApiClient("http://localhost:3001");