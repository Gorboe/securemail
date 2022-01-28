export const UPDATE_MAIL_DATA = 'UPDATE_MAIL_DATA';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export default {
  [UPDATE_MAIL_DATA](state, data) {
    state.data = data;
  },
  [SET_ACCESS_TOKEN](state, token) {
    state.accessToken = token;
  },
};
