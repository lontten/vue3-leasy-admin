import {createApp} from 'vue';
import './style.css';
import 'normalize.css/normalize.css';
import Antd from 'ant-design-vue';

import App from './App.vue';
import router from '../routes/routes.ts';
import {createPinia} from 'pinia';
import {setGlobalOptions} from "vue-request";

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


app.mount('#app');
