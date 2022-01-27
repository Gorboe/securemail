<template>
  <section>
    <v-app-bar app color="#1a8e88">
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = true" />
      <v-toolbar-title class="logo display-1">
        Test Header
      </v-toolbar-title>
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
