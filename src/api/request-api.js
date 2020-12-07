import {
    getValidCode,
    loginApi,
    userInfoApi,
} from './admin-api';
import HttpUtils from './HttpUtils';

const getCode = () => {
    return HttpUtils({
        url: getValidCode,
        method: 'get',
        params: {}
    })
}

const login_fetch = (data) => {
    return HttpUtils({
        url: loginApi,
        method: 'post',
        data: data
    })
};

const get_user_info = (data) => {
    return HttpUtils({
        url: userInfoApi,
        method: 'get',
        params: data
    })
};


export {
    getCode,
    login_fetch,
    get_user_info
}
