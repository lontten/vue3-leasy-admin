import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {baseConfig} from "./config/config";

// https://vitejs.dev/config/
export default defineConfig({
    base: baseConfig.baseUrl,
    plugins: [vue()],
})
