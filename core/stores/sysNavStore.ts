import {defineStore} from "pinia";
import {ref} from "vue";
import {SysNavTreeType, SysTabType} from "../type/sys/nav.ts";

export const useSysNavStore =
    defineStore('sys_nav', () => {
        const navTree = ref<SysNavTreeType[]>([])
        const navTabs = ref<SysTabType[]>([])
        const navTabPath = ref<string[]>(['商品'])
        const currentTabKey = ref<string>()


        function initNavTree(list: SysNavTreeType[]) {
            walkNavTree(list, [])
            navTree.value = list
        }

        function filterRoleNavTree(roles: string[]) {
            walkNavTreeFilterRole(navTree.value, roles)
        }

        const walkNavTreeFilterRole = (list: SysNavTreeType[], roles: string[]) => {
            list.forEach(nav => {
                if (nav.roles) {
                    roles.forEach(role => {
                        if (nav.roles?.includes(role)) {
                            nav.show = true
                        }
                    })
                } else {
                    nav.show = true
                }


                if (nav.children) {
                    walkNavTreeFilterRole(nav.children, roles)
                }
            })
        }

        const walkNavTree = (list: SysNavTreeType[], parentNamePaths: string[]): SysNavTreeType[] => {
            return list.map(value => {
                if (!value.namePaths) {
                    value.namePaths = []
                }
                value.show = false

                value.namePaths.push(...parentNamePaths)
                value.namePaths.push(value.name)
                if (value.children && value.children.length > 0) {
                    value.children = walkNavTree(value.children, value.namePaths)
                }
                return value
            })
        }

        function initTabs(list: SysTabType[]) {
            navTabs.value = list
        }


        function openTab(target: SysNavTreeType) {
            const arr = navTabs.value.filter(pane => pane.key == target.key);
            if (arr.length == 0) {
                navTabs.value.push({
                    title: target.name,
                    content: target.path,
                    key: target.key,
                })
                currentTabKey.value = target.key
            } else {
                currentTabKey.value = arr[0].key
            }
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
        }

        return {
            navTree,
            navTabs,
            filterRoleNavTree,
            initNavTree,
            navTabPath,
            currentTabKey,
            closeTab,
            initTabs,
            openTab
        }
    })
