import  _objectUtil from '../util/objectUtil.js'

import  * as _appModelFunction from '../model/appModelFunction'


var cacher = {}; // 缓存组件路径
/**
 * 获取组件路径（基于页面meta的hash值缓存）
 * @param {*} pageId  页面id
 * @param {*} controlId  组件id
 */
 export function getControlPath(pageId, controlId) {
    return function (state) {
        var pageMeta = _appModelFunction.getFormMeta(pageId)(state);
        if (!pageMeta) return;
        var hash = pageMeta.hashCode();

        if (!cacher[hash]) {
            cacher[hash] = {};
        }

        if (cacher[hash][controlId]) {
            return cacher[hash][controlId];
        }

        var flattenMeta = buildMetaPaths(pageMeta);
        var meta = flattenMeta.find(function (item) {
            return item.id === controlId;
        });
        if (!meta) return;
        var out = [];

        if (!meta.parentId) {
            out = meta.path; // 顶级控件
        } else {
            do {
                if (meta.path) {
                    out=[...out,...meta.path];
                }
                 
                //meta.path && (_out = out).splice.apply(_out, [0, 0].concat([...meta.path]));
                meta = flattenMeta.find(function (item) {
                    return item.id === meta.parentId;
                });
            } while (meta.parentId); // out.splice(0, 0, 'forms', pageId, 'meta')

        }

        cacher[hash][controlId] = out;
        return out;
    };
};


/**
 * 创建flatten数据结构[{id,path,parentId},...]
 * @param {*} meta
 * @param {*} parentId
 * @param {*} path
 * @param {*} out 打平父子节点数组
 */

 export default function buildMetaPaths(meta, parentId,path=[],out=[]) {

    var obj = {
        id: _objectUtil(meta, 'id'),
        parentId: parentId,
        path: path
    };
    out.push(obj);
    _objectUtil(meta, 'items') && _objectUtil(meta, 'items').forEach(function (item, index) {
        buildMetaPaths(item, _objectUtil(meta, 'id'), ['items', index], out);
    });
    return out;
}