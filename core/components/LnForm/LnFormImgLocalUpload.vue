<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
  >
    <a-upload
        v-model:value="formData[name]"
        v-model:file-list="fileList"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" :width="100" alt="avatar"/>
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </a-form-item>
</template>
<script lang="ts" setup generic="T">
import {LnFormPropsType} from "./lnFormType.ts";
import {onMounted, ref} from 'vue';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons-vue';
import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
import {message} from 'ant-design-vue';
import {request} from "axios";


const formData = defineModel<T>()
const {label, name, rule} = defineProps<LnFormPropsType>()


function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');

const handleChange = (info: UploadChangeParam) => {
  console.log('change:', info)
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  fileList.value = [...fileList.value, file];
  return false;
  //手动上传

  //图片格式限制
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }

  //图片大小限制
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


const handleUpload = () => {
  const formData = new FormData();
  fileList.value.forEach((file: UploadProps['fileList'][number]) => {
    formData.append('files[]', file as any);
  });
  loading.value = true;
  console.log(formData)

  // You can use any AJAX library you like
  // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
  //   method: 'post',
  //   data: formData,
  // })
  //     .then(() => {
  //       fileList.value = [];
  //       loading.value = false;
  //       message.success('upload successfully.');
  //     })
  //     .catch(() => {
  //       loading.value = false;
  //       message.error('upload failed.');
  //     });
};


onMounted(() => {
  imageUrl.value = formData.value[name]
})
</script>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>

