/*
 * @Author: chenjun
 * @Date:   2017-11-01 11:05:45
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-01 18:25:24
 */

(function($) {
    $.fn.dropMenu = function(options) {
        var defaults = {
            event: 'click', // 默认点击事件
            dialogBox: 'selector', // 弹出框容器
            hover: false, // 默认滑动事件关闭
        }
        var obj = $.extend(defaults, options);
        this.each(function() {
            var me = $(this);
            me.parent().css('position', 'relative');
            var wrapper = '<div class=\'wrapper\'><div class=\'space\'><i></i><em></em></div></div>';
            me.parent().append(wrapper);
            var _box = me.parent().find('.wrapper');
            obj.dialogBox.appendTo(_box);
            _box.css({
                position: 'absolute',
                top: me.outerHeight() + 11,
                boxShadow: '0 0 5px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease-in-out 0s',
                visibility: 'hidden',
                transformOrigin: 'left top',
                transform: 'scale(0)',
                background: '#fff',
            });
            _box.find('.space').css({
                width: '100%',
                height: '11px',
                position: 'absolute',
                top: '-11px',
                left: 0
            })
            var borderColor = obj.dialogBox.css('borderColor');
            _box.find("i,em").css({
                content: " ",
                borderColor: 'transparent transparent ' + borderColor + ' transparent',
                borderStyle: 'solid',
                borderWidth: '11px 8px',
                display: 'block',
                width: 0,
                height: 0,
                lineHeight: 0,
                fontSize: 0,
                position: 'absolute',
                left: me.parent().outerWidth() / 2 - 10,
                top: '-10px',
            })
            _box.find("em").css({
                borderColor: 'transparent transparent #fff transparent',
                top: '-8px',
            })
            var parentsWidth = me.parent().parent().innerWidth()
            var parentWidth = me.parent().outerWidth();
            var offsetWidth = me.parent().offset().left;
            if (offsetWidth >= parentsWidth - parentWidth) {
                _box.css({
                    right: 0,
                    transformOrigin: 'right top',
                });
                console.log(_box.outerWidth());
                _box.find("i,em").css({
                    left: _box.outerWidth() - me.parent().outerWidth() - 10 + me.parent().outerWidth() / 2
                })
            }
            if (!obj.dialogBox || obj.dialogBox === undefined) {
                throw "error:obj.dialogBox is not defind";
                return
            }

            me.on(obj.event, function() {
                var display = _box.css('visibility');
                if (display == 'hidden') {
                    _box.css({
                        visibility: 'visible',
                        transform: 'scale(1)'
                    })
                } else {
                    _box.css({
                        visibility: 'hidden',
                        transform: 'scale(0)'
                    })
                }
            });
            if (obj.hover == true) {
                me.off(obj.event);
                me.on('mouseenter', show);
                me.on('mouseleave', hide);
                _box.on('mouseenter', show);
                _box.on('mouseleave', hide);
            }

            function show() {
                _box.css({
                    visibility: 'visible',
                    transform: 'scale(1)'
                })
            };

            function hide() {
                _box.css({
                    visibility: 'hidden',
                    transform: 'scale(0)'
                })
            };
            $(document).click(function(e) {
                var target = $(e.target)
                // 如果目标区域存在
                if (!target.closest(obj.dialogBox).length == 0 || !target.closest(me).length == 0) {
                    if (!_box.css('visibility') == 'hidden') {
                        hide();
                    }
                } else {
                    hide();
                };
            });

        });
    }
})(jQuery);
