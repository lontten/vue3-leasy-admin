<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
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

