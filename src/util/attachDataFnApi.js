import * as _componentutil from '../util/componentutil'
// 移动端：点击反馈支持列表
var feedbacktype = ['fieldcon', 'hyperlink', 'mobilesearch', 'button', 'label', 'image', 'flexpanel', 
'layoutFlex', 'blockmenuitem', 'baritem']; 

// 不用点击反馈字段列表
var feedbackTypeBlacklist = ['text', 'number', 'textarea', 'largeText', 'localeText', 'telephone', 'email', 'stepper'];

var clickabletype = ['label', 'image', 'flexpanel', 'layoutFlex'];

// 动态生成 data-page-id
export function getDataPageId(pageId, key) {
    return pageId && key ? `${pageId}_${key}` : '';
  
}


/**
 * 获取自定义属性data-touchfeedback的值
 * @authors 黄万杭 (wanhang_huang@kingdee.com)
 * @param {Object} model
 * @param {Boolean} isLocked 通过 useVisbleLock 获取到的 isLocked
 * @param {function} getLocked 通过 useVisbleLock 获取到的 getLocked
 * @returns {String} data-touchfeedback 的值
 */
 export function getTouchfeedback(model, isLocked, getLocked) {
    var touchfeedback = '';
    var type = model.getMetaProperty('type'); 
    // 移动端 可录入字段 不需要加feedback效果，会导致安卓无法‘粘贴’
    if (isNeedFeedback(model)) {
        if (isLocked) {
            touchfeedback = 'false';
        } else {
            touchfeedback = 'true';

            if (clickabletype.indexOf(type) > -1) {
                if (model.getMetaProperty('clickable')) {
                    touchfeedback = 'true';
                } else {
                    touchfeedback = 'false';
                }
            }
        }
    }

    return touchfeedback;
}

/**
 * 判断是否需要点击反馈
 * @authors ws
 * @param {Object} model
 * @param {Function} getLocked 通过 useVisbleLock 获取到的 getLocked
 * @returns {boolean} 是否需要反馈
 */
 export function isNeedFeedback(model, getLocked) {
    var type = model.getMetaProperty('type');
    var option = model.getMetaProperty('item');
    var subType = option && option.get('type');
    var isGroupLocked = false;

    if (subType === 'radio' && getLocked) {
        isGroupLocked = getLocked(model, option && option.get('group'));
    }

    return feedbacktype.indexOf(type) > -1 && feedbackTypeBlacklist.indexOf(subType) === -1 && !isGroupLocked;
}


/**
 * 获取字段tips数据标识
 * @authors ws
 * @param {Object} model
 * @returns {Object} 字段tips数据标识 {'data-tip', 'data-for'}
 */


 export function getAttachTipsData(model) {

    const {pageId,key}=model;
    const option = _componentutil.getComponentDataProperty(model, 'item', 'item', false);
    const tips = _componentutil.getComponentDataProperty(model, 'tips', 'tips', false) || (option && option.get('tips'));
    return tips ? {
        'data-tip': '',
        'data-for': getTipsDataPageId(pageId, key)
    } : {};
}

/**
 * 生成控件tips唯一id
 * @param {string} pageId 页面id
 * @param {string} key 控件key
 */
 export function getTipsDataPageId(pageId, key) {
     return `${getDataPageId(pageId, key)}_tips`;

}


  // 根据data-page-Id获取dom元素
  export function findDomByDataPageId(dataPageId) {
    //var condition = "[data-page-id='".concat(dataPageId, "']"); 
    const condition=`[data-page-id='${dataPageId}']`;
    // querySelector按css规范实现，css标识符不能以数字开头, 是数字则转义处理.
    return document.querySelector(condition);
  }
  
  export default function getAttributeByDataPageId(pageId, key, attribute) {
    const rootNode = findDomByDataPageId(getDataPageId(pageId, key));
    //const node = rootNode && rootNode.querySelector("[".concat(attribute, "]"));
    const node = rootNode && rootNode.querySelector(`"[${attribute}]"`);
    return node ? node.getAttribute(attribute) : undefined;
  }
  // 手动生成附加描述信息
  export function AttachDataManual(pageId, key, extension) {
    var additionalInfo = {};
  
    if (pageId && key) {
        //additionalInfo['data-page-id'] = "".concat(pageId, "_").concat(key);
        additionalInfo['data-page-id'] =`${pageId}_${key}`;
  
        if (extension !== undefined) {
            //additionalInfo['data-page-id'] = "".concat(additionalInfo['data-page-id'], "_").concat(extension);
            additionalInfo['data-page-id'] =`${additionalInfo['data-page-id']}_${extension}`;
  
  
        }
    }
  
    return additionalInfo;
  }

  