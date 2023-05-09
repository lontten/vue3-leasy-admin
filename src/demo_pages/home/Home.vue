<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <HomeLogo></HomeLogo>
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
                <a-menu-item key="1">
                    <pie-chart-outlined/>
                    <span @click="click">Option 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <desktop-outlined/>
                    <span>Option 2</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #title>
            <span>
              <user-outlined/>
              <span>User</span>
            </span>
                    </template>
                    <a-menu-item key="3">Tom</a-menu-item>
                    <a-menu-item key="4">Bill</a-menu-item>
                    <a-menu-item key="5">Alex</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <template #title>
            <span>
              <team-outlined/>
              <span>Team</span>
            </span>
                    </template>
                    <a-menu-item key="6">Team 1</a-menu-item>
                    <a-menu-item key="8">Team 2</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="9">
                    <file-outlined/>
                    <span>File</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>


            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item v-for="v in paths">
                        {{ v }}
                    </a-breadcrumb-item>
                </a-breadcrumb>

                <a-tabs v-model:activeKey="navStore.currentTabKey"
                        hide-add type="editable-card"
                        @edit="navStore.closeTab">
                    <a-tab-pane v-for="pane in panes"
                                :key="pane.key"
                                :closable="pane.closable"
                                :tab="pane.title">

                        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                            {{ pane.content }}
                            <Table></Table>
                        </div>


                    </a-tab-pane>
                </a-tabs>


            </a-layout-content>


            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>

        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons-vue';
import {computed, ref} from 'vue';
import HomeLogo from "../../components/HomeLogo.vue";
import {useRouter} from "vue-router";
import Table from "../tables/Table.vue";
import {useSysInitStore} from "../../../core/stores/sysInitStore.ts";
import {useSysNavStore} from "../../../core/stores/sysNavStore.ts";

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);


const selectedKeys1 = ref()

let initStore = useSysInitStore();
console.log(initStore.count)

const r = useRouter()

const click = () => {
    navStore.navTabPath.push('jaskfdl')
    return
    initStore.increment()
    console.log(initStore.count)
    r.push('/login')
}

const paths = computed(() => navStore.navTabPath)

// nav
const navStore = useSysNavStore();
const panesData = new Array(8).fill(null).map((_, index) => {
    const id = String(index + 1);
    return {title: `Tab ${id}`, content: `Content of Tab Pane ${id}`, key: id};
})

//初始化tab
navStore.initTabs(panesData)
let panes = computed(() => navStore.navTabs)


</script>
<style scoped>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>
