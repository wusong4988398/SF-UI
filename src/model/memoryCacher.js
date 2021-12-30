import _immutable from 'immutable'
import * as _defaultproperties from '../constant/defaultproperties'
import  * as _appModelFunction from '../model/appModelFunction'
var cacher = _immutable.Map(); // {pageId->{...}}
var BusyTip = '__busy_tip'; // 控件动态设置忙时提醒
var __listener__ = '__listener__';
var formStatus = '__form_status__'; // 表单状态值，用于锁定性，可见性等条件判断
var emptySet = _immutable.Set();
var controlMount = '__control_mount__'; // 控件是否渲染
export function setControlBusyTip(pageId, key, busyTipObject) {
    setPageData(pageId, [BusyTip, key], (0, _immutable.fromJS)(busyTipObject));
}

export function setPageData(pageId, path, value) {
    if (pageId && path) {
        // cacher=cacher.setIn([pageId].concat(path),value)
        updatePageData(pageId, path, function (oldValue) {
            return value;
        });
    }
}


/*
  修改页面数据
  @param notSetValue 如果页面不存在，可以设置为notSetValue定义的值,可选参数
  @param callback 更新函数 ：(vlaue)=>callback(value)
*/
export function updatePageData(pageId, path, notSetValue, callback) {
    if (typeof notSetValue === 'function') {
        callback = notSetValue;
        notSetValue = undefined;
    }

    if (typeof callback !== 'function') {
        console.warn('updatePageData callback 必须是函数');
        return;
    }

    var newValue, oringinValue;

    var updateFunc = function updateFunc(value) {
        oringinValue = value;
        newValue = callback(value);
        return newValue;
    };

    cacher = cacher.updateIn([pageId].concat(path), notSetValue, updateFunc);
    var listerers = getDataChangeListener(pageId, path);
    listerers.forEach(function (listener) {
        try {
            listener(newValue, oringinValue);
        } catch (error) {
            console.error(error);
        }
    });
}

export function getDataChangeListener(pageId, path) {
    return cacher.getIn([pageId, __listener__, makePageDataKey(pageId, path)], _immutable.List());
} 

export function makePageDataKey(pageId, path) {
    return [pageId].concat(path).join('');
}

export function getDynamicFormStatus(pageId) {
    return getPageData(pageId, formStatus) 
    || _appModelFunction.getDynamicFormInitStatus(pageId)(getState()) 
    || _defaultproperties.DEFAULT_FORMSTATUS;
}
export function getPageData(pageId, path) {
    return cacher.getIn([pageId].concat(path));
}

export function getState() {
    return window.store.getState();
}

/**
 * 设置控件是否渲染
 * @param {*} pageId 
 * @param {*} key 
 * @param {*} isMount 
 * @returns 
 */
export function setControlMount(pageId, key, isMount) {
    return updatePageData(pageId, controlMount, emptySet, function (value) {
        return isMount ? value.add(key) : value.delete(key);
    });
}