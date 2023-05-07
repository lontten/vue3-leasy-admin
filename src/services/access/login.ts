import axios from "axios";

export const apiLogin = (data: any) => {
    return axios.post('api/user/login', data);
};
