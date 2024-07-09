import { createMemoryHistory, createRouter } from 'vue-router'
import LoginComponent from "../iam/components/login-component.vue";

const routes = [
    { path: '/', component: LoginComponent, name: 'home'},
    { path: '/login', component: LoginComponent, name: 'login'}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router