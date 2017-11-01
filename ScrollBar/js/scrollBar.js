/*
 * @Author: chenjun
 * @Date:   2017-11-01 11:10:16
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-01 11:10:26
 */
(function($) {
    $.fn.scrollBar = function(options) {
        var defaults = {
            foregroundColor: 'red',
            backgroundColor: '#d5d5d5',
            height: 400,
            width: 600,
            sliderBoxWidth: 10,
            sliderBarHeight: 100,
            mousewheel: true,
            radius: 5,
            scrollDirection: "y",
        }
        var obj = $.extend(defaults, options);
        this.each(function(index, el) {
            var me = $(this);
            var content = me.children().eq(0);
            var isMouseDown = false;
            var distance = 0;
            me.css({
                height: obj.height,
                position: 'relative',
                width: obj.width,
            });
            content.css("padding", 10)
            if (me.outerHeight() < content.outerHeight() || me.outerWidth() < content.outerWidth()) {
                var slider = "<div class='slider'><span></span></div>";
                me.append(slider);
            };
            if (slider) {
                var sliderBox = me.find(".slider"),
                    sliderBar = sliderBox.find("span");
                // 如果是纵向滚动；
                if (obj.scrollDirection.toLowerCase() === "y") {
                    var BarHeight = me.outerHeight() / content.outerHeight() * obj.sliderBarHeight;
                    me.css("paddingRight", content.css("paddingLeft"));
                    sliderBox.css({
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: obj.sliderBoxWidth,
                        height: obj.height - 4,
                        background: obj.backgroundColor,
                        borderRadius: obj.radius,
                        overflow: 'hidden'
                    });
                    sliderBar.css({
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: obj.sliderBoxWidth,
                        background: obj.foregroundColor,
                        height: BarHeight,
                    });
                    sliderBar.on("mousedown", function(event) {
                        event.preventDefault();
                        isMouseDown = true;
                    });
                    $(window).on('mousemove', function(event) {
                        event.preventDefault();
                        distance = event.pageY - me.offset().top
                        if (isMouseDown == true) {
                            scrollY(distance)
                        }
                    });
                    $(window).on('mouseup', function() {
                        isMouseDown = false;
                    });
                    // 鼠标滚轮事件；
                    if (obj.mousewheel) {
                        me.bind("mousewheel", function(event, delta) {
                            distance = sliderBar.offset().top - me.offset().top;
                            delta > 0 ? distance -= 10 : distance += 10;
                            scrollY(distance);
                        })
                    }

                    function scrollY(distance) {
                        if (distance < 0) {
                            distance = 0
                        } else if (distance > sliderBox.outerHeight() - sliderBar.outerHeight()) {
                            distance = sliderBox.outerHeight() - sliderBar.outerHeight();
                        }
                        sliderBar.css("top", distance);
                        var scale = distance / (sliderBox.outerHeight() - sliderBar.outerHeight())
                        var scrollDistance = parseInt(scale * (content.outerHeight() - me.outerHeight()));
                        content.css("marginTop", -scrollDistance)
                    }
                }
                // 如果是横向滚动；
                if (obj.scrollDirection.toLowerCase() === "x") {
                    content.css("width", content.outerWidth() * 2);
                    me.css("height", "auto")
                    var BarWidth = me.outerWidth() / content.outerWidth() * obj.sliderBarHeight;
                    me.css("paddingBottom", content.css("paddingLeft"));
                    sliderBox.css({
                        position: 'absolute',
                        left: 2,
                        bottom: 2,
                        width: obj.width - 4,
                        height: obj.sliderBoxWidth,
                        background: obj.backgroundColor,
                        borderRadius: obj.radius,
                        overflow: 'hidden'
                    });
                    sliderBar.css({
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: BarWidth,
                        background: obj.foregroundColor,
                        height: obj.sliderBoxWidth,
                    });
                    sliderBar.on("mousedown", function(event) {
                        event.preventDefault();
                        isMouseDown = true;
                    });
                    $(window).on('mousemove', function(event) {
                        event.preventDefault();
                        distance = event.pageX - me.offset().left
                        if (isMouseDown == true) {
                            scrollX(distance)
                        }
                    });
                    $(window).on('mouseup', function() {
                        isMouseDown = false;
                    });
                    // 鼠标滚轮事件；
                    if (obj.mousewheel) {
                        me.bind("mousewheel", function(event, delta) {
                            distance = sliderBar.offset().left - me.offset().left;
                            delta > 0 ? distance -= 10 : distance += 10;
                            scrollX(distance);
                        })
                    }

                    function scrollX(distance) {
                        if (distance < 0) {
                            distance = 0
                        } else if (distance > sliderBox.outerWidth() - sliderBar.outerWidth()) {
                            distance = sliderBox.outerWidth() - sliderBar.outerWidth();
                        }
                        sliderBar.css("left", distance);
                        var scale = distance / (sliderBox.outerWidth() - sliderBar.outerWidth())
                        var scrollDistance = parseInt(scale * (content.outerWidth() - me.outerWidth()));
                        content.css("marginLeft", -scrollDistance)
                    }
                }
            }
        });
    }
})(jQuery);