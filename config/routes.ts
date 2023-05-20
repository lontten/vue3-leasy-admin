import Home from "@/pages_demo/home/Home.vue";
import Login from "@/pages_demo/login/login.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import TestPage from "@/pages_test/proIcon/TestPage.vue";
import TestNavTree from "@/pages_test/navTree/TestNavTree.vue";
import TestProForm from "@/pages_test/proForm/TestProForm.vue";
import TestProTables from "@/pages_test/testTables/TestProTables.vue";
import TestTxMap from "@/pages_test/testTxMap/TestTxMap.vue";


export const routes = [
    {path: '/', component: Home},
    {path: '/home', component: Home},
    {path: '/login', component: Login},
    {path: '/hello', component: HelloWorld},
    {path: '/testProIcon', component: TestPage},
    {path: '/testNavTree', component: TestNavTree},
    {path: '/testProForm', component: TestProForm},
    {path: '/testProTables', component: TestProTables},
    {path: '/testTxMap', component: TestTxMap},
]
