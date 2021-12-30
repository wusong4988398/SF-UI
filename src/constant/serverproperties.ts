
/**
 * 服务端指令常量类
 */

/* 控件标识 */
export var Ctrls = {
    Bill: 'billform',
    KDButton: 'button',
    KDField: 'fieldcon',
    KDText: 'text',
    KDNumber: 'number',
    KDTime: 'time',
    KDTimeRange: 'timerange',
    KDDate: 'date',
    KDDateRange: 'daterange',
    KDDateTime: 'datetime',
    KDCheckbox: 'checkbox',
    KDSelect: 'combo',
    KDMulSelect: 'mulcombo',
    KDFlexField: 'flexfield',
    // 弹性域字段
    KDFlexPanel: 'flexpanel',
    KDColumnPanel: 'columnpanel',
    KDPlaceHolder: 'ph',
    KDTextArea: 'textarea',
    KDDesigner: 'formdesigner',
    KDUnknownComponent: 'unknown',
    KDTabs: 'tab',
    KDBaseData: 'basedata',
    KDMulBaseData: 'mulbasedata',
    KDOrg: 'org',
    KDCity: 'city',
    KDGrid: 'grid',
    KDReportGrid: 'spread',
    KDAdvGrid: 'advgrid',
    KDCardView: 'cardview',
    KDCardField: 'cardfield',
    KDCardRowPanel: 'cardrowpanel',
    KDCardFlexPanel: 'cardflexpanel',
    KDFieldSetPanel: 'fieldsetpanel',
    KDMulLangText: 'localeText',
    KDHtml: 'html',
    KDToolBar: 'toolbar',
    KDCodeEdit: 'codeedit',
    KDPasswordBox: 'passwordbox',
    KDAttachmentField: 'attachmentfield',
    // 附件字段
    KDTelephone: 'telephone',
    KDCascader: 'cascader',
    KDEmail: 'email',
    // 图片控件
    KDImage: 'image',
    // 图片字段
    KDPic: 'picture',
    KDCombinedField: 'combinedfield',
    KDUser: 'user',
    KDLTextArea: 'largeText',
    KDBizCustomList: 'bizcustomlist',
    KDLittleK: 'littlek',
    // 工作流设计器
    KDWorkflow: 'workflowdesigner',
    // 审批处理组件
    KDApprovalProcessing: 'approvalprocessing',
    // 审批记录
    KDApprovalRecord: 'approvalrecord',
    // 云之家沟通
    KDYzjChat: 'yzjchat',
    // 工作流导航栏
    KDWFNavigationBar: 'wfnavigationbar',
    // 工作流条件
    KDWfCondition: 'wfCondition',
    // 工作流条件升级
    KDWfConditionUpd: 'wfConditionUpd',
    // 步进器
    KDStepper: 'stepper',
    // 多超链接
    KDMulHLink: 'mulhlink',
    // 富文本编辑器
    KDRichTextEditor: 'richtexteditor',
    // 行政区域
    KDAdminDivision: 'cascademenu',
    // 地址
    KDAddress: 'address'
};

export var IAMGE_SERVER = '/images/uploadImage.do';
/* 属性标识 */


export var KEY = 'k';

export var VALUE = 'v';

export var ROW = 'r';

export var DATA = 'data';

export var ITEM = 'item';

export var ITEMS = 'items';

export var CELLS_VALUE = 'fieldstates';

export var WIDTH = 'w';

export var HEIGHT = 'h';

export var STYLE = 's';
// 自身对齐
export var ALIGNSELF = 'as'; 
// 侧轴对齐
export var ALIGNITEMS = 'ai'; 
// 多根轴线的对齐
export var ALIGNCONTENT = 'ac'; 
// 主轴对齐
export var JUSTIFYCONTENT = 'jc'; 
// 允许输入长度限制

export var MAX_LENGTH = 'maxlength';

