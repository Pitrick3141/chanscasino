import {createRouter, createWebHistory} from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            meta:{title: '老陈大赌场开业啦'},
            component: () => import("../views/MainPage.vue")},
        {name: "test", path: "/test", component: () => import("../views/TestPage.vue")},
        {name: "login", path: "/login", component: () => import("../views/LoginPage.vue")},
        {name: "signup", path: "/signup", component: () => import("../views/SignUpPage.vue")},
        {name: "poker-picker", path: "/poker-picker", component: () => import("../components/PokerPicker.vue")},
    ]
})

router.beforeEach((to, from, next) =>{
    document.title = `${to.meta.title}`;
    next();
})
export default router