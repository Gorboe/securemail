<template>
  <div>
    <v-text-field
            label="Sender Email"
            v-model="senderEmail"
            rounded
            filled
            hide-details></v-text-field>
    <v-btn v-on:click="sendMail()">Send Mail</v-btn>
    <div class="filler">
      <h1>Inbox</h1>
    </div>
    <div>
      <div v-for="(entry, index) in this.getSenderEmails" :key="index" class="mail-item">
        {{ entry.emailAddress }} <b>{{ entry.warning }}</b>
        <div v-for="(swap, index) in entry.swapPositions" :key="index"
             style="text-align: left; padding-left: 5vh;">
          <div v-if="swap.flagged === false">
            {{ swap.domain }} ----- {{ swap.newDomain }}
          </div>
          <div v-else style="color: red;">
            {{ swap.domain }} ----- {{ swap.newDomain }} {{ swap.warning }}
          </div>
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
</style>