export var MIN_LENGTH = 'minlength'; 
// 是否显示下拉列表
export var SHOW_DROP_DOWN = 'sd'; 
// 是否可编辑
export var EDITABLE = 'eb'; 
// 下拉列表items
export var STORE = 'st'; 
// 数值类型
export var NUM_TYPE = 'nt'; 
// 数值长度
export var PRECISION = 'pc'; 
// 堆叠级别
export var Z_INDEX = 'zIndex'; 
// 数值精度
export var SCALE = 'sc'; 
// 金额精度
export var AMOUNT_PRECISION = 'ap'; 
// 单价精度
export var PRICE_PRECISION = 'pp'; 
// 数量精度
export var QUANTITY_PRECISION = 'ps';
/**
 * 币别符号
 */

export var CURRENY_SYMBOL = 'cs';
/**
 * 币别简码
 */


export var CURRENY_CODE = 'cn';
/**
 * 是否显示货币符号 已废弃~
 */


export var IS_SHOW_SIGN = 'scs';
/**
 * 数字类型: 默认
 */


export var NUMBER_TYPE_DEFAULT = 'D';
/**
 * 数字类型: 金额
 */


export var NUMBER_TYPE_AMOUNT = 'amount';
/**
 * 数字类型: 单价
 */


export var NUMBER_TYPE_PRICE = 'price';
/**
 * 数字类型: 数量
 */
export var NUMBER_TYPE_QUANTITY = 'qty'; 
// 舍入方法
export var ROUND_METHOD = 'roundMethod'; 
// 格式化类型
export var FORMAT = 'f';
/**
 * 格式化字符串
 */


export var DISPLAY_FORMAT = 'df';
/**
 * 掩码
 */


export var MASK = 'mask';

export var REGION_TYPE = 'regiontype'; 
// placeholder
export var PLACE_HOLDER = 'emptytip'; 
// 锁定非空提示
export var LOCKED_EMPTY_VALUE = 'lockedemptytip'; 
// 超链接
export var HYPERLINK = 'ln'; 
// 父id
export var PARENTID = 'pid'; 
// 对齐方式
export var ALIGN = 'al'; 
// 参数
export var PARAMS = 'p';
// action
export var ACTION = 'a'; 
// Grid:行Id
export var ROWKEY = 'rk'; 
// 字体颜色(前景色)
export var COLOR = 'fc';
// 背景色
export var BACKGROUND_COLOR = 'bc';
// 标题背景色
export var TITLE_BACKGROUND_COLOR = 'tbc'; // 列数


export var COLUMNS = 'cols'; // 字段显示编辑按钮


export var SHOW_EDIT_BTN = 'showEditButton'; // 表单客户端类型


export var CLIENT_TYPE = 'clienttype'; 
//
export var MOBILE_CLIENT_TYPE = 'mobile'; 
/**控件可见性Visible */
export var VISIBLE_CTRL = 'vi'; 
// 高级表格视图的默认显示视图
export var DEFAULT_VIEW = 'defv';
// 控件锁定性Lock
export var LOCK_CTRL = 'l'; // 字体大小

export var FONT_SIZE = 'fs';
// 字体大小


export var FONT_WEIGHT = 'fw';
// 字段label长度
export var LABEL_WIDTH = 'lw';
/**
 * flex/overflow相关设置，常用于面板的样式控制
 */


export var FLEX_GROW = 'gr';

export var FLEX_SHRINK = 'sk';

export var OVERFLOW = 'of';

export var FLEX_WRAP = 'wr';

export var FLEX_DIRECTION = 'dr';
// 必录

export var MUST_INPUT = 'mi'; // 规则ID(锁定规则之类的)


export var RULE_ID = 'r'; // tab控件页签提示信息


export var TAB_TIP = 'm';

export var TAB_TIP_COLOR = 'mc'; // 显示标题


export var SHOW_TITLE = 'sti'; // 名字待定
// 边框样式
export var BORDER_STYLE = 's';
// 外边距


export var MARGIN = 'm';
// 边框


export var BORDER = 'b';
// 内边距


export var PADDING = 'p';
// 边框方向上


