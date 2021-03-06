!
    function (a, b) {
        'object' == typeof exports ? module.exports = b(a, require('jquery')) : 'function' == typeof define && define.amd ? define(['jquery'],
            function (c) {
                return b(a, c)
            }) : b(a, a.jQuery)
    }(this,
        function (a, b, c) {
            var d = {
                init: function (a) {
                    return this.each(function () {
                        this.self = b(this),
                            d.destroy.call(this.self),
                            this.opt = b.extend(!0, {},
                                b.fn.raty.defaults, a),
                            d._adjustCallback.call(this),
                            d._adjustNumber.call(this),
                            d._adjustHints.call(this),
                            this.opt.score = d._adjustedScore.call(this, this.opt.score),
                            'img' !== this.opt.starType && d._adjustStarType.call(this),
                            d._adjustPath.call(this),
                            d._createStars.call(this),
                            this.opt.cancel && d._createCancel.call(this),
                            this.opt.precision && d._adjustPrecision.call(this),
                            d._createScore.call(this),
                            d._apply.call(this, this.opt.score),
                            d._setTitle.call(this, this.opt.score),
                            d._target.call(this, this.opt.score),
                            this.opt.readOnly ? d._lock.call(this) : (this.style.cursor = 'pointer', d._binds.call(this))
                    })
                },
                _adjustCallback: function () {
                    for (var a = ['number', 'readOnly', 'score', 'scoreName', 'target', 'path'], b = 0; b < a.length; b++)'function' == typeof this.opt[a[b]] && (this.opt[a[b]] = this.opt[a[b]].call(this))
                },
                _adjustedScore: function (a) {
                    return a ? d._between(a, 0, this.opt.number) : a
                },
                _adjustHints: function () {
                    if (this.opt.hints || (this.opt.hints = []), this.opt.halfShow || this.opt.half) for (var a = this.opt.precision ? 10 : 2, b = 0; b < this.opt.number; b++) {
                        var d = this.opt.hints[b];
                        '[object Array]' !== Object.prototype.toString.call(d) && (d = [d]),
                            this.opt.hints[b] = [];
                        for (var e = 0; e < a; e++) {
                            var f = d[e],
                                g = d[d.length - 1];
                            g === c && (g = null),
                                this.opt.hints[b][e] = f === c ? g : f
                        }
                    }
                },
                _adjustNumber: function () {
                    this.opt.number = d._between(this.opt.number, 1, this.opt.numberMax)
                },
                _adjustPath: function () {
                    this.opt.path = this.opt.path || '',
                        this.opt.path && '/' !== this.opt.path.charAt(this.opt.path.length - 1) && (this.opt.path += '/')
                },
                _adjustPrecision: function () {
                    this.opt.half = !0
                },
                _adjustStarType: function () {
                    var a = ['cancelOff', 'cancelOn', 'starHalf', 'starOff', 'starOn'];
                    this.opt.path = '';
                    for (var b = 0; b < a.length; b++) this.opt[a[b]] = this.opt[a[b]].replace('.', '-')
                },
                _apply: function (a) {
                    d._fill.call(this, a),
                        a && (a > 0 && this.score.val(a), d._roundStars.call(this, a))
                },
                _between: function (a, b, c) {
                    return Math.min(Math.max(parseFloat(a), b), c)
                },
                _binds: function () {
                    this.cancel && (d._bindOverCancel.call(this), d._bindClickCancel.call(this), d._bindOutCancel.call(this)),
                        d._bindOver.call(this),
                        d._bindClick.call(this),
                        d._bindOut.call(this)
                },
                _bindClick: function () {
                    var a = this;
                    a.stars.on('click.raty',
                        function (e) {
                            var f = !0,
                                g = a.opt.half || a.opt.precision ? a.self.data('score') : this.alt || b(this).data('alt');
                            a.opt.click && (f = a.opt.click.call(a, +g, e)),
                                (f || f === c) && (a.opt.half && !a.opt.precision && (g = d._roundHalfScore.call(a, g)), d._apply.call(a, g))
                        })
                },
                _bindClickCancel: function () {
                    var a = this;
                    a.cancel.on('click.raty',
                        function (b) {
                            a.score.removeAttr('value'),
                                a.opt.click && a.opt.click.call(a, null, b)
                        })
                },
                _bindOut: function () {
                    var a = this;
                    a.self.on('mouseleave.raty',
                        function (b) {
                            var e = +a.score.val() || c;
                            d._apply.call(a, e),
                                d._target.call(a, e, b),
                                d._resetTitle.call(a),
                                a.opt.mouseout && a.opt.mouseout.call(a, e, b)
                        })
                },
                _bindOutCancel: function () {
                    var a = this;
                    a.cancel.on('mouseleave.raty',
                        function (b) {
                            var e = a.opt.cancelOff;
                            if ('img' !== a.opt.starType && (e = a.opt.cancelClass + ' ' + e), d._setIcon.call(a, this, e), a.opt.mouseout) {
                                var f = +a.score.val() || c;
                                a.opt.mouseout.call(a, f, b)
                            }
                        })
                },
                _bindOver: function () {
                    var a = this,
                        b = a.opt.half ? 'mousemove.raty' : 'mouseover.raty';
                    a.stars.on(b,
                        function (b) {
                            var c = d._getScoreByPosition.call(a, b, this);
                            d._fill.call(a, c),
                                a.opt.half && (d._roundStars.call(a, c, b), d._setTitle.call(a, c, b), a.self.data('score', c)),
                                d._target.call(a, c, b),
                                a.opt.mouseover && a.opt.mouseover.call(a, c, b)
                        })
                },
                _bindOverCancel: function () {
                    var a = this;
                    a.cancel.on('mouseover.raty',
                        function (b) {
                            var c = a.opt.path + a.opt.starOff,
                                e = a.opt.cancelOn;
                            'img' === a.opt.starType ? a.stars.attr('src', c) : (e = a.opt.cancelClass + ' ' + e, a.stars.attr('class', c)),
                                d._setIcon.call(a, this, e),
                                d._target.call(a, null, b),
                                a.opt.mouseover && a.opt.mouseover.call(a, null)
                        })
                },
                _buildScoreField: function () {
                    var a = '<input name="' + this.opt.scoreName + '" type="hidden" />';
                    return b("<div/>").html(a).contents().appendTo(this)
                },
                _createCancel: function () {
                    var a = this.opt.path + this.opt.cancelOff,
                        c = '<' + this.opt.starType + ' title="' + this.opt.cancelHint + '" class="' + this.opt.cancelClass + '"/>',
                        d = b("<div/>").html(c).contents();
                    'img' === this.opt.starType ? d.attr({
                        src: a,
                        alt: 'x'
                    }) : d.attr('data-alt', 'x').addClass(a),
                        'left' === this.opt.cancelPlace ? this.self.prepend('&#160;').prepend(d) : this.self.append('&#160;').append(d),
                        this.cancel = d
                },
                _createScore: function () {
                    var a = b(this.opt.targetScore);
                    this.score = a.length ? a : d._buildScoreField.call(this)
                },
                _createStars: function () {
                    for (var a = 1; a <= this.opt.number; a++) {
                        var c = d._nameForIndex.call(this, a);
                        if ('img' === this.opt.starType) var e = '<' + this.opt.starType + ' alt="' + a + '" src="' + this.opt.path + this.opt[c] + '">';
                        else var e = '<' + this.opt.starType + ' data-alt="' + a + '" class="' + this.opt.path + this.opt[c] + '">';
                        b("<div/>").html(e).contents().attr("title", d._getHint.call(this, a)).appendTo(this),
                            this.opt.space && this.self.append(a < this.opt.number ? '&#160;' : '')
                    }
                    this.stars = this.self.children(this.opt.starType)
                },
                _error: function (a) {
                    b(this).text(a),
                        b.error(a)
                },
                _fill: function (a) {
                    for (var b = 0,
                        c = 1; c <= this.stars.length; c++) {
                        var e, f = this.stars[c - 1],
                            g = d._turnOn.call(this, c, a);
                        if (this.opt.iconRange && this.opt.iconRange.length > b) {
                            var h = this.opt.iconRange[b];
                            e = d._getRangeIcon.call(this, h, g),
                                c <= h.range && d._setIcon.call(this, f, e),
                                c === h.range && b++
                        } else e = this.opt[g ? 'starOn' : 'starOff'],
                            d._setIcon.call(this, f, e)
                    }
                },
                _getFirstDecimal: function (a) {
                    var b = a.toString().split('.')[1],
                        c = 0;
                    return b && (c = parseInt(b.charAt(0), 10), '9999' === b.slice(1, 5) && c++),
                        c
                },
                _getRangeIcon: function (a, b) {
                    return b ? a.on || this.opt.starOn : a.off || this.opt.starOff
                },
                _getScoreByPosition: function (a, c) {
                    var e = parseInt(c.alt || c.getAttribute('data-alt'), 10);
                    if (this.opt.half) {
                        var f = d._getWidth.call(this),
                            g = parseFloat((a.pageX - b(c).offset().left) / f);
                        e = e - 1 + g
                    }
                    return e
                },
                _getHint: function (a, b) {
                    if (0 !== a && !a) return this.opt.noRatedMsg;
                    var c = d._getFirstDecimal.call(this, a),
                        e = Math.ceil(a),
                        f = this.opt.hints[(e || 1) - 1],
                        g = f,
                        h = !b || this.move;
                    return this.opt.precision ? (h && (c = 0 === c ? 9 : c - 1), g = f[c]) : (this.opt.halfShow || this.opt.half) && (c = h && 0 === c ? 1 : c > 5 ? 1 : 0, g = f[c]),
                        '' === g ? '' : g || a
                },
                _getWidth: function () {
                    var a = this.stars[0].width || parseFloat(this.stars.eq(0).css('font-size'));
                    return a || d._error.call(this, 'Could not get the icon width!'),
                        a
                },
                _lock: function () {
                    var a = d._getHint.call(this, this.score.val());
                    this.style.cursor = '',
                        this.title = a,
                        this.score.prop('readonly', !0),
                        this.stars.prop('title', a),
                        this.cancel && this.cancel.hide(),
                        this.self.data('readonly', !0)
                },
                _nameForIndex: function (a) {
                    return this.opt.score && this.opt.score >= a ? 'starOn' : 'starOff'
                },
                _resetTitle: function (a) {
                    for (var b = 0; b < this.opt.number; b++) this.stars[b].title = d._getHint.call(this, b + 1)
                },
                _roundHalfScore: function (a) {
                    var b = parseInt(a, 10),
                        c = d._getFirstDecimal.call(this, a);
                    return 0 !== c && (c = c > 5 ? 1 : .5),
                        b + c
                },
                _roundStars: function (a, b) {
                    var c, e = (a % 1).toFixed(2);
                    if (b || this.move ? c = e > .5 ? 'starOn' : 'starHalf' : e > this.opt.round.down && (c = 'starOn', this.opt.halfShow && e < this.opt.round.up ? c = 'starHalf' : e < this.opt.round.full && (c = 'starOff')), c) {
                        var f = this.opt[c],
                            g = this.stars[Math.ceil(a) - 1];
                        d._setIcon.call(this, g, f)
                    }
                },
                _setIcon: function (a, b) {
                    a['img' === this.opt.starType ? 'src' : 'className'] = this.opt.path + b
                },
                _setTarget: function (a, b) {
                    b && (b = this.opt.targetFormat.toString().replace('{score}', b)),
                        a.is(':input') ? a.val(b) : a.html(b)
                },
                _setTitle: function (a, b) {
                    if (a) {
                        var c = parseInt(Math.ceil(a), 10),
                            e = this.stars[c - 1];
                        e.title = d._getHint.call(this, a, b)
                    }
                },
                _target: function (a, e) {
                    if (this.opt.target) {
                        var f = b(this.opt.target);
                        f.length || d._error.call(this, 'Target selector invalid or missing!');
                        var g = e && 'mouseover' === e.type;
                        if (a === c) a = this.opt.targetText;
                        else if (null === a) a = g ? this.opt.cancelHint : this.opt.targetText;
                        else {
                            'hint' === this.opt.targetType ? a = d._getHint.call(this, a, e) : this.opt.precision && (a = parseFloat(a).toFixed(1));
                            var h = e && 'mousemove' === e.type;
                            g || h || this.opt.targetKeep || (a = this.opt.targetText)
                        }
                        d._setTarget.call(this, f, a)
                    }
                },
                _turnOn: function (a, b) {
                    return this.opt.single ? a === b : a <= b
                },
                _unlock: function () {
                    this.style.cursor = 'pointer',
                        this.removeAttribute('title'),
                        this.score.removeAttr('readonly'),
                        this.self.data('readonly', !1);
                    for (var a = 0; a < this.opt.number; a++) this.stars[a].title = d._getHint.call(this, a + 1);
                    this.cancel && this.cancel.css('display', '')
                },
                cancel: function (a) {
                    return this.each(function () {
                        var c = b(this);
                        c.data('readonly') !== !0 && (d[a ? 'click' : 'score'].call(c, null), this.score.removeAttr('value'))
                    })
                },
                click: function (a) {
                    return this.each(function () {
                        b(this).data('readonly') !== !0 && (a = d._adjustedScore.call(this, a), d._apply.call(this, a), this.opt.click && this.opt.click.call(this, a, b.Event('click')), d._target.call(this, a))
                    })
                },
                destroy: function () {
                    return this.each(function () {
                        var a = b(this),
                            c = a.data('raw');
                        c ? a.off('.raty').empty().css({
                            cursor: c.style.cursor
                        }).removeData('readonly') : a.data('raw', a.clone()[0])
                    })
                },
                getScore: function () {
                    var a, b = [];
                    return this.each(function () {
                        a = this.score.val(),
                            b.push(a ? +a : c)
                    }),
                        b.length > 1 ? b : b[0]
                },
                move: function (a) {
                    return this.each(function () {
                        var c = parseInt(a, 10),
                            e = d._getFirstDecimal.call(this, a);
                        c >= this.opt.number && (c = this.opt.number - 1, e = 10);
                        var f = d._getWidth.call(this),
                            g = f / 10,
                            h = b(this.stars[c]),
                            i = h.offset().left + g * e,
                            j = b.Event('mousemove', {
                                pageX: i
                            });
                        this.move = !0,
                            h.trigger(j),
                            this.move = !1
                    })
                },
                readOnly: function (a) {
                    return this.each(function () {
                        var c = b(this);
                        c.data('readonly') !== a && (a ? (c.off('.raty').children('img').off('.raty'), d._lock.call(this)) : (d._binds.call(this), d._unlock.call(this)), c.data('readonly', a))
                    })
                },
                reload: function () {
                    return d.set.call(this, {})
                },
                score: function () {
                    var a = b(this);
                    return arguments.length ? d.setScore.apply(a, arguments) : d.getScore.call(a)
                },
                set: function (a) {
                    return this.each(function () {
                        b(this).raty(b.extend({},
                            this.opt, a))
                    })
                },
                setScore: function (a) {
                    return this.each(function () {
                        b(this).data('readonly') !== !0 && (a = d._adjustedScore.call(this, a), d._apply.call(this, a), d._target.call(this, a))
                    })
                }
            };
            b.fn.raty = function (a) {
                return d[a] ? d[a].apply(this, Array.prototype.slice.call(arguments, 1)) : 'object' != typeof a && a ? void b.error('Method ' + a + ' does not exist!') : d.init.apply(this, arguments)
            },
                b.fn.raty.defaults = {
                    cancel: !1,
                    cancelClass: 'raty-cancel',
                    cancelHint: 'Cancel this rating!',
                    cancelOff: 'cancel-off.png',
                    cancelOn: 'cancel-on.png',
                    cancelPlace: 'left',
                    click: c,
                    half: !1,
                    halfShow: !0,
                    hints: ['bad', 'poor', 'regular', 'good', 'gorgeous'],
                    iconRange: c,
                    mouseout: c,
                    mouseover: c,
                    noRatedMsg: 'Not rated yet!',
                    number: 5,
                    numberMax: 20,
                    path: 'assets/images/edures',
                    precision: !1,
                    readOnly: !1,
                    round: {
                        down: .25,
                        full: .6,
                        up: .76
                    },
                    score: c,
                    scoreName: 'score',
                    single: !1,
                    space: !0,
                    starHalf: 'star-half.png',
                    starOff: 'star-off.png',
                    starOn: 'star-on.png',
                    starType: 'img',
                    target: c,
                    targetFormat: '{score}',
                    targetKeep: !1,
                    targetScore: c,
                    targetText: '',
                    targetType: 'hint'
                }
        });