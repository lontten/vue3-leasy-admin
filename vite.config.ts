import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {baseConfig} from "./config/config";
import {viteMockServe} from "vite-plugin-mock";
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: baseConfig.baseUrl,
    plugins: [
        vue(),
        viteMockServe({
            // default
            mockPath: 'core/mock',
            enable: true,
            watchFiles: true,
        }),

        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
        }),

    ],
})
