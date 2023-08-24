<template>

  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <HomeLogo></HomeLogo>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
        <ProNavTreeOption :list="navTree"></ProNavTreeOption>
      </a-menu>
    </a-layout-sider>
    <a-layout>


      <a-layout-content class="content">

        <div class="head">
          <a-breadcrumb style="margin: 16px 0;">
            <a-breadcrumb-item v-for="v in paths">
              {{ v }}
            </a-breadcrumb-item>
          </a-breadcrumb>
          <a-dropdown>
            <div class="user-avatar">
              <img class="user-img" src="../../assets/avatar.png" alt=""/>
              <span class="user-admin">{{showName}}</span>
            </div>


            <template #overlay>
              <a-menu>
                <!--                <a-menu-item>-->
                <!--                  <a href="javascript:;">修改密码</a>-->
                <!--                </a-menu-item>-->
                <a-menu-item>
                  <a @click="unLogin">退出</a>
                </a-menu-item>
              </a-menu>
            </template>

          </a-dropdown>
        </div>


        <!--        <a-tabs v-model:activeKey="navStore.currentTabKey"-->
        <!--                hide-add type="editable-card"-->
        <!--                @edit="navStore.closeTab">-->
        <!--          <a-tab-pane v-for="pane in panes"-->
        <!--                      :key="pane.key"-->
        <!--                      :closable="pane.closable"-->
        <!--                      :tab="pane.title">-->

        <div class="body">
          <router-view></router-view>
        </div>


        <!--          </a-tab-pane>-->
        <!--        </a-tabs>-->


      </a-layout-content>


      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>

    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import HomeLogo from "../../components/HomeLogo.vue";
import {useSysNavStore} from "../../../core/stores/sysNavStore.ts";
import ProNavTreeOption from "../../../core/components/ProNavTreeOption.vue";
import {removeToken} from "../../../core/utils/login.ts";
import {getUserInfo} from "@src/pages_demo/home/homeService.ts";
import {useSysInitStore} from "../../../core/stores/sysInitStore.ts";
import {is_uuid_zero} from "../../../core/utils/UUID.ts";

const showName = computed(()=>{
  return initStore.userInfo.showName
})


const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);


const paths = computed(() => navStore.navTabPath)

// nav
const initStore = useSysInitStore();
const navStore = useSysNavStore()
let navTree = computed(() => navStore.navTree)
const navData = [
  {
    name: 'multSelectTable',
    path: 'home/multSelectTable',
    key: 'multSelectTable',
    icon: 'codepen-outlined',
    roles: ['admin']
  },
  {
    name: 'subTable',
    path: 'home/subTable',
    key: 'subTable',
    icon: 'codepen-outlined',
    roles: ['admin']
  },

]
navStore.initNavTree(navData)
navStore.filterRoleNavTree(initStore.userInfo.roles)


const panesData = new Array(8).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {title: `Tab ${id}`, content: `Content of Tab Pane ${id}`, key: id};
})

//初始化tab
navStore.initTabs(panesData)
let panes = computed(() => navStore.navTabs)


const unLogin = () => {
  removeToken()
}

onMounted(async () => {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    removeToken()
    return
  }
  let initStore = useSysInitStore();
  initStore.userInfo = {
    avatar: '',
    nickname: userInfo.adminName,
    showName: userInfo.showName,
    roles: [is_uuid_zero(userInfo.businessId) ? 'admin' : 'user']
  }

})

</script>
<style lang="scss" scoped>
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

.content {
  margin: 0 16px;
  //border: salmon solid 1px;
  display: flex;
  flex-direction: column;

  .head {
    display: flex;
    justify-content: space-between;

    .user-avatar {
      min-width: 100px;
      //border: aqua solid 1px;
      display: flex;
      align-items: center;

      .user-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .user-admin {
        margin-left: 10px;
      }
    }

  }

  .body {
    padding: 24px;
    background: #fff;
    min-height: 360px;
    height: 100%;
  }
}
</style>
