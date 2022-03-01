<template>
  <div>
    <vue-drag-resize :isResizable="false" :x="50" :y="50">
      <v-card dark min-width="400" max-height="600" class="card_style" >
        hello this is a test
        {{ this.htmlData }}
      </v-card>
    </vue-drag-resize>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'AnalyserMenu',
  components: {
    VueDragResize,
  },
  props: {
    htmlData: Uint8Array,
  },
  data: () => ({
  }),
  methods: {
    extractUrls() {
      // eslint-disable-next-line no-useless-escape
      const t = /(?:href=\")((?:(?:https?:\/\/)(www.)?([a-zA-Z0-9])+(.[a-zA-Z0-9]+)*(.[a-z]{2,3})?)?(?:\/[a-zæøåA-ZÆØÅ0-9?\-=\\+%#:_]+)*(?:\/)*)(?:\")/g.exec(this.htmlData);
      console.log(t[1]);
      // eslint-disable-next-line max-len
      // (?:href=\")((?:(?:https?:\/\/)(www.)?([a-zA-Z0-9])+(.[a-zA-Z0-9]+)*(.[a-z]{2,3})?)?(?:\/[a-zæøåA-ZÆØÅ0-9?\-=\+%#:_]+)*(?:\/)*)(?:\")
    },
  },
  computed: {
  },
  created() {
    this.extractUrls();
  },
};
</script>

<style scoped>
  .card_style {
    overflow-y: auto;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #b9b9b9;
  }
</style>
