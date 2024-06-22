<template>
  <Toast ref="toast" position="bottom-right" />
</template>

<script setup>
import { ref } from 'vue';
import Toast from 'primevue/toast';
import { onMounted } from 'vue';

const toast = ref(null);

onMounted(() => {
  window.addEventListener('show-toast', (event) => {
    const toastDetail = {
      ...event.detail,
      life: 4000
    };
    toast.value.add(toastDetail);
  });
});
</script>

<style scoped>

</style>