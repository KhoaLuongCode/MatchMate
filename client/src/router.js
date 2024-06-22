import { createRouter, createWebHistory } from 'vue-router';
import AboutPage from './components/about-page.vue';
import HomePage from './components/home-page.vue'
import CommunityPage from "@/components/community-page.vue";
import LoginPage from "@/components/login-page.vue";

const routes = [
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage
    },
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/community',
        name: 'CommunityPage',
        component: CommunityPage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
