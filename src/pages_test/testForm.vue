<template>

  <LnForm :onFinish="addOk"
          v-model="formData"
  >
    <LnFormRichTextCkeditor5
        label="a" name="a"
        v-model="formData"
    ></LnFormRichTextCkeditor5>
    <LnFormFileUpload label="b" name="b"   v-model="formData">

    </LnFormFileUpload>
  </LnForm>

  <div>fasdjklfjjjjjja</div>
  <RichTextCkeditor v-model:value="formData2"></RichTextCkeditor>
  {{ formData2 }}
</template>
<script lang="ts" setup>
import LnForm from "@core/components/LnForm.vue";
import LnFormRichTextCkeditor5 from "@core/components/LnForm/LnFormRichTextCkeditor5.vue";
import {ref} from "vue";
import RichTextCkeditor from "@core/components/RichTextCkeditor.vue";
import LnFormFileUpload from "@core/components/LnForm/LnFormFileUpload.vue";

const formData = ref({})
const formData2 = ref({})

const addOk = (e: any) => {
  console.log(e)
}

</script>
<style lang="scss" scoped>

</style>
