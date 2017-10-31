/*
 * @Author: chenjun
 * @Date:   2017-10-31 18:39:04
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-10-31 18:39:26
 */
(function($) {
    var Magnify = function(ele, options) {
        this.ele = ele;
        this.opt = options;
        this.defaults = {
            selector: 'img',
            boxWidth: 400, // 容器宽度 
            width: 100, // 放大区域宽度
            height: 100, // 放大区域高度
            radius: 0, // 放大圆角
            backgroundColor: 'red' // 背景色
        };
        this.setting = $.extend(this.defaults, this.opt);
    }
    Magnify.prototype = {
        init: function() {
            var _self = this.ele;
            var isMove = false;
            _self.css('width', this.setting.boxWidth).addClass(this.setting.selector);
            _self.parent().css({
                position: "relative",
                width: _self.css('width'),
            });

            var src = _self.attr('src');
            $("<div class='area'></div><div class='bigPic'><img src=" + src + "></<div>").appendTo(_self.parent());
            var $area = _self.parent().find(".area");
            var $bigPic = _self.parent().find(".bigPic");
            $area.css({
                width: this.setting.width,
                height: this.setting.height,
                borderRadius: this.setting.radius,
                backgroundColor: this.setting.backgroundColor
            })
            var sw = $area.width(); //剪裁框宽度
            var sh = $area.height(); //剪裁框高度
            var smallBox_w = _self.parent().width(); //小框的宽度
            var smallBox_h = _self.parent().height(); //小框的高度
            var pw = $bigPic.find('img').width(); //大图的宽度
            var ph = $bigPic.find('img').height(); //大图的高度
            var scale = (smallBox_w / pw).toFixed(2);
            $bigPic.css({
                display: 'none',
                position: 'absolute',
                width: parseInt(sw / scale),
                height: parseInt(sh / scale),
                left: '102%',
                top: 0,
                overflow: 'hidden',
                borderRadius: this.setting.radius == 100 ? this.setting.radius + '%' : this.setting.radius
            })
            $bigPic.find('img').css({
                position: 'absolute',
            })
            _self.parent().on("mouseenter", function() {
                $area.show();
                isMove = true
            })
            _self.parent().on("mousemove", function(event) {
                if (isMove) {
                    $bigPic.show();
                    setPos(event, $(this), scale);
                }
            })
            _self.parent().on("mouseleave", function() {
                $bigPic.hide();
                $area.hide();
                isMove = false
            })
        },
        events: function() {
            this.init();
        },
    }

    function setPos(e, obj, scale) {
        var x = e.pageX - obj.offset().left,
            y = e.pageY - obj.offset().top,
            w = obj.find('.area').width(),
            h = obj.find('.area').height();
        if (x < w / 2) {
            x = 0
        } else if (x > obj.width() - w / 2) {
            x = obj.width() - w
        } else {
            x -= w / 2
        }
        if (y < h / 2) {
            y = 0
        } else if (y > obj.height() - h / 2) {
            y = obj.height() - h
        } else {
            y -= h / 2
        }
        obj.find('.area').css({
            left: x,
            top: y
        });
        obj.find('.bigPic').find('img').css({
            left: -x / scale,
            top: -y / scale,
        })
    }
    $.fn.Magnifying = function(options) {
        var Magnifies = new Magnify(this, options);
        return Magnifies.events();
    }
})(jQuery);