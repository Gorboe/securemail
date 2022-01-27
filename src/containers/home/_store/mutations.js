export const UPDATE_DATA = 'UPDATE_DATA';

export default {
  [UPDATE_DATA](state, data) {
    state.data = data;
  },
};
