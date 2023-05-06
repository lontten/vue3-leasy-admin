<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <HomeLogo></HomeLogo>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
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
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb>

                <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit">
                    <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">


                        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                            <Table></Table>
                        </div>
<!--                        <ProTable></ProTable>-->


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
import {ref} from 'vue';
import HomeLogo from "../../components/HomeLogo.vue";
import {useSysInitStore} from "../../../stores/sysInitStore.ts";
import router from "../../../routes/routes.ts";
import {useRouter} from "vue-router";
import ProTable from "../../../core/components/ProTable.vue";
import Table from "../tables/Table.vue";

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);


const selectedKeys1 = ref()

let initStore = useSysInitStore();
console.log(initStore.count)

const r=useRouter()

const click = () => {
    initStore.increment()
    console.log(initStore.count)
    r.push('/login')
}


const panes = ref<{ title: string; content: string; key: string; closable?: boolean }[]>(
    new Array(2).fill(null).map((_, index) => {
        const id = String(index + 1);
        return {title: `Tab ${id}`, content: `Content of Tab Pane ${id}`, key: id};
    }),
);
const activeKey = ref(panes.value[0].key);


const remove = (targetKey: string) => {
    let lastIndex = 0;
    panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
    });
    panes.value = panes.value.filter(pane => pane.key !== targetKey);
    if (panes.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
            activeKey.value = panes.value[lastIndex].key;
        } else {
            activeKey.value = panes.value[0].key;
        }
    }
};

const onEdit = (targetKey: string) => {
    remove(targetKey);
};


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
