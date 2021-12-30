
// 在控制台输出详细信息,开发环境输出所有级别的信息,正式环境只输出error日志
window.allowlog = true;
window.trace = false;

function isOutput(): boolean {
    return window.allowlog && ((window.__debug || "development") !== 'production');
}
function log(...parameter: any[]): void {
    if (isOutput()) {
        var _console;

        (_console = console).log.apply(_console, parameter);

        window.trace && console.trace();
    }
}
function warn(...parameter: any[]): void {
    if (isOutput()) {
        var _console2;

        (_console2 = console).warn.apply(_console2, parameter);

        window.trace && console.trace();
    }
}
function error(...parameter: any[]): void {
    var _console3;

    // if (isOutput) {
    (_console3 = console).error.apply(_console3, parameter);

    window.trace && console.trace(); // }
}

function time(name: string | undefined): void {
    if (isOutput()) {
        console.time(name);
    }
}

function timeEnd(name: string | undefined): void {
    if (isOutput()) {
        console.timeEnd(name);
    }
}

function table(messages: any): void {
    if (isOutput()) {
        console.table(messages);
        window.trace && console.trace();
    }
} // 条件满足,再执行log功能,提升性能
function lazyLog(callback: (arg0: Console) => void): void {
    if (isOutput()) {
        callback(console);
        window.trace && console.trace();
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    log: log,
    warn: warn,
    error: error,
    time: time,
    timeEnd: timeEnd,
    table: table,
    lazyLog: lazyLog
};

