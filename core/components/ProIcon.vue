<template>
    <component :is="$antIcons[iconName]"/>
</template>
<script lang="ts" setup>
import {computed, toRefs, watch} from "vue";

interface Props {
    name: string
}

const props = defineProps<Props>()

const toH = (text: any) => {
    let strings = text.split('-');
    return strings.map(value => value.substring(0, 1).toUpperCase() + value.substring(1)).join('')
}

let {name} = toRefs(props)
const iconName = computed(() => toH(name.value))
watch(
    () => props.name,
    (value) => {
        name.value = value
    }
);
</script>

