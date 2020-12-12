// import api from '@/api'
// import { login_fetch, get_user_info } from '../../api/request-api';

// const state = {
//     account: localStorage.account,
//     token: localStorage.token,
//     failure_time: localStorage.failure_time,
//     permissions: []
// }

// const getters = {
//     isLogin: state => {
//         let retn = false
//         if (state.token != null) {
//             let unix = Date.parse(new Date())
//             if (unix < state.failure_time * 1000) {
//                 retn = true
//             }
//         }
//         return retn
//     }
// }

// const actions = {
//     login({ commit }, data) {
//         console.log('这是登陆数据', data);
//         let params = {
//             account: data.account,
//             password: data.password,
//             validCode: data.validCode,
//         }
//         return new Promise(resolve => {
//             login_fetch(params)
//                 .then(res => {
//                     console.log(res)
//                     if (res.code === 200) {
//                         res.data.account = data.account,
//                             res.data.failure_time = 1000 * 60 * 60 * 1  //1h
//                         commit('setUserData', res.data);
//                         resolve()
//                     } else {
//                         alert("出错了");
//                     }
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//             // 通过 mock 进行登录
//             // api.post(login_fetch, data).then(res => {
//             //     console.log(res)
//             //     commit('setUserData', res.data)
//             //     resolve()
//             // })
//         })
//     },
//     logout({ commit }) {
//         commit('removeUserData')
//         commit('menu/invalidRoutes', null, { root: true })
//         commit('tabbar/clean', null, { root: true })
//     },
//     // 获取我的权限
//     getPermissions({ state, commit }) {
//         return new Promise(resolve => {
//             console.log('通过 mock 获取权限')
//             get_user_info({
//                 token: state.token
//             })
//             .then(res => {
//                 commit('setPermissions', res.data.permissions)
//                 resolve(res.data.permissions)
//             })
//             .catch(err => {
//                 console.log("获取权限出错了",err)
//             })
//             // 通过 mock 获取权限
//             // api.get('mock/member/permission', {
//             //     params: {
//             //         account: state.account
//             //     }
//             // }).then(res => {
//             //     commit('setPermissions', res.data.permissions)
//             //     resolve(res.data.permissions)
//             // })
//         })
//     }
// }

// const mutations = {
//     setUserData(state, data) {
//         try {
//             console.log("设置用户信息", data)
//             localStorage.setItem('account', data.account)
//             localStorage.setItem('token', data.token)
//             localStorage.setItem('failure_time', data.failure_time)
//             state.account = data.account
//             state.token = data.token
//             state.failure_time = data.failure_time
//         } catch (e) {
//             console.log("持久化用户信息出错了", e)
//         }
//     },
//     removeUserData(state) {
//         localStorage.removeItem('account')
//         localStorage.removeItem('token')
//         localStorage.removeItem('failure_time')
//         state.account = ''
//         state.token = ''
//         state.failure_time = ''
//     },
//     setPermissions(state, permissions) {
//         state.permissions = permissions
//     }
// }

// export default {
//     namespaced: true,
//     state,
//     actions,
//     getters,
//     mutations
// }


import api from '@/api'
import { isEmpty } from '../../util';
import { loginApi, userInfoApi } from './../../api/admin-api';

const state = {
    account: localStorage.account,
    token: localStorage.token,
    failure_time: localStorage.failure_time,
    permissions: [],
    systemLogo: '',
    systemTitle: '',
}

const getters = {
    isLogin: state => {
        let retn = false
        if (state.token != null) {
            let unix = Date.parse(new Date())
            if (unix < state.failure_time * 1000) {
                retn = true
            }
        }
        return retn
    }
}

const actions = {
    login({ commit }, data) {
        return new Promise(resolve => {
            // 通过 mock 进行登录
            api.post(loginApi, data).then(res => {
                console.log(res);
                let params = {
                    account: data.account,
                    password: data.password,
                    token: res.data.token,
                    failure_time:  Date.parse(new Date()) / 1000 + 24 * 60 * 60,
                }
                commit('setUserData', params);
                resolve();
            })
        })
    },
    logout({ commit }) {
        commit('removeUserData');
        commit('menu/invalidRoutes', null, { root: true })
        commit('tabbar/clean', null, { root: true })
    },
    // 获取我的权限
    getPermissions({ state, commit }) {
        return new Promise(resolve => {
            // 通过 mock 获取权限
            api.get(userInfoApi, {
                params: {
                    token: state.token
                }
            }).then(res => {
                console.log('个人信息', res);
                let permissions = res.data.permission;
                commit('setPermissions', permissions);
                /**
                 * systemLogo: res.data.logo.url,
                    systemTitle: res.data.name,
                 */
                let params = {
                    account: state.account,
                    password: state.password,
                    token: state.token,
                    failure_time:  Date.parse(new Date()) / 1000 + 24 * 60 * 60,
                    systemLogo: res.data && res.data.logo && res.data.logo.url  && !isEmpty(res.data.logo.url) ? res.data.logo.url : 'http://',
                    systemTitle: res.data.name,
                }
                commit('setUserData', params);
                resolve(permissions);
            })
        })
    },
    handleSetUserData({ state, commit },data) {
        console.log("---手动设置用户信息",data)
        commit('setUserData', data);
    },
}

const mutations = {
    setUserData(state, data) {
            console.log("设置的个人信息", data)
            localStorage.setItem('account', data.account)
            localStorage.setItem('token', data.token)
            localStorage.setItem('failure_time', data.failure_time)
            state.account = data.account;
            state.token = data.token;
            state.failure_time = data.failure_time;
            state.systemLogo = data.systemLogo;
            state.systemTitle = data.systemTitle;
    },
    removeUserData(state) {
        localStorage.removeItem('account')
        localStorage.removeItem('token')
        localStorage.removeItem('failure_time')
        state.account = '';
        state.token = '';
        state.failure_time = '';
    },
    setPermissions(state, permissions) {
        state.permissions = permissions
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
