// eslint-disable-next-line import/no-named-as-default
import getLevenstheinDistance from '../../../utilities/LevenshteinDistance';

export const ADD_SENDER_EMAIL = 'ADD_SENDER_EMAIL';

export default {
  [ADD_SENDER_EMAIL](state, email) {
    // Regex for extracting domain name from email
    const regexDomain = /(?:[a-zA-Z0-9]+@)([a-zA-Z0-9\W]+)(?:.[a-z]{2,3})/g.exec(email)[1].slice(0, -1);

    // Check the domain name against the domain registry, if existing add to amount
    let newDomain = true;
    for (let i = 0; i < state.domainRegistry.length; i += 1) {
      if (state.domainRegistry[i].domain === regexDomain) {
        state.domainRegistry[i].amount += 1;
        newDomain = false;
      }
    }
    let isTrusted = true;
    let trust = 'green';
    let warning = '';
    if (newDomain) {
      // Check if this domain is similar to any of the existing domains
      const splitNewDomain = regexDomain.split('');
      for (let i = 0; i < state.domainRegistry.length; i += 1) {
        const distance = getLevenstheinDistance(splitNewDomain, state.domainRegistry[i].domain.split(''));
        let effectiveDistance = distance;

        if (distance === 1) {
          isTrusted = false;
          trust = 'yellow';
          warning += `This is very equal to the domain '${state.domainRegistry[i].domain}', we found only one alteration. `;
        } else if (distance === 2) {
          isTrusted = false;
          trust = 'yellow';
          warning += `This is very equal to the domain '${state.domainRegistry[i].domain}', we found only two alterations. `;
        }

        // Check for common alterations between characters.
        const domain = state.domainRegistry[i].domain.split('');
        let adjuster = 0;
        for (let j = 0; j < domain.length; j += 1) {
          console.log(domain.length);
          // check for m
          if (domain[j] === 'm') {
            // check for m to n
            if (splitNewDomain[j + adjuster] === 'n') {
              warning += `In position ${j + 1 + adjuster} we found n instead of m. `;
              effectiveDistance -= 1;
            }
            // check for m to rn
            if (splitNewDomain[j + adjuster] === 'r' && splitNewDomain[j + 1 + adjuster] === 'n') {
              if ((j + 1) < domain.length) {
                warning += `In position ${j + 1 + adjuster} and ${j + 2 + adjuster} we found that the m is swapped with r and n in sequence. `;
                adjuster += 1;
                effectiveDistance -= 2;
              }
            }
          }
          // check for n to m
          if (domain[j] === 'n') {
            if (splitNewDomain[j + adjuster] === 'm') {
              warning += `In position ${j + 1 + adjuster} we found m instead of n. `;
              effectiveDistance -= 1;
            }
          }
          // check for small L
          if (domain[j] === 'l') {
            if (splitNewDomain[j + adjuster] === 'I') {
              warning += `In position ${j + 1 + adjuster} we found large i instead of small L. `;
              effectiveDistance -= 1;
            }
          }
          // check for big i
          if (domain[j] === 'I') {
            if (splitNewDomain[j + adjuster] === 'l') {
              warning += `In position ${j + 1 + adjuster} we found small L instead of large i. `;
              effectiveDistance -= 1;
            }
          }
        }

        // Check the effective distance
        if (effectiveDistance === 0) {
          warning += 'The effective distance is 0, this is likely a targeted attack, do not interact with this email. ';
          isTrusted = false;
          trust = 'red';
        }

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
    const entry = { emailAddress: email, warning, trust };
    state.senderEmails.unshift(entry); // unshift adds the entry to the start of the array
  },
};
