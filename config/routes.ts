import Login from "@src/pages_demo/login/Login.vue";
import HelloWorld from "@src/components/HelloWorld.vue";
import p404 from "@src/pages_demo/sys/p404.vue";
import p500 from "@src/pages_demo/sys/p500.vue";
import p403 from "@src/pages_demo/sys/p403.vue";
import pSuccess from "@src/pages_demo/sys/pSuccess.vue";
import pError from "@src/pages_demo/sys/pError.vue";
import overview from "@src/pages_demo/overview/overview.vue";
import multSelectTable from "@src/pages_demo/multSelectTable/multSelectTable.vue";
import subTable from "@src/pages_demo/subTable/subTable.vue";
import TestTxMap from "@src/pages_test/testTxMap/TestTxMap.vue";
import Main from "@src/pages_demo/main/Main.vue";


export const routes = [
    {path: '/login', component: Login},
    {
        path: '/', component: Main,
        children: [
            {path: '', component: overview, alias: ['home', 'overview']},
            {path: '404', component: p404},
            {path: '403', component: p403},
            {path: '500', component: p500},
            {path: 'success', component: pSuccess},
            {path: 'error', component: pError},


            // 自定义
            {path: 'hello', component: HelloWorld},
            {path: 'multSelectTable', component: multSelectTable},
            {path: 'subTable', component: subTable},
            {path: 'a', component: TestTxMap},

        ]
    },
]
