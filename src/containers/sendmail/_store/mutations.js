export const ADD_SENDER_EMAIL = 'ADD_SENDER_EMAIL';

export default {
  [ADD_SENDER_EMAIL](state, email) {
    // Regex for extracting domain name from email
    const regexDomain = /(?:[a-zA-Z0-9]+@)([a-zA-Z0-9]+)(?:.[a-z]{2,3})/g.exec(email)[1];

    // Check the domain name against the domain registry, if existing add to amount
    let newDomain = true;
    for (let i = 0; i < state.domainRegistry.length; i += 1) {
      if (state.domainRegistry[i].domain === regexDomain) {
        state.domainRegistry[i].amount += 1;
        newDomain = false;
      }
    }

    if (newDomain) {
      // Check if this domain is similar to any of the existing domains
      const splitNewDomain = regexDomain.split('');
      for (let i = 0; i < state.domainRegistry.length; i += 1) {
        let matchingCharacters = 0;
        let percentage = 0;
        const splitDomain = state.domainRegistry[i].domain.split('');
        for (let j = 0; j < splitNewDomain.length; j += 1) {
          if (splitNewDomain[j] === splitDomain[j]) {
            matchingCharacters += 1;
          }
        }
        percentage = (matchingCharacters / splitNewDomain.length) * 100;
        console.log(`'${regexDomain}' has a ${percentage}% similarity with '${state.domainRegistry[i].domain}'`);
      }

      // New domains needs to be added (Maybe add logic to not include suspicious domains?)
      const domainEntry = { domain: regexDomain, amount: 1 };
      state.domainRegistry.push(domainEntry);
    }

    // Add email entry to your inbox
    const entry = { emailAddress: email, isFlagged: false };
    state.senderEmails.push(entry);
  },
};
