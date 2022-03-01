import {
  ADD_SENDER_EMAIL,
} from './mutations';

export const commitAddSenderEmail = 'commitAddSenderEmail';

export default {
  [commitAddSenderEmail](context, data) {
    context.commit(ADD_SENDER_EMAIL, data);
  },
};
