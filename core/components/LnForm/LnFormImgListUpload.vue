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
          @preview="handlePreview"
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
      <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
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
import {ossFileUpload} from "../../utils/file/oss.ts";


const formData = defineModel<any>()
// fileTypeList使用,分割 例如： "image/png,image/jpeg"
const {
  label, name, rule, useJson = false, extra,
  uploadType, fileTypeList = 'image/png,image/jpeg', fileNum = 1, fileSizeMax,
  config
} = defineProps<LnFormItemPropsType>()


const fileList = ref<any[]>([]);

// -------------------------------utils-----------------------------------
const fileList2value = () => {
  const list = fileList.value.filter(value => value.status == 'done')
      .map(value => value.url)
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
const handleChange = (info: UploadChangeParam) => {
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
  if (fileList.value.length >= fileNum) {
    return false
  }
  fileList.value = [...fileList.value, file];
  return false;
};


// -------------------------------图片预览-----------------------------------
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
      url: value,
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

