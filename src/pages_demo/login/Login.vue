<template>
  <div class="login">
    <a-form
        :label-col="{ span: 8 }"
        :model="formState"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        name="basic"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
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

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }" name="remember">
        <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button html-type="submit" type="primary">登陆</a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>
import {ref, watch} from 'vue';
import {useRequest} from "vue-request";
import {apiLogin} from "@/services/access/login.ts";

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = ref<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = async (values: any) => {
  console.log('on', values)
  console.log('ons', formState.value)
  await run({
    username: values.username,
    password: values.password,
  });
  console.log('data:', res.value)
  console.log('data:', res.value?.status)
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


const {data: res, loading, run} = useRequest(apiLogin);
watch(loading, () => {
  if (!loading.value) {
    const {code, data, msg} = res.value?.data
    console.log('daa:', res.value?.data)
    console.log('daa:', code)
    console.log('daa:', data)
    console.log('daa:', msg)
  }
})

</script>

<style lang="scss" scoped>
.login {
  margin-top: 30vh;
  width: 30vw;
  min-width: 300px;
}

</style>

