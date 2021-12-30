
/**
 * input输入优化，对中文输入过程中多次触发change进行处理
 * @param {*} ele:input ele  
 * @param {*} callback:输入变化回调函数  
 * @param {*} option：可选参数：截流时间：默认300ms，是否使用中文组合事件监听，默认true 
 * return 返回移除各种事件监听的函数
 */
function listenInput(ele, callback,option={}) {
    let {timeout=300,useCompositionEvent=true,isCache=true,isSupressChangeBreak}=option;
    let fisrtTriggered = false; // 是否第一次触valueChanged事件

    let value = ele.value;
    let inInputEvent = false;
    let inCompositionEvent = false;
    let trigger = createDelayFunction(valueChanged, timeout);
    // Return a function that can remove listeners added here.
    return enabledEvent(ele);


    function valueChanged(val) {
        // isCache: 是否使用内部缓存数据比较后更新,减少触发次数
        if (isCache && val === value) {
            return;
        }
        value = val;
        /**
         * 兼容IE(BaseData组件发现问题)
         *  1.IE浏览器上单据初始完成后,'input'事件会自动触发一次，此时用户未做任何交互,导致自动渲染了必录校验提示信息;
            2.输入框没有内容，设置了placeholder后，第一次获取到焦点时会触发'input'事件
            3.IE表格F7单元格有值下，删除值，也会被阻止导致不能触发值改变，加入isSupressChangeBreak判断，表格暂无1和2问题
         */
        if (window.isIE && !fisrtTriggered && !isSupressChangeBreak) {
            fisrtTriggered = true;
            return;
        }

        fisrtTriggered = true;

        callback(value, {
            ele: ele
        });
    }

    function enabledEvent(ele) {
        ele.addEventListener('keyup', keyup);
        ele.addEventListener('input', input); 

        useCompositionEvent && ele.addEventListener('compositionstart',compositionstart);
        useCompositionEvent && ele.addEventListener('compositionend', compositionend);


        function keyup(e) {
             // 过滤掉F7按键事件，解决BaseData的F7按键功能
             if (e.keyCode === 118) return;
             // tab按键会引发显示F7选择面板，这里不触发按键事件
            if (e.keyCode === 9) return;
            if (inInputEvent) {
                ele.removeEventListener('keyup', keyup);
            } else {
                trigger(this.value);
            }
        }
        function input() {
            if (!inInputEvent) inInputEvent = true;
            if (!inCompositionEvent) trigger(this.value);
        }
        function compositionstart() {
            inCompositionEvent = true;
        }
        function compositionend(){
            inCompositionEvent = false;
            trigger(this.value);
        }




    }


}
/**
 * 创建延迟函数
 * @param {*} fn 
 * @param {*} timeout 
 */
function createDelayFunction(fn,timeout=300) {
  
    let timeoutId = -1;
    return function(){
        let _len = arguments.length;
        let args = new Array(_len);
        for (let index = 0; index < _len; index++) {
            args[index] = arguments[index];
            
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            fn.apply(null, args);
        }, timeout);

    }
}


export default listenInput