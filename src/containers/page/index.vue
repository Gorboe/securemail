<template>
  <v-app>
    <v-content>
      <TheHeader />
      <router-view></router-view>
    </v-content>
    <v-footer class="background"></v-footer>
  </v-app>
</template>

<script>
import TheHeader from './_components/TheHeader.vue';

export default {
  name: 'ThePageContainer',
  components: { TheHeader },
};
</script>

<style></style>
