export interface ResponseType<T> {
    /**
     * 状态码
     */
    code: string;
    /**
     * 返回数据
     */
    data: T;
    msg: any;
}
