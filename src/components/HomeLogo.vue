<template>

  <div class="box-logo">
    <img class="logo" src="/vite.svg" alt="Vite logo"/>
    <span class="logo-txt">欢迎使用</span>
  </div>

</template>
<script lang="ts" setup>


</script>
<style scoped>
.box-logo{
  display: flex;
  align-items: center;
}

.logo {
  height: 5em;
  padding: 1.5em 0.5em 1.5em 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.logo-txt{
  color: rgba(255, 255, 255, 0.8);
  min-width: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

</style>
