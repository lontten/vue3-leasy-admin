<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <HomeLogo></HomeLogo>
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">

                <ProNavTreeOption :list="navTree"></ProNavTreeOption>

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
                            <ProIcon :name="iconName"></ProIcon>

                            <PrivaSearchHeader></PrivaSearchHeader>
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
import {computed, ref} from 'vue';
import HomeLogo from "../../components/HomeLogo.vue";
import {useRouter} from "vue-router";
import Table from "../tables/Table.vue";
import {useSysInitStore} from "../../../core/stores/sysInitStore.ts";
import {useSysNavStore} from "../../../core/stores/sysNavStore.ts";
import PrivaSearchHeader from "../../../core/components/PrivaSearchHeader.vue";
import ProIcon from "../../../core/components/ProIcon.vue";
import ProNavTreeOption from "../../../core/components/ProNavTreeOption.vue";

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
let iconName = ref<string>('wifi-outlined');


const selectedKeys1 = ref()

let initStore = useSysInitStore();
console.log(initStore.count)

const r = useRouter()

const click = () => {
    console.log('iconName', iconName.value)
    if (iconName.value == 'StepBackwardOutlined') {
        iconName.value = 'wifi-outlined'
    } else {
        iconName.value = 'StepBackwardOutlined'
    }

    console.log('iconName2', iconName.value)
    return;

    navStore.navTabPath.push('jaskfdl')
    return
    initStore.increment()
    console.log(initStore.count)
    r.push('/login')
}

const paths = computed(() => navStore.navTabPath)

// nav
const navStore = useSysNavStore();
let navTree = computed(()=>navStore.navTree)
const navData = [
    {
        name: '1',
        path: '1',
        key: '1',
        icon: 'StepBackwardOutlined',
        children: [
            {
                name: '1-1',
                path: '1-1',
                key: '1-1',
                icon: 'StepBackwardOutlined',
                children: [
                    {
                        name: '1-1-1',
                        path: '1-1-1',
                        key: '1-1-1',
                        icon: 'StepBackwardOutlined'
                    },
                    {
                        name: '1-1-2',
                        path: '1-1-2',
                        key: '1-1-2',
                        icon: 'StepBackwardOutlined'
                    },
                    {
                        name: '1-1-3',
                        path: '1-1-3',
                        key: '1-1-3',
                        icon: 'StepBackwardOutlined'
                    },
                ]
            },
            {
                name: '1-2',
                path: '1-2',
                key: '1-2',
                icon: 'StepBackwardOutlined'
            },
            {
                name: '1-3',
                path: '1-3',
                key: '1-3',
                icon: 'StepBackwardOutlined'
            },

        ]
    },
    {
        name: '2',
        path: '2',
        key: '2',
        icon: 'StepBackwardOutlined'
    },
    {
        name: '3',
        path: 'testProTables',
        key: '3',
        icon: 'StepBackwardOutlined'
    },


]
navStore.initNavTree(navData)
console.log(navTree.value)

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
