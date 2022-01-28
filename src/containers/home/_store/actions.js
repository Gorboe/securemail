import ApiClient from '../_api';
import { UPDATE_MAIL_DATA, SET_ACCESS_TOKEN } from './mutations';

export const fetchMailData = 'fetchMailData';
export const setAccessToken = 'setAccessToken';

const apiClient = new ApiClient();

export default {
  // eslint-disable-next-line no-unused-vars
  async [fetchMailData](context) {
    try {
      const data = await apiClient.fetch();

      context.commit(UPDATE_MAIL_DATA, data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  [setAccessToken](context, token) {
    context.commit(SET_ACCESS_TOKEN, token);
  },
};
