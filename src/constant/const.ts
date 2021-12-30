import  * as _intlApi from '../i18n/intlApi'
import  * as  _serverproperties from '../constant/serverproperties'


/**
 * 用于定义常量
 */
// 页面加载状态
export const PAGE_LOAD = '__page_load__'; // 控件data-page-id


export const DATA_PAGE_ID = '__data_page_id__'; // 多行文本光标位置


export const TEXTAREA_CURSOR_INDEX = '__textareCursorIndex__';


export const MESSAGE_HISTORY = '__message_history_';// 弹窗改造，消息弹窗上一个历史消息，用于比较是否弹窗新弹窗


export const VALIDATE_DATA = '__validateData__';

export const VALIDATE_DATA_DELETE = '__validateDataDelete__'; // 字段的校验信息


export const NOTIFICATION_MESSAGES = '__notification_messages__';// 页面浮层提示信息，notification


export const ATTACHMENT_MESSAGES = '__attachment_messages__'; // 附件浮层提示信息，attachment


export const ATTACHMENT_OPERABTN = '__attachment_operabtn__';// 附件自定义操作按钮，attachment


export const SELECTEDROWS_ARRAY = '__mobile_cardview_selectedRows_array__';// 卡片已选中行号数组，cardview


export const MARKDOWN_IMAGE_URLS = '__markdown_image_urls__';// markdown控件图片url


export const FIELD_SHOW_VALUE = '__field_show_value__';// 字段显示的值


// 字段‘无下划线’锁定风格显示内容，适配多语言，改成函数
export const getNOValue = function getNOValue() {
    return _intlApi.getLangMsg('FIELD.NULL') || '-';
}; // 是否上传，用于可点击控件上传功能



export const IS_UPLOAD = 'iu'; // 上传配置


export const UPLOAD_CONFIG = 'uconfig';

export const SHOW_TYPE = {
    Default: 0,
    NewTabPage: 1,
    InContainer: 3,
    Floating: 4,
    NonModal: 5,
    Modal: 6,
    MainNewTabPage: 7,
    InCurrentForm: 8,
    FloatingAutoHide: 9,
    NewWindow: 10,
    InIFrame: 11,
    // 在IFrame控件中打开子窗体
    RobotFloat: 12,
    // 客户大会演示使用机器人弹窗方式
    ToolTips: 13 // tips方式显示表单

};

export const MSG_LEVEL = {
    error: 'error',
    warning: 'warning',
    message: 'message'
};

export const VALIDATE_MSG_TYPE = {
    notNull: 'notNull',
    // 非空
    email: 'email',
    // 邮箱格式不对
    tele: 'tele',
    // 手机号码格式不对
    scope: 'scope',
    // 数值范围不对
    bankCard: 'backCard',
    // 银行卡号不对
    others: 'others' // 其他

};
// u指令更新'value'属性的时间戳
export const TIME_STAMP_FRESH = '__timestamp_fresh__';



export const PARENT_COLLAPSE_PANEL_ID = '_parent_collapse_panel_id_';// 最近到可折叠父容器ID


export const VALIDATE_DATA_CAPTION = '_validator_data_caption';// 浮层中显示非空校验的字段名称


// listbox动态激活ID
export const LISTBOX_ACTIVE_ITEM = '_listbox_active_item_';


// 后端设置页面的加载状态
export const PAGE_LOADING = '__page_loading__';



/**
 * 数字类型对应精度
 */
export const NUMBER_TYPE_PRECISION = {
  [_serverproperties.NUMBER_TYPE_PRICE]: _serverproperties.PRICE_PRECISION,
  [_serverproperties.NUMBER_TYPE_AMOUNT]: _serverproperties.AMOUNT_PRECISION,
  [_serverproperties.NUMBER_TYPE_QUANTITY]: _serverproperties.QUANTITY_PRECISION,
}


// 对话框直接关闭，不需要发送请求到服务器（在第一次关闭，后台发送错误消息对话框后启用），
export const DIRECT_CLOSE_DIALOG = '__direct_close_dialog__';

export const ATTACHMENT_STATUS = {
    UPLOAD: 'uploading',
    SUCCESS: 'success',
    FAILURE: 'error',
    CANCELED: 'canceled'
};

export const VIEW_FORM_STATUS = [2, 4, 5]; // 查看态


export const FIELD_ARR = ['fieldcon', 'cardfield']; // 字段
// 移动端f7筛选项选中的内容，MobSieveF7Result
export const FILTER_SIEVE_F7_MOB = '__filter_sieve_f7_mob__';


// 附件、附件字段：允许上传的图片后缀名
export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'dib', 'rle', 'emf', 'jpe', 'jfif', 'pcx', 'dcx', 'pic', 'tga', 'tif', 'wmf', 'ico'];

export const QUERY_STATUS = {
    loading: 0,
    loaded: 1,
    nodata: 2
};

// 图片列表、图片字段允许上传的图片类型
export const ALLOWED_IMAGES = {
    mime: ['images/bmp', 'images/gif', 'images/jpeg', 'images/png', 'images/webp'],
    extensions: ['.bmp', '.gif', '.jpg', '.jpeg', '.png']
};
// 允许预览的文件类型
export const PREVIEW_FILE_TYPE = {
    image: ['bmp', 'gif', 'ico', 'jpg', 'jpeg', 'jfif', 'png', 'svg', 'webp', 'xbm'],
    // img 标签允许打开的类型
    pdf: ['pdf'],
    // audio: ['ogg', 'wav', 'mp3'],
    // video: ['ogg', 'mp4', 'webm'],
    txt: ['txt'],
    excel: ['xls', 'xlsx'],
    word: ['doc', 'docx'],
    ppt: ['ppt', 'pptx']
};


// 移动端-轮播图 宽高比映射关系
export const ASPECTRATIO_MAP = {
    '2:1': 0.5,
    '3:1': 0.333,
    '4:1': 0.25,
    '5:1': 0.2,
    '6:1': 0.166
};
// 移动端-轮播图 默认轮播时间
export const DEFAULT_SLIDE_SPEED = 4000;
// 移动端-轮播图 距离左边距右边距
export const DEFAULT_SLIDE_PADDING = 24;
// 打开第三方应用标识，目前应用于云之家内部打开苍穹应用
var OPEN_TRD_FORM = 'openTrdForm';
// 设置侧滑面板单据
export const SET_SET_BILL = 'setSideBill';

export const ISV_ID = 'kingdee';
// 移动端手机号字段-国际区号选择
export const SHOW_TEL_COUNTRY_PAGE = 'showTelCountryPage';
// 按钮样式-缺省

export const BUTTON_STYLE_DEFAULT = 0;
// 按钮样式-文本
export const BUTTON_STYLE_TEXT = 1;
// 按钮样式-上图下文


export const BUTTON_STYLE_UPIMG_DOWNTEXT = 2;
// 按钮样式-左图右文


export const BUTTON_STYLE_LEFTIMG_RIGHTTEXT = 3;
// 按钮样式-图标

export const BUTTON_STYLE_ICON = 4;
// 单选按钮组风格-默认


export const BUTTON_GROUND_STYLE_DEFAULT = 0;
// 单选按钮组风格-标签
export const BUTTON_GROUND_STYLE_LABEL = 1;
// 单选按钮组风格-问卷
export const BUTTON_GROUND_STYLE_SURVEY = 2;
// 日期范围，长短日期格式之分
export const DATEREGION_LONGTIME = 2;

export const DATEREGION_SHORTTIME = 1;
export const KEY_RELOAD_ROOT_PAGE = Symbol("重载首页");
export default DATEREGION_SHORTTIME




