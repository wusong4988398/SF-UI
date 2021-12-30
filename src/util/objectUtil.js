
import _immutable from 'immutable'
/**
 *获取对象指定属性的值，没有找到返回undefined
 * @export
 * @param {*} object 普通对象或immutable的Map对象
 * @param {*} propOrPropArray
 */
 export default function getProp(object, propOrPropArray) {
    if (!checkParam(object, propOrPropArray)) {
        return undefined;
    }

    var path = castPath(propOrPropArray);

    if (isImmutableObject(object)) {
        return object.getIn(path);
    }

    var index = 0;
    var length = path.length;

    while (object !== undefined && index < length) {
        object = object[path[index++]];
    }

    return index === length ? object : undefined;
}

export function checkParam(object, propOrPropArray) {
    return propOrPropArray && Object.prototype.toString.call(object) === '[object Object]';
}


/**
 * 构造属性数组
 * @param {*} propOrPropArray 字符串 或字符串数组
 */
 export function castPath(propOrPropArray) {
    if (Array.isArray(propOrPropArray)) {
        return propOrPropArray;
    }

    return [propOrPropArray];
}


/**
 *判断是否为非可变immutable对象
 *
 * @export
 * @param {*} object
 * @returns 非可变对象返回true
 */
 export function isImmutableObject(object) {
     
    return _immutable.Map.isMap(object);
}