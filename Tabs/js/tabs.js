/*
 * @Author: chenjun
 * @Date:   2017-11-01 10:57:09
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-01 11:02:00
 */
(function($) {
    $.fn.tabs = function(options) {
        var defaults = {
            events: 'click',
            activeClass: 'active',
            effect: 'show', // 默认效果，只是简单的显示隐藏，另外还有scale、slideLeft、rotate三种效果；
        }
        var obj = $.extend(defaults, options);
        this.each(function() {
            var me = $(this);
            me.next().css('position', 'relative')
            var tabCont = me.next().children();
            var currentIndex = me.find($('.' + obj.activeClass)).index();
            switch (obj.effect) {
                case 'show':
                    tabCont.hide();
                    tabCont.eq(currentIndex).show();
                    break;
                case 'scale':
                    tabCont.css({
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 0,
                        'transition': 'all 0.25s ease-out 0s',
                        'transform': 'scale(0)'
                    });
                    tabCont.eq(currentIndex).css({
                        zIndex: 100,
                        'transform': 'scale(1)'
                    })
                    break;
                case 'slideLeft':
                    tabCont.css({
                        position: 'absolute',
                        left: '100%',
                        top: 0,
                        zIndex: 0,
                        'transition': 'all 0.25s ease-out 0s',
                        'opacity': 0
                    })
                    tabCont.eq(currentIndex).css({
                        zIndex: 100,
                        left: 0,
                        'opacity': 1
                    })
                    break;
                case 'rotate':
                    tabCont.css({
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 0,
                        'transition': 'all 0.25s ease-out 0s',
                        transform: 'rotateY(-90deg)',
                        'opacity': 0,
                    })
                    tabCont.eq(currentIndex).css({
                        zIndex: 100,
                        left: 0,
                        transform: 'rotateY(0)',
                        'opacity': 1
                    })
                    break;

            }
            me.next().css('height', tabCont.eq(currentIndex).outerHeight());
            me.children().on(obj.events, function(e) {
                var index = $(this).index();
                if (e.type == 'click' || e.type == "mouseenter") {
                    $(this).addClass(obj.activeClass).siblings().removeClass(obj.activeClass);
                    switch (obj.effect) {
                        case 'show':
                            tabCont.eq(index).show().siblings().hide();
                            break;
                        case 'scale':
                            tabCont.eq(index).css({
                                zIndex: '100',
                                'transform': 'scale(1)'
                            }).siblings().css({
                                zIndex: '0',
                                'transform': 'scale(0)'
                            });
                            break;
                        case 'slideLeft':
                            tabCont.eq(index).css({
                                left: 0,
                                'opacity': 1
                            }).siblings().css({
                                left: '100%',
                                'opacity': 0
                            });
                            break;
                        case 'rotate':
                            tabCont.eq(index).css({
                                transform: 'rotateY(0)',
                                'opacity': 1
                            }).siblings().css({
                                transform: 'rotateY(-90deg)',
                                'opacity': 0
                            });
                            break;

                    }
                    me.next().css('height', tabCont.eq(index).outerHeight());
                }
            })
        });
    }
})(jQuery);