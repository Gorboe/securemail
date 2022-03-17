// eslint-disable-next-line import/no-named-as-default
import getLevenstheinDistance from '../../../utilities/LevenshteinDistance';

export const ADD_SENDER_EMAIL = 'ADD_SENDER_EMAIL';

export default {
  [ADD_SENDER_EMAIL](state, email) {
    // Regex for extracting domain name from email
    const regexDomain = /(?:[a-zA-Z0-9]+@)([a-zA-Z0-9\W]+)(?:.[a-z]{2,3})/g.exec(email)[1];

    // Check the domain name against the domain registry, if existing add to amount
    let newDomain = true;
    for (let i = 0; i < state.domainRegistry.length; i += 1) {
      if (state.domainRegistry[i].domain === regexDomain) {
        state.domainRegistry[i].amount += 1;
        newDomain = false;
      }
    }
    let isTrusted = true;
    let warning = '';
    if (newDomain) {
      // Check if this domain is similar to any of the existing domains
      const splitNewDomain = regexDomain.split('');
      for (let i = 0; i < state.domainRegistry.length; i += 1) {
        const distance = getLevenstheinDistance(splitNewDomain, state.domainRegistry[i].domain.split(''));

        if (distance === 1) {
          isTrusted = false;
          warning += `This is very equal to the domain '${state.domainRegistry[i].domain}', we found only one alteration. `;
        } else if (distance === 2) {
          isTrusted = false;
          warning += `This is very equal to the domain '${state.domainRegistry[i].domain}', we found only two alteration. `;
        }

        // Check for common alterations between characters.

        // Check homograph attacks (character codes)
        for (let j = 0; j < regexDomain.length; j += 1) {
          console.log(regexDomain.toString().charCodeAt(j));
          if (regexDomain.toString().charCodeAt(j) > 126) {
            warning += `Character in position ${j + 1} is not an ASCII character. If the '${regexDomain.split('')[j]}' 
            looks to be a character you know it is likely a scam.`;
            isTrusted = false;
          }
        }
      }

      if (isTrusted) {
        // New domains needs to be added (Maybe add logic to not include suspicious domains?)
        const domainEntry = { domain: regexDomain, amount: 1 };
        state.domainRegistry.push(domainEntry);
      }
    }

    // Add email entry to your inbox
    const entry = { emailAddress: email, warning };
    state.senderEmails.push(entry);
  },
};
