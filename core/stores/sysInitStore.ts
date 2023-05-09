import {defineStore} from "pinia";
import {ref} from "vue";

export const useSysInitStore =
    defineStore('sys_init', () => {
    const count = ref(0)
    function increment() {
        count.value++
    }

    return { count, increment }
})
