<script setup lang="ts">
import {defaultThemeConfig} from "../core/config/theme.ts";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import {ref} from "vue";
import {useSysInitStore} from "@core/stores/sysInitStore.ts";
import Main from "@src/pages_demo/main/Main.vue";

const locale = ref(zhCN.locale);
// locale.value=enUS.locale
const sysInitStore = useSysInitStore();

</script>

<template>
  <a-config-provider
      :theme="defaultThemeConfig"
      :locale="locale === 'en' ? enUS : zhCN"
  >
    <a-watermark :content="sysInitStore.userInfo.nickname">
      <Main>
        <router-view></router-view>
      </Main>
    </a-watermark>
  </a-config-provider>
</template>

<style scoped>
</style>
