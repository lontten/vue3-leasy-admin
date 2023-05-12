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

    if (iconName.value == 'plus-circle-two-tone') {
        iconName.value = 'wifi-outlined'
    } else {
        iconName.value = 'plus-circle-two-tone'
    }

    console.log('iconName2', iconName.value)
}


</script>
<style scoped>
</style>
