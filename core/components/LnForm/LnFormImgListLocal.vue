<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
  >


    <div class="clearfix">
      <a-upload
          v-model:value="formData[name]"
          :file-list="fileList"
          list-type="picture-card"
          @preview="handlePreview"
          :before-upload="beforeUpload"
          @change="handleChange"
          @remove="handleRemove"
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
import {v4} from "uuid";
import {imgZip} from "../../utils/file/img.ts";


const formData = defineModel<T>()
const {label, name, rule, useJson = false, uploadType, fileTypeList = []} = defineProps<LnFormPropsType>()


const fileList = ref<UploadProps['fileList']>([]);
const loading = ref<boolean>(false);


// -------------------------------图片移除-----------------------------------
const handleRemove: UploadProps['onRemove'] = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
// -------------------------------图片更新-----------------------------------
const handleChange = async (info: UploadChangeParam) => {
  const list = fileList.value.filter(value => value.status == 'done')
      .map(value => value.url)
  // @ts-ignore
  formData.value[name] = useJson ? list : JSON.stringify(list)
  console.log('list', JSON.stringify(formData.value[name]))


  console.log('change:', info)
  console.log('change:', fileList.value)

  if (!info.file.status) {
    // const url = await ossFileUpload(info.file)
    // console.log('url', url)
    info.file.status = 'oss'
    return;
  }
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

const beforeUpload = async (file: UploadProps['fileList'][number]) => {
  // //图片格式限制 image/jpeg   image/png
  if (fileTypeList.length > 0) {
    if (!fileTypeList.includes(file.type)) {
      message.error('You can only upload JPG file!');
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

  file.status = 'done'
  file.url = 'https://project-temp-file.oss-cn-hangzhou.aliyuncs.com/006-dir/1685760327975.svg'

  console.log('file', file.size / 1024)
  const newFile = await imgZip(file, 0.5)
  console.log('file2', newFile.size / 1024)

  //手动上传
  fileList.value = [...fileList.value, file];
  console.log('befor upad')
  return false;
};


const handleUpload = async () => {
  const formData2 = new FormData();
  fileList.value.forEach((file: UploadProps['fileList'][number]) => {
    console.log('file:', file)
    formData2.append('files[]', file as any);
  });
  loading.value = true;
  console.log(formData2)
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
// -------------------------------图片预览-----------------------------------end

onMounted(() => {
  let list = []
  // @ts-ignore
  let data = formData.value[name]
  if (useJson) {
    list = JSON.parse(data || "[]")
  } else if (data) {
    list = data
  }
  console.log('kk', list, data)
  fileList.value = list.map(value => {
    return {
      uid: v4(),
      status: 'done',
      url: value,
    }
  })
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

