<template>
  <div>
    From: {{ getSender }} Subject: {{ getSubject }}
  </div>
</template>

<script>
export default {
  name: 'MailEntry',
  props: {
    mailData: Object,
  },
  computed: {
    getSubject() {
      let subject = '';
      for (let i = 0; i < this.mailData.payload.headers.length; i += 1) {
        if (this.mailData.payload.headers[i].name === 'Subject') {
          subject = this.mailData.payload.headers[i].value;
        }
      }
      return subject;
    },
    getSender() {
      let sender = '';
      for (let i = 0; i < this.mailData.payload.headers.length; i += 1) {
        if (this.mailData.payload.headers[i].name === 'From') {
          sender = this.mailData.payload.headers[i].value;
        }
      }
      return sender;
    },
  },
};
</script>

<style scoped>
</style>
