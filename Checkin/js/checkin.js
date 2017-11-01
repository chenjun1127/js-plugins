/*
 * @Author: chenjun
 * @Date:   2017-11-01 10:29:54
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-01 10:30:34
 */
;
(function($) {
    var Checkin = function(ele, options) {
        this.ele = ele;
        this.opt = options;
        this.defaults = {
            width: 452,
            height: 'auto',
            background: '#f90',
            radius: 10,
            color: '#fff',
            padding: 10,
            dateArray: [1, 2, 4, 6], // 假设已签到的天数+1
        };
        this.obj = $.extend({}, this.defaults, this.opt);
    }
    Checkin.prototype.init = function() {
        var _self = this.ele,
            html = '',
            myDate = new Date(),
            year = myDate.getFullYear(),
            month = myDate.getMonth(),
            day = myDate.getDate(),
            weekText = ['日', '一', '二', '三', '四', '五', '六'];
        _self.css({
            width: this.obj.width + 'px',
            height: this.obj.height,
            background: this.obj.background,
            borderRadius: this.obj.radius,
            color: this.obj.color,
            padding: this.obj.padding
        }).append("<div class='title'><p>" + year + '年' + (month + 1) + '月' + day + '日' + "</p><a class=\'checkBtn\' href=\"javascript:;\">签到</a></div>");
        $("<ul class='week clearfix'></ul><ul class='calendarList clearfix'></ul>").appendTo(_self);
        for (var i = 0; i < 7; i++) {
            _self.find(".week").append("<li>" + weekText[i] + "</li>")
        };
        for (var i = 0; i < 42; i++) {
            html += "<li></li>"
        };
        _self.find(".calendarList").append(html);
        var $li = _self.find(".calendarList").find("li");
        _self.find(".week li").css({
            width: (_self.width() / 7) + 'px',
            height: 50 + 'px',
            borderRight: '1px solid #f90',
            boxSizing: 'border-box',
            background: '#b25d06'
        });
        $li.css({
            width: (_self.width() / 7) + 'px',
            height: 50 + 'px',
            borderRight: '1px solid #f90',
            borderBottom: '1px solid #f90',
            boxSizing: 'border-box',
            color: "#b25d06"
        });
        _self.find(".calendarList").find("li:nth-child(7n)").css('borderRight', 'none');
        _self.find(".week li:nth-child(7n)").css('borderRight', 'none');
        var monthFirst = new Date(year, month, 1).getDay();
        var d = new Date(year, (month + 1), 0)
        var totalDay = d.getDate(); //获取当前月的天数
        for (var i = 0; i < totalDay; i++) {
            $li.eq(i + monthFirst).html(i + 1);
            $li.eq(i + monthFirst).addClass('data' + (i + 1))
            if (isArray(this.obj.dateArray)) {
                for (var j = 0; j < this.obj.dateArray.length; j++) {
                    if (i == this.obj.dateArray[j]) {
                        // 假设已经签到的
                        $li.eq(i + monthFirst).addClass('checked');
                    }
                }
            }
        }
        //$li.eq(monthFirst+day-1).css('background','#f7ca8e')
        _self.find($(".data" + day)).addClass('able-qiandao');
    }
    var isChecked = false;
    Checkin.prototype.events = function() {
        var _self = this.ele;
        var $li = _self.find(".calendarList").find("li");
        $li.on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            if ($(this).hasClass('able-qiandao')) {
                $(this).addClass('checked');
                modal(_self);
                isChecked = true;
            }
        });
        var checkBtn = _self.find(".checkBtn");
        checkBtn.click(function(event) {
            modal(_self);
            _self.find('.able-qiandao').addClass('checked');
            isChecked = true;
        });
    }
    var modal = function(e) {
        var mask = e.parents().find(".mask");
        var close = e.parents().find(".closeBtn");
        if (mask && !isChecked) {
            mask.addClass('trf');
        } else {
            return
        };
        close.click(function(event) {
            event.preventDefault();
            mask.removeClass('trf')
        });
        e.parents().find('.checkBtn').text("已签到");
    }
    $.fn.Checkin = function(options) {
        var checkin = new Checkin(this, options);
        var obj = [checkin.init(), checkin.events()]
        return obj
    }
    var isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
})(jQuery);