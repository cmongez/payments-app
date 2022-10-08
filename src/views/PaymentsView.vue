<template>
  <div class="home">
    <PaymentsApp />
  </div>
</template>

<script>
// @ is an alias to /src
import PaymentsApp from '@/components/PaymentsApp.vue';

export default {
  name: 'PaymenstView',
  components: {
    PaymentsApp,
  },
};
</script>
