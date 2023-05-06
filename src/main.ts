import { createApp } from 'vue'
import './style.css'
import 'normalize.css/normalize.css'

import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';


import App from './App.vue'
import router from "../routes/routes.ts";
import {createPinia} from "pinia";
const app = createApp(App);
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Antd)





app.mount('#app')

