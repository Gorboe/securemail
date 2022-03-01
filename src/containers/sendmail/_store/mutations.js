export const ADD_SENDER_EMAIL = 'ADD_SENDER_EMAIL';

export default {
  [ADD_SENDER_EMAIL](state, email) {
    // Regex for extracting domain name from email
    const regexDomain = /(?:[a-zA-Z0-9]+@)([a-zA-Z0-9]+)(?:.[a-z]{2,3})/g.exec(email)[1];

    // Check the domain name against the domain registry
    let newDomain = true;
    for (let i = 0; i < state.domainRegistry.length; i += 1) {
      if (state.domainRegistry[i].domain === regexDomain) {
        state.domainRegistry[i].amount += 1;
        newDomain = false;
      }
    }

    // New domains needs to be added
    if (newDomain) {
      const domainEntry = { domain: regexDomain, amount: 1 };
      state.domainRegistry.push(domainEntry);
    }

    // Add email entry to your inbox
    const entry = { emailAddress: email, isFlagged: false };
    state.senderEmails.push(entry);
  },
};
