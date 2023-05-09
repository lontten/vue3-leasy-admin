export interface PageType<T> {
    /**
     * 当前页码
     */
    current: number;
    /**
     * 总页数
     */
    pages: number;
    records: T[];
    /**
     * 每页大小
     */
    size: number;
    /**
     * 总个数
     */
    total: number;
}

