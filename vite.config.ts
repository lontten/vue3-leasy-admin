import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteMockServe} from "vite-plugin-mock";
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import Components from 'unplugin-vue-components/vite';
import {baseConfig} from "./config/config";
import * as path from "path";
import vueJsx from '@vitejs/plugin-vue-jsx'
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
    base: baseConfig.baseUrl,

    plugins: [
        vue({
            script: {
                // @ts-ignore
                defineModel: true,
                propsDestructure: true
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

        // vue-jsx插件
        vueJsx({}),
        wasm(),

    ],
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'core'),
        },
        //配置文件扩展名
        extensions: [".ts", ".mjs", ".js", ".jsx", ".tsx", ".json"],
    },


    css: {
        /* CSS 预处理器 */
        preprocessorOptions: {
            scss: {
                additionalData: '@import "src/assets/style/mixin.scss";'
            }
        }
    },


    build: {
        cssMinify: true,
        outDir: baseConfig.outDir,

    }
})
