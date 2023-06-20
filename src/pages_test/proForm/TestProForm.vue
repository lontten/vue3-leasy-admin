<template>
  <ProForm v-model="data">
    <LnFormText label="ka" name="ka"
                v-model="data"
                :rule="[{ required: true, message: 'Please input your username!' }]"
    ></LnFormText>

    <LnFormTextArea label="info" name="info"
                    v-model="data"
                    :rule="[{ required: true, message: 'Please input your username!' }]"
    ></LnFormTextArea>

    <LnFormNumber label="ka1" name="ka1"
                  v-model="data"
                  min="3"
                  max="8"
    ></LnFormNumber>
    <LnFormImgListLocal label="avatar" name="avatar"
                        v-model="data"
                        :uploadType="'oss'"
    ></LnFormImgListLocal>


    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </ProForm>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import ProForm from "../../../core/components/ProForm.vue";
import LnFormTextArea from "../../../core/components/LnForm/LnFormTextArea.vue";
import LnFormText from "../../../core/components/LnForm/LnFormText.vue";
import LnFormImgListLocal from "../../../core/components/LnForm/LnFormImgListLocal.vue";
import LnFormNumber from "../../../core/components/LnForm/LnFormNumber.vue";

let data = ref<any>();

data.value = {
  ka: 'ka',
  ka1: 6,
  info: 'info',
  avatar: ['https://project-temp-file.oss-cn-hangzhou.aliyuncs.com/006-dir/1685760327975.svg']
}


</script>
<style scoped>
</style>
