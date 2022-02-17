import { SET_ACCESS_TOKEN, UPDATE_MAIL_DATA, SET_SELECTED_MAIL } from './mutations';

export const fetchMailData = 'fetchMailData';
export const setAccessToken = 'setAccessToken';
export const setSelectedMail = 'setSelectedMail';

export default {
  // eslint-disable-next-line no-unused-vars
  async [fetchMailData](context, accessToken) {
    const myHeaders = new Headers();
    console.log(accessToken);
    myHeaders.append('Authorization', `Bearer ${accessToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const messages = [];

    fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.messages);
        for (let i = 0; i < 10; i += 1) { // change 10 with result.messages.length
          fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${result.messages[i].id}`, requestOptions)
            .then((response2) => response2.json())
            .then((result2) => messages.push(result2))
            .catch((error) => console.log('error', error));
        }
        context.commit(UPDATE_MAIL_DATA, messages);
      })
      .catch((error) => console.log('error', error));

    // For each thread https://gmail.googleapis.com/gmail/v1/users/{userId}/messages/{id}
  },
  [setAccessToken](context, token) {
    context.commit(SET_ACCESS_TOKEN, token);
  },
  [setSelectedMail](context, data) {
    context.commit(SET_SELECTED_MAIL, data);
  },
};
