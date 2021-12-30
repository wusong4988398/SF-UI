
import  _IntlUniversal from './IntlUniversal'
import _console from '../api/console'
import _formservice from '../api/formservice'

import _clientApi from '../plugin/clientApi'

/**
 * 初始化国际化管理模型
 * 这个地方要做try-catch  不能导致整个环境崩溃
 * @param {*} lang
 * @param {*} callback
 */
function initI18n(callback) {
    try {
        getCurrentLocale(function (currentLocale) {
            _IntlUniversal.init(currentLocale, callback);
        });
    } catch (e) {
        _console.warn('initI18n', e);

        callback();
    }
}

function initI18nPromise() {
    return new Promise(function (resolve) {
        try {
            getCurrentLocale(function (currentLocale) {
                _IntlUniversal.init(currentLocale, function () {
                    return resolve(true);
                });
            });
        } catch (e) {
            _console.warn('initI18n', e);

            resolve('fail');
        }
    });
}
// 轻应用跟随App语言
function handleSwitchLang() {
    return new Promise(function (resolve) {
        // 加载完第三方SDK插件后，如果没有获取设备当前语言的接口，程序往下执行
        if (!(0, _clientApi.existAppFunction)('getDevicedLang')) {
            resolve({
                type: 'error',
                msg: 'invoke API getDevicedLang fail'
            });
        } else {
            getDevicedLang().then(function (currentLocale) {
                // 如果存在获取设备当前语言的接口，但获取到的和后端的上下文语言环境是一致的（第一次加载的时候在initI18nPromise中就已经能获取到后端的上下文语言了），程序往下执行
                if (currentLocale === getCurrentLang()) {
                    resolve({
                        type: 'error',
                        msg: 'should not switch lang'
                    });
                } else {
                    // 非中文，发送请求给后端，切换上下文语言环境，重新获取用户语言，并加载语言包
                    changeContextLang(currentLocale).then(function (isSwitched) {
                        if (isSwitched) {
                            getCurrentLocale(function () {
                                _IntlUniversal.init(currentLocale, function () {
                                    return resolve({
                                        type: 'success',
                                        msg: 'switch lang success'
                                    });
                                });
                            });
                        } else {
                            resolve({
                                type: 'error',
                                msg: 'switch lang fail'
                            });
                        }
                    }).catch(function () {
                        // 切换上下文环境失败，程序还会往下执行，不影响正常逻辑
                        resolve({
                            type: 'error',
                            msg: 'switch lang error'
                        });
                    });
                }
            });
        }
    });
} // 发送请求给后端，切换上下文语言环境


var changeContextLang = function changeContextLang(currentLocale) {
    return _formservice.switchLanguage(currentLocale).then(function (res) {
        return res.switched;
    }).catch(function (err) {
        throw new Error(err);
    });
};

// 获取设备App当前语言环境


var getDevicedLang = function getDevicedLang() {
    var currentLocale = 'zh_CN';
    return new Promise(function (resolve) {
        return (0, _clientApi)('getDevicedLang', {
            callback: function callback(result) {
                if (result !== currentLocale) {
                    resolve(result);
                } else {
                    resolve(currentLocale);
                }
            }
        });
    });
};

var getCurrentLang = function getCurrentLang() {
    return _IntlUniversal.getCurrentLang();
};



var getSystemLang = function getSystemLang() {
    return _IntlUniversal.getSystemLang();
}; // ie浏览器不支持Promise.prototype.finally,真的无语




function getCurrentLocale(callback) {
    var currentLocale = 'zh_CN';
    var url = 'getUserLanguage.do?random=' + Math.random();

    _formservice.getApi(url).then(function (jsonObj) {
        currentLocale = jsonObj && jsonObj.language || currentLocale;

        _console.log('currentLocale:', currentLocale);

        callback(currentLocale);
    }).catch(function (err) {
        _console.warn('getCurrentLocale', err);

        callback(currentLocale);
    });
}
/**
 * {key,variables,activeLang} = templateInfo  || templateInfo => key
 * @key 模板字符串的唯一标识 必填
 * @variables 模板字符串的变量映射表 非必填
 * @activeLang 当前的语言类型，如果和系统的语言类型不同需要传，其他情况不传
 */


export function getLangMsg(templateInfo) {
    if (templateInfo && typeof(templateInfo) === 'object') {
        var key = templateInfo.key,
            variables = templateInfo.variables,
            activeLang = templateInfo.activeLang;
        return _IntlUniversal.get(key, variables, activeLang);
    }

    return _IntlUniversal.get(templateInfo);
};
/**
 * 从cookie中获取语言信息
 * @param {*} localeKey
 */
var getCurrentLocaleFromCookie = function getCurrentLocaleFromCookie(localeKey) {
    var cookieObj = analysCookie();
    var locale = cookieObj[localeKey] || 'zh_CN';
    return locale;
};

var analysCookie = function analysCookie() {
    var cookie = document.cookie;
    var obj = {};

    if (typeof cookie !== 'string') {
        _console.warn('cookie must be a string');

        return obj;
    }

    var reg = /; */;
    var arr = cookie.split(reg);
    var len = arr.length;

    for (var i = 0; i < len; i++) {
        var item = arr[i];
        var eq_idx = item.indexOf('=');

        if (eq_idx < 0) {
            continue;
        }

        var key = item.substr(0, eq_idx).trim();
        var val = item.substr(++eq_idx, item.length).trim(); // quoted values

        if (val[0] == '"') {
            val = val.slice(1, -1);
        }

        obj[key] = val;
    }

    return obj;
};



function fetchUserLanguage(currentLocale='zh_CN'){
   
    const url = 'getUserLanguage.do?random=' + Math.random();

    _formservice.getApi(url).then(function (jsonObj) {
        currentLocale = jsonObj && jsonObj.language || currentLocale;
        _console.log('currentLocale:', currentLocale);
        return currentLocale
    }).catch(function (err) {
        _console.warn('getCurrentLocale', err);

     
    });
}



function swtichI18n(locale){
 

    return _formservice.switchLanguage(locale).then(function (res) {
        return res.switched;
    }).catch(function (err) {
        return _console.warn('fetch switchLanguage.do', err);
    });

}






function swtichI18nContext(locale){
   let  switched=swtichI18n(locale);
   if (!switched) {
    _IntlUniversal.init(locale, function () {});
   }

}





 function initI18nContext(locale){
  let  userLanguage=  fetchUserLanguage('zh_CN');
//   if (locale&& locale !== userLanguage) {
//     swtichI18n(locale);
//   }
  initIntl(locale || userLanguage);


}



function initIntl(locale) {
    return new Promise(function (resolve) {
        _IntlUniversal.init(locale, function () {
            return resolve(true);
        });
    });
}



export {initI18n,initI18nPromise,handleSwitchLang,swtichI18n,swtichI18nContext,initI18nContext,getCurrentLang,getSystemLang}
export default initI18nContext
