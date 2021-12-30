import  * as _appModelFunction from '../model/appModelFunction'
import  * as _memoryCacher from '../model/memoryCacher'
import  * as  _serverproperties from '../constant/serverproperties'
import * as _defaultproperties from '../constant/defaultproperties.js'
import getWebRootPath from '../api/getWebRootPath.js'
import * as _customProperties from '../constant/customProperties'
import * as _defaultPropsUtil from '../util/defaultPropsUtil'
import  * as _toolUtils from '../util/toolUtils'
/** 处理颜色，把themeColor处理成真正的主题色值 */
export function fixColor(color) {
    if (color === 'themeColor') {
        color = getCurrentTheme();
    } else if (/themeColor/.test(color)) {
        var colorAlpha = color.split('|');

        if (colorAlpha[0] === 'themeColor') {
            color = transformColor(getCurrentTheme(), colorAlpha[1]);
        }
    }

    return color;
}
/**获取当前主题色 */
export function getCurrentTheme() {
    var state = window.store.getState();
    var rootId = _appModelFunction.getRootPageId()(state);
    var themeInfo = _appModelFunction.getThemeColor(rootId)(state);
    return themeInfo;
}
/**
 * 根据16进制的颜色值和透明度转换成rgba
 * @param  color [颜色值]
 * @param  alpha [透明度]
 * @return rgba  [返回rgba]
 */
