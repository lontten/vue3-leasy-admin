import {createApp, watch} from 'vue';
import './style.css';
import 'normalize.css/normalize.css';

import App from './App.vue';
import {createPinia} from 'pinia';
import {setGlobalOptions} from "vue-request";
import * as antIcons from '@ant-design/icons-vue'
import router from "../core/config/routes.ts";
import CKEditor from '@ckeditor/ckeditor5-vue'; //此行新增


const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
watch(
    pinia.state,
    (state) => {
        // 每当它发生变化时，将整个状态持久化到本地存储
        localStorage.setItem('piniaState', JSON.stringify(state))
    },
    {deep: true}
)
pinia.state.value = JSON.parse(localStorage.getItem('piniaState') || '{}')

app.use(CKEditor)
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
