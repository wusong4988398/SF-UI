
import _immutable from 'immutable'
var DATA = _immutable.Map(); // {key:{value:xxx,listener:[...]},...}
/**
 * 更新数据
 * @param {*} key symbol 数据唯一标识符
 * @param {*} notSetValue 没有旧值，可以设置默认值，ie List() or Map()
 * @param {*} callback 更新函数 old=>{return newValue}
 */

 export function updateData(key, notSetValue, callback) {
    if (!isSymbol(key)) {
        console.warn('key不是Symbol类型，无法添加数据', key);
        return;
    }

    if (typeof notSetValue === 'function') {
        callback = notSetValue;
        notSetValue = undefined;
    }

    if (typeof callback !== 'function') {
        console.warn('updateData callback 必须是函数');
        return;
    }

    var newValue, oringinValue;

    var updateFunc = function updateFunc(value) {
        oringinValue = value;
        newValue = callback(value);
        return newValue;
    };

    DATA = DATA.updateIn([key, 'value'], notSetValue, updateFunc);

    try {
        fireEvent(key, newValue, oringinValue);
    } catch (error) {
        console.error('updateData fireEvent error:', error);
    }
}
/**
 @param key Symbol类型参数
 */
export function setData(key, value) {
    updateData(key, function (oldValue) {
        return value;
    });
}

export function getData(key) {
    if (isSymbol(key)) {
        return DATA.getIn([key, 'value']);
    }
}

export function removeData(key) {
    if (isSymbol(key)) {
        var oldValue = DATA.getIn([key, 'value']);
        DATA = DATA.remove(key);
        fireEvent(key, undefined, oldValue);
    }
} // 返回删除当前监听实例的方法removeListener
export function addDataChangeListener(key, callback) {
    DATA = DATA.updateIn([key, 'listener'], _immutable.List(), function (list) {
        return list.push(callback);
    });
    return function removeListener() {
        DATA = DATA.updateIn([key, 'listener'], _immutable.List(), function (list) {
            return list.filterNot(function (cb) {
                return cb === callback;
            });
        });
    };
}

export function getListener(key) {
    return DATA.getIn([key, 'listener'], _immutable.List());
}

export function isSymbol(key) {
    if (window.isIE) {
        return true;
    }

    return typeof(key) === 'symbol';
}

export function fireEvent(key, value, oldValue) {
    DATA.getIn([key, 'listener'], _immutable.List()).forEach(function (listener) {
        listener(value, oldValue);
    });
}
