/*
 * @Author: chenjun
 * @Date:   2017-11-01 11:19:35
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-01 11:19:53
 */
(function($) {
    $.fn.slider = function(options) {
        var defaults = {
            width: 1000,
            height: 300,
            autoPlay: true,
            sliderArrow: true,
            sliderBar: true,
            speed: 3000,
            effect: 'horizontal',
            responsive: false,
            callback: function() {},
        }
        var obj = $.extend(defaults, options);
        var index = 0;
        var timer = null;

        this.each(function(index, el) {
            var me = $(this);
            if (obj.responsive) {
                var parent = me.parent();
                me.css('width', parent.width())
                me.children("ul").find("li").css('width', me.width())
            } else {
                me.css({
                    width: obj.width,
                    height: obj.height,
                })
                me.children("ul").find("li").css({
                    width: obj.width,
                    height: obj.height,
                })
            }
            var li_width = me.children("ul").find("li").width();
            var li_height = me.children("ul").find("li").height();
            var li_length = me.children("ul").find("li").length;

            me.children("ul").css({
                position: 'absolute',
                left: 0,
                top: 0,
                width: li_width * li_length
            })
            me.children("ul").find("li").css("float", "left");
            if (obj.sliderArrow) {
                var btn = "<span class='btn prev'>&lt;</span>" + '' + "<span class='btn next'>&gt;</span>"
                me.append(btn);
                me.find(".btn").hide();
                me.find(".prev").click(function() {
                    index--;
                    if (index < 0) {
                        index = li_length - 1
                    }
                    moveIndex(index);
                })
                me.find(".next").click(function() {
                    index++;
                    if (index > li_length - 1) {
                        index = 0
                    }

                    moveIndex(index);

                })
            };
            if (obj.sliderBar) {
                var bar = "<em class='bar'></em>";
                me.append(bar);
                for (var i = 0; i < li_length; i++) {
                    me.find('.bar').append('<i></i>')
                };
                me.find('.bar i').eq(0).addClass('on');
                me.find('.bar').css('marginLeft', -me.find('.bar').outerWidth() / 2);
                me.find('.bar i').on("mouseenter", function() {
                    index = $(this).index();
                    moveIndex(index)
                })
            };
            if (obj.autoPlay) {
                clearInterval(timer)
                timer = setInterval(autoMove, obj.speed);
            }

            me.hover(function() {
                clearInterval(timer);
                me.find(".btn").fadeIn();
            }, function() {
                me.find(".btn").fadeOut();
                if (obj.autoPlay) {
                    timer = setInterval(autoMove, obj.speed);
                } else {
                    return
                }
            });

            function autoMove() {
                index++;
                if (index > li_length - 1) {
                    index = 0
                }
                moveIndex(index);
            };

            function moveIndex(index) {
                switch (obj.effect.toLowerCase()) {
                    case 'horizontal':
                        me.children("ul").stop(true, true).animate({ left: -index * li_width }, 800);
                        me.find('.bar i').eq(index).addClass('on').siblings().removeClass('on');
                        break;
                    case 'vertical':
                        me.children("ul").width(li_width);
                        me.children("ul").find("li").css("float", "none");
                        me.children("ul").stop(true, true).animate({ top: -index * li_height }, 800);
                        me.find('.bar i').eq(index).addClass('on').siblings().removeClass('on');
                        break;
                    case 'fade':
                        me.children("ul").width(li_width);
                        me.children("ul").find("li").css({
                            float: 'none',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                        });
                        me.children("ul").find("li").eq(index).fadeIn().siblings().fadeOut();
                        me.find('.bar i').eq(index).addClass('on').siblings().removeClass('on');
                        break;
                }
            }
        });
    }
})(jQuery);