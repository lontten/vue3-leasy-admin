<template>
  <a-card :bordered="false">
    <a-result status="error" :title="result.title" :sub-title="result.description">
      <template #extra>
        <a-button type="primary">{{ 'result.fail.error.btn-text' }}</a-button>
      </template>
      <div class="desc">
        desc
      </div>
    </a-result>
  </a-card>
</template>

<script lang="ts" setup>
let result = {
  title: 'result.fail.error.title',
  description: 'result.fail.error.description'
}
</script>
