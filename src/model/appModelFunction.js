import * as _color from '../constant/color'
import _immutable from 'immutable'
import * as _metaFlatten from './metaFlatten.js'
import * as _memoryCacher from '../model/memoryCacher'
export function getRootPageId() {
    return function (state) {
        return state.get('rootPageId');
    };
};
/**获取主题色值，兼容pc和mobile */
export function getThemeColor(rootPageId) {
    return function (state) {
        return state.getIn(['forms', rootPageId, 'config', 'themeInfo', 'color']) || _color.defaultThemeColor;
    };
};

/**
 * 获取表单初始状态值
 * @param {*} pageId
 */
 export function getDynamicFormInitStatus(pageId) {
    return function (state) {
        return state.getIn(['forms', pageId, 'config', 'status']);
    };
};


/**
 * 获取控件／字段可见性规则设置
 * controlpath：控件／字段Id 或 路径(格式:[‘a’,'b'])
 *
 */
 export function getDataVisible(pageId, controlpath,isCustomPath=false) {
   
    return function (state) {
        var fullPath = ['forms', pageId, 'data'].concat(controlpath);

        if (!isCustomPath) {
            fullPath = fullPath.concat('visible');
        }

        var hideKeys = state.getIn(fullPath,  _immutable.Set());
        return hideKeys.size === 0;
    };
};


/**
 * 获取控件／字段锁定规则设置
 * controlpath：控件／字段Id 或 路径(格式:[‘a’,'b'])
 *
 */
 export function getDataLock(pageId, controlpath,isCustomPath=false) {
   
    return function (state) {
        var fullPath = ['forms', pageId, 'data'].concat(controlpath);

        if (!isCustomPath) {
            fullPath = fullPath.concat('lock');
        }

        var lockedKeys = state.getIn(fullPath);

        if (lockedKeys) {
            return lockedKeys.size > 0;
        } // 假设锁定的lock有3个，则必须3个都解锁了，控件才能解锁。


        return false;
    };
};


/**
 * 根据关联ID获取关联属性
 * @param {*} pageId
 * @param {*} sourceFieldId
 */

 export function getSourceFiledInfoById(pageId, sourceFieldId) {
    return function (state) {
        return state.getIn(['forms', pageId, 'data', sourceFieldId, 'srcFiledInfo']);
    };
};
export function getTipForms(pageId) {
    return function (state) {
        return state.getIn(['forms', pageId, 'tipForms']);
    };
};

// 获取单个控件meta
export function getItemMeta(pageId, key) {
    return function (state) {
        var path = getItemMetaPath(pageId, key)(state);
        return path && state.getIn(path);
    };
};

export function getItemMetaPath(pageId, ctrlKey) {
    return function (state) {
        var rootPath = getMetaPath(pageId); // const itemPath = getItemMetaPathWithCache(pageId, ctrlKey)(state)

        var itemPath = _metaFlatten.getControlPath(pageId, ctrlKey)(state);

        if (itemPath) {
            return rootPath.concat(itemPath);
        }
    };
};

export function getMetaPath(pageId) {
    return _immutable.List(['forms', pageId, 'meta']);
};



/**
 * 获取表单元数据
 * @param {string} pageId 页面pageId
 */
 export function getFormMeta(pageId) {
    return function (state) {
        return state.getIn(['forms', pageId, 'meta']);
    };
};

export function convertAppModelFunctionAction(action) {
    return {
        type: 'convert_appmodelfunction',
        param: action
    };
}

export function setControlPostValue(pageId, key, postData) {
    return function (state) {
        // return state.setIn(['forms', pageId, 'post', 'controls', key], postData)
        _memoryCacher.setPageData(pageId, ['post', 'controls', key], postData);
        return state;
    };
};

export function setDataValue(pageId, key, value) {
    return function (state) {
        return state.setIn(['forms', pageId, 'data', key, 'value'], (0, _immutable.fromJS)(value));
    };
};


/**递归调用所有的操作store的函数func(state),返回最终的state值 */
export function batchActions() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }

    return function (state) {
        return funcs.reduce(function (_state, func) {
            return func(_state);
        }, state);
    };
}