import * as React from "react";
import * as ReactDOM from "react-dom";
import _commonUtils from "../../common/commonUtils";
import customProperties from "../../../constant/customProperties";
import * as _defaultPropsUtil from "../../../util/defaultPropsUtil";
import classnames from "classnames";
import _SearchBox from "./SearchBox.module.css";
import * as _intlApi from "../../../i18n/intlApi";
import filter_delete from "../img/default/filter_delete.png";
import * as _serverproperties from "../../../constant/serverproperties";
import _listenInput from "../../../util/listenInput";
export class SearchBox extends React.Component {
  state = {
    // focus: false,
    showList: false,
    // value: '',
    collapse: true,
    selectedIndex: 0, // 搜索弹出的下拉面板,默认选中第一项
  };

  closeList = () => {
    var that = this;

    this.setState({ showList: false }, () => {
      that.unBindEventOfSelectPanel();

      that.destroyDropDownPanel();
    });
  };
  /**鼠标移到下拉列表中某一项上面 */
  onItemMouseEnter = (index) => {
    var that = this;

    if (this.state.showList && this.props.searchConditions) {
      // let sum = this.props.searchConditions.count()
      this.setState({ selectedIndex: index }, () => {
        that.renderDropDownPanel();
      });
    }
  };
  // 中文输入，频繁触发
  setInput = (input) => {
    var that = this;

    this.txtInput = input;
    input = ReactDOM.findDOMNode(input);

    if (input) {
      // this.input=input
      this.removeListener = _listenInput(
        input,
        (value) => {
          // console.warn(`input-value: ${value}`);
          that.onHandleChange(value);
        },
        {
          timeout: 0,
          isCache: false,
        }
      );
    } else {
      this.removeListener && this.removeListener();
      this.txtInput = undefined;
    }
  };

  onSearchIconMouseEnter=()=>{
     // 如果显示风格不为自动收起或者搜索框已展开 则不执行后面动画逻辑
     if (!this.state.collapse || !this.props.searchShowStyle) return; 
     // 搜索框内有内容时不收起
     if (this.txtInput.value) return;
     // 搜索框展开
     let txtQSInput = ReactDOM.findDOMNode(this.refs.txtQSInput);
     txtQSInput.classList.add(_SearchBox['expanding']);
     setTimeout(function () {
      this.setState({
          collapse: false
      });
      this.txtInput.focus();
  }, 300);

  }

  onQSKeyDown = (event) => {
    let _this3 = this;
    switch (event.keyCode) {
      case 13: //回车按键
        this.props.onQSKeyDown &&
          this.props.onQSKeyDown(event.target.value, this.state.selectedIndex);
        if (this.hasFields()) {
          this.props.onHandleChange && this.props.onHandleChange(""); // 清空输入框文本
        }
        this.setState({ showList: false }, () => {
          _this3.unBindEventOfSelectPanel();
          _this3.destroyDropDownPanel(); // let input = ReactDOM.findDOMNode(this.refs.txtInput);
          var input = _this3.getTxtInputDom();
          if (input) {
            input.focus();
          }
        });
        break;
      case 8:
        if (event.keyCode == 8) {
          //backspace
          this.props.onQSKeyDown &&
            this.props.onQSKeyDown(
              event.target.value,
              undefined,
              event.keyCode
            );
        }

        break;
      case 37: //left
      case 38:
        // top(支持键盘上下键选条件)
        event.preventDefault();
        event.stopPropagation();
        if (this.state.showList && this.props.searchConditions) {
          var sum = this.props.searchConditions.count();
          var index = this.state.selectedIndex - 1;

          if (index < 0) {
            index = sum - 1;
          }

          this.setState(
            {
              selectedIndex: index,
            },
            () => {
              _this3.renderDropDownPanel();
            }
          );
        }
        break;
      case 39:
      case 40:
        // down
        event.preventDefault();
        event.stopPropagation();

        if (this.state.showList && this.props.searchConditions) {
          var _sum = this.props.searchConditions.count();

          var _index = this.state.selectedIndex + 1;

          if (_index >= _sum) {
            _index = 0;
          }

          this.setState(
            {
              selectedIndex: _index,
            },
            function () {
              _this3.renderDropDownPanel();
            }
          );
        }

        break;

      default:
        break;
    }
  };

  collapseSearchBox = () => {
    // 如果显示风格不为自动收起或者搜索框已展开 则不执行后面动画逻辑
    if (this.state.collapse || !this.props.searchShowStyle) return;
    // 已存在搜索条件时不收起
    if (this.props.searchSelected && this.props.searchSelected.size > 0) return;
    // 搜索框内有内容时不收起
    if (this.txtInput.value) return;
    let txtQSInput = ReactDOM.findDOMNode(this.refs.txtQSInput);
    txtQSInput.classList.remove("borderBottom");
    txtQSInput.classList.add(_SearchBox["collapsing"]);
    setTimeout(() => {
      this.setState({ collapse: true });
    }, 300);
  };
  // 默认模式,输入框内容change
  onHandleChange(editValue, triggerEvent = true) {
    this.props.onHandleChange &&
      this.props.onHandleChange(editValue, triggerEvent);
    if (editValue === "") {
      this.setState({ showList: false }, () => {
        this.unBindEventOfSelectPanel();
        this.destroyDropDownPanel();
      });
    } else {
      this.setState({ showList: true }, () => {
        this.unBindEventOfSelectPanel();
        this.bindEventOfSelectPanel();
        this.renderDropDownPanel();
      });
    }
  }

  hasFields() {
    return (
      this.props.searchConditions && this.props.searchConditions.count() > 0
    );
  }

