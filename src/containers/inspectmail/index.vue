<template>
  <div>
    <div v-if="loaded">
      <AnalyserMenu :htmlData="this.htmlData"/>
    </div>
    <div v-html="htmlData"></div>
    {{ this.selectedMail }}
  </div>
</template>

<script>
import urlSafeBase64 from 'urlsafe-base64';
import { mapGetters } from 'vuex';
import AnalyserMenu from './_components/AnalyserMenu.vue';

export default {
  name: 'index',
  components: {
    AnalyserMenu,
  },
  data: () => ({
    htmlData: '',
    loaded: false,
  }),
  methods: {
  },
  computed: {
    ...mapGetters('$_data', ['selectedMail']),
  },
  async created() {
    if (this.selectedMail.payload.parts !== undefined) {
      for (let i = 0; i < this.selectedMail.payload.parts.length; i += 1) {
        if (this.selectedMail.payload.parts[i].mimeType === 'text/html') {
          this.htmlData = urlSafeBase64.decode(this.selectedMail.payload.parts[i].body.data);
        }

        if (this.selectedMail.payload.parts[i].mimeType === 'application/pdf') {
          console.log('Has a PDF attachment');
        }

        // Multipart MimeType
        if (this.selectedMail.payload.parts[i].mimeType === 'multipart/alternative') {
          for (let j = 0; j < this.selectedMail.payload.parts[i].parts.length; j += 1) {
            // HTML
            if (this.selectedMail.payload.parts[i].parts[j].mimeType === 'text/html') {
              this.htmlData = urlSafeBase64
                .decode(this.selectedMail.payload.parts[i].parts[j].body.data);
            }
          }
        }
      }
    } else if (this.selectedMail.payload.mimeType === 'text/html') {
      this.htmlData = urlSafeBase64.decode(this.selectedMail.payload.body.data);
    }
    this.loaded = true;
  },
};
</script>

<style scoped>
</style>
