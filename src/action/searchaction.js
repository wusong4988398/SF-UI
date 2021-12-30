

/**
 * 更新选中的搜索内容
 *
 */
 function updateSelected(model, selected) {
    return action.doDispath(model, function (_ref) {
        var dispatch = _ref.dispatch,
            _ref$post = _ref.post,
            post = _ref$post === void 0 ? [] : _ref$post;
        action.mergeState(_sysActionName.UPDATE_CONTROL_STATES, model.pageId, [{
            key: model.key,
            selected: selected
        }], dispatch);
    });
}