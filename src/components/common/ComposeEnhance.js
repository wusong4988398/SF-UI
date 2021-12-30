/**
 * 组装Enhance
 */
 const ComposeEnhance = function ComposeEnhance() {

    const _len = arguments.length;

    let enhancements=new Array(_len);
    for (let index = 0; index < _len; index++) {
        
        enhancements[index] = arguments[index];
    }




    return function (component) {
        var result = enhancements.reduceRight(function (component, enhance) {
            return enhance(component);
        }, component); // 将Component的自身可枚举属性赋予生成的高阶组件

        Object.keys(component).forEach(function (property) {
            return result[property] = component[property];
        });
        return result;
    };
};
export default ComposeEnhance;
