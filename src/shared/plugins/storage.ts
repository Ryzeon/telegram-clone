import {App} from "vue";
import {IStorage} from '/interface/istorage.ts';

export default {
    install: (app: App) => {
        const storage: IStorage = {
            clear(): void {
                return localStorage.clear();
            },

            getItem(key: string): any {
                return localStorage.getItem(key);
            },

            removeItem(key: string): void {
                return localStorage.removeItem(key);
            },

            setItem(key: string, value: any): void {
                return localStorage.setItem(key, value);
            }
        }
        app.config.globalProperties.$storage = storage
        app.provide('storage', storage)
    }
}