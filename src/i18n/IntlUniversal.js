import _react from "react";
import _fetchJsonp from "fetch-jsonp";
import _console from "../api/console";
import _zh_CN from "./languages/zh_CN";


class IntlUniversal {
    constructor() {
        this.options = {
            currentLocale: null,
            locales: {
                zh_CN: _zh_CN
            },
            defaultLocale: 'zh_CN',
            warningHandler: _console.warn.bind(_console)
        }
    }
    init(currentLocale, callback) {
        this.invariant(currentLocale, 'currentLocale is required');
        
        this.options.currentLocale = currentLocale;
        this.options.systemLang = currentLocale;
        var locale = this.options.locales[currentLocale];

        if (locale) {
            callback();
        } else {
            this.load(currentLocale, callback);
        }
    }
    /**动态加载语言文件 */
    load(lang, callback){
        const _this=this;
        _fetchJsonp(`/languages/${lang}.json`,{
            headers: {
                Accept: 'application/json'
            },
            jsonpCallbackFunction: 'getCurrentLocale'
        }).then(response=>{
            if (response.ok === false) {
                if (response.status === 404) {
                    throw new Error(`没有找到${lang}类型对应的语言资源文件！`)

                }
            }
            return response.json();
        }).then(jsonObj=>{
            if (jsonObj.success === false && jsonObj.error_code === 100 || jsonObj.RedirectURL) {
                throw new Error(jsonObj.error_desc || 'load locale error');
            }
            _this.options.locales[lang] = jsonObj;
            callback();
        }).catch(function (err) {
            _console.warn('load locale error:', err);

            _this.options.currentLocale = 'zh_CN'; // 

            callback();
        });
    }
    /**获取当前语言 */
    getCurrentLang(){
        return this.options.currentLocale;
    }
    getDefaultLang(){
        return this.options.defaultLocale;
    }
    /**获取当前语言数据 */
    getCurrentLangData(){
        return this.options.locales[this.options.currentLocale];
    }
    getSystemLang(){
        return this.options.systemLang;
    }
    get(key, variables, lang){
        this.invariant(key, 'key is required')
        let {locales,currentLocale,defaultLocale}=this.options
        let activeLang = lang || currentLocale; 
        // 允许访问其他类型的语言
        if (!locales || !locales[activeLang]) {
            this.options.warningHandler(`locales data${activeLang}not exists.`);
            return '';
        }
        let msg = this.getDescendantProp(locales[activeLang], key);
        if (msg==null) {
            this.options.warningHandler(`key${key}not defined in${activeLang},try to get from defaultLocale 'zh_CN'`)
            msg = this.getDescendantProp(locales[defaultLocale], key);
            if (msg==null) {
                this.options.warningHandler(`key${key}not defined in${defaultLocale}`);

                return '';
            }
        }
        try {
            return this.analysVariables(msg, variables);
        } catch (error) {
            this.options.warningHandler("format message failed for key='".concat(key, "'."), error.message);
            return msg;
        }


    }
    /**
     * 解析模板字符串中的变量
     * @param {*} msg 
     * @param {*} variables 
     */
    analysVariables(msg, variables){

        const matchArr = msg.match(/{[\w\W]*?}/g) || [];
        let getVarName = function getVarName(str) {
            var len = str.length;
            return str.slice(1, len - 1);
        };
        let stringVar = [];
        let eleVar = [];
        for (let item of matchArr) {
            let varName = getVarName(item);
            let value = variables[varName];
            if (typeof value  === 'object' || typeof value === 'function') {
                eleVar.push({
                    k: varName,
                    v: value
                });
            }else{
                stringVar.push({
                    k: varName,
                    v: value
                });
            }

        }
        msg = this.formatText(msg, stringVar);
        if (eleVar.length > 0) {
            msg = this.formatElement(msg, variables);
        }
    
        return msg;
    }
/**
 * 替换基本类型的变量
 * @param {*} msg
 * @param {*} stringVar
 */
    formatText(msg, stringVar){
        stringVar.forEach(function (item) {
            var k = item.k,
                v = item.v;
            var reg = new RegExp('{' + k + '}', 'g');
            msg = msg.replace(reg, v);
        });
        return msg;

    }
    /**
 * 替换React元素类型的变量
 * @param {*} msg
 * @param {*} eleVar
 * @param {*} variables
 */
    formatElement(msg, variables){
        var splitByElement = function splitByElement(msg) {
            var array = [];
            var item = {
                t: 0,
                v: ''
            }; 
            
            // 0-string 1-react
    
            var len = msg.length;
            msg.split('').forEach(function (c, i) {
                if (c === '{') {
                    array.push(item);
                    item = {
                        t: 1,
                        v: ''
                    };
                } else if (c === '}') {
                    array.push(item);
                    item = {
                        t: 0,
                        v: ''
                    };
                } else {
                    item.v = item.v + c;
                }
    
                if (i === len - 1) {
                    array.push(item);
                }
            });
            return array;
        };
        var elements = [];
        var eleArr = splitByElement(msg);
        eleArr.forEach(function (item, index) {
            var t = item.t,
                v = item.v;
    
            if (t === 0 && v !== '') {
                elements.push(_react.createElement("span", {
                    key: index
                }, v));
            } else if (t === 1) {
                elements.push(_react.cloneElement(variables[v], {
                    key: index
                }));
            }
        });
        return elements;

    }

    getDescendantProp(locale, key){
        if (locale[key]) {
            return locale[key];
        }
        
        const msg = key.split('-').reduce(function (a, b) {
            return a !== undefined ? a[b] : a;
        }, locale);
        return msg;
    }

    invariant(condition, errMsg){
        if (!condition) {
            throw new Error(errMsg || 'this variable must be usable!');
        }
    }
}


export default new IntlUniversal()