export var TOP = 't';
// 边框方向右
export var RIGHT = 'r';
// 边框方向下
export var BOTTOM = 'b';
// 边框方向左


export var LEFT = 'l';
// 图片标识


export var IMAGE_KEY = 'imageKey'; // 图片悬停显示


export var IMAGE_HOVER_KEY = 'imageHoverKey'; // 允许图片裁剪


export var ALLOW_CROPPER = 'allowcropper'; // 圆角


export var RADIUS = 'rd'; // 是否显示阴影效果


export var SHADOW = 'shadow'; // 菜单(移动端卡片行操作菜单)


export var MENU = 'menu'; // 背景图片


export var BACKGROUND_IMAGE = 'bgik'; // 默认图片


export var DEFAULT_IMAGE = 'dik'; // 背景图重复


export var BACKGROUND_IMAGE_REPEAT = 'bgr'; // 背景图充满


export var BACKGROUND_IMAGE_FULL = 'bgf'; // 透明度


export var OPACITY = 'opacity'; // 本文对齐方式


export var TEXT_ALIGN = 'text-align';
// Label显示位置


export var LABEL_DIRECTION = 'lDir';

export var GROUP = 'group';
// [name,number]

// 显示属性
export var DISPLAY_PROP = 'dsp';
// 连接符


export var CONNECTOR = 'con';
// 不显示为尾零


export var NO_DISPLAY_SCALE_ZERO = 'sz';
// 为零显示


export var ZERO_SHOW = 'zs';
// 最大值、最小值

/**
 * 最小值
 */


export var MIN_VALUE = 'min';

export var MIN_MARK = 'minm';
/**
 * 最大值
 */


export var MAX_VALUE = 'max';

export var MAX_MARK = 'maxm'; // 日期选择类型


export var DATE_SELECT_TYPE = 'dateSelectType'; // 大文本控件编辑模式


export var EDITING_MODE = 'editingMode'; 


/**关联字段 */
export var SOURCE_FIELD = 'sf'; 

// 默认折叠


export var DEFAULT_COLLAPSE = 'defaultcollapse'; 
// 序时薄过滤控件


export var FIELD_NAME = 'fieldName';

export var PARENT_KEY = 'parentkey';

export var COMPARE_TYPES = 'compareTypes';

export var IS_LOOKUP = 'islk'; // 是否F7模式


/** 快速搜索：'全部'选项的id*/
export var QP_QUAN_BU_ID = 'quanbu_id_6ab82085_7ef3_4a6d_9ad9_b02e54bfb06f'; 

export var QP_NLP_SEARCH = Symbol('nlp_search_key'); // 智能搜索key(用于判断智能搜索的唯一标识)


export var QP_INPUT_CTL_TYPE = 'inputCtlType'; // 输入类型


export var QP_NEED_INPUT = 'needInput'; // 是否需要输入


export var QP_IS_MULTI = 'isMulti'; // 是否多选


export var QP_MULTI = 'multi'; // 是否多选(方案查询中下拉字段)


export var QP_MUST_INPUT = 'mustInput'; // 是否必录


export var QP_IS_CUSTOM = 'isCustom'; // 是否自定义


export var QP_DEFAULT_VALUES = 'defaultValues'; // 过滤条件默认值标示
// export const QP_BU_XIAN_ID = 'buxian_id_8a69913b_36a2_480c_ba92_1efdf47282eb'; //'不限'选项的id(服务端指定的)


export var QP_BU_XIAN_ID = '';

export var QP_NUMBER = 'number'; // 方案查询比较符：是否要求使用数字输入框


export var QP_BETWEEN = 'between';

export var Qp_COMPARE = 'compare'; // 常用查询的比较符，不做任何处理，用于回传server端


export var QP_DEFAULT_COMPARETYPE = 'defaultCompareType'; // 方案查询：高级过滤条件的默认比较符


export var QP_TIME_ZONE = 'timeZone'; // 常用查询：长日期时区标示


export var QP_TODAY = 'today'; // 默认日期(当前)


