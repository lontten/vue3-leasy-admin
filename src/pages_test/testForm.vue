<template>

  <LnForm :onFinish="addOk"
          v-model="formData"
  >
    <LnFormRichTextCkeditor5
        label="a" name="a"
        v-model="formData"
    ></LnFormRichTextCkeditor5>
  </LnForm>

  <div>fasdjklfjjjjjja</div>
  <FtCkeditor v-model:value="formData2"></FtCkeditor>
  {{ formData2 }}
</template>
<script lang="ts" setup>
import LnForm from "@core/components/LnForm.vue";
import LnFormRichTextCkeditor5 from "@core/components/LnForm/LnFormRichTextCkeditor5.vue";
import {ref} from "vue";
import FtCkeditor from "@core/components/FtCkeditor.vue";

const formData = ref({})
const formData2 = ref({})

const addOk = (e: any) => {
  console.log(e)
}

</script>
<style lang="scss" scoped>

</style>
