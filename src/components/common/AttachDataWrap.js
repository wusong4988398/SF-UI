import _react from 'react'
import * as _attachDataFnApi from '../../util/attachDataFnApi.js'
import * as _customStyle from '../../util/customStyle'
import  * as _toolUtils from '../../util/toolUtils.js'
import  * as _symbolConst from '../../constant/symbolConst'
import  * as   _GlobalDataCacher from '../../model/GlobalDataCacher'
import  * as _memoryCacher from '../../model/memoryCacher'
// 自定义样式缓存表
var customObj = {};
/**
 * 自动为组件生成附加描述信息
 * @param {*} WrapComponent 
 */
var AttachDataWrap =function AttachDataWrap(WrapComponent) {
    return class extends _react.Component {
      componentWillMount() {
        
      }
      /**组件初始化时执行 */
      componentDidMount(){
      
        // 订阅主题色变化事件，主题色变化修改对应色值
        this.removeDataChangeListener = _GlobalDataCacher.addDataChangeListener(_symbolConst.KEY_MODIFY_THEME_ACTION, (data)=> {
                    const color = this.props.model.getMetaProperty('fc');
                    const bgColor = this.props.model.getMetaProperty('bc'); // let borderColor = this.props.model.getMetaProperty('blc')
                    const style = this.props.model.getMetaProperty('s'); // border的样式，看了一下meta，是在style(s)里的border(b)获取的
                    const borderColor = style && style.get('b');
                    const tempReg = /themeColor/;
                    if (tempReg.test(color) || tempReg.test(bgColor) || tempReg.test(JSON.stringify(borderColor))) {
                      this.forceUpdate(); // 主题色改变强制刷新
      
                    }
      
                    this.updateCustomeStyle(data);
        });
             // // 防止卡片自定义className重复添加
                // let reg = /^card/
                // if (!reg.test(this.props.model.key)) {
                //   addCutomStyleToHead(this.props.model) && this.addClassNameWithDom()
                // }

                const eventShortCuts = this.props.model.getMetaProperty(_serverproperties.SHORT_CUTS);

                if (eventShortCuts) {
                     _memoryCacher.setKeyBoardEvent(this.props.model, eventShortCuts);
                }
                const{pageId,key}=this.props.model;
                setTimeout(function () {
                    return _memoryCacher.setControlMount(pageId, key, true);
                }, 0);

      
 


      }

      componentWillUnmount(){
        this.removeDataChangeListener && this.removeDataChangeListener();
        const{pageId,key}=this.props.model;
        _memoryCacher.setControlMount(pageId, key, false);
      }

      updateCustomeStyle(){
        const model = this.props.model;
        const pageIdName = model.pageId + model.key;
        const oldStyle = document.getElementById(pageIdName);

        if (oldStyle) {
            // oldStyle.innerHTML = customObj[pageIdName].replace(/'themeColor'/g, themeColor[data.theme])
            oldStyle.innerHTML = customObj[pageIdName].replace(/'themeColor'/g, data.themeColor);
        }
      }

      getAttachData=(model)=>{
        var additionalInfo = {};
        if (model) {
            let {pageId,key} =model;
                // 自定义属性,请保证:以'data-'打头
            additionalInfo['data-page-id'] = _attachDataFnApi.getDataPageId(pageId, key); 
            // 自定义样式
            var customClass = _customStyle.addCutomStyleToHead(model);
            if (customClass) {
              customObj[pageId + key] = customClass;
              additionalInfo['data-custom-style'] = (_customStyle.getCustomClassName(model);
          }
        if (_toolUtils.isMobileClient()) {
            additionalInfo = this.doMobileAction(model, additionalInfo);
        } else {
            // PC端增加控件级别的热键控制
            var eventShortCuts = model.getMetaProperty(_serverproperties.SHORT_CUTS);

            if (eventShortCuts) {
                additionalInfo['data-keyboard-monitor'] = true;
            }
        }
        additionalInfo = Object.assign({}, additionalInfo, _attachDataFnApi.getAttachTipsData(model));

            
        }
        return additionalInfo;

      }

      // 当前是移动页面

      doMobileAction=(model, additionalInfo)=>{
        const {isLocked,getLocked}=this.props;
        const touchfeedback = _attachDataFnApi.getTouchfeedback(model, isLocked, getLocked);

        if (touchfeedback) {
            additionalInfo['data-touchfeedback'] = touchfeedback;
        }

        return additionalInfo;

      }
      
      render() {
        var that = this;
        const model = this.props.model;
        const attachData = this.getAttachData(model);




        // 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
        return <WrapComponent {...Object.assign(
          {
            ref: (_ref)=>{ that.currentDom = _ref;}   
          },
          this.props,
          {attachData: attachData}    
          )} />
      }
    }
  }



  let AttachDataManual=_attachDataFnApi.AttachDataManual;
  let getDataPageId=_attachDataFnApi.getDataPageId;
  let getTipsDataPageId=_attachDataFnApi.getTipsDataPageId;
  let findDomByDataPageId=_attachDataFnApi.findDomByDataPageId;
  export {AttachDataManual,getDataPageId,getTipsDataPageId,findDomByDataPageId}
  

  export default AttachDataWrap