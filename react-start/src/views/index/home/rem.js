'use strict';
(win => {
    let doc = win.document;
    let docEl = doc.documentElement;
    let tid;

    let refreshRem = () => {
        let width = docEl.getBoundingClientRect().width;
        let rem = width / 37.5; // 将屏幕宽度分成10份， 1份为1rem
        docEl.style.fontSize = rem + 'px';
    }
    win.addEventListener('resize', () => {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', e => {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    refreshRem();
})(window);