<template>
    <ProIcon :name="iconName"></ProIcon>
    <button @click="click">bbb</button>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import ProIcon from "../../../core/components/ProIcon.vue";

let iconName = ref<string>('wifi-outlined');

const click = () => {
    if (iconName.value == 'plus-circle-two-tone') {
        iconName.value = 'wifi-outlined'
    } else {
        iconName.value = 'plus-circle-two-tone'
    }
}


</script>
<style scoped>
</style>