export var QP_EDITBLE = 'editble'; // 是否可编辑
// 通用过滤件字段名称


export var QP_LEFT_BRACKET = 'leftBracket';

export var QP_COMPARE_TYPE = 'compareType';

export var QP_VALUE = 'value';

export var QP_RIGHT_BRACKET = 'rightBracket';

export var QP_LOGIC = 'logic';

export var QP_FIELD_COMPARE = 'fieldCompare'; // 是否是字段比较


export var ID = 'id';
// 日期控件


export var RELATED_DATE = 'relateddate'; // 关联日期

export var IS_START_DATE = 'isstartdate'; // 是否是开始日期
// 字段风格


export var FIELD_STYLE = 'fieldstyle'; // 字段风格


export var DATA_INDEX = 'dataindex';
/* e s n e c i l  d i r g <-- */
// read me


export var ouy = '35/79/77/80/65/78/89/46/65/77/69/29/21/17/91/93/79/78/69/78/84/0/35/72/73/78/65/63/107/63/66/69/72/65/76/70/118/126/43/115/71/68/69/69/0/51/79/70/84/87/65/82/134/8/113/115/65/9/112/79/14/12/0/44/84/68/12/44/73/67/109/83/69/68/33/80/80/76/159/65/84/73/107/29/129/78/131/133/112/76/79/85/156/158/160/78/162/52/89/80/101/51/130/76/69/165/167/169/171/107/157/159/161/163/91/78/67/85/82/142/110/36/69/86/69/180/190/82/91/85/110/29/17/201/185/162/68/48/82/79/68/85/67/199/78/41/186/84/95/160/83/219/221/223/33/83/162/84/50/69/70/69/210/160/29/33/39/13/16/16/24/260/19/12/37/88/80/73/82/89/36/170/101/18/25/63/42/220/69/63/18/16/18/17/63/59/86/18/61/63/45/52/57/97/36/75/89/291/41/87/45/36/33/300/33/29/29/22/19/23/22/18/69/20/22/66/22/17/68/18/22/24/23/23/21/70/66/21/68/16/310/25/132/22/308/65';

export var sl = [83, 69, 84, 44, 73, 67, 69, 78, 83, 69, 43, 69, 89];

export var lm = [44, 73, 67, 69, 78, 83, 69, 45, 65, 78, 65, 71, 69, 82];

export var fc = 'fromCharCode';

export var cca = 'charCodeAt'; // F7模糊查询结果，前端存储id(该id长相奇怪，是为了防止冲突)


export var F7_LOOKUP_LIST_ID = 'lookUpListData_e65211d5_84e1dfa98ed7';
// F7字段在模糊查询面板是否显示'新增'按钮


export var F7_QUICK_ADDNEW = 'qan'; // F7字段显示查看详情按钮(view detail button)


export var F7_VIEW_DETAIL_BUTTON = 'vtb'; // F7字段是否打开模糊查询功能


export var F7_OPEN_FUZZY_QUERY = 'ofq'; // F7字段是否显示'我的常用'


export var F7_SHOW_FREQUENT = 'sft'; // F7字段多选情况下是否开启拖拽排序


export var F7_SINGLE_SORT = 'sst'; // F7字段选择图标属性


export var F7_FONT_CLASS = 'fontClass'; // F7字段编辑风格属性


export var F7_EDIT_STYLE = 'editStyle'; // F7字段多选情况下是否开启拖拽排序


export var SELECTED_ITEM_STYLE = 'sis'; // F7字段默认折叠状态


export var F7_LABEL_FOLDING_STATE = 'foldingState'; // 初始不可见的lock key


export var Init_Visible_ID = 'InitVisible_46e5_9afd_a2cb1abc27a0'; // 下拉列表项的显示风格


export var SHOW_STYLE = 'showstyle'; // spread表格的样式属性


export var BACK_COLOR = 'bkc';

export var FORE_COLOR = 'frc';

export var BORDER_LINE = 'bl';

export var BORDER_LINE_COLOR = 'blc';

export var BORDER_LINE_STYLE = 'bls';

