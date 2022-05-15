<template>
  <section>
    <v-app-bar app color="#203e5f">
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = true" />
      <v-toolbar-title class="logo display-1">
        SecurEmail
      </v-toolbar-title>
      <v-toolbar-items>
        <!--<v-btn v-on:click="sendMailModule()" text link>Send mail module</v-btn>-->
      </v-toolbar-items>
    </v-app-bar>
  </section>
</template>
<script>
export default {
  name: 'TheHeader',

  data: () => ({
    drawer: false,
  }),
  methods: {
    sendMailModule() {
      this.$router.push({ name: 'SendMail' });
    },
  },
};
</script>

<style>
.logo {
  font-family: 'Roboto', sans-serif;
}
.logo:hover {
  cursor: pointer;
}
.menu-link {
  text-transform: none !important;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: normal;
  line-height: 21px;
}
</style>
