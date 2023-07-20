<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <div class="clearfix">
      <a-upload
          :multiple="true"
          :accept="fileTypeList"
          v-model:value="formData[name]"
          :file-list="fileList"
          :max-count="fileNum"
          list-type="picture-card"
          :before-upload="beforeUpload"
          @change="handleChange"
          @remove="handleRemove"
          v-bind="config"
      >
        <div v-if="fileList.length < fileNum">
          <plus-outlined/>
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
    </div>
  </a-form-item>
</template>
<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {PlusOutlined} from '@ant-design/icons-vue';
import type {UploadChangeParam, UploadProps} from 'ant-design-vue';
import {message} from 'ant-design-vue';
import {v4} from "uuid";
import {LnFormItemPropsType} from "./lnFormType.ts";
import {ossVideoUpload} from "../../utils/file/oss.ts";


const formData = defineModel<any>()
// fileTypeList使用,分割 例如： "image/png,image/jpeg"
const {
  label, name, rule, useJson = false, extra,
  uploadType, fileTypeList = 'video/mp4,', fileNum = 1, fileSizeMax,
  config,
} = defineProps<LnFormItemPropsType>()


const fileList = ref<any[]>([]);


// -------------------------------utils-----------------------------------
const fileList2value = () => {
  const list = fileList.value.filter(value => value.status == 'done')
      .map(value => value.updateFileUrl)
  formData.value[name] = useJson ? JSON.stringify(list) : list
}
// -------------------------------图片移除-----------------------------------
const handleRemove: UploadProps['onRemove'] = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;

  fileList2value()
};
// -------------------------------图片更新-----------------------------------
const handleChange = (_info: UploadChangeParam) => {
  fileList2value()
};

const beforeUpload = async (file: UploadProps['fileList'][number]) => {
  //数量限制
  if (fileList.value.length >= fileNum) {
    return false
  }

  // //图片格式限制 image/jpeg   image/png
  let arr = fileTypeList.split(',');
  if (arr.length > 0) {
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
      message.error('文件必须小于' + fileSizeMax);
      return false
    }
  }

  const uid = file.uid
  const setFileStatus = (status: any) => {
    for (let i = 0; i < fileList.value.length; i++) {
      if (fileList.value[i].uid == uid) {
        fileList.value[i].status = status
      }
    }
  }

  //数量限制
  if (fileList.value.length >= fileNum) {
    return false
  }
  fileList.value = [...fileList.value, file];

  //手动上传
  switch (uploadType) {
    case 'cos':
      break;
    case 'http':
      break;
    default:
      await ossVideoUpload(file, {fileStatusEvent: setFileStatus})
      break;
  }

  const newFile = {
    ...file,
    type: 'image/jpeg',
  }

  for (let i = 0; i < fileList.value.length; i++) {
    if (fileList.value[i].uid == uid) {
      fileList.value[i] = newFile
    }
  }


  return false;
};

// -------------------------------数据回显-----------------------------------end
const initData = () => {
  let list = []
  // @ts-ignore
  let data = formData.value[name]
  if (useJson) {
    list = JSON.parse(data || "[]")
  } else if (data) {
    list = data
  }
  fileList.value = list.map((value: any) => {
    return {
      uid: v4(),
      status: 'done',
      url: value + '.cover_img.jpg',
      updateFileUrl: value,
    }
  })
}
onMounted(() => {
  initData()
})
watch(formData, () => {
  initData()
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

