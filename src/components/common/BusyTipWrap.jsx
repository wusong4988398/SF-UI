import * as react from "react";
import * as ReactDOM from "react-dom";
import * as _intlApi from "../../i18n/intlApi";
import * as _memoryCacher from '../../model/memoryCacher'

/**
 * 正在加载... 设置busyTips元数据高阶组件
 * @param {*} supportMethod 
 * @returns 
 */
var BusyTipWrap =function BusyTipWrap(supportMethod=[]) {
    return function (WrappedComponent) {
        return class extends react.Component {
            
            componentDidMount(){
                let model = this.props.model;
                if (model) {
                    let {pageId,key}=model;
                    let text = _intlApi.getLangMsg('BusyLayer.loading');
                    let busyTipObj = {
                        zh_CN: text,
                        en_US: text,
                        zh_TW: text
                    };
                    if (supportMethod.length > 0) {
                        // 限定触发忙时提醒的请求名称
                        busyTipObj['supportMethod'] = supportMethod;
                    }
                    _memoryCacher.setControlBusyTip(pageId, key, busyTipObj);
                    
                }
            }
            render(){
                return <WrappedComponent {...this.props}></WrappedComponent>
            }

        } 
    }



}


export default BusyTipWrap