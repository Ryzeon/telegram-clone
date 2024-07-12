import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router.ts';
import storage from './shared/plugins/storage.ts';

import './assets/main.scss';


createApp(App)
    .use(router)
    .use(storage)
    .mount('#app')
