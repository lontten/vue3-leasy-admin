<template>
  <a-layout style="min-height: 100vh">

    <a-layout-sider v-model:collapsed="collapsed" collapsible
                    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }">
      <HomeLogo></HomeLogo>

      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
        <ProNavTreeOption :list="navTree"></ProNavTreeOption>
      </a-menu>

    </a-layout-sider>

    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-content class="content">
        <div class="head">

          <!--tab导航 todo -->
          <a-breadcrumb style="margin: 16px 0;">
            <a-breadcrumb-item v-for="v in paths">
              {{ v }}
            </a-breadcrumb-item>
          </a-breadcrumb>

          <!--右上角显示区域-->
          <a-dropdown>
            <div class="user-avatar">
              <img class="user-img" :src="avatar" alt=""/>
              <span class="user-admin">{{ nickname }}</span>
            </div>

            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="pwdUpd">修改密码</a>
                </a-menu-item>
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

<!--        Ant Design ©2018 Created by Ant UED-->
        ©2023 晟权网络技术部出品
      </a-layout-footer>

    </a-layout>
  </a-layout>



  <!--  修改密码  -->
  <a-modal v-model:open="openPwd" title="修改密码" @ok="onUpdOk">
    <div class="box-pwd">
      <div class="pwd-txt">
        <text class="pwd-start">*</text>
        <text>原密码</text>
      </div>
      <div class="pwd-input">
        <a-input-password
            class="pwd-int"
            v-model:value="oldPassword"
            @change="inputChange1"/>
        <div class="pwd-msg" v-if="msgShow1">{{ msgTxt1 }}</div>
      </div>
    </div>

    <div class="box-pwd">
      <div class="pwd-txt">
        <text class="pwd-start">*</text>
        <text>新密码</text>
      </div>
      <div class="pwd-input">
        <a-input-password
            class="pwd-int"
            v-model:value="adminPassword"
            @change="inputChange2"/>
        <div class="pwd-msg" v-if="msgShow2">{{ msgTxt2 }}</div>
      </div>
    </div>
  </a-modal>




</template>
<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import HomeLogo from "../../components/HomeLogo.vue";
import {useSysNavStore} from "@core/stores/sysNavStore.ts";
import ProNavTreeOption from "../../../core/components/ProNavTreeOption.vue";
import {removeToken} from "@core/utils/login.ts";
import {useSysInitStore} from "@core/stores/sysInitStore.ts";
import {sidebarRoutes} from "../../../config/sidebarRoutes.ts";
import {getUserInfo} from "@src/pages_demo/main/mainService.ts";
import {message} from "ant-design-vue";
import {apiPwdUpd} from "@src/services/access/login";

const nickname = computed(() => {
  return initStore.userInfo.nickname
})

const avatar = computed(() => {
  return initStore.userInfo.avatar
})


const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);


const paths = computed(() => navStore.navTabPath)

// nav
const initStore = useSysInitStore();
const navStore = useSysNavStore()
let navTree = computed(() => navStore.navTree)
navStore.initNavTree(sidebarRoutes)
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
    ...userInfo
  }

})


// ---------- 修改密码 --------
const openPwd = ref<boolean>(false)

const oldPassword = ref(); //旧密码
const adminPassword = ref(); //新密码

const msgTxt1 = ref('')
const msgTxt2 = ref('')
const msgShow1 = ref<boolean>(false)
const msgShow2 = ref<boolean>(false)

const pwdUpd = () => {
  openPwd.value = true
  oldPassword.value = ''
  adminPassword.value = ''

  msgTxt1.value = ''
  msgTxt2.value = ''
  msgShow1.value = false
  msgShow2.value = false
}


const inputChange1 = (e: any) => {
  msgShow1.value = e.target.value.length == 0
}
const inputChange2 = (e: any) => {
  msgShow2.value = e.target.value.length == 0
}

const onUpdOk = async () => {
  if (!oldPassword.value && !adminPassword.value) {
    msgTxt1.value = '请输入原密码'
    msgShow1.value = true

    msgTxt2.value = '请输入新密码'
    msgShow2.value = true

    return;
  }

  if (!oldPassword.value || oldPassword.value.trim() == '') {
    msgTxt1.value = '请输入原密码'
    msgShow1.value = true
    return;
  }

  if (!adminPassword.value || adminPassword.value.trim() == '') {
    msgTxt2.value = '请输入新密码'
    msgShow2.value = true
    return;
  }

  const {code, msg} = await apiPwdUpd({
    oldPassword: oldPassword.value,
    adminPassword: adminPassword.value,
  })
  if (code === 'A000') {
    message.info('修改成功')
  } else {
    message.error(msg)
  }

  oldPassword.value = ''
  adminPassword.value = ''
  openPwd.value = false
}




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

//修改密码
.box-pwd {
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-left: 30px;
  padding-bottom: 5px;
}

.pwd-txt {
  margin-right: 20px;

  .pwd-start {
    color: red;
  }
}

.pwd-input {
  position: relative;

  .pwd-int {
    border-radius: 5px;
    width: 260px;
    min-width: 100px;
  }

  .pwd-msg {
    position: absolute;
    bottom: -21px;
    font-size: 12px;
    color: red;
  }
}
</style>
