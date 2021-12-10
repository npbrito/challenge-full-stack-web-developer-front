import Vue from 'vue'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/users",
            name: "users",
            component: Users
        }
    ],
    mode: 'history'
});

export default router;