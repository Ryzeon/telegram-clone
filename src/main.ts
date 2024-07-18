import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router.ts';
import storage from './shared/plugins/storage.ts';

import './assets/main.scss';
import EmojiPicker from 'vue3-emoji-picker'

import 'vue3-emoji-picker/css'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import state from './state/state.ts';

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App)
    .use(router)
    .use(storage)
    .use(vuetify)
    .use(state)
    .component('emoji-picker', EmojiPicker)
    .mount('#app')
