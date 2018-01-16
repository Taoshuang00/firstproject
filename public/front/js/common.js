mui(".mui-scroll-wrapper").scroll({
    indicators:false,//关闭滚动条
});

//初始化轮播图
mui(".mui-slider").slider({
    interval:1000
});

function getSearchObj() {
    var search = location.search;
    search = decodeURI(search).slice(1);
    var arr = search.split("&");
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var key = arr[i].split('=')[0];
        var value = arr[i].split('=')[1];
        obj[key] = value;
        return obj;
    }
}

function getSearch(key) {
    return getSearchObj()[key];
}