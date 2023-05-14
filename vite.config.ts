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
        vue({
            script: {
                // @ts-ignore
                defineModel: true,
                propsDestructure:true
            }
        }),
        viteMockServe({
            mockPath: 'core/mock',
            // @ts-ignore
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
