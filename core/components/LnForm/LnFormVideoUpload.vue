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
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
        :disabled="disabled"
    >
      <img v-if="imageUrl" :src="imageUrl" :width="100" :height="100" alt=""/>
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>

  </a-form-item>
</template>
<script lang="ts" setup generic="T">
import {onMounted, ref, watch} from 'vue';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons-vue';
import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
import {message} from 'ant-design-vue';
import {LnFormItemPropsType} from "./lnFormType";
import {ossVideoUpload} from "../../utils/file/oss";
import {v4} from "uuid";

const formData = defineModel<T>()
// fileTypeList使用,分割 例如： "video/mp4,image/jpeg"
const {
  label, name, rule, extra,
  uploadType, fileTypeList = 'video/mp4,', fileNum = 1,
  disabled = false
} = defineProps<LnFormItemPropsType>()


const fileList = ref<any[]>([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');


// -------------------------------图片更新-----------------------------------
const handleChange = (_info: UploadChangeParam) => {
  if (fileList.value.length > 0) {
    formData.value[name] = fileList.value[0].url
  }
};

const beforeUpload = async (file: UploadProps['fileList'][number]) => {
  loading.value = true

  // //图片格式限制 image/jpeg   image/png
  let arr = fileTypeList.split(',');
  if (arr.length > 0) {
    if (!arr.includes(file.type)) {
      message.error('请选择正确的文件格式!');
      return false
    }
  }

  //
  // //图片大小限制
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  //   return false
  // }

  //手动上传
  switch (uploadType) {
    case 'cos':
      break;
    case 'http':
      break;
    default:
      await ossVideoUpload(file)
      break;
  }
  fileList.value = [file];
  imageUrl.value = file.url

  console.log(file.url)
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
    url: value + '.cover_img.jpg',
    updateFileUrl: value,
  }]
  imageUrl.value = value
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
