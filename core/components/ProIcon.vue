<template>
    <component :is="$antIcons[iconName]"/>
</template>
<script lang="ts" setup>
import {computed} from "vue";

interface Props {
    name: string
}

const {name=''} = defineProps<Props>()

const toH = (text: string) => {
    let strings = text.split('-');
    return strings.map(value => value.substring(0, 1).toUpperCase() + value.substring(1)).join('')
}

const iconName = computed(() => toH(name))

</script>

