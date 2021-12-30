

import  _eventBus from './eventBus.js'
export function initKDGlobal(args) {

    if (!window.KD) {
        window.KD = {};
        init();
    }
    // 初始化'spyApi'空间
    if (!window.spyApi) {
        window.spyApi = {};
    }
}

// 添加预置内容
function init() {
    // 预置函数
    window.KD.notifyPlatform = notifyPlatform; 
    // 预置常量
    window.KD.IFRAMECLICK = 'iframeClick';
     // 监听消息'message'，响应其他页面请求
    addEventListenerOfMessage(callBackFunOfMessage);
} 

function notifyPlatform(type, message) {
    switch (type) {
        case window.KD.IFRAMECLICK:
            iframeClickFun();
            break;

        default:
            console.warn(`前端平台暂未处理该消息类型:${type}`);
            break;
    }
}

// 监听消息'message'，响应其他页面请求
function addEventListenerOfMessage(callBackFunc) {
    // 为window注册message事件并绑定监听函数
    if (window.addEventListener) {
        window.removeEventListener('message', callBackFunc, false);
        window.addEventListener('message', callBackFunc, false);
    } else if (window.attachEvent) {
        window.detachEvent('message', callBackFunc);
        window.attachEvent('message', callBackFunc); // 兼容
    }
}
/*
 * 监听消息'message'都回调函数
 * 参数: data是string，postMessage接口参数推荐用string类型
 * postMessage函数接口类型:

 * 嵌入平台的第三方页面与前端平台通信，互相使用postMesage接口
 * 第三方页面向前端平台发送消息例子:
 * window.parent.postMessage({pageId:"xxxxx", type:'invokeCustomEvent', content:{a:'aaaa',b:'bbb'}},'*')
 */
function callBackFunOfMessage(args) {

    console.dir(args)
    if (args){

    }

}

/*
 * 嵌套子页面(如iframe中页面)通知前端平台自己触发了相关操作,用于iframe内部域调用
 * iframe中调用方式: winodw.top.window.KD.notifyPlatform(window.top.window.KD.IFRAMECLICK,'')
 */


function iframeClickFun() {
    alert('iframeClickFun');
   // 隐藏侧边栏菜单
   _eventBus.pub_showSlideBill({
    show: false
});
   /*
     * 模拟发送'click'请求,保证点击内嵌的第三方页面时(eg:轻分析页面),前端自动关闭其他下拉弹窗(eg:appstarted组件下拉)
     * 这些下拉弹窗基本都是监听document的click来关闭
     */
    

}