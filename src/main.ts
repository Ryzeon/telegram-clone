import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router.ts';
import storage from './shared/plugins/storage.ts';

import './assets/main.scss';

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App)
    .use(router)
    .use(storage)
    .use(vuetify)
    .mount('#app')
