import {createApp, nextTick} from 'vue';
import './style.css';
import 'normalize.css/normalize.css';
import Antd from 'ant-design-vue';

import App from './App.vue';
import router from '../routes/routes.ts';
import {createPinia} from 'pinia';
import {setGlobalOptions} from "vue-request";
import * as antIcons from '@ant-design/icons-vue'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Antd);

//全局配置vue-request
setGlobalOptions({
    manual: true,
    // ...
});

// 必须使用 nextTick，不然会有加载顺序问题，导致绑定失败
nextTick(() => {
    // 配置全局对象
    app.config.globalProperties.$antIcons = antIcons
    // Antd 注入全部图标（这样注入之后，就可以全局直接使用 icon 组件，不需要每个页面去引入了）
    for (const key in antIcons) {
        // @ts-ignore
        app.component(key, antIcons[key])
    }
})


app.mount('#app');
