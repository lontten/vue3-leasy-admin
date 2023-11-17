<template>
  <div class="box">

    <img class="bg-img" src="/bg-002.jpg" alt="">

    <div class="login">

      <img class="login-logo" src="/vite.svg" alt="">
      <h1 class="login-title">后台管理系统</h1>

      <a-form
          :label-col="{ span: 8 }"
          :model="formState"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          name="basic"
          @finish="onFinish"
      >
        <a-form-item
            :rules="[{ required: true, message: '请输入你的用户名!' }]"
            label="用户"
            name="username"
        >
          <a-input v-model:value="formState.username"/>
        </a-form-item>

        <a-form-item
            :rules="[{ required: true, message: '请输入你的密码!' }]"
            label="密码"
            name="password"
        >
          <a-input-password v-model:value="formState.password"/>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button html-type="submit" type="primary">登陆</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {apiLogin} from "@src/services/access/login.ts";
import {useSysInitStore} from "@core/stores/sysInitStore.ts";
import {removeToken} from "@core/utils/login.ts";
import {useRouter} from "vue-router";
import {getUserInfo} from "@src/pages_demo/main/mainService.ts";

interface FormState {
  username: string;
  password: string;
}

const formState = ref<FormState>({
  username: '',
  password: '',
});
const r = useRouter()

const onFinish = async (values: any) => {
  const {code, data} = await apiLogin({
    adminName: values.username,
    adminPassword: values.password,
  })
  if (code == 'A000') {
    let initStore = useSysInitStore();
    initStore.token = data

    const userInfo = await getUserInfo();
    if (!userInfo) {
      removeToken()
      return
    }

    initStore.userInfo = {
      ...userInfo,
    }

    await r.push('/home')
  }
};

onMounted(() => {
  console.log('login page init')
})
</script>

<style lang="scss" scoped>
//.login {
//  margin-top: 30vh;
//  width: 30vw;
//  margin-left: -200px;
//  min-width: 300px;
//}
//
//.box {
//  width: 100vw;
//  height: 100vh;
//  display: flex;
//  justify-content: center;
//
//}

.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.bg-img{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
}
.login {
  width: 20vw;
  min-width: 300px;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 0px #000000;
  border-radius: 20px;
  padding-top: 20px;
  margin-bottom: 100px;
}
.login-logo{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.login-title{
  margin-top: 10px;
  margin-bottom: 5vh;
}

.logo-type{
  position: fixed;
  bottom: 15px;
  font-size: 13px;
}

</style>

