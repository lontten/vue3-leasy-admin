<template>
  <a-result status="403" title="403" sub-title="Sorry, you don't have access to this page.">
    <template #extra>
      <a-button type="primary" @click="toHome">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>
<script lang="ts" setup>

const toHome = () => {

}

</script>

<style lang="scss" scoped>
.login {
  margin-top: 30vh;
  width: 30vw;
  min-width: 300px;
}

</style>