  destroyDropDownPanel() {
    if (this.attachElement) {
      ReactDOM.unmountComponentAtNode(this.attachElement);
      this.attachElement.parentNode.removeChild(this.attachElement);
      this.attachElement = null;
    }
  }
  renderQSCondition() {
    let { searchSelected, searchConditions } = this.props;
    if (searchSelected && searchSelected.count() > 0) {
      <div className="qc-label-out">
        {searchSelected.map((item, index) => {
          let key = item.get("k");
          let title = key;
          searchConditions.map((t) => {
            if (t.get("fieldName") == key) {
              title = t.getIn(["fieldCaption", this.props.userLocal]);
            }
          });
          let conditions = "";
          let conList = item.get("v");
          conList.map(function (con, index) {
            // index 0开始

            conditions +=
              (index > 0
                ? `" "${_intlApi.getLangMsg({ key: "SearchBox.key0001" })}" "`
                : "") + con;
          });

          return (
            <div key={index} className="qc-label">
              <img
                src={filter_delete}
                className="qc-l-delete"
                onClick={() => {
                  this.props.onQSDelCondition &&
                    this.props.onQSDelCondition(key);
                }}
              ></img>
              <div className="qc-l-title">title</div>
              <span className="qc-l-con">{conditions}</span>
            </div>
          );
        })}
      </div>;
    } else {
      return "";
    }
  }
  getPlaceHolder() {
    return this.props.searchSelected && this.props.searchSelected.count() > 0
      ? ""
      : this.getQSInputTips();
  }
  
  /**输入框提示信息 */
  getQSInputTips() {
    if (
      this.props.searchConditions &&
      this.props.searchConditions.count() > 0
    ) {
      let sum = this.props.searchConditions.count();
      let tips = _intlApi.getLangMsg({ key: "SearchBox.key0002" });
      this.props.searchConditions.forEach((item, index) => {
        if (_serverproperties.QP_QUAN_BU_ID !== item.get("fieldName")) {
          // '全部'选项，不显示在提示信息中
          tips +=
            item.getIn(["fieldCaption", this.props.userLocal]) +
            (index == sum - 1 ? "" : " / ");
        }
      });
      return tips;
    } else if (this.props.placeholder) {
      return this.props.placeholder;
    } else {
      return "";
    }
  }

  handleOnBlur(newValue) {
    this.props.onHandleBlur && this.props.onHandleBlur(newValue);
    this.collapseSearchBox();
  }

  /**解除event绑定 */
  unBindEventOfSelectPanel() {
    document.body.removeEventListener("click", this.hideList);
    window.removeEventListener("resize", this.closeList);
  }
  closeList() {
    this.setState(
      {
        showList: false,
      },
      () => {
        this.unBindEventOfSelectPanel();

        this.destroyDropDownPanel();
      }
    );
  }

  hideList = (event) => {
    let target = event.target;
    while (target) {
      if (target === this.attachElement) return;
      target = target.parentNode;
    }
    this.setState(
      Object.assign({}, this.state, {
        showList: false,
      }),
      () => {
        this.unBindEventOfSelectPanel();
        this.destroyDropDownPanel();
      }
    );
  };

  render() {
    let {
      value,
      style,
      className,
      disabled,
      placeholder,
      Overflow,
      Grow,
      Shrink,
      AlignSelf,
      AlignContent,
      AlignItems,
      JustifyContent,
      isDesigner,
      showModel,
      searchConditions,
      searchSelected,
      autocompleteitems,
      onQSKeyDown,
      onQSSelectItem,
      onHandleBlur,
      onHandleChange,
      onQSDelCondition,
      searchShowStyle,
      userLocal,
      ...others
    } = this.props;
    const collapse = this.state.collapse;
    // 是否允许控制整个输入框的大小 (条件：显示方式为默认 && 搜索字段为空)
    if (!(this.props.showModel === 2 && !this.props.searchConditions))
      delete style.fontSize;
    const searchWithAllBorder =
      _defaultPropsUtil.getCommonDefaultProps(
        customProperties.FIELD_STYLE,
        true
      ) === 2;

    const isShowAnimate = this.props.showModel === 2;
    const defCls = classnames(
      _commonUtils({ Grow: Grow, Shrink: Shrink, AlignSelf: AlignSelf }),
      _SearchBox["quick-search"],
      {
        [`${_SearchBox["all-border"]} weak-1px-border hover-theme-bdcolor contain-bg`]:
          searchWithAllBorder && (!isShowAnimate || !collapse),
      }
    );
    const qsCls = classnames(
      _SearchBox["qs-c"],
      { borderBottom: !isShowAnimate || !collapse },
      { [_SearchBox["qs-animate"]]: isShowAnimate },
      { [_SearchBox["collapse"]]: isShowAnimate && collapse }
    );
    const iCls = classnames(
      _SearchBox["qc-flag"],
      "kdfont kdfont-f input-color",
      { [_SearchBox["collapse"]]: isShowAnimate && collapse }
    );
    //// 未展开不允许被点击
    const readOnly = !searchShowStyle ? false : collapse;
    return React.createElement(
      "div",
      Object.assign(
        {
          style: style,
          className: defCls,
        },
        others
      ),
      <div className={qsCls} ref="txtQSInput">
        <i className={iCls} onMouseEnter={this.onSearchIconMouseEnter}></i>
        <div className="qc-container">
          {this.renderQSCondition()},
          <input
            value={value}
            disabled={disabled}
            ref={this.setInput}
            readOnly={readOnly}
            placeholder={this.getPlaceHolder()}
            className="qc-input"
            onChange={(e) => this.onHandleChange(e.target.value, false)}
            onKeyDown={(e) => this.onQSKeyDown(e)}
            onBlur={(e) => this.handleOnBlur(e.target.value)}
          />
        </div>
      </div>
    );
  }

  attachElement;
}
