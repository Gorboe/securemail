<template>
  <div>
    HomePage <br/><br/>
    {{ data }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from './_store';

export default {
  name: 'index',
  methods: {
    ...mapActions('$_data', ['fetchData']),
  },
  computed: {
    ...mapGetters('$_data', ['data']),
  },
  async created() {
    const STORE_KEY = '$_data';
    // eslint-disable-next-line
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }

    try {
      await this.fetchData();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>

</style>
