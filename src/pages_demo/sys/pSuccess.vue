<template>
  <a-card :bordered="false">
    <a-result status="success" :title="result.title" :sub-title="result.description">
      <template #extra>
        <a-button type="primary">{{ 'result.success.btn-return' }}</a-button>
        <a-button style="margin-left: 8px">{{ 'result.success.btn-project' }}</a-button>
        <a-button style="margin-left: 8px">{{ 'result.success.btn-print' }}</a-button>
      </template>
      <div class="content">
        content
      </div>
    </a-result>
  </a-card>
</template>

<script lang="ts" setup>
let result = {
  title: 'result.success.title',
  description: 'result.success.description'
}


</script>
