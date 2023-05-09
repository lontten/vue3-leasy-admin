//页面tab
import {Component, DefineComponent} from "vue";

export interface SysTabType {
    title: string
    content: string
    key: string
    closable?: boolean
}

export interface SysNavTreeType {
    name: string
    path: string
    key: string
    icon: LComponent
}

export type LComponent = Component | DefineComponent;
