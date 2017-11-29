/*
 * @Author: chenjun
 * @Date:   2017-11-01 17:43:31
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-29 16:02:30
 */
;
(function($) {
    var Calendar = function(ele, options) {
        this.ele = ele;
        this.opt = options;
        this.defaults = {
            activeColor: '#e9203d',
            defaultColor: '#3c9',
            visitedColor: '#f90',
            width: 320,
            event: 'focus', // focus,click
            currentDate: new Date(), // 默认为当前时间 
        }
        this.setting = $.extend({}, this.defaults, this.opt);
    };


    Calendar.prototype = {
        init: function() {
            _this = this;
            return this.ele.on(this.setting.event, function() {
                _this.createEle($(this));
            });
        },
        createEle: function(ele) {
            var currentYear = !ele.val() ? this.setting.currentDate.getFullYear() : parseInt(ele.val().replace(/(\d{4})-(\d{2})-(\d{2})/g, "$1"));
            var currentMonth = !ele.val() ? this.setting.currentDate.getMonth() : parseInt(ele.val().replace(/(\d{4})-(\d{2})-(\d{2})/g, "$2")) - 1;
            if ($("#calendar").length == 0) {
                $("body").append("<div id='calendar'><h1><span id='prev_date' class=\'prev\'>&lt;</span><span class=\'calendarTitle\'>1</span><span id='next_date' class=\'next\'>&gt;</span></h1></div>");
                var $calendar = $("#calendar");
                $calendar.css({
                    position: "absolute",
                    top: ele.get(0).getBoundingClientRect().bottom,
                    left: ele.get(0).getBoundingClientRect().left,
                    zIndex: 1000,
                    background: "#fff",
                    width: this.setting.width < 288 ? 315 : this.setting.width,
                })
                this.createWeekHtml($calendar.find("h1"));
                // 事件控制
                this.updateDate(ele, currentYear, currentMonth, $calendar); //传参数月份
                $calendar.find("#prev_date").click(function() {
                    this.updateDate(ele, currentYear, --currentMonth, $calendar);
                }.bind(this));
                $calendar.find("#next_date").click(function() {
                    this.updateDate(ele, currentYear, ++currentMonth, $calendar);
                }.bind(this));
                // 改变年月
                this.changeEvent(ele, currentYear, currentMonth, $calendar);
            }

        },
        createWeekHtml: function(ele) {
            if (ele.parents($("#calendar")).find("ul:eq(0)").length == 0) {
                ele.after('<ul class=\'weekList\'></ul>');
                var weekText = ['日', '一', '二', '三', '四', '五', '六'];
                for (var i = 0; i < 7; i++) {
                    ele.next().append('<li style=\'width:' + 100 / 7 + '%\'>' + weekText[i] + '</li>');
                }
                ele.next().after('<ul class=\'calendarList\'></ul>');
            }
        },
        updateDate: function(input, y, m, obj) { // 传递年月
            var _this = this;
            var activeDate = new Date(y, m, 1); //外面传进来的不断变化的日期对象
            var year = activeDate.getFullYear();
            var month = activeDate.getMonth();
            obj.find(".calendarTitle").html(year + '年' + (month + 1) + '月');
            var $calendarList = obj.find($(".calendarList"));
            $calendarList.html("");
            var n = 1 - activeDate.getDay();
            if (n == 1) n = -6;
            activeDate.setDate(n);
            var defaultColor = this.setting.defaultColor;
            var activeColor = this.setting.activeColor;
            var visitedColor = this.setting.visitedColor;
            for (var i = 0; i < 42; i++) {
                var date = activeDate.getDate();
                var currentValue = input.val(); // 当前值
                $calendarList.append('<li style=\'width:' + 100 / 7 + '%\'> <span style=\'display:block;width:34px;height:34px;border-radius:50%;margin:1px auto;\'>' + date + '</span></li>');
                var $li = $calendarList.find("li");
                if (activeDate.getMonth() != month) {
                    $li.eq(i).find('span').css("color", "#ccc");
                }

                $li.eq(i).attr('data-time', year + "-" + this.format((activeDate.getMonth() + 1)) + "-" + this.format(date));
                if (currentValue && currentValue !== '') {
                    currentValue === $li.eq(i).attr('data-time') && $li.eq(i).find('span').css({ background: visitedColor, color: '#fff' });
                };
                var today = this.setting.currentDate.toLocaleString('chinese', { year: "numeric", month: "2-digit", day: "2-digit", }).replace(/\//g, '-');
                today === $li.eq(i).attr('data-time') && $li.eq(i).find('span').css({ background: activeColor, color: '#fff' });
                if (today !== $li.eq(i).attr('data-time')) {
                    $li.eq(i).hover(function() {
                        $(this).find('span').css({ background: defaultColor, color: '#fff' });
                    }, function() {
                        $(this).find('span').css({
                            background: 'none',
                            color: $(this).data('time').indexOf('-' + _this.format(activeDate.getMonth()) + '-') > -1 ? '#333' : '#ccc'
                        });
                    })
                } else {
                    $li.eq(i).hover(function() {
                        $(this).find('span').css({ background: defaultColor, color: '#fff' });
                    }, function() {
                        $(this).find('span').css({ background: activeColor, color: '#fff' });
                    })
                }
                $li.eq(i).click(function(event) {
                    input.val($(this).attr('data-time'));
                    input.css('borderColor', '#ccc');
                    obj.remove();
                });
                activeDate.setDate(date + 1);
            }
        },
        changeEvent: function(input, y, m, obj) {
            var clicked = 0,
                cycleYear = 0,
                _this = this,
                _currentYear = y,
                _currentMonth = m;
            $(obj).each(function() {
                var $this = $(this);
                $this.find(".calendarTitle").click(function() {
                    clicked++;
                    $(this).html(y + '年');
                    cycleYear = y + 12 - 1; // 一个周期12年
                    $(this).prev().attr('id', 'prev_year').unbind('click').click(function() {
                        if (clicked == 1) {
                            _currentYear = --y;
                            $this.find(".calendarTitle").html(_currentYear + '年');
                        } else {
                            $this.find(".yearList").html(_this.createYearHtml(y -= 12, cycleYear -= 12));
                            $this.find(".calendarTitle").html(y + '年 - ' + cycleYear + '年');
                            _this.changeYear(input, $this.find(".yearList li"), obj);
                        }
                    });
                    $(this).next().attr('id', 'next_year').unbind('click').click(function() {
                        if (clicked == 1) {
                            _currentYear = ++y;
                            $this.find(".calendarTitle").html(_currentYear + '年');
                        } else {
                            $this.find(".yearList").html(_this.createYearHtml(y += 12, cycleYear += 12));
                            $this.find(".calendarTitle").html(y + '年 - ' + cycleYear + '年');
                            _this.changeYear(input, $this.find(".yearList li"), obj);
                        }
                    });

                    var $h1 = $(this).parent('h1');
                    $h1.nextAll().hide();
                    if (clicked == 1) {
                        if ($this.find(".monthList").length == 0) {
                            $h1.after("<ul class='monthList'>" + _this.creatMonthHtml() + "</ul>");
                            $this.find(".monthList li").click(function() {
                                _currentMonth = $(this).html().replace(/月/g, "");
                                $this.find(".monthList").remove();
                                $this.find(".calendarList").show();
                                $this.find(".weekList").show();
                                _this.updateDate(input, _currentYear, _currentMonth - 1, obj);
                            }).hover(function() {
                                $(this).css({ "background": "#3c9", "color": "#fff" });
                            }, function() {
                                $(this).css({ "background": "#fff", "color": "inherit" });
                            });
                        }
                    } else {
                        $(this).html(y + '年 - ' + cycleYear + '年');
                        if ($this.find(".yearList").length == 0) {
                            $h1.after("<ul class='yearList'>" + _this.createYearHtml(y, cycleYear) + "</ul>");
                            _this.changeYear(input, $this.find(".yearList li"), obj);
                        }
                        $this.find(".yearList").show();
                        $this.find(".monthList").remove();
                    }
                })
            });
        },
        format: function(n) {
            return n.toString().replace(/^(\d)$/, '0$1');
        },
        createYearHtml: function(y, cycleYear) {
            var html = "";
            for (var i = y; i <= cycleYear; i++) {
                html += "<li style='width:" + 100 / 4 + "%;height:48px;line-height:48px;'>" + i + "年</li>";
            }
            return html;
        },
        creatMonthHtml: function() {
            var html = "";
            for (var i = 1; i <= 12; i++) {
                html += "<li style='width:" + 100 / 4 + "%;height:48px;line-height:48px;'>" + i + "月</li>";
            }
            return html;
        },
        changeYear: function(input, ele, parent) {
            var _this = this;
            $(ele).click(function() {
                var _currentYear = $(this).html().replace(/年/g, "");
                parent.find('.calendarTitle').html(_currentYear + '年').siblings().unbind('click');
                if (parent.find(".monthList").length == 0) {
                    $(this).parent().after("<ul class='monthList'>" + _this.creatMonthHtml() + "</ul>");
                    parent.find(".monthList li").click(function() {
                        var _currentMonth = $(this).html().replace(/月/g, "");
                        parent.find(".monthList").remove();
                        parent.find(".calendarList").show();
                        parent.find(".weekList").show();
                        _this.updateDate(input, _currentYear, _currentMonth - 1, parent);
                    }).hover(function() {
                        $(this).css({ "background": "#3c9", "color": "#fff" });
                    }, function() {
                        $(this).css({ "background": "#fff", "color": "inherit" });
                    });
                }
                $(this).parent().remove();
            }).hover(function() {
                $(this).css({ "background": "#3c9", "color": "#fff" });
            }, function() {
                $(this).css({ "background": "#fff", "color": "inherit" });
            });
        }
    };

    $.fn.calendar = function(options) {
        var calendares = new Calendar(this, options);
        return calendares.init();
    }
})(jQuery);