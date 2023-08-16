<template>
  <ckeditor :editor="editor" v-model="data" :config="editorConfig"></ckeditor>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const data = defineModel<any>('value')


const editor = ref(ClassicEditor)

const editorConfig = ref({
  language: 'zh-cn',
  toolbar: {
    items: ['heading',
      '|', 'bold', 'italic',
      // 'link',
      'bulletedList', 'numberedList',
      '|', 'outdent', 'indent',
      '|',
      // 'imageUpload',
      'blockQuote', 'insertTable',
      // 'mediaEmbed',
      'undo', 'redo'],
  },
  language: 'zh',
  image: {
    toolbar: ['imageTextAlternative', 'toggleImageCaption', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side'],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  ckfinder: {
    uploadUrl: `/uploadfile`, // 上传图片接口
    options: {
      resourceType: 'Images',
    },
  },
})


</script>
<style lang="scss" scoped>


</style>
