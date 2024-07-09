import {App} from "vue";

export default {
    install: (app: App) => {
        const storage = {
            get(key: string) {
                return localStorage.getItem(key)
            }
        }
        app.config.globalProperties.$storage = storage
    }
}