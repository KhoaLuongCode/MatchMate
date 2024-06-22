import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/sass/style.scss'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
const app = createApp(App);
app.use(router);
app.use(ToastService)
app.use(PrimeVue)
app.use(vuetify)
app.mount('#app');

