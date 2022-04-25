<template>
  <div>
    <WarningMessage
            :trust="this.trust"
            :warning="this.warning"
            :positionsNew="this.positionsNew"
            :positionsOld="this.positionsOld"
            :newDomain="this.newDomain"
            :existingDomain="this.existingDomain"/>
    Mail content here...
  </div>
</template>

<script>
import WarningMessage from './_components/WarningMessage.vue';

export default {
  name: 'index',
  components: { WarningMessage },
  data: () => ({
    data: {
      emailAddress: String,
      trust: String,
      warning: String,
      positionsNew: Array,
      positionsOld: Array,
      newDomain: String,
      existingDomain: String,
    },
  }),
  methods: {
    getData() {
      const { data } = this.$router.currentRoute.params;
      this.emailAddress = data.emailAddress;
      this.trust = data.trust;
      this.warning = data.warning;
      this.positionsNew = data.positionsNew;
      this.positionsOld = data.positionsOld;
      this.newDomain = data.newDomain;
      this.existingDomain = data.existingDomain;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>
