<template>
  <div>
    <div class="padding">
      Enter a sender address here and press the 'send email' button.
      <v-text-field
              label="Sender Email"
              v-model="senderEmail"
              rounded
              filled
              hide-details></v-text-field>
      <v-btn v-on:click="sendMail()" dark large class="margin">Send Mail</v-btn>
    </div>
    <div class="filler">
      <h1>Inbox</h1>
    </div>
    <div>
      <div v-for="(entry, index) in this.getSenderEmails" :key="index" class="mail-item"
           v-on:click="test(entry)">
        {{ entry.emailAddress }} <b>{{ entry.warning }}</b>
        <div v-if="entry.trust === 'yellow'" class="inline">
          <v-icon style="color: yellow;">mdi-alert</v-icon>
        </div>
        <div v-else-if="entry.trust === 'red'" class="inline">
          <v-icon style="color: red;">mdi-close-octagon</v-icon>
        </div>
        <div v-else-if="entry.trust === 'green'" class="inline">
          <v-icon style="color: green;">mdi-thumb-up</v-icon>
        </div>
      </div>
    </div>
    <div class="filler">
      <h1>Domain Registry</h1>
    </div>
    <div>
      <div v-for="(entry, index) in this.getDomainRegistry" :key="index">
        {{ entry.domain }} - {{ entry.amount }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import store from './_store';

export default {
  name: 'index',
  data: () => ({
    senderEmail: '',
  }),
  computed: {
    ...mapGetters('$_sendmail', ['getSenderEmails', 'getDomainRegistry']),
  },
  methods: {
    ...mapActions('$_sendmail', ['commitAddSenderEmail']),
    sendMail() {
      this.commitAddSenderEmail(this.senderEmail);
    },
    test(entry) {
      console.log(entry);
    },
  },
  async created() {
    const STORE_KEY = '$_sendmail';
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
};
</script>

<style>
  .margin {
    margin-top: 2vh;
  }
  .padding {
    padding: 2vh;
  }
  .filler {
    padding-top: 1.5em;
    padding-bottom: 1.5em;
    text-align: center;
    background-color: #203e5f;
    color: white;
  }
  .mail-item {
    cursor: pointer;
    background: lightgray;
    text-align: center;
  }
  .mail-item:hover {
    background: grey;
  }
  .inline {
    display: inline;
  }
</style>
