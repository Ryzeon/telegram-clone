import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.ts';
import storage from './shared/plugins/storage.ts';

createApp(App)
    .use(router)
    .use(storage)
    .mount('#app')
