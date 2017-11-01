/*
 * @Author: chenjun
 * @Date:   2017-11-01 11:27:02
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-01 15:01:17
 */
(function(w, d) {
    var Circle = function() {
        this.dom = d.querySelector(arguments[0]);
        this.options = {
            fontColor: 'blue',  	// 文字颜色
            fontSize: 40,			// 文字大小
            defaultColor: '#ccc',	// 圆环颜色
            highLightColor: '#f90', // 圆环高亮颜色
            lineWidth: 10, 			// 圆环宽度 
            percent: 80,			// 进度
            width: 300,				// 宽
            height: 300,			// 高
        }
    };
    Circle.prototype = {
        defaultProps: 'display:block;margin:0;position:absolute;left:0;top:0;',
        init: function(options) {
            this.extend(this.options, options);
            _self = this.dom;
            _self.style.cssText = 'width:' + this.options.width + 'px;height:' + this.options.height + 'px;';
            _self.innerHTML = "<canvas id='canvas-1' width='" + this.options.width + "' height='" + this.options.height + "' style='background:#fff;z-index:1;" + this.defaultProps + "'></canvas><canvas id='canvas-2' width='" + this.options.width + "' height='" + this.options.height + "' style='z-index:2;background:transparent;transform:rotate(-90deg);" + this.defaultProps + "'></canvas>";
            this.draw();
        },
        draw: function() {
            var canvas_1 = document.querySelector('#canvas-1');
            var canvas_2 = document.querySelector('#canvas-2');
            var ctx_1 = canvas_1.getContext('2d');
            var ctx_2 = canvas_2.getContext('2d');
            var percent = this.options.percent;
            ctx_1.lineWidth = ctx_2.lineWidth = this.options.lineWidth;
            ctx_1.strokeStyle = this.options.defaultColor;
            //画底部的灰色圆环
            ctx_1.beginPath();
            ctx_1.arc(canvas_1.width / 2, canvas_1.height / 2, canvas_1.width / 2 - ctx_1.lineWidth / 2, 0, Math.PI * 2, false);
            ctx_1.closePath();
            ctx_1.stroke();
            if (percent < 0 || percent > 100) {
                throw new Error('percent must be between 0 and 100');
                return
            }
            
            ctx_2.strokeStyle = this.options.highLightColor;
            var angle = 0;
            var timer;
            var fontColor = this.options.fontColor;
            var fontSize = this.options.fontSize;
            var text_x = this.options.width / 2;
            var text_y = this.options.height / 2;
            (function draw() {
                timer = requestAnimationFrame(draw);
                ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height)
                //百分比圆环
                ctx_2.beginPath();
                ctx_2.arc(canvas_2.width / 2, canvas_2.height / 2, canvas_2.width / 2 - ctx_2.lineWidth / 2, 0, angle * Math.PI / 180, false);
                angle++;
                var percentAge = parseInt((angle / 360) * 100)
                if (angle > (percent / 100 * 360)) {
                    percentAge = percent
                    window.cancelAnimationFrame(timer);
                };
                ctx_2.stroke();
                ctx_2.closePath();
                ctx_2.save();
                ctx_2.beginPath();
                ctx_2.rotate(90 * Math.PI / 180)
                ctx_2.font = fontSize + 'px Arial';
                ctx_2.fillStyle = fontColor;
                var text = percentAge + '%';
                var text_width = ctx_2.measureText(text).width;
                ctx_2.fillText(text, text_x - text_width / 2, -(text_y - fontSize / 2));
                ctx_2.closePath();
                ctx_2.restore();
            })()
        },
        extend: function(a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key]
                }
            }
            return a;
        }
    }

    function circle(o) {
        return new Circle(o)
    }
    window.circle = circle;
})(window, document);