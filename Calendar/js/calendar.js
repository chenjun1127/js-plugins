/*
 * @Author: chenjun
 * @Date:   2017-11-01 17:43:31
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-01 17:43:39
 */
;
(function($) {
    var Calendar = function(ele, options) {
        this.ele = ele;
        this.opt = options;
        this.defaults = {
            color: 'blue',
            fontsize: '14px',
        }
        this.obj = $.extend({}, this.defaults, this.opt);
    };
    Calendar.prototype = {
        init: function() {
            return this.ele.on("focus", function() {
                createEle($(this))
            });
        }
    };
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();

    function createEle(ele) {
        var $parent = ele.parent();
        if (!$parent || $parent[0].tagName == "BODY") {
            throw "Error: this parent() is not defined";
            return
        } else {
            ele.css("border", "1px solid red");
            $parent.css({
                padding: 0,
                margin: 0,
                position: 'relative',
            });
            if ($("#week").length == 0) {
                $parent.append("<div id='week'><h1><span class=\'prev\'>&lt;</span><span class=\'content\'>1</span><span class=\'next\'>&gt;</span></h1></div>");
                $parent.find("#week").css({
                    position: "absolute",
                    left: 0,
                    top: ele.outerHeight(true),
                    zIndex: 1000,
                    background: "#fff"
                })
                weeklist($parent.find("h1"));
                var $week = ele.next();
                updateDate(currentMonth, $week); //传参数月份
                $week.find(".prev").click(function() {
                    updateDate(--currentMonth, $week);
                });
                $week.find(".next").click(function() {
                    updateDate(++currentMonth, $week);
                });
            }
        }
    }

    function weeklist(ele) {
        if (ele.parents($("#week")).find("ul:eq(0)").length == 0) {
            ele.after('<ul></ul>');
            var weekText = ['日', '一', '二', '三', '四', '五', '六'];
            for (var i = 0; i < 7; i++) {
                ele.next().append('<li>' + weekText[i] + '</li>')
            }
            ele.next().after('<ul class=\'calendarList\'></ul>');
        }
    }

    function updateDate(m, obj) {
        var activeDate = new Date(currentYear, m, 1); //外面传进来的不断变化的日期对象
        var year = activeDate.getFullYear();
        var month = activeDate.getMonth();
        obj.find(".content").html(year + '年' + (month + 1) + '月');
        var $calendarList = obj.find($(".calendarList"));
        $calendarList.html("")
        var n = 1 - activeDate.getDay();
        if (n == 1) {
            n = -6;
        }
        activeDate.setDate(n);
        for (var i = 0; i < 42; i++) {
            var date = activeDate.getDate();
            $calendarList.append('<li>' + date + '</li>');
            var $li = $calendarList.find("li");
            if (activeDate.getMonth() != month) {
                $li.eq(i).css("color", "#ccc");
            }
            $li.eq(i).attr('data-time', year + "-" + (activeDate.getMonth() + 1) + "-" + date);
            $li.eq(i).click(function(event) {
                obj.prev().val($(this).attr('data-time'));
                obj.prev().css('borderColor', '#ccc')
                obj.remove();
            });
            activeDate.setDate(date + 1);
        }
    }
    $.fn.calendar = function(options) {
        var calendares = new Calendar(this, options);
        return calendares.init();
    }
})(jQuery)
