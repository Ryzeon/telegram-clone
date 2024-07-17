import {createRouter, createWebHashHistory} from 'vue-router'

const beforeEnter = (_to: any, _from: any, next: any) => {
    const token = localStorage.getItem('token')
    if (token) {
        next()
    } else {
        next({name: 'login'})
    }
};

const routes = [
    {
        path: '/', component: () => import(/* webpackChunkName: "home" */
            '../pages/home-page-component.vue'), name: 'home', beforeEnter: beforeEnter
    },
    {
        path: '/login', component: () => import( /* webpackChunkName: "login" */
            '../iam/components/login-component.vue'), name: 'login'
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router