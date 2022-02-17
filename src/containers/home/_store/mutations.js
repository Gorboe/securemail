export const UPDATE_MAIL_DATA = 'UPDATE_MAIL_DATA';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_SELECTED_MAIL = 'SET_SELECTED_MAIL';

export default {
  [UPDATE_MAIL_DATA](state, data) {
    state.mailData = data;
  },
  [SET_ACCESS_TOKEN](state, token) {
    state.accessToken = token;
  },
  [SET_SELECTED_MAIL](state, data) {
    state.selectedMail = data;
  },
};
