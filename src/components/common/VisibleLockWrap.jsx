import * as react from "react";
import FormStatusContext from './FormStatusContext'
import * as _componentutil from '../../util/componentutil'
var VisibleLockWrap =function VisibleLockWrap(keepComponent,notHandleVisible,renderOptimize=true) {
    return function (WrapComponent) {
        return function (props) {
            let formStatus = react.useContext(FormStatusContext);
            let containerContextRef = react.useRef({});
            let containerContext = react.useContext(ContainerContext);
            containerContextRef.current = containerContext; // 将最新containerContext存放到ref里

                   // 可见性
                   var _getVisible = function _getVisible(model, controlKey, vi) {
                    var parentVisible = containerContextRef.current.parentVisible; 
                    // 父容器可见性
                    if (parentVisible === false) {
                        return false;
                    }
                    return  _componentutil.getVisible(model, controlKey, vi);
                };

                       // 锁定性
            var _getLocked = function _getLocked(model, controlKey, l) {
                /* 注:(重要)
                 * (情况1)
                 * 如果字段或控件中申明了'contextTypes',
                 * 则必须在对应字段或控件的‘contxtTypes'中添加‘parentLocked: .bool',
                 * 否则这里无法获取到父容器传递的'parentLocked'属性
                 *
                 * 或者:
                 * (情况2)
                 * 保证每个组件的contextTypes是使用静态方式写的：'static contextTypes = {store:PropTypes.object}',
                 * 则不会影响VisibleLockWrap的getLocked接口获取this.context.parentLocked
                 */
                var parentLocked = containerContextRef.current.parentLocked; 
                // 父容器锁定性(父容器锁定则直接锁定当前子元素)
                if (parentLocked) {
                    return true;
                } else {
                    return _componentutil.getLocked(model, controlKey, l); // 元素自己的锁定性
                }
            };

                   // 获取元素可见性(父容器或本身不可见,则最终都不可见)
                   var getVisibleUnion = function getVisibleUnion(model, controlKey, vi) {
                    var parentVisible = containerContextRef.current.parentVisible; 
                    // 父容器可见性
                    if (parentVisible === false) {
                        return false;
                    } else {
                        return _componentutil.getVisible(model, controlKey, vi); // 元素自己的可见性
                    }
                };

                let model = props.model;
                var attachProps = {
                    formStatus: formStatus,
                    isVisible: _getVisible(model),
                    isLocked: _getLocked(model),
                    getVisible: _getVisible,
                    // 多参数需要自己调用
                    getLocked: _getLocked,
                    // getLockChangedState: getLockChangedState,
                    getVisibleUnion: getVisibleUnion
                };
                // 不隐藏
                if (notHandleVisible === true || !model || _componentutil.getVisible(model)) {
                    return <WrapComponent {...Object.assign({},props,attachProps)}></WrapComponent>

                }else {//隐藏
                    if (keepComponent === true) {
                        <WrapComponent {...Object.assign({style:_componentutil.getVisibleStyle({}, false)},props,attachProps)}></WrapComponent>
                    }else{
                        /**
                         * 不能返回null，否则component会被释放掉,从而导致其componentWillUnMount等相关生命周期方法被调用(隐藏不该触发这些，里面可能包含其他逻辑)。
                         不可见就返回一个空div,不占空间.
                         */
                        <div id={model ? model.key + '_hide_control' : 'hide_control'} style={{display: 'none'}}> </div>

                       
                    }

                }
    



        }
    }



}



export var ContainerContext = react.createContext({});
ContainerContext.displayName = 'ContainerContext';



export default VisibleLockWrap
