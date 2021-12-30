import _immutable from 'immutable'
import  * as   _GlobalDataCacher from '../model/GlobalDataCacher'
import  * as _symbolConst from '../constant/symbolConst'
import _propsMap from '../constant/propsMap'
import * as _componentutil from '../util/componentutil'
import _lodash from 'lodash'

import  _IntlUniversal from '../i18n/IntlUniversal'
import  * as _const from '../constant/const'

import _baseEntityIdFieldTypeMap from '../constant/baseEntityIdFieldTypeMap'


var runPropNameMap = _propsMap.runPropNameMap;


// 获取具体控件默认属性
var getSpecDefaultProps = function getSpecDefaultProps(path) {
    var propsData = _GlobalDataCacher.getData(_symbolConst.KEY_DEFAULT_PROPS) || _immutable.Map();
    var lastPath = path[path.length - 1];
    var lastPathValue = runPropNameMap[lastPath];
    if (lastPathValue !== undefined) {
        path[path.length - 1] = lastPathValue;
    }
    return propsData.getIn(path);
};
/**
 * 获取默认属性
 * @param {String} type // 控件类型
 * @param {Array/String} prop 控件属性
 * @param {Boolean} isField 是否是字段
 * @return {Array/String} prop 控件属性
 */
var getDefaultProps = function getDefaultProps(type, prop) {
    var isField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var path = Array.isArray(prop) ? prop : [prop];
    var defaultPropValue = getSpecDefaultProps([type].concat(...path));
    return defaultPropValue === undefined ? getSpecDefaultProps(['common', isField ? 'field' : 'ui'].concat(...path)) : defaultPropValue;
};

// 获取字段控件默认属性
export function getFieldDefaultProps(fieldType, prop) {
    return getDefaultProps(fieldType, prop, true);
};



export function getUIDefaultProps(uiType, prop) {
    return getDefaultProps(uiType, prop);
};



export function getCommonDefaultProps(prop,isField=false) {
    
    return getSpecDefaultProps(['common', isField ? 'field' : 'ui', prop]);
};

/**
 * 获取字段属性值，用于设计时
 * @param {String} fieldType 字段类型
 * @param {Array/String} prop 字段属性
 * @param value 初始化属性值
 * @param defaultValue 后端定义返回的默认值
 * @return 字段属性值
 */
export function getFieldValue(fieldType, prop, value, defaultValue) {
    return value === defaultValue ? getFieldDefaultProps(fieldType, prop) : value;
};


var fixBorder = function fixBorder(border='') {
    var tempArr = border.split('_');
    tempArr[tempArr.length - 1] = _componentutil.fixColor(tempArr[tempArr.length - 1]);
    border = tempArr.join(' ');
    return border;
};
/**
 * 获取默认边框样式
 * @param {String/Object} borderStyle 边框样式
 * @return {Object}
 */
export function getDefaultBorder(borderStyle) {
    var borderTop, borderLeft, borderRight, borderBottom;

    if (_immutable.Map.isMap(borderStyle)) {
        borderTop = borderStyle.get('top');
        borderBottom = borderStyle.get('bottom');
        borderLeft = borderStyle.get('left');
        borderRight = borderStyle.get('right');
        borderTop && (borderTop = fixBorder(borderTop));
        borderBottom && (borderBottom = fixBorder(borderBottom));
        borderLeft && (borderLeft = fixBorder(borderLeft));
        borderRight && (borderRight = fixBorder(borderRight));
    }

    return {
        borderTop: borderTop || _lodash.isString(borderStyle) && fixBorder(borderStyle),
        borderRight: borderRight || _lodash.isString(borderStyle) && fixBorder(borderStyle),
        borderBottom: borderBottom || _lodash.isString(borderStyle) && fixBorder(borderStyle),
        borderLeft: borderLeft || _lodash.isString(borderStyle) && fixBorder(borderStyle)
    };
};



export function getCommonEmotionalInfo(type) {
    var imagePath = getSpecDefaultProps(['common', 'emotional', type, 'imagePath']);
    var description = getSpecDefaultProps(['common', 'emotional', type, 'description']);

    var lang = _IntlUniversal.getCurrentLang();

    var defaultLang = _IntlUniversal.getDefaultLang();

    if (description) {
        if (typeof (description) === 'object') {
            description = description.get(lang) || description.get(defaultLang);
        }
    }

    return {
        imagePath: imagePath,
        description: description
    };
}

// 判断是否为字段，字段为fieldcon 或cardfield
export var isField = function isField(type) {
    return _const.FIELD_ARR.includes(type);
};

/**
 * @param {*} type 业务字段的类型 eg: bd_supplier
 * @param {*} inDesign 是否是设计时，默认为运行时，值为false
 * @param {*} defaultIcon 默认的icon
 * @returns {Boolean} 字体图标的class
 */

export function getBaseDataFieldIcon(type) {
    var inDesign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var fieldIconData = (0, _GlobalDataCacher.getData)(_symbolConst.KEY_DEFAULT_FIELD_ICON);

    if (!fieldIconData) {
        return '';
    }

    var commonIcon = fieldIconData.getIn(['basedata', 'commonIcon'], '');
    var baseDataType = type;

    if (inDesign) {
        baseDataType = _baseEntityIdFieldTypeMap.default[type];
    }

    var specIcon = fieldIconData.getIn(['basedata', 'specIcon', baseDataType]);
    return specIcon || commonIcon;
};

/**
 * @param {*} type 业务字段的类型 eg: bd_supplier
 * @param {*} inDesign 是否是设计时，默认为运行时，值为false
 * @param {*} defaultIcon 默认的icon
 * @returns {Boolean} 字体图标的class
 */
export function getCommonFieldIcon(type) {
    var fieldIconData = (0, _GlobalDataCacher.getData)(_symbolConst.KEY_DEFAULT_FIELD_ICON);

    if (!fieldIconData) {
        return '';
    }

    var path = Array.isArray(type) ? type : [type];
    return fieldIconData.getIn(path);
};


export default getSpecDefaultProps
