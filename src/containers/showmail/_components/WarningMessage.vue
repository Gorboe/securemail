<template>
  <div v-if="trust !== 'green'">
    <div v-if="trust === 'yellow'">
      <v-row>
        <v-col class="background-yellow">
          <h2>Warning!</h2>
          {{ warning }}
        </v-col>
      </v-row>
    </div>
    <div v-if="trust === 'red'">
      <v-row>
        <v-col class="background-red">
          <h2>Danger!</h2>
          {{ warning }}
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WarningMessage',
  props: {
    trust: String,
    warning: String,
  },
};
</script>

<style>
  .background-yellow {
    background-color: #ffb300;
    margin: 1vh;
  }
  .background-red {
    background-color: #c93e36;
    margin: 1vh;
  }
</style>
