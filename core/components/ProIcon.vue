<template>
    <component :is="$antIcons[name]"/>
</template>
<script lang="ts" setup>
import {toRefs} from "vue";

interface Props {
    name: string
}

const props = defineProps<Props>()

const toH = (text: any) => {
    let strings = text.split('-');
    return strings.map(value => value.substring(0, 1).toUpperCase() + value.substring(1)).join('')
}

let {name} = toRefs(props)
name = toH(name.value)

</script>

