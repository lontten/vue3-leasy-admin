<script setup lang="ts">
import {ref} from 'vue'
import LnFormImgUpload from "@core/components/LnForm/LnFormImgUpload.vue";
import LnFormDateTime from "@core/components/LnForm/LnFormDateTime.vue";
import HomeLogo from "@src/components/HomeLogo.vue";

defineProps<{ msg: string }>()

const count = ref(0)


</script>

<template>
  <h1>{{ msg }}</h1>
  <LnFormDateTime label="asaff  " name="asdf"></LnFormDateTime>

  <home-logo></home-logo>
  <div class="card">
    <LnFormImgUpload label="a " name="a"></LnFormImgUpload>
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
    >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
