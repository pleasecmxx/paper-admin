

import api from '@/api'
import { Message } from 'element-ui';
// import { reject } from 'core-js/fn/promise';
import { isEmpty } from '../../util';
import { loginApi, userInfoApi } from './../../api/admin-api';
import { Router } from 'vue-router';

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
                if (res.code == 200) {
                    let params = {
                        account: data.account,
                        password: data.password,
                        token: res.data.token,
                        failure_time: Date.parse(new Date()) / 1000 + 24 * 60 * 60,
                    }
                    commit('setUserData', params);
                    resolve("ok");
                } else {
                    Message.error(res.msg)
                    resolve("error");
                }
            })
        },
            reject => {
                reject("登录失败")
            }
        )
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
                if (res.code === 200) {
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
                        failure_time: Date.parse(new Date()) / 1000 + 24 * 60 * 60,
                        systemLogo: res.data && res.data.logo && res.data.logo.url && !isEmpty(res.data.logo.url) ? res.data.logo.url : 'http://',
                        systemTitle: res.data.platform_name,
                    }
                    commit('setUserData', params);
                    resolve(permissions);
                } else {
                    resolve([]);
                }
            })
        })
    },
    handleSetUserData({ state, commit }, data) {
        console.log("---手动设置用户信息", data)
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
