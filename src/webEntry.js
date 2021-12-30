import * as _KDGlobal from './SFGlobal.js'
function run(_ref) {

    var locale = _ref.locale;

    // 处理某个版本ie11缺少window.location.origin属性造成地址拼接错误的问题
   
    if (typeof window.location.origin === 'undefined') {
        window.location.origin = window.location.protocol + '//' + window.location.host;
    }
    if (!window.terminate) {
        _KDGlobal.initKDGlobal();
    }

}

run({});
