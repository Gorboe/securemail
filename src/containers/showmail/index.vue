<template>
  <div>
    <WarningMessage :trust="this.trust" :warning="this.warning" />
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
    },
  }),
  methods: {
    getData() {
      const { data } = this.$router.currentRoute.params;
      this.emailAddress = data.emailAddress;
      this.trust = data.trust;
      this.warning = data.warning;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>
