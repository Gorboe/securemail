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
          The new domain '{{ newDomain }}' is quite similar to the existing trusted domain
          '{{ existingDomain }}'. <div v-html="htmlData"></div>
          <div v-if="seeMore">
            <br/>{{ warning }}
          </div>
          <div style="text-align: center;" v-if="!seeMore">
            <v-icon v-on:click="expand()">mdi-arrow-down</v-icon>
          </div>
          <div style="text-align: center;" v-if="seeMore">
            <v-icon v-on:click="expand()">mdi-arrow-up</v-icon>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WarningMessage',
  data: () => ({
    htmlData: '',
    seeMore: false,
  }),
  props: {
    trust: String,
    warning: String,
    positionsNew: Array,
    positionsOld: Array,
    newDomain: String,
    existingDomain: String,
  },
  methods: {
    expand() {
      this.seeMore = !this.seeMore;
    },
  },
  created() {
    const splitNewDomain = this.newDomain.split('');
    let newString = '';
    let isAdded = false;
    for (let i = 0; i < splitNewDomain.length; i += 1) {
      isAdded = false;
      for (let j = 0; j < this.positionsNew.length; j += 1) {
        if (i === this.positionsNew[j]) {
          newString += `<b>${splitNewDomain[i]}</b>`;
          isAdded = true;
        }
      }
      if (!isAdded) {
        newString += `${splitNewDomain[i]}`;
      }
    }

    const splitExistingDomain = this.existingDomain.split('');
    let existingString = '';
    for (let i = 0; i < splitExistingDomain.length; i += 1) {
      isAdded = false;
      for (let j = 0; j < this.positionsOld.length; j += 1) {
        if (i === this.positionsOld[j]) {
          existingString += `<b>${splitExistingDomain[i]}</b>`;
          isAdded = true;
        }
      }
      if (!isAdded) {
        existingString += `${splitExistingDomain[i]}`;
      }
    }
    this.htmlData = `${existingString} vs ${newString}`;
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
