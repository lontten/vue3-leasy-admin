<template>
    <ProIcon :name="iconName"></ProIcon>
    <button @click="click">bbb</button>
</template>
<script lang="ts" setup>
import ProIcon from "../../../core/components/ProIcon.vue";
import {ref} from "vue";

let iconName = ref<string>('wifi-outlined');

const click = () => {
    console.log('iconName', iconName.value)

    if (iconName.value == 'StepBackwardOutlined') {
        iconName.value = 'wifi-outlined'
    } else {
        iconName.value = 'StepBackwardOutlined'
    }

    console.log('iconName2', iconName.value)
}


</script>
<style scoped>
</style>
