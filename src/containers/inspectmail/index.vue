<template>
  <div>
    <div v-html="htmlData"></div>
    {{ this.selectedMail }}
  </div>
</template>

<script>
import urlSafeBase64 from 'urlsafe-base64';
import { mapGetters } from 'vuex';

export default {
  name: 'index',
  data: () => ({
    htmlData: '',
  }),
  methods: {
  },
  computed: {
    ...mapGetters('$_data', ['selectedMail']),
  },
  created() {
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
  },
};
</script>

<style scoped>
</style>
