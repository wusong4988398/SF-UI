import _immutable from "immutable";
import _trace from '../util/trace'
let FormService = {
  map: new _immutable.Map(),
  tasks: "tasks",
  // 移动端轻应用切换上下文语言环境
  switchLanguage: function switchLanguage(lang) {
    var url = `integration/switchLanguage.do?language=${lang}&random=${Math.random()}`;
    return this.getApi(url);
  },
  /**getApi不提供避免浏览器缓存功能，自行构造url防止缓存 */
  getApi: function getApi(url,cqappid='bos') {

    url = `${url}&random=${Math.random()}`; //避免浏览器缓存
    //url='http://localhost:58334/'+url;
    //url = _getWebRootPath(url);
    return window.fetch(url, {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "text/json;charset=utf-8;",
          ajax: true,
          traceId: _trace(),
          cqappid: cqappid,
        },
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      }).then(function (jsonObj) {
        // jsonObj.RedirectURL: 服务端发的json过来,包含'RedirectURL'关键字则刷新页面
        if (jsonObj.RedirectURL) {
          window.exitApp = true;
          window.location.href = jsonObj.RedirectURL;
          return;
        } else if (jsonObj.success === false && jsonObj.error_code === 100) {
          console.warn(jsonObj.error_desc || "session timeout");
          window.exitApp = true;
          window.location.reload();
          return;
        }

        return jsonObj;
      })
      .catch(function (error) {
        throw new Error("fetch data error:" + error.message);
      });
  },
};


export default FormService