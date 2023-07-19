<template>
  <div v-for="nav in list" :key="nav.key">
    <a-menu-item v-if="!nav.children && nav.show" :key="nav.key" @click="click(nav)">
      <ProIcon :name="nav.icon"></ProIcon>
      <span>{{ nav.name }}</span>
    </a-menu-item>

    <a-sub-menu v-else-if="nav.show" :key="nav.key">
      <template #title>
                        <span @click="openEvent(nav)">
                            <ProIcon :name="nav.icon"></ProIcon>
                            <span>{{ nav.name }}</span>
                        </span>
      </template>
      <ProNavTreeOption :list="nav.children"></ProNavTreeOption>
    </a-sub-menu>
  </div>
</template>
<script lang="ts" setup>
import {toRefs, watchEffect} from "vue";
import ProIcon from "./ProIcon.vue";
import {useSysNavStore} from "../stores/sysNavStore.ts";
import {useRouter} from "vue-router";
import {SysNavTreeType} from "../type/sys/nav.ts";

interface Props {
  list: SysNavTreeType[]
}

const props = defineProps<Props>()
let {list} = toRefs(props)
watchEffect(() => {
})
const navStore = useSysNavStore()
const r = useRouter()

const click = (e: SysNavTreeType) => {
  navStore.navTabPath = e.namePaths || []
  r.push('/' + e.path)
  navStore.openTab(e)

}

const openEvent = (e: any) => {
  console.log('open', e)
}
</script>

