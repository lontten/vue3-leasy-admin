import {createApp} from 'vue';
import './style.css';
import 'normalize.css/normalize.css';

import App from './App.vue';
import {createPinia} from 'pinia';
import {setGlobalOptions} from "vue-request";
import * as antIcons from '@ant-design/icons-vue'
import router from "../core/config/routes.ts";


const app = createApp(App);

const pinia = createPinia();
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

import CKEditor from '@ckeditor/ckeditor5-vue';  //此行新增
app.use( CKEditor )


app.use(router);

//全局配置vue-request
setGlobalOptions({
    manual: true,
    // ...
});

// 配置全局对象
app.config.globalProperties.$antIcons = antIcons
// Antd 注入全部图标（这样注入之后，就可以全局直接使用 icon 组件，不需要每个页面去引入了）
for (const key in antIcons) {
    // @ts-ignore
    app.component(key, antIcons[key])
}


app.mount('#app');
