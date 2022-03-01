<template>
  <div>
    <v-btn v-on:click="getAllMail()">Get Mail</v-btn><br/><br/>
    <div v-for="(entry, index) in mailData" :key="index"
         v-on:click="mailSelected(entry)" class="mail-item">
      <MailEntry :mailData="entry" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from './_store';
import authenticationData from '../../../../../auth/client_secret.json';
import MailEntry from './_components/MailEntry.vue';

export default {
  name: 'index',
  components: { MailEntry },
  methods: {
    ...mapActions('$_data', ['fetchMailData', 'setAccessToken', 'setSelectedMail']),
    mailSelected(entry) {
      this.setSelectedMail(entry);
      this.$router.push({ name: 'InspectMail' });
    },
    getAllMail() {
      this.fetchMailData(this.accessToken);
    },
    async getAccessToken() {
      // Get Access Token
      const myHeaders = new Headers();
      myHeaders.append('Cookie', '__Host-GAPS=1:uBGQl8EZ1x2ll8sf9lGRPbKoUqrM4g:2hWnjaTlJuZb4ff3');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };

      const clientId = authenticationData.web.client_id;
      const clientSecret = authenticationData.web.client_secret;
      const baseUrl = 'https://accounts.google.com/o/oauth2/token';
      const refreshToken = authenticationData.web.refresh_token;
      fetch(`${baseUrl}?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.setAccessToken(result.access_token);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error', error);
        });
    },
  },
  computed: {
    ...mapGetters('$_data', ['mailData', 'accessToken']),
  },
  async created() {
    const STORE_KEY = '$_data';
    // eslint-disable-next-line
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }

    await this.getAccessToken();
  },
};
</script>

<style scoped>
  .mail-item {
    cursor: pointer;
  }
  .mail-item:hover {
    background: grey;
  }
</style>