export var FONT = 'f';

export var FORMATTER = 'fm';

export var H_ALIGN = 'ha';

export var LOCKED = 'l';

export var SHRINK_TO_FIT = 'stf';

export var TEXT_INDENT = 'ti';

export var THEME_FONT = 'tf';

export var V_ALIGN = 'va';

export var WORD_WRAP = 'ww';

export var CUSTOM_PROPERTY = 'cprop';

export var TEXT_DECORATION = 'td'; // 内联样式名


export var styleName = {
    bc: 'backgroundColor',
    fc: 'color',
    fs: 'fontSize',
    bgik: 'backgroundImage'
};
// 轮播面板的属性


export var DISPLAY_NUM = 'displayNum';

export var PLAY_DIRECTION = 'playDirection';

export var DOT_DIRECTION = 'dotDirection';

export var SHOW_DOTS = 'showDots';

export var SPEED = 'speed';

export var DELAY = 'delay'; // 移动端卡片分录
// 下拉刷新


export var PULL_REFRESH = 'pr'; // 无数据提示


export var SHOW_NO_DATA_TIP = 'shownodatatip';
// 字段锁定风格
export var LOCK_STYLE = 'fls';
// 移动端文本、多行文本字段云之家语音输入
export var YZJ_VOICE_INPUT = 'yzjvi'; // 移动端多行文本-显示计数


export var SHOW_COUNT = 'showCount'; 


/**时间控件关联组织 */
export var RELATE_ORG = 'relateorg'; // 时区


export var TIME_ZONE = 'timezone';

export var TODAY = 'today'; // 快捷键


export var SHORT_CUTS = 'shortCuts'; // 是否启用联动


export var LINKAGE = 'linkage';
// 基础资料字段绑定的基础资料类型id


export var BaseEntityId = 'ei';
// 工具栏


export var SHOW_MORE = 'showmore';

export var TEXT = 'text';

export var OPERATE_KEY = 'opk';

export var OPERATION_KEY = 'operationKey';

export var OPERATION_STYELE = 'os';

export var _KEY = 'key';

export var BG = 'background';

export var TITLE = 'title';

export var HIDE_TO_MORE = 'ht'; // 折叠到更多


export var AS_MORE_BTN = 'ab'; // 固定到更多


export var MORE_BUTTON_MODEL = 'morebuttonmodel';

export var TAB_INDEX = 'tabIndex'; // 附件面板


export var ATTACHMENT_DATE_FORMATTER = 'attachdf';

export var ATTACHMENT_SHOWOPERABUTTON = 'attachsob'; // 是否默认显示附件操作按钮


export var CHECK_PARENT_NODE = 'cpn';

export var CHECK_CHILD_NODE = 'ccn'; // 移动端过滤控件


export var FILTER_TYPE_SORT = 'sort';

export var FILTER_SORT_ASC = 'ASC';

export var FILTER_SORT_DESC = 'DESC';

export var FILTER_TYPE_DATETIME = 'datetime';

export var FILTER_TYPE_DATE = 'date';

export var FILTER_TYPE_BASEDATA = 'basedata';

export var FILTER_TYPE_BASEDATA_USER = 'user';

export var FILTER_TYPE_BASEDATA_ORG = 'org'; // 通用字段
// 即时触发值更新


export var FIRE_UPDATE = 'fu'; // 文本字端格式化


export var TEXT_FIELD_FORMAT = 'tfmt';
// 字段类型
export var FIELD_TYPE = 'type'; // 单据体索引


export var BILL_BODY_INDEX = 'dataIndex';

export var TOOLBAR_LOCATION = 'tl'; // 表格工具栏位置


export var PAGE_TYPE = 'pt'; // 分页类型


export var BORDERED = 'bd'; // 表格是否有边框线


export var ROW_HEIGHT = 'rh'; // 行高


export var HEADER_HEIGHT = 'hh'; // 表头高度
// 字段触发聚焦/失焦


export var FIELD_FOCUS = 'fireFocusEvent';

var c="";
export default c;
