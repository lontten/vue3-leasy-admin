import Home from "@src/pages_demo/home/Home.vue";
import Login from "@src/pages_demo/login/Login.vue";
import HelloWorld from "@src/components/HelloWorld.vue";
import p404 from "@src/pages_demo/sys/p404.vue";
import p500 from "@src/pages_demo/sys/p500.vue";
import p403 from "@src/pages_demo/sys/p403.vue";
import pSuccess from "@src/pages_demo/sys/pSuccess.vue";
import pError from "@src/pages_demo/sys/pError.vue";
import testForm from "@src/pages_test/testForm.vue";
import overview from "@src/pages_demo/overview/overview.vue";
import multSelectTable from "@src/pages_demo/multSelectTable/multSelectTable.vue";
import subTable from "@src/pages_demo/subTable/subTable.vue";


export const routes = [
    {path: '/', component: Home,},
    {
        path: '/home', component: Home,
        children: [
            {path: 'overview', component: overview},
            {path: 'multSelectTable', component: multSelectTable},
            {path: 'subTable', component: subTable},

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
