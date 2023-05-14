import Login from "../src/pages_demo/login/Login.vue";
import HelloWorld from "../src/components/HelloWorld.vue";
import Home from "../src/pages_demo/home/Home.vue";
import TestPage from "../src/pages_test/proIcon/TestPage.vue";
import TestNavTree from "../src/pages_test/navTree/TestNavTree.vue";
import TestProForm from "../src/pages_test/proForm/TestProForm.vue";

export const routes = [
    {path: '/', component: Home},
    {path: '/home', component: Home},
    {path: '/login', component: Login},
    {path: '/hello', component: HelloWorld},
    {path: '/testProIcon', component: TestPage},
    {path: '/testNavTree', component: TestNavTree},
    {path: '/testProForm', component: TestProForm},
]
