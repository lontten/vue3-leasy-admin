<script setup lang="ts"></script>

<template>
    <div>
        <router-link to="/login">Go to login</router-link>
        ----
        <router-link to="/hello">Go to hello</router-link>
    </div>

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</template>

<style scoped>
</style>
