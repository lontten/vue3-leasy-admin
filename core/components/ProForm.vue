<template>
  <a-form
      :model="formData"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >

    <LnFormText label="ka" name="ka"
                v-model="formData"
                :rule="[{ required: true, message: 'Please input your username!' }]"
    ></LnFormText>

    <LnFormTextArea label="info" name="info"
                    v-model="formData"
                    :rule="[{ required: true, message: 'Please input your username!' }]"
    ></LnFormTextArea>

    <LnFormNumber label="ka1" name="ka1"
                  v-model="formData"
                  min="3"
                  max="8"
    ></LnFormNumber>
    <LnFormImgListLocal label="avatar" name="avatar"
                          v-model="formData"
    ></LnFormImgListLocal>


    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>


<script lang="ts" setup generic="T">
import LnFormNumber from "./LnForm/LnFormNumber.vue";
import LnFormText from "./LnForm/LnFormText.vue";
import LnFormTextArea from "./LnForm/LnFormTextArea.vue";
import LnFormImgLocalUpload from "./LnForm/LnFormImgLocalUpload.vue";
import LnFormImgListLocal from "./LnForm/LnFormImgListLocal.vue";

const formData = defineModel<T>()

interface Props {
  formColumns: any[]
}

const {formColumns = []} = defineProps<Props>()


const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

