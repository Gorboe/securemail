import ApiClient from '../_api';
import { UPDATE_DATA } from './mutations';

export const fetchData = 'fetchData';

const apiClient = new ApiClient();

export default {
  // eslint-disable-next-line no-unused-vars
  async [fetchData](context) {
    try {
      const data = await apiClient.fetch();

      context.commit(UPDATE_DATA, data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
