import axios from 'axios';

export default class BaseApiClient {
  constructor() {
    const baseUrl = 'https://gmail.googleapis.com/gmail/v1/users/me/messages';
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  async get(queryParams) {
    try {
      const response = await this.axiosInstance.get(`/${queryParams}`);
      const { data } = response;

      if (response.status !== 200) {
        return Promise.reject(data);
      }

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