export function transformColor(color, alpha) {
    var r;
    var g;
    var b;
    var rgb = color.replace(/#|\s+/g, '');

    if (rgb) {
        r = parseInt(rgb.slice(0, 2), 16);
        g = parseInt(rgb.slice(2, 4), 16);
        b = parseInt(rgb.slice(4, 6), 16);
    }

    return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(alpha / 100, ")");
} 


/**
 * 设置display属性控制可见性
 * @param  {[type]} style   [控件已有style]
 * @param  {[bool]} visible [是否可见]
 * @return {[object]}       [style对象]
 */
 export function getVisibleStyle(style, visible) {
    var styleCopy = Object.assign({}, style);

    if (visible == true || visible == undefined) {
        if (styleCopy.display === 'none') {
            delete styleCopy.display;
        }

        return styleCopy;
    } else {
        var inVisibleStyle = {
            display: 'none'
        };
        return Object.assign({}, styleCopy, inVisibleStyle);
    }
}


/**
 * 获取字段/控件可见性
 * @param  {[type]} model      [获取单据状态]
 * @param  {[type]} vi         [可见性值(数字)，不传则取系统默认值]
 * @param  {[type]} controlkey [要查询的字段/控件key，不传则获取父容器(model.key)的可见性]
 * @return {[type]}            [bool:是否可见]
 */
 export function getVisible(model, controlkey, vi) {
    var _visible = getMetaVisible(model, vi);

    if (_visible && !getShowHideAciton(model, controlkey)) {
        // 规则隐藏
        _visible = false;
    }

    return _visible;
} 
/**
 * 获取字段／控件元数据设置是否可见
 * @param {*} model 
 * @param {*} vi     [可见性值(数字)，不传则取系统默认值]
 */
export function getMetaVisible(model, vi) {
    let meta = model.meta; // let config = model.getFormConfig();
    // let  formStatusSetting = getDynamicFormStatus(model.pageId)(model.state);
    // let frmStatus =  formStatusSetting!=undefined? formStatusSetting:config.status;
    let frmStatus = _memoryCacher.getDynamicFormStatus(model.pageId);
 
    // controlkey不为空时，如果vi为空，则取model的vi(即父容器的vi)
    let visible = vi !== undefined ? vi : meta.get(_serverproperties.VISIBLE_CTRL);
    let _visible = true;
    visible = visible == undefined ? _defaultproperties.DEFAULT_CTRL_VISIBLE : visible; // const initVisible = !(visible < InitVisibleValue) // 初始可见性，服务端指定实现的逻辑
    // frmStatus表示取位位数（位置），去取可见性数值二进制表示时对应位置的0/1数值
    // 先&7，把visible的二进制的第一位变为0（初始可见的值），之后正常计算可见性。
    // let result = (visible&7)>>frmStatus&1;
    // let result = (visible&VisibleSum)>>frmStatus&1;

    let result = visible >> frmStatus & 1;
    _visible = result == 1;
    return _visible;

}


/**
 * 获取字段/控件在规则中显示隐藏的设置
 * @param  {[type]} model      [description]
 * @param  {[type]} controlKey [要查询是否有规则控制隐藏/显示的控件key]
 * @return {[type]}            [是否可见->true:可见,false:隐藏]
 */
 export function getShowHideAciton(model, controlkey) {
    var key = controlkey || model.key;
    return _appModelFunction.getDataVisible(model.pageId, key)(model.state);
}


/**
 * (依据单据状态)计算控件锁定性
 * @param  {[type]} model      [获取单据状态]
 * @param  {[type]} controlkey [目标key,默认model.key]
 * @param  {[type]} lockValue  [锁定的值]
 * @return {[type]}            [bool:是否锁定]
 */
 export function getLocked(model, controlkey, lockValue) {
    var _lock = getMetaLocked(model, lockValue);
     // 依据单据状态不锁定控件时，则查看规则锁定

    if (!_lock && getLockedAciton(model, controlkey)) {
       
        _lock = true;
    }

    return _lock;
}

// 获取字段／控件元数据设置是否锁定
export function getMetaLocked(model, lockValue) {
    let meta = model.meta; // let config = model.getFormConfig();
    // let formStatusSetting = undefined;
    // if(model.state){//动态设置的单据状态
    //  formStatusSetting = getDynamicFormStatus(model.pageId)(model.state);
    // }
    // let frmStatus = formStatusSetting!=undefined? formStatusSetting:config.status;

    let frmStatus = _memoryCacher.getDynamicFormStatus(model.pageId);
 

    let lock = lockValue ? lockValue : meta.get(_serverproperties.LOCK_CTRL);

    var _lock = false;
    lock = lock == undefined ? _defaultproperties.DEFAULT_CTRL_LOCK : lock;
    let result = lock >> frmStatus & 1; // 2016-11-18 暂时放开查看状态锁定
    // _lock = (result == 1 || frmStatus == 2)? true:false; //查看状态，始终锁定

    _lock = result == 1; // 查看状态，始终锁定

    return _lock;
}


/**
 * 获取规则的锁定设置
 *
 * @param  {[type]} model [description]
 * @return {[type]}       [true:锁定,false:解锁]
 */
 export function getLockedAciton(model, controlkey) {
    var key = controlkey || model.key;
    return _appModelFunction.getDataLock(model.pageId, key)(model.state);
}


/**
 * 获取控件的动态配置：当data里面存在该配置时，取data的值，否则取meta的值
 *
 * @param  {[type]}  model            Component
 * @param  {[type]}  dataProperty     业务数据属性名
 * @param  {[type]}  metaProperty     元数据属性名
 * @param  {Boolean} isLocaleProperty 元数据属性是否国际化属性
 */
 export function getComponentDataProperty(model, dataProperty, metaProperty, isLocaleProperty) {

    // 业务数据优先
    var dataPropertyValue = model.getDataProperty(dataProperty);

    if (dataPropertyValue !== undefined) {
        return dataPropertyValue;
    } else if (metaProperty !== undefined) {
        if (isLocaleProperty) {
            return model.getMetaLocaleProperty(metaProperty);
        } else {
            return model.getMetaProperty(metaProperty);
        }
    } else {
        return null;
    }
}



/**
 * 根据model生成基本的内联样式
 * unSetProperties 排除的属性
 * @param  {[type]} model [description]
 * @return {[type]}       [description]
 */


 export function getCommonStyle(model) {
    var unSetProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var type = model.meta.get('type');
    var width = model.getMetaLocaleProperty(_serverproperties.WIDTH);
    var height = model.getMetaLocaleProperty(_serverproperties.HEIGHT);
    var backgroundColor = model.getMetaProperty(_serverproperties.BACKGROUND_COLOR);
    var color = model.getMetaProperty(_serverproperties.COLOR);
    var backgroundImage = model.getMetaProperty(_serverproperties.BACKGROUND_IMAGE);
    var backgroundImageFull = model.getMetaProperty(_serverproperties.BACKGROUND_IMAGE_FULL);
    var backgroundImageRepeat = model.getMetaProperty(_serverproperties.BACKGROUND_IMAGE_REPEAT);
    var fontSize = model.getMetaProperty(_serverproperties.FONT_SIZE);
    var fontWeight = model.getMetaProperty(_serverproperties.FONT_WEIGHT);
    var borderStyle = model.getMetaProperty(_serverproperties.BORDER_STYLE);
    var borderRadius = model.getMetaProperty(_serverproperties.RADIUS);
    var zIndex = model.getMetaProperty(_serverproperties.Z_INDEX);
    var textAlign = model.getMetaProperty(_serverproperties.TEXT_ALIGN); // const shadow = model.getMetaProperty(SHADOW)

    var marginTop, marginLeft, marginRight, marginBottom;
    var borderTop, borderLeft, borderRight, borderBottom;
    var paddingTop, paddingLeft, paddingRight, paddingBottom;

    if (borderStyle) {
        var margin = borderStyle.get(_serverproperties.MARGIN);
        var border = borderStyle.get(_serverproperties.BORDER);
        var padding = borderStyle.get(_serverproperties.PADDING);

        if (margin) {
            marginTop = margin.get(_serverproperties.TOP);
            marginRight = margin.get(_serverproperties.RIGHT);
            marginBottom = margin.get(_serverproperties.BOTTOM);
            marginLeft = margin.get(_serverproperties.LEFT);
        }

        if (border) {
            borderTop = border.get(_serverproperties.TOP); // if(borderTop) borderTop = borderTop.split('_').join(' ');

            if (borderTop) {
                var tempArr = borderTop.split('_');
                tempArr[tempArr.length - 1] = fixColor(tempArr[tempArr.length - 1]);
                borderTop = tempArr.join(' ');
            }

            borderRight = border.get(_serverproperties.RIGHT); // if(borderRight) borderRight = borderRight.split('_').join(' ');

            if (borderRight) {
                var _tempArr = borderRight.split('_');

                _tempArr[_tempArr.length - 1] = fixColor(_tempArr[_tempArr.length - 1]);
                borderRight = _tempArr.join(' ');
            }

            borderBottom = border.get(_serverproperties.BOTTOM); // if(borderBottom) borderBottom = borderBottom.split('_').join(' ');

            if (borderBottom) {
                var _tempArr2 = borderBottom.split('_');

                _tempArr2[_tempArr2.length - 1] = fixColor(_tempArr2[_tempArr2.length - 1]);
                borderBottom = _tempArr2.join(' ');
            }

            borderLeft = border.get(_serverproperties.LEFT); // if(borderLeft) borderLeft = borderLeft.split('_').join(' ');

            if (borderLeft) {
                var _tempArr3 = borderLeft.split('_');

                _tempArr3[_tempArr3.length - 1] = fixColor(_tempArr3[_tempArr3.length - 1]);
                borderLeft = _tempArr3.join(' ');
            }
        }

        if (padding) {
            paddingTop = padding.get(_serverproperties.TOP);
            paddingRight = padding.get(_serverproperties.RIGHT);
            paddingBottom = padding.get(_serverproperties.BOTTOM);
            paddingLeft = padding.get(_serverproperties.LEFT);
        }
    }

    color = fixColor(color);
    backgroundColor = fixColor(backgroundColor);

    if (type === 'baritem') {
        var defaultBorder = (0, _defaultPropsUtil.getUIDefaultProps)(type, _customProperties.default.GHOST_TYPE_BORDER); // 幽灵按钮进行特殊处理

        if (_toolUtils.isWhiteColorBg(backgroundColor) && defaultBorder !== undefined) {
            borderTop = borderTop || _defaultPropsUtil.getDefaultBorder(defaultBorder).borderTop;
            borderBottom = borderBottom || _defaultPropsUtil.getDefaultBorder(defaultBorder).borderBottom;
            borderLeft = borderLeft || _defaultPropsUtil.getDefaultBorder(defaultBorder).borderLeft;
            borderRight = borderRight || _defaultPropsUtil.getDefaultBorder(defaultBorder).borderRight;
        }
    }

    var style = {
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        borderRadius: borderRadius,
        marginTop: marginTop,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: marginBottom,
        zIndex: zIndex,
        textAlign: textAlign,
        borderTop: borderTop,
        borderLeft: borderLeft,
        borderRight: borderRight,
        borderBottom: borderBottom,
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom
    };

    if (backgroundImage) {
        var config = model.getFormConfig();
        style.backgroundImage = "url(".concat(getImgFullPath(config.fileserver, backgroundImage), ")"); // if(config && config.fileserver){
        //  backgroundImage = `url(${config.fileserver}${backgroundImage})`;
        //  style.backgroundImage = backgroundImage;
        // }
    }

    if (backgroundImageRepeat) {
        style.backgroundRepeat = backgroundImageRepeat;
    }

    if (backgroundImageFull) {
        style.backgroundSize = '100% 100%';
    } // if(shadow){
    //  style.boxShadow='0px 1px 3px 0px rgba(0,0,0,0.15)';
    // }
    // for (let p in style) {
    //   if (style[p] === undefined) { unSetProperties.push(p) }
    // }
    // _.map(unSetProperties, prop => {
    //   _.unset(style, prop)
    //   return style
    // })


    Object.keys(style).filter(function (key) {
        return style[key] === undefined || unSetProperties.includes(key);
    }).forEach(function (key) {
        return delete style[key];
    });
    return style;
}

export function getCommonClass(model) {
    var Grow = model.getMetaProperty(_serverproperties.FLEX_GROW);
    var Shrink = model.getMetaProperty(_serverproperties.FLEX_SHRINK);
    var Overflow = model.getMetaProperty(_serverproperties.OVERFLOW) || 'auto'; // overflow:默认自动滚动

    var Wrap = model.getMetaProperty(_serverproperties.FLEX_WRAP);
    var Direction = model.getMetaProperty(_serverproperties.FLEX_DIRECTION);
    var AlignSelf = model.getMetaProperty('as');
    var AlignItems = model.getMetaProperty('ai');
    var AlignContent = model.getMetaProperty('ac');
    var JustifyContent = model.getMetaProperty('jc');
    var style = {
        Grow: Grow,
        Shrink: Shrink,
        Overflow: Overflow,
        Wrap: Wrap,
        Direction: Direction,
        AlignSelf: AlignSelf,
        AlignItems: AlignItems,
        AlignContent: AlignContent,
        JustifyContent: JustifyContent
    };
    return JSON.parse(JSON.stringify(style));
}
/*
 * 获取图片全路径(支持服务端针对图片文件做版本控制)
 * appendFileServer是否需要拼接fileServer，字段需要，控件不需要
 * addVersion: 添加图片版本信息
 */


export function getImgFullPath(fileServer='',imgPath,appendFileServer=false,addVersion=true) {

    imgPath = imgPath || ''; // 兼容为null下报错
    // base64或者http完整地址路径直接返回

    if (/^data:?/.test(imgPath) || /^http(s)?/.test(imgPath)) {
        return imgPath;
    }

    if (!imgPath.trim()) {
        // imgPath发送的null
        return '';
    }

    if (imgPath.startsWith('/')) {
        // 静态部署需求,图片地址最前部分不要斜线
        imgPath = imgPath.substr(1, imgPath.length);
    }

    if (fileServer.length > 0 && !fileServer.endsWith('/')) {
        fileServer = fileServer + '/';
    }

    if (appendFileServer) {
        // 非http或https打头
        imgPath = fileServer + imgPath;
    } else {
        imgPath = getWebRootPath(imgPath);
    }

    if (addVersion) {
        var version = getImgVersion();

        if (imgPath === '' || version === undefined || version === null || version === '') {
            return imgPath;
        } else {
            if (/\?/g.test(imgPath)) {
                return "".concat(imgPath, "&v=").concat(version);
            } else {
                return "".concat(imgPath, "?v=").concat(version);
            }
        }
    }

    return imgPath;
}
var IMG_VERSION; // 图片版本号
/*
 * 获取图片版本号(获取一次后缓存,由服务端发送过来)
 */

export function getImgVersion() {
    if (IMG_VERSION === undefined) {
        var state = store.getState();
        IMG_VERSION = state.getIn(['forms', state.get('rootPageId'), 'config', 'imgversion']); // 图片版本路径(全局一致)

        if (IMG_VERSION === undefined) {
            IMG_VERSION = ''; // 取过一次,如果不存在,就设为空
        } // test data
        // IMG_VERSION = '1.11';

    }

    return IMG_VERSION;
}