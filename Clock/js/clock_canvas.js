/*
 * @Author: chenjun
 * @Date:   2017-11-02 09:14:40
 * @Last Modified by:   chenjun
 * @Last Modified time: 2017-11-02 10:17:25
 */
(function(w, d) {
    var Clock = function() {
        this.dom = d.querySelector(arguments[0]);
        this.options = {
            bgColor: '#fff',
            size: 300,
            hColor: '#555', // 时针颜色
            mColor: '#f00', // 分针颜色
            sColor: 'orange', // 秒针颜色
            cBgcolor: '#e91e63', // 圆点颜色
            markColor: 'green', // 外圈颜色
            markSmallColor: '#333', // 小刻度颜色
            lineWidth: 2     // 外圈线宽度
        }
    };
    Clock.prototype = {
        init: function(o) {
            this.extend(this.options, o);
            this.create();
            var canvas = d.getElementById('canvas');
            if (canvas.getContext) {
                var ext = canvas.getContext("2d");
                this.drawClock(ext);
                setInterval(function() {
                    this.drawClock(ext);
                }.bind(this), 1000);
            }
        },
        create: function() {
            var canvas = document.createElement('canvas');
            canvas.width = canvas.height = this.options.size;
            canvas.id = 'canvas';
            canvas.style.background = this.options.bgColor;
            this.dom.appendChild(canvas);
        },
        drawClock: function(ext) {
            var canvas_width = canvas_height = this.options.size;
            ext.clearRect(0, 0, canvas_width, canvas_height);
            var x = canvas_width / 2;
            var y = canvas_height / 2;
            var r = canvas_width / 2 - this.options.lineWidth;
            var oData = new Date();
            var hours = oData.getHours();
            var minutes = oData.getMinutes();
            var seconds = oData.getSeconds();
            var hoursValue = (-90 + hours * 30 + minutes / 2) * Math.PI / 180; //分针过了30，时针不应该正好在整点上，2分钟一度；
            var minutesValue = (-90 + minutes * 6) * Math.PI / 180;
            var secondsValue = (-90 + seconds * 6) * Math.PI / 180;
            ext.lineWidth = this.options.lineWidth;
            ext.arc(x, y, r, 0, Math.PI * 2, false);
            ext.stroke();
            //画小刻度
            for (var i = 0; i < 60; i++) {
                ext.strokeStyle = this.options.markSmallColor;
                ext.lineWidth = 1;
                ext.beginPath();
                ext.moveTo(x, y);
                ext.arc(x, y, r, 6 * i * Math.PI / 180, 6 * (i + 1) * Math.PI / 180, false);
                ext.closePath();
                ext.stroke();
            }
            this.drawBlankCircle(ext, x, y, r, 10);
            // 画大刻度
            for (var i = 0; i < 12; i++) {
                ext.lineWidth = 3;
                ext.strokeStyle = this.options.markColor;
                ext.beginPath();
                ext.moveTo(x, y);
                ext.arc(x, y, r, 30 * i * Math.PI / 180, 30 * (i + 1) * Math.PI / 180, false);
                ext.closePath();
                ext.stroke();
            }
            this.drawBlankCircle(ext, x, y, r, 15);
            //画时针;
            ext.lineWidth = 5;
            ext.strokeStyle = this.options.hColor;
            ext.beginPath();
            ext.moveTo(x, y);
            ext.arc(x, y, r - 60, hoursValue, hoursValue, false);
            ext.closePath();
            ext.stroke();
            //画分针;
            ext.lineWidth = 3;
            ext.strokeStyle = this.options.sColor;
            ext.beginPath();
            ext.moveTo(x, y);
            ext.arc(x, y, r - 40, minutesValue, minutesValue, false);
            ext.closePath();
            ext.stroke();
            //画秒针;
            ext.lineWidth = 1;
            ext.strokeStyle = this.options.mColor;
            ext.beginPath();
            ext.moveTo(x, y);
            ext.arc(x, y, r - 25, secondsValue, secondsValue, false);
            ext.closePath();
            ext.stroke();
            //画表盘中心小圆;
            ext.fillStyle = this.options.cBgcolor;
            ext.beginPath();
            ext.arc(x, y, 5, 0, Math.PI * 2, false);
            ext.closePath();
            ext.fill();
        },
        drawBlankCircle: function(ext, x, y, r, d) {
            ext.fillStyle = "white"
            ext.beginPath();
            ext.arc(x, y, r - d, 0, Math.PI * 2, false);
            ext.closePath();
            ext.fill();
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

    function clock(o) {
        return new Clock(o)
    }
    window.clock = clock;
})(window, document);