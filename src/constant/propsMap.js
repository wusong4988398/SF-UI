
import  * as  _serverproperties from '../constant/serverproperties'
import  * as _propnames from '../designer/constant/propnames'

import _customProperties from '../constant/customProperties'




var _propsNameMap;

/**如果提供给用户扩展的默认属性在item之下，需要在这个数组添加此属性  getMetaProperty('item') */
 export var metaItems = [_serverproperties.LABEL_DIRECTION, _serverproperties.FIELD_STYLE, _serverproperties.PLACE_HOLDER]; 
/**提供给用户扩展的默认属性设计时、运行时映射表 */
 export var propsNameMap = (_propsNameMap = {}, 
    Object.defineProperty(_propsNameMap, _customProperties.LABEL_DIRECTION, [_serverproperties.LABEL_DIRECTION, _propnames.D_LABEL_DIRECTION]), 
    Object.defineProperty(_propsNameMap, _customProperties.TEXT_ALIGN, [_serverproperties.TEXT_ALIGN, _propnames.D_TEXT_ALIGN]),
    Object.defineProperty(_propsNameMap, _customProperties.FIELD_STYLE, [_serverproperties.FIELD_STYLE, _propnames.D_FIELD_STYLE]), 
    Object.defineProperty(_propsNameMap, _customProperties.PLACE_HOLDER, [_serverproperties.PLACE_HOLDER, _propnames.D_PLACE_HOLDER]), 
    Object.defineProperty(_propsNameMap, _customProperties.HEIGHT, [_serverproperties.HEIGHT, _propnames.D_HEIGHT]), 
    Object.defineProperty(_propsNameMap, _customProperties.COLOR, [_serverproperties.COLOR, _propnames.D_COLOR]), 
    Object.defineProperty(_propsNameMap, _customProperties.BACKGROUNG_COLOR, [_serverproperties.BACKGROUND_COLOR, _propnames.D_BACKGROUND_COLOR])
     , _propsNameMap);




// 默认值直接填充设计器，比如前景色、背景色等样式相关的属性，标题位置、字段风格等后端有设置一个默认值的不在此列表中
export var changeDesignDefaultValGoup = [_propnames.D_HEIGHT, _propnames.D_COLOR, _propnames.D_BACKGROUND_COLOR]; 

/**提供给用户扩展的设计时与运行时的控件映射表，获取设计时的默认属性时候使用 */

export var ctrlNameMap = {
    LabelAp: 'label',
    ButtonAp: 'button',
    FieldAp: 'fieldcon',
    AttachmentPanelAp: 'attachmentpanel',
    FlexPanelAp: 'flexpanel',
    BarItemAp: 'baritem',
    CardEntryAp: 'advgrid',
    CardEntryRowAp: 'cardrowpanel',
    CardEntryViewAp: 'cardview',
    CardEntryFieldAp: 'cardfield'
};



/**提供给用户扩展的设计时与提供给用户使用的字段控件名的映射表，获取设计时的默认属性时候使用 */
export var fieldTypeMap = {
    TextField: 'text',
    StepperField: 'stepper',
    LargeTextField: 'largeText'
};




export default function generateMap(obj) {
    var runPropNameMap = {};
    var DesignPropNameMap = {};
    Object.keys(obj).forEach(function (key) {
        DesignPropNameMap[obj[key][1]] = key;
        runPropNameMap[obj[key][0]] = key;
    });
    return {
        runPropNameMap: runPropNameMap,
        DesignPropNameMap: DesignPropNameMap
    };
};
