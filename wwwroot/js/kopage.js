/// <reference path="../lib/knockout/build/output/knockout-latest.js" />
/**
 * 
 * @param {any} callfunc 回调函数 function(data)
 * @param {string} url get 请求URL
 * @param {any} queryparemfunc function 提供get 过滤条件
 * @param {number} index 默认第几页
 * @param {number} size 页面大小
 * @param {number} count 默认设置总数
 */
var kopage = function (callfunc, url, queryparemfunc = null, index = 1, size = 10, count = 0) {
    that = this;
    that.url = url;
    that.queryparem = queryparemfunc;
    that.index = ko.observable(index);
    var _size = size;
    that.count = ko.observable(count);
    that.clickcall = function (t) {
        that.index(t);
        if (typeof callfunc === 'function') {
            var qparam = null;
            if (typeof that.queryparem === 'function') {
                qparam = that.queryparemfunc();
            }
            $.get(that.url + "?skip=" + (that.index() - 1) * _size + "&take=" + _size, qparam, function (jsondata) {
                _setIndexAndCount(jsondata.count);
                callfunc(jsondata.data)
            });
        }
    };
    that.isfirstindex = ko.observable(false);
    that.islastindex = ko.observable(false);
    var _setIndexAndCount = function (count) {
        that.count(count);
        if (that.pageCount() < that.index()) {
            that.index(that.pageCount())
        }
    };
    that.pageCount = ko.observable(0);
    that.list = ko.pureComputed(function () {
        var ps = this.count() / _size;
        ps = (this.count() %  _size) != 0 ? ps++ : ps;
        this.pageCount(ps);
        var ls = new Array();
        if (this.pageCount() <= 9) {
            for (var i = 1; i <= this.pageCount(); i++) {
                ls.push(i);
            }
        } else {
            if (this.index() <= 5) {
                var v = this.pageCount() > 9 ? 9 : this.pageCount();
                for (var i = 1; i <= v; i++) {
                    ls.push(i);
                }
            } else {
                var div = this.pageCount() - this.index();
                if (div > 5) {
                    for (var i = this.index() - 4; i <= this.index() + 4; i++) {
                        ls.push(i);
                    }
                } else {
                    var start = this.index() - 10 + div;
                    start = start > 1 ? start : 1;
                    for (var i = start; i <= this.pageCount(); i++) {
                        ls.push(i);
                    }
                }
            }
        }
        if (this.index() == 1) {
            this.isfirstindex(true);
        } else {
            this.isfirstindex(false);
        }
        if (this.index() == this.pageCount()) {
            this.islastindex(true);
        } else {
            this.islastindex(false);
        }
        return ls;
    }, that).extend({ notify: 'always' });
    that.load = function () {
        that.clickcall(0);
    };
    return that;
};