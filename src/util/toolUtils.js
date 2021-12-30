/**
 * 是否是移动客户端
 * @return {Boolean} [description]
 */
 export function isMobileClient() {
    return getClientType() == 'mobile';
}

/**
 * 获取客户端类型
 * pc,mobile
 * @return {[type]} [description]
 */
 export function getClientType() {
    return window.deviceType;
}

/**
 * 传进来的值是否是白色
 *
 */
 export function isWhiteColorBg(color='') {
   
    if (!color) return false;
    var trimColor = color.trim().replace(/\s/g, '');
    return trimColor === 'rgb(255,255,255)' || trimColor === '#fff' || trimColor === '#ffffff' || trimColor.startsWith('rgba(255,255,255');
}