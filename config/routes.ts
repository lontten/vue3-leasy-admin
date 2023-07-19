import Home from "@/pages_demo/home/Home.vue";
import Login from "@/pages_demo/login/Login.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import TestTxMap from "@/pages_test/testTxMap/TestTxMap.vue";
import p404 from "@/pages_demo/sys/p404.vue";
import p500 from "@/pages_demo/sys/p500.vue";
import p403 from "@/pages_demo/sys/p403.vue";
import pSuccess from "@/pages_demo/sys/pSuccess.vue";
import pError from "@/pages_demo/sys/pError.vue";
import testForm from "@/pages_test/testForm.vue";


export const routes = [
    {path: '/', component: Home,},
    {
        path: '/home', component: Home,
        children: [
            {path: 'overview', component: TestTxMap},
            {path: 'abc', component: testForm},

        ]
    },
    {path: '/login', component: Login},
    {path: '/hello', component: HelloWorld},
    {path: '/404', component: p404},
    {path: '/403', component: p403},
    {path: '/500', component: p500},
    {path: '/success', component: pSuccess},
    {path: '/error', component: pError},
]
