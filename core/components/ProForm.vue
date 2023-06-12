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
        <a-form-item
            label="Username"
            name="username"
        >
            <a-input v-model:value="formData.name" />
        </a-form-item>

        <a-form-item
            label="Password"
            name="password"
        >
            <a-input-number id="inputNumber" v-model:value="formData.age" :min="1" :max="10" />
        </a-form-item>

      <LnFormText label="ka" name="ka" v-model="formData.ka"></LnFormText>
      <LnFormText label="ka1" name="ka1" v-model="formData.ka1"></LnFormText>


        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>


<script lang="ts" setup generic="T">
import LnFormText from "./LnFormText.vue";
import {ref} from "vue";

const formData = defineModel<T>()

interface Props {
    formColumns: any[]
}

const {formColumns=[]} = defineProps<Props>()


const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>

