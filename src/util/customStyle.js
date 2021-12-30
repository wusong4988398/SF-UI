import * as _componentutil from '../util/componentutil'
import _cssom from 'cssom'
/**
 * 在head增加内嵌自定义样式
 * @param {*} model 
 */
export function addCutomStyleToHead(model) {
    if (!model) return;
    let pageId = model.pageId;
    let customClass = _componentutil.getComponentDataProperty(model, 'cstyles', 'cstyles', false);
    if (customClass) {
        customClass = JSON.parse(decodeURIComponent(escape(atob(customClass)))).content;
        // pageid 控件id标识  key 当pageid相同的时候区分控件
        var pageIdName = pageId.replace(/[\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?\/\\]/g, '') + model.key; 
        // customStyle 1.统一识别标识 2.className不接受数字作为首字符
        customClass = parseCssGetStr(customClass, "[data-custom-style='customStyle_" + pageIdName + "']"); 

        if (!customClass) return ''; // const themeClass = customClass.replace(/'themeColor'/g, themeColor[getCurrentTheme()])
        const themeClass = customClass.replace(/'themeColor'/g, _componentutil.getCurrentTheme());
        createOrModifyStyle(pageIdName, themeClass, pageId);
        

        
    }

    return customClass || '';


}


function createOrModifyStyle(pageIdName, customClass, pageId) {
    let oldStyle = document.getElementById(pageIdName);

    if (oldStyle) {
        if (oldStyle.innerHTML != customClass) {
            oldStyle.innerHTML = customClass;
        }
    } else {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.id = pageIdName;
        style.setAttribute('data-custom-pageid', pageId);
        style.innerHTML = customClass;
        document.head.appendChild(style); // addPageReleaseListener(pageId,()=>{
        //   style && style.remove()
        // })
    }
}

function parseCssGetStr(input, key) {
    var rules = _cssom.parse(input);

    var cssStr = '';
    rules.cssRules.forEach(function (item) {
        if (item.selectorText.includes(',')) {
            item.selectorText = item.selectorText.split(',').reduce(function (resultStr, result, index) {
                index === 0 ? resultStr = replaceCssName(result, key) : resultStr += ',' + replaceCssName(result, key);
                return resultStr;
            }, '');
        } else {
            item.selectorText = replaceCssName(item.selectorText, key);
        }

        cssStr += item.cssText;
    });
    return cssStr;
}


function replaceCssName(name, key) {
    if (name.includes('$')) {
        name = name.replace(/\$/g, `${key}`);
    } else {
        name = `${key}" "${name}`;
    }

    return name;
}