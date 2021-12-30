import classnames from "classnames";
import _KDSearchBox from "./KDSearchBox.css";
import { compose } from "redux";
import _react from "react";
import SearchBox from "./base/SearchBox";
import VisibleLockWrap from "../common/VisibleLockWrap";
import AttachDataWrap from "../common/AttachDataWrap";
import BusyTipWrap from "../common/BusyTipWrap";
import ComposeEnhance from "../common/ComposeEnhance";
import PropsComparison from "../common/PropsComparison";
import * as _componentutil from "../../util/componentutil";
import * as _serverproperties from "../../constant/serverproperties";
import * as _appModelFunction from "../../model/appModelFunction";
import lodash from "lodash";
import * as actions from "../../action/searchaction.js";
import _SearchBoxModelThree from './base/SearchBoxModelThree.jsx'
import _SearchBoxModelOne from './base/SearchBoxModelOne.jsx'
const busyTipWarp = BusyTipWrap(["search"]);

//const composeEnhance= ComposeEnhance(PropsComparison)
const visibleLockWrap = VisibleLockWrap(false);
//const attachDataWrap=AttachDataWrap(visibleLockWrap)
class SFSearchBox extends _react.Component {
  state = {
    innerValue: this.props.model.getDataValue() || "", // 控件内部value,失去焦点时才更新store(IE11下性能需要 -20180625)
    // autocompleteitems: new List()
  };
  componentWillMount() {
    let data = localStorage.getItem("data");
    this.setState({ data });
  }
  // 显示模式(0:默认模式, 1:‘自动完成下拉’模式, 2:自动收起, 3:全局搜索)
  getShowModel(model) {
    return model.getMetaProperty("showModel");
  }
  /**回车操作 */
  onQSKeyDown = (value, index, backspaceKey) => {
    let model = this.props.model;
    if (this.getShowModel(model) == 1) {
      this.props.search(model, [value]); // 自动补全模式，直接搜索用户输入的字符串
      this.setState({
        innerValue: value,
      });
    } else {
      let fields = _componentutil.getComponentDataProperty(
        model,
        "searchitems",
        "searchitems",
        false
      );
      if (fields && fields.count() > 0) {
        // 绑定了字段+搜索内容为空，则不做任何处理
        if (value === "" && !backspaceKey) {
          return;
        }
        let selectedCondition = model.getDataProperty("selected");

        if (selectedCondition) {
          selectedCondition = selectedCondition.toJS();
        } else {
          selectedCondition = [];
        }
        var key;

        if (index !== undefined) {
          key = fields.getIn([index, "fieldName"]);
        } else {
          key = fields.getIn([0, "fieldName"]); // 默认搜第一个快速搜索条件
        }
        if (key) {
          if (!backspaceKey) {
            var target = lodash.find(selectedCondition, function (item) {
              return item["k"] === key;
            });

            if (target) {
              // 已经搜索过的字段
              var obj = lodash.find(target["v"], function (item) {
                return item === value;
              });

              if (!obj) {
                target["v"].push(value);
              }
            } else {
              var condition = {}; // 新增搜索字段

              condition["k"] = key;
              condition["v"] = [value];
              selectedCondition.push(condition);
            }
          } else if (value === "") {
            // todo: 按键盘delete键，清理掉已有且排在最后一个的快速搜索条件
            if (selectedCondition.length > 0) {
              selectedCondition.pop();
            } else {
              return;
            }
          } else {
            return;
          }

          this.updateSelected(model, selectedCondition);
          this.props.search(model, this.getFastSearch(selectedCondition));
        }
      } else {
        // 没有设置搜索字段，则直接搜索用户输入的字符串
        this.props.search(model, [value === undefined ? "" : value.trim()]);
      }
    }
  };
  /**鼠标选中某个搜索条件 */
  onQSSelectItem = (key, value) => {
    value = value.trim();
    const model = this.props.model;
    const selectedCondition = model.getDataProperty("selected");
    if (selectedCondition) {
      selectedCondition = selectedCondition.toJS();
    } else {
      selectedCondition = [];
    }
    let target = lodash.find(selectedCondition, function (item) {
      return item["k"] === key;
    });

    if (target) {
      const obj = lodash.find(target["v"], function (item) {
        return item === value;
      });

      if (!obj) {
        target["v"].push(value);
      }
    } else {
      var condition = {}; // 新增

      condition["k"] = key;
      condition["v"] = [value];
      selectedCondition.push(condition);
    }

    this.updateSelected(model, selectedCondition);
    this.props.search(model, this.getFastSearch(selectedCondition));
  };

  updateSelected(model, selectedCondition) {
    if (this.props.updateSelected) {
      this.props.updateSelected(model, selectedCondition);
    }
  }
  /**获取快速搜索条件集合(用于发给server) */
  getFastSearch(fast, fastSearch = []) {
    let key, value;

    for (var index in fast) {
      // fast
      key = fast[index].k;
      value = fast[index].v;

      if (key === _serverproperties.QP_QUAN_BU_ID) {
        // eslint-disable-next-line no-loop-func
        (() => {
          // '全部'选项
          var keyArr = [];
          var model = this.props.model;
          var fastInFields = model.getDataProperty("searchitems");
          var key2 = void 0;
          fastInFields.forEach(function (item) {
            key2 = item.get("fieldName");

            if (key2 !== _serverproperties.QP_QUAN_BU_ID) {
              keyArr.push(key2);
            }
          });
          fastSearch.push({
            fieldName: keyArr,
            value: value,
          });
        })();
      } else {
        fastSearch.push({
          fieldName: [key],
          value: value,
        });
      }
    }

    return fastSearch;
  }
  onQSDelCondition=(key)=>{
    const model = this.props.model;
    const selectedCondition = model.getDataProperty('selected');

    if (selectedCondition) {
        selectedCondition = selectedCondition.toJS();
    } else {
        selectedCondition = [];
    }

    var target = lodash.find(selectedCondition, function (item) {
        return item['k'] === key;
    });

    if (target) {
        lodash.pull(selectedCondition, target); // 删除已有搜索条件
        this.updateSelected(model, selectedCondition);
        this.props.search(model, this.getFastSearch(selectedCondition));
    }

  }
  handleChange=(newWord,triggerEvent=true)=>{
    this.setState({
      innerValue: newWord
  });
  if (!triggerEvent) return; // 自动补全模式,要实时发往后端
  var model = this.props.model;

            if (this.getShowModel(model) === 1) {
                this.doRealTimeSearch(newWord);
            }

            if (this.getShowModel(model) === 3 && newWord) {
                this.doRealTimeSearch(newWord);
            }


  }
  /**实时搜索 */
  doRealTimeSearch(newWord){
    if (this.getShowModel(this.props.model) === 3) {
      this.props.getSearchResultList(this.props.model, JSON.stringify({
          type: '1',
          content: newWord,
          time: +new Date()
      }));
      setTimeout(()=> {
          this.props.getSearchResultList(this.props.model, JSON.stringify({
              type: '2',
              content: newWord,
              time: +new Date()
          }));
      }, 50);
      return;
  }

  this.props.getSearchResultList(this.props.model, newWord);

  }

  handleBlur=(newWord, doAutoComplete)=>{
    const model = this.props.model;

    if (newWord !== undefined && newWord !== model.getDataValue()) {
        this.doEndSearchInput(newWord);
    }

  }
  /**结束搜索 */
  doEndSearchInput(newWord){
    // 搜索信息写入postdata
    let model = this.props.model;  let pageId = model.pageId;   let  key = model.key;
    const action= _appModelFunction.batchActions(_appModelFunction.setControlPostValue(pageId, key, newWord), _appModelFunction.setDataValue(pageId, key, newWord))
    
    this.props.dispatch(_appModelFunction.convertAppModelFunctionAction(action));
  }
  render() {
    let { style, className, ...others } = this.props;

    const classNames = classnames(_KDSearchBox["kdsearchbox"], className);
    const model = this.props.model;
    const searchStyle = Object.assign(
      {},
      style,
      _componentutil.getCommonStyle(model)
    );
    const placeholder = model.getMetaProperty(_serverproperties.PLACE_HOLDER); // 未配置搜索字段时，搜索框显示的提示信息

    const commonClass = _componentutil.getCommonClass(model);
    const showModel = this.getShowModel(model); // 显示模式(0:默认模式, 1:‘自动完成下拉’模式, 2:自动收起, 3:全局搜索)

    const searchSelected = model.getDataProperty("selected"); // 已选中的绑定字段相关搜索内容

    const searchConditions = _componentutil.getComponentDataProperty(
      model,
      "searchitems",
      "searchitems",
      false
    ); // 默认模式: 绑定的搜索字段
    const value =
      this.state.innerValue === undefined
        ? model.getDataValue()
        : this.state.innerValue; // 下拉列表内容(自动补全模式)

    const autocompleteitems = _componentutil.getComponentDataProperty(
      model,
      "autocompleteitems",
      "autocompleteitems",
      false
    ); // 自动完成的下拉列表的搜索字段

    const locked = this.props.getLocked(model); // test data
    var searchShowStyle = showModel === 2 || showModel === 3; // 合并设计器界面参数
    
    
    if (showModel === 1) {




    }
 
      return <SearchBox {...Object.assign(
        {
          id: model.key,
          style: searchStyle,
          className: classNames,
          disabled: locked,
          placeholder: _componentutil.getMulLangTextWithCompatible(placeholder, model.getUserLocale()),
          showModel: showModel,
          searchConditions: searchConditions,
          searchSelected: searchSelected,
          autocompleteitems: autocompleteitems,
          value: value,
          searchShowStyle: searchShowStyle,
          onQSKeyDown: this.onQSKeyDown,
          onQSSelectItem: this.onQSSelectItem,
          onQSDelCondition: this.onQSDelCondition,
          onHandleChange: this.handleChange,
          onHandleBlur: this.handleBlur
      }, 
      this.props.attachData, 
      commonClass, 
      {
          userLocal: model.getUserLocale()
      }
      )}
        >

      </SearchBox>


    
  }
}

//export default   busyTipWarp(AttachDataWrap(visibleLockWrap(composeEnhance(SFSearchBox))));

export default compose(
  busyTipWarp,
  AttachDataWrap,
  visibleLockWrap,
  ComposeEnhance,
  PropsComparison
)(SFSearchBox);
