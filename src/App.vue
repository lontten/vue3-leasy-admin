<script setup lang="ts">
import {defaultThemeConfig} from "../core/config/theme.ts";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import {ref} from "vue";

const locale = ref(zhCN.locale);
// locale.value=enUS.locale


</script>

<template>
  <a-config-provider
      :theme="defaultThemeConfig"
      :locale="locale === 'en' ? enUS : zhCN"
  >
    <a-watermark content="Ant Design Vue">
      <router-view></router-view>
    </a-watermark>
  </a-config-provider>
</template>

<style scoped>
</style>
