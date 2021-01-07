import store from '@/store/index'

export function deepClone(target) {
    // 定义一个变量
    let result
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = [] // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target
    }
    // 返回最终结果
    return result
}

function hasPermission(permission) {
    if (store.state.settings.openPermission) {
        return store.state.user.permissions.some(v => {
            return v === permission
        })
    } else {
        return true
    }
}

export function auth(value) {
    let auth
    if (typeof value === 'string') {
        auth = hasPermission(value)
    } else {
        auth = value.some(item => {
            return hasPermission(item)
        })
    }
    return auth
}

export function authAll(value) {
    const auth = value.every(item => {
        return hasPermission(item)
    })
    return auth
}

// 路由 title 转国际化
export function generateI18nTitle(key, defaultTitle) {
    let title
    if (this.$te(key)) {
        title = this.$t(key)
    } else {
        title = defaultTitle
    }
    return title
}

export function isPC() {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return true
    } else {
        return false;
    }
};


export const isEmpty = (value) => {
    try {
        if (value === null || value === undefined || value === "" || JSON.stringify(value) === '{}') {
            return true
        };
        return false;
    } catch (e) {
        return true;
    }
};


export const deepCopy = value => {
    return JSON.parse(JSON.stringify(value));
}


export const formatUTCTime = (str) => {
    let date = new Date(str);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // console.log("------",day)
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (Number(month) < 10) {
        month = '0' + month
    };
    if (Number(day) < 10) {
        day = '0' + day;
    };
    if (Number(min) < 10) {
        min = '0' + min;
    };
    if (Number(hour) < 10) {
        hour = '0' + hour;
    };
    return year + '-' + month + '-' + day + ' ' + hour + ":" + min
};


export const formatUTCTimePoint = (str) => {
    let date = new Date(str);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (Number(month) < 10) {
        month = '0' + month
    };
    if (Number(day) < 10) {
        day = '0' + day;
    };
    if (Number(min) < 10) {
        min = '0' + min;
    };
    if (Number(hour) < 10) {
        hour = '0' + hour;
    };
    return year + '-' + month + '-' + day;
};


/**
* 待检测的值，
* @param {*} value
*/
export const validDomin = (value) => {
    console.log('----')
    // let e = /^[\u4E00-\u9FA5|a-zA-Z][\w\u4E00-\u9FA5|0-9a-zA-Z]*$/;
    // let e = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    // let e = /^\w+$/
    // let e = /^[A-Za-z0-9-]$/
    let e = /^[A-Za-z\-]+$/
    console.log(e.test(value))
    return e.test(value)
}


/**
 * 待检测的值，
 * @param {*} value
 */
export const validAccount = (value) => {
    // let e = /^[\u4E00-\u9FA5|a-zA-Z][\w\u4E00-\u9FA5|0-9a-zA-Z]*$/;
    // let e = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    // let e = /^\w+$/
    // let e = /^[A-Za-z0-9-]$/
    let e = /^[A-Za-z0-9]+$/
    // let e = /^[^\u4e00-\u9fa5]+$/
    return e.test(value)
}


export const isJSON = (value) => {
    try {
        JSON.parse(value);
        return true;
    } catch (e) {
        return false;
    }
};


export const convertJSONArr2ObjectArr = (arr) => {
    let list = [];
    arr.forEach(ele => {
        if (ele[ele.length - 1] === '}') {
            if (isJSON(ele)) {
                list.push(JSON.parse(ele))
            } else {
                list.push({ ele })
            }
        } else {
            if (isJSON(ele + '}')) {
                list.push(JSON.parse(ele + '}'))
            } else {
                list.push({ ele })
            }
        }

    })
    return list;
}
