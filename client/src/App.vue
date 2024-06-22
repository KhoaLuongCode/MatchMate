<template>
  <HeaderNav />
  <ToastContain />
  <router-view />
</template>

<script>
import { provide, ref, onMounted } from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import HeaderNav from "@/components/header.vue";
import ToastContain from "@/components/toast-contain.vue";


export default {
  name: 'App',
  components: {
    ToastContain,
    HeaderNav,
  },
  setup() {
    const isLoggedIn = ref(false);
    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });

    provide('isLoggedIn', isLoggedIn);

    return {};
  }
}
</script>

<style>
#app {
  font-family: nunito, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
