<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
  >


    <div class="clearfix">
      <a-upload
          :file-list="fileList"
          list-type="picture-card"
          @preview="handlePreview"
          :before-upload="beforeUpload"
          @change="handleChange"
      >
        <div v-if="fileList.length < 8">
          <plus-outlined/>
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
      <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
    </div>


  </a-form-item>
</template>
<script lang="ts" setup generic="T">
import {LnFormPropsType} from "./lnFormType.ts";
import {onMounted, ref} from 'vue';
import {PlusOutlined} from '@ant-design/icons-vue';
import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
import {message} from 'ant-design-vue';
import axios from "axios";
import {v4} from "uuid";
import {fileUploadOssPolicy} from "@/services/file/upload.ts";


const formData = defineModel<T>()
const {label, name, rule} = defineProps<LnFormPropsType>()


const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');

const handleChange = async (info: UploadChangeParam) => {
  console.log('change:', info)
  console.log('change:', fileList.value)
  await handleUpload()
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  // //图片格式限制
  // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  // if (!isJpgOrPng) {
  //   message.error('You can only upload JPG file!');
  //   return false
  // }
  //
  // //图片大小限制
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  //   return false
  // }


  //手动上传
  fileList.value = [...fileList.value, file];
  return false;
};

const ossFileUpload = async (file:any) => {
  const {code, data} = await fileUploadOssPolicy();
  if (code != 'A000') {
    message.error('文件上传失败!');
    return
  }
  const ossData = data

  const n = 1
  const fileName = file.name
  let str = fileName[n].substring(fileName[n].lastIndexOf('.'));
  let nameStr = ossData.dir + v4() + str;

  const formData = {
    name: nameStr,
    key: nameStr,
    policy: ossData.policy, // 输入你获取的的policy
    OSSAccessKeyId: ossData.accessId, // 输入你的AccessKeyId
    success_action_status: '200', // 让服务端返回200,不然，默认会返回204
    signature: ossData.signature // 输入你获取的的signature
  }
  file.status='uploading'
  const resp = await axios.put(ossData.host, formData, {headers: {"Content-Type": 'multipart/form-data'}})
  if (1==1){
    file.status='error'
  }else {
    file.status='done'
  }

}

const handleUpload = async () => {
  const formData2 = new FormData();
  fileList.value.forEach((file: UploadProps['fileList'][number]) => {
    console.log('file:', file)
    formData2.append('files[]', file as any);
  });
  loading.value = true;
  console.log(formData2)

};


const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const handlePreview = async (file: UploadProps['fileList'][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};


onMounted(() => {
  imageUrl.value = formData.value[name]
})
</script>
<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>

