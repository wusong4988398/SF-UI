import react from 'react'
import _immutable from 'immutable'
import * as _serverproperties from '../../constant/serverproperties'
import * as _appModelFunction from '../../model/appModelFunction'
let PropsComparison=function PropsComparison(ComposedComponent) {

     class PropsComparison extends react.Component{

        /** 根据model获取币别精度属性对象*/
        getSourceFieldInfo(model) {
            let option = model.getMetaProperty('item');
            if (option) {
                var srcFieldInfo = _appModelFunction.getSourceFiledInfoById(model.pageId, 
                    option.get(_serverproperties.SOURCE_FIELD))(model.state);
                return srcFieldInfo;
            }

            return option;
          }

            /** 获取时间关联组织数据*/
            getTimeZoneInfo(model) {
            let option = model.getMetaProperty('item');
            if (option) {
                let relateOrg = option.get(_serverproperties.RELATE_ORG);
                let srcFieldInfo = _appModelFunction.getSourceFiledInfoById(model.pageId, relateOrg)(model.state);
                return srcFieldInfo;
            }

            return option;
          }
          shouldComponentUpdate(nextProps, nextState, nextContext){
              // 判断meta和componentData，提高效率
              let model = this.props.model;
              let nextModel = nextProps.model;
              let pageId = model.pageId; 
              // 字段规则
              let fieldAction = _immutable.fromJS(this.props.fieldAction);

              let _fieldAction = _immutable.fromJS(nextProps.fieldAction);
              /**增加tipForm数据改变刷新逻辑 */
              var oldTipForms = _appModelFunction.getTipForms(pageId)(model.state);
              var newTipForms = _appModelFunction.getTipForms(pageId)(nextModel.state);
              /**
                * 币别精度属性改变后，和币别关联的控件需要重新render
                 * 这里增加条件判断 !is(oldSrcFieldInfo,newSrcFieldInfo)
                 * 不影响原有更新逻辑和性能，和币别关联的控件才会受影响
               */
              var oldSrcFieldInfo = this.getSourceFieldInfo(model);
              var newSrcFieldInfo = this.getSourceFieldInfo(nextModel);
              if (!_immutable.is(fieldAction, _fieldAction) 
              || model.key !== nextModel.key 
              || !_immutable.is(model.componentData, nextModel.componentData) 
              || !_immutable.is(model.meta, nextModel.meta) 
              || !_immutable.is(oldSrcFieldInfo, newSrcFieldInfo) 
              || !_immutable.is(oldTipForms, newTipForms)) {
                return true;
            }
             // 增加多时区的判断，如果组织时区改变，则绑定该组织的长日期时区重新render
             var oldTimeZone = this.getTimeZoneInfo(model);
             var newTimeZone = this.getTimeZoneInfo(nextModel);

             if (!_immutable.is(oldTimeZone, newTimeZone)) {
                 return true;
             } 
             let nextMeta = nextModel.meta;
             if (nextMeta.getIn(['item', 'type']) === 'radio') {
                let groupName = nextMeta.getIn(['item', 'group']);
                if (groupName) {
                    var itemMeta = _appModelFunction.getItemMeta(model.pageId, groupName)(model.state);
                    var nextItemMeta = _appModelFunction.getItemMeta(nextModel.pageId, groupName)(nextModel.state);
                    if (!_immutable.is(itemMeta, nextItemMeta)) {
                        return true;
                    }
                    var data = (0, _appModelFunction.getDataProperty)(model.pageId, groupName, [])(model.state);
                    var nextData = (0, _appModelFunction.getDataProperty)(nextModel.pageId, groupName, [])(nextModel.state);
                    if (!_immutable.is(data, nextData)) {
                        return true;
                    }

                }

             }
             // 单据状态status动态发生了改变,控件要刷新(涉及可见性、锁定性控制)
             if (this.props.formStatus !== nextProps.formStatus) {
                return true;
            }
            if (this.props.isLocked !== nextProps.isLocked) {
                return true;
            }

            return false;

          }

          render(){
              return <ComposedComponent {...this.props}></ComposedComponent>
          }


    }
    PropsComparison.displayName = "PropsComparison";
    return PropsComparison;


}

export default PropsComparison;
