<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
  >
    <a-input v-model:value="formData"/>
  </a-form-item>
</template>


<script lang="ts" setup generic="T">
import {computed} from "vue";

const formData = defineModel<T>()

interface Props {
  label?: string
  name?: string
  rule?: any[]
}

const {label = '', name = '', rule = []} = defineProps<Props>()

const vName = computed(() => "formData." + name + '"')

</script>

