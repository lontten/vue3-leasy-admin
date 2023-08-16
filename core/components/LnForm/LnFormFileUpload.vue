<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <a-upload
        v-model:value="formData[name]"
        v-model:file-list="fileList"

        :show-upload-list="true"
        :before-upload="beforeUpload"
        @change="handleChange"
        v-bind="config"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        点击上传
      </a-button>
    </a-upload>

  </a-form-item>
</template>
<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
import {message} from 'ant-design-vue';
import {LnFormItemPropsType} from "./lnFormType";
import {ossFileUpload} from "../../utils/file/oss";
import {v4} from "uuid";

const formData = defineModel<any>()
// fileTypeList使用,分割 例如： "video/mp4,image/jpeg"
const {
  label, name, rule, extra,
  uploadType, fileTypeList = '', fileSizeMax,
  config,
} = defineProps<LnFormItemPropsType>()


const fileList = ref<any[]>([]);
const loading = ref<boolean>(false);


// -------------------------------图片更新-----------------------------------
const handleChange = (_info: UploadChangeParam) => {
  if (fileList.value.length > 0) {
    formData.value[name] = fileList.value[0].url
  }
};

const beforeUpload = async (file: UploadProps['fileList'][number]) => {
  loading.value = true

  // //图片格式限制 image/jpeg   image/png
  let arr: string[] = fileTypeList.split(',').filter(value => value.trim().length > 0)
  if (arr.length > 0) {
    console.log('arr len', arr)
    if (!arr.includes(file.type)) {
      message.error('请选择正确的文件格式!');
      return false
    }
  }

  //文件大小限制
  if (fileSizeMax) {
    let isBig = false
    if (fileSizeMax.endsWith('k') || fileSizeMax.endsWith('K')) {
      isBig = file.size / 1024 > Number.parseInt(fileSizeMax);
    }
    if (fileSizeMax.endsWith('m') || fileSizeMax.endsWith('M')) {
      isBig = file.size / 1024 / 1024 > Number.parseInt(fileSizeMax);
    }
    if (fileSizeMax.endsWith('g') || fileSizeMax.endsWith('G')) {
      isBig = file.size / 1024 / 1024 / 1024 > Number.parseInt(fileSizeMax);
    }

    if (isBig) {
      message.error('图片必须小于' + fileSizeMax);
      return false
    }
  }

  //手动上传
  switch (uploadType) {
    case 'cos':
      break;
    case 'http':
      break;
    default:
      await ossFileUpload(file)
      break;
  }
  fileList.value = [file];

  loading.value = false

  return false;
};

// -------------------------------数据回显-----------------------------------end
const initData = () => {
  const value = formData.value[name]
  if (!value) {
    return
  }
  fileList.value = [{
    uid: v4(),
    status: 'done',
    url: value,
  }]
}
onMounted(() => {
  initData()
})
watch(formData, () => {
  initData()
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
