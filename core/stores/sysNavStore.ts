import {defineStore} from "pinia";
import {ref} from "vue";
import {SysNavTreeType, SysTabType} from "../type/sys";

export const useSysNavStore =
    defineStore('sys_nav', () => {
        const navTree = ref<SysNavTreeType[]>([])
        const navTabs = ref<SysTabType[]>([])
        const navTabPath = ref<string[]>(['设置', '用户中心', '手机号'])
        const currentTabKey = ref<string>()


        function initTabs(list: SysTabType[]) {
            navTabs.value = list
        }

        function initNavTree(list: SysNavTreeType[]) {
            walkNavTree(list)
            navTree.value = list
        }

        const walkNavTree = (list: SysNavTreeType[]): SysNavTreeType[] => {
            return list.map(value => {
                if (!value.namePaths) {
                    value.namePaths = []
                }
                value.namePaths.push(value.name)
                if (value.children && value.children.length > 0) {
                    value.children = walkNavTree(value.children)
                }
                return value
            })
        }


        function closeTab(targetKey: string) {
            //上一个的tab的index
            let lastIndex = 0;

            navTabs.value.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    lastIndex = i - 1;
                }
            });

            //删除目标tab
            navTabs.value = navTabs.value.filter(pane => pane.key !== targetKey);

            if (navTabs.value.length && currentTabKey.value === targetKey) {
                if (lastIndex >= 0) {
                    currentTabKey.value = navTabs.value[lastIndex].key;
                } else {
                    currentTabKey.value = navTabs.value[0].key;
                }
            }

            console.log('tabs：', navTabs)
        }

        return {navTree, navTabs, initNavTree, navTabPath, currentTabKey, closeTab, initTabs}
    })
