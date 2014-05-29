var api_params = {};
function checkError(response, outputElement) {

    if (response.err_code || response.err_code === 0) {
        if (outputElement) {
            outputElement.html(response.errors);
        }
        return true;
    }
    return false;
}

function isset() {
    // +   original by: Kevin van Zonneveld
    // +   improved by: FremyCompany
    // +   improved by: Onno Marsman
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true

    var a = arguments, l = a.length, i = 0;

    if (l === 0) {
        throw new Error('Empty isset');
    }

    while (i !== l) {
        if (typeof(a[i]) == 'undefined' || a[i] === null) {
            return false;
        } else {
            i++;
        }
    }
    return true;
}


function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}

function correctStr(str) {
    if (!str) return '';
    var arrReplace = {
        'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н',
        'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ',
        'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р',
        'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', "'": 'э', 'z': 'я',
        'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь',
        ',': 'б', '.': 'ю', '/': '.', '`': 'ё', 'Q': 'Й', 'W': 'Ц',
        'E': 'У', 'R': 'К', 'T': 'Е', 'Y': 'Н', 'U': 'Г', 'I': 'Ш',
        'O': 'Щ', 'P': 'З', '{': 'Х', '}': 'Ъ', 'A': 'Ф', 'S': 'Ы',
        'D': 'В', 'F': 'А', 'G': 'П', 'H': 'Р', 'J': 'О', 'K': 'Л',
        'L': 'Д', ':': 'Ж', '"': 'Э', '|': '/', 'Z': 'Я', 'X': 'Ч',
        'C': 'С', 'V': 'М', 'B': 'И', 'N': 'Т', 'M': 'Ь', '<': 'Б',
        '>': 'Ю', '?': ',', '~': 'Ё', '@': '"', '#': '№', '$': ';', '^': ':', '&': '?'};
    var newStr = '';
    for (var i in str) {
        newStr += arrReplace[str[i]] ? arrReplace[str[i]] : str[i];
    }
    return newStr;
}

$(document).ready(function () {
    //$('.calendar').datepicker({ maxDate: "+1y", minDate: new Date()});


    $('body').on('mouseover', '.show_tooltip',function () {
        $(this).tooltip({ content: $(this).find('.tooltip').html() });
    }).on('mouseout', '.hide_tooltip', function () {
            $(this).tooltip({ hide: { effect: "explode", duration: 200 } });
        });
    $.order();

$("span.sort").live('click', function () {
$("div.check_seats_container").slideUp();
});

$("div.check_seats").live('click', function () {
$("input.radio1").removeAttr("checked");
$("div.srpp").removeClass("srpp-selected");
$(this).closest('tr').find('td.radio1').find('input.radio1').attr("checked","1");
$(this).closest('div.srpp').addClass("srpp-selected");

});

    // $('#new_form').load('http://dev.e-travels.com.ua/api/getForm.php');
});

(function ($) {
    $.widget("ui.combobox", {

        _create: function () {
            var input,
                that = this,
                wasOpen = false,
                select = this.element.hide(),
                selected = select.children(":selected"),
                value = selected.val() ? selected.text() : "",
                wrapper = this.wrapper = $("<span>")
                    .addClass("ac-combobox")
                    .insertAfter(select);


            /*select.trigger.onDisable = function() {
             alert('disabled');
             }
             select.fn.onEnable = function() {
             alert('Enabled');
             }*/


            function removeIfInvalid(element) {
                var value = $(element).val(),
                    matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(value) + "$", "i"),
                    valid = false;
                select.children("option").each(function () {
                    if ($(this).text().match(matcher)) {
                        this.selected = valid = true;
                        return false;
                    }
                });

                if (!valid) {
                    // remove invalid value, as it didn't match anything
                    $(element)
                        .val("")
                        .attr("title", value + " didn't match any item")
                        .tooltip("open");
                    select.val("");
                    setTimeout(function () {
                        input.tooltip("close").attr("title", "");
                    }, 2500);
                    input.data("ui-autocomplete").term = "";
                }
            }

            input = $("<input>")
                .appendTo(wrapper)
                .val(value)
                .attr("title", "")

                .addClass("ac-autocomplete-input")
                .autocomplete({
                    delay: 0,

                    minLength: 0,
                    autoFocus: true,

                    open: function (e, u) {
                        input.autocomplete("widget").width(select.width());
                        //setTimeout(function () {
                        $(this).css('z-index', '10000 !important;');
                        //}, 1);
                    },

                    source: function (request, response) {
                        var term = request.term;
                        var matcher = new RegExp('^' + $.ui.autocomplete.escapeRegex(term), "i");
                        var matcher2 = new RegExp('^' + $.ui.autocomplete.escapeRegex(correctStr(term)), "i");

                        response(select.children("option").map(function () {
                            var text = $(this).text();
                            if (this.value && ( term && matcher2.test(text))) {
                                term = correctStr(term);
                            }

                            if (this.value && ( !term || matcher.test(text) || matcher2.test(text)))
                                return {
                                    label: text.replace(
                                        new RegExp(
                                            "(?![^&;]+;)(?!<[^<>]*)(" +
                                                $.ui.autocomplete.escapeRegex(term) +
                                                ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                        ), "<strong>$1</strong>"),
                                    value: text,
                                    option: this
                                };
                        }));
                    },

                    select: function (event, ui) {

                        if (select.disabled()) return false;
                        var ov = select.val();

                        ui.item.option.selected = true;
                        that._trigger("selected", event, {
                            item: ui.item.option
                        });

                        select.noch = true;
                        if (ov != select.val()) {

                            select.change();
                        }

                    },

                    change: function (event, ui) {

//                      if (selec.attr('disabled'))
                        //alert(select.val());
                        if (!ui.item) {
                            removeIfInvalid(this);

                        }

                        if (!select.noch) {
                            select.change();
                            select.noch = false;
                        }

                        //alert(select.val());

                    }
                }).removeClass('ui-autocomplete-input');
//                .addClass( "ui-widget ui-widget-content ui-corner-left" );

            select.on('enable', function () {
                input.enable();
                input.val(select.find('option:selected').html());
            });

            select.on('disable', function () {
                input.disable();
                input.val(select.find('option:selected').html());
            });


            input.data("ui-autocomplete")._renderItem = function (ul, item) {
                //  $(ul).css('width', select.width()+'px !important');
                return $("<li>")//.width(select.width()-60)
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
            };
            input.focus(function () {
                this.select();
            });
            $("<a>")
                .attr("tabIndex", -1)
                /*.attr( "title", "Show All Items" )*/
                .tooltip()
                .appendTo(wrapper)
                .button({
                    text: false
                })
                .attr('class', "")
                .addClass("ac-button ac-state-default ac-button-icon-only ac-corner ac-combobox-toggle")
                .mousedown(function () {
                    wasOpen = input.autocomplete("widget").is(":visible");
                })
                .click(function () {
                    if (select.disabled()) return false;
                    input.focus();

                    // close if already visible
                    if (wasOpen) {
                        return;
                    }

                    // pass empty string as value to search for, displaying all results
                    input.autocomplete("search", "");
                });

            input.tooltip({
                tooltipClass: "ui-state-highlight"
            });
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);

(function ($) {

    $.fn.disable = function () {
        return $(this).each(function () {
            var obj = $(this);
            obj.trigger('disable');
            obj.attr('disabled', 'disabled');
        });
    };

    $.fn.disabled = function () {
        return !!$(this).attr('disabled');
    };

    $.fn.enable = function () {
        return $(this).each(function () {
            var obj = $(this);
            /*        if (obj.onEnable) {
             obj.onEnable();
             }*/
            obj.trigger('enable');
            obj.removeAttr('disabled');
        });
    };
})(jQuery);


(function ($) {
    $.order = function (params) {

        var data = {};
        var objs = {};
        var api_url = window.location.href;
        var api_request = null;
        var el_loaders = {};

        var def_params = {
            roundTripS: 'input[name=round_trip]',
            firstCountryS: '#firstCountry',
            secondCountryS: '#secondCountry',
            firstCityS: '#firstCity',
            busCheckS: '#buscheck',//
            aviaCheckS: '#aviacheck',//
            trainCheckS: '#traincheck',//
            exchangeCheckS: '#exchangecheck', //
            secondCityS: '#secondCity',
            tripDateS: '#tripDate',
            backTripDateS: '#backTripDate',
            resultContainerS: '#tripsResultContainer', showSeatsButtonS: '.check_seats', seatsContainerS: '.check_seats_container', seatsBackContainerS: '.seatsBackContainer', searchButtonS: '#searchButton', ticketsS: '#ticketAmount', lockSeatsS: '.lock-seats', buyContainerS: '.buy-container', discountsPopupS: '#popup_window', discountsPopupBtnS: '#skidki_plus'
            //    ,discountsFormS  : '#searchButton'
        };

        var params = params ? params : {};


        function init(p) {

            for (var el in p) {
                if (!def_params[el]) continue;
                def_params[el] = p[el];
            }
            params = def_params;

            if (jsInitParams) {
                data.initParams = jsInitParams;
            } else {
                data.initParams = {};
            }

            objs.roundTrip = $(params.roundTripS);
            objs.firstCountry = $(params.firstCountryS);
            objs.secondCountry = $(params.secondCountryS);
            objs.firstCity = $(params.firstCityS);

	////////
            objs.busCheck = $(params.busCheckS);
            objs.aviaCheck = $(params.aviaCheckS);
            objs.trainCheck = $(params.trainCheckS);
            objs.exchangeCheck = $(params.exchangeCheckS);
	//////////

            objs.secondCity = $(params.secondCityS);
            objs.tripDate = $(params.tripDateS);
            objs.backTripDate = $(params.backTripDateS);
            objs.resultContainer = $(params.resultContainerS);
                objs.searchButton = $(params.searchButtonS);
            objs.tickets = $(params.ticketsS);
            objs.disocuntPopup = $(params.discountsPopupS);
            objs.discountsPopupBtn = $(params.discountsPopupBtnS);
            objs.searchTripsInterval = null;
            //objs.discountsForm = $(params.discountsFormS);


            data.roundTrip = !!parseInt(objs.roundTrip.filter(':checked').val());
            data.tickets_checked ={f:[], b:[]};
            data.searchParams = {};
            data.trips = {};

            objs.firstCountry.combobox();
            objs.secondCountry.combobox();
            objs.firstCity.combobox().disable();
            objs.secondCity.combobox().disable();
            objs.tripDate.disable();
            objs.backTripDate.disable();
            objs.searchButton.disable();
            objs.resultContainer.html('')
                .slideUp()
                .contentLoader = function () {
                return objs.resultContainer.html('<div class="ajax-loader-line"><img src="/images/ajax-loader-line.gif" /></div>');
            };


            objs.disocuntPopup.changePass = function (passNum) {
                if (!passNum) var passNum = 1;
                var table = objs.disocuntPopup.find('#discount_list');
                var row = table.find('#discount_source');
                row.hide();
                var list = table.find('.discount_row');
                if (list.size() < passNum) {
                    var diff = passNum - list.size();


                    for (var i = 0; i < diff; i++) {
                        row
                            .clone()
                            .removeAttr('id')
                            .addClass('discount_row')
                            .show()
                            .appendTo(table);
                    }
                } else if (list.size() > passNum) {
                    list.remove();
                    for (var i = 0; i < passNum; i++) {
                        row
                            .clone()
                            .removeAttr('id')
                            .addClass('discount_row')
                            .show()
                            .appendTo(table);
                    }
                }

                table.find('select').unbind('change').change(function () {
                    $(this).closest('tr').find('input').show();
                    if ($(this).val() == 'birthday') {
                        $(this).closest('tr').find('input').datepicker({
                            changeMonth: true,
                            changeYear: true,
                            yearRange: Date.today().add({years: -120}).toString('yyyy') + ":" + Date.today().toString('yyyy')
                        }).mask('99.99.9999');
                    } else if (!$(this).val()) {
                        $(this).closest('tr').find('input').hide();
                    } else {
                        $(this).closest('tr').find('input').datepicker('destroy').unmask();
                    }
                });
                table.find('input').hide();
            }

            objs.disocuntPopup.popup_show = function () {
                objs.disocuntPopup.attr('shown', 1);
                objs.disocuntPopup.show();
            }
            objs.disocuntPopup.popup_hide = function () {
                objs.disocuntPopup.removeAttr('shown');
                objs.disocuntPopup.hide();

            }
            objs.disocuntPopup.find('#popup_button').click(function () {
                objs.disocuntPopup.popup_hide();
                return false;
            });
            objs.disocuntPopup.draggable({handle: '.popup_header'});
            objs.disocuntPopup.getData = function () {
                var data =
                    [
                    ];
                objs.disocuntPopup.find('select').each(function () {
                    if ($(this).val() && $(this).closest('tr').find('.discount_value input').val()) {
                        var a = {};
                        a[$(this).val()] = $(this).closest('tr').find('.discount_value input').val();
                        data.push(a);
                    }
                });
                return data;
            };

            objs.tripDate.datepicker({
                minDate: new Date(),
                constrainInput: true,
                onChangeMonthYear: function (y, m, o) {
                    data.tripDates = null;
                    if (!data.initParams.loadDates) return;
                    contentLoaderE(objs.tripDate);
                    /*var date = new Date();
                     alert(m);
                     date.setMonth(m - 1);
                     date.setFullYear(y);
                     date.setDate(1);
                     */

                    var date = Date.parseExact('01.' + m + '.' + y, 'dd.M.yyyy');
                    var str_date = date.toString('dd.MM.yyyy');
                    var params = {
                        'START_CITY_ID': objs.firstCity.val(),
                        'END_CITY_ID': objs.secondCity.val(),
                        'START_DATE': str_date,
                        'END_DATE': date.clone().add({ days: 40 }).toString('dd.MM.yyyy'),

                        'action': 'getDates'
                    };
                    if(data.roundTrip) {
                        params['onewayTripDate'] = Date.today().add({days: -1}).toString('dd.MM.yyyy');
                    }

                    api_post(api_url, params, function (json) {
                        if (json.ajax_cancel) return;
                        contentLoaderER(objs.tripDate);
                        data.tripDates = json.DATES;
                        objs.tripDate.datepicker('refresh')
                    }, 'json', 0, 0);
                },
                beforeShow: function (field) {
                    data.tripDates = null;

                    if (!data.initParams.loadDates) return;
                    var date = Date.parseExact($(field).val(), 'dd.MM.yyyy');
                    var str_date = $.datepicker.formatDate('01.mm.yy', date);
                    var params = {
                        'START_CITY_ID': objs.firstCity.val(),
                        'END_CITY_ID': objs.secondCity.val(),
                        'START_DATE': str_date,
                        'END_DATE': date.clone().add({ days: 40 }).toString('dd.MM.yyyy'),
                        'onewayTripDate': Date.today().add({days: -1}).toString('dd.MM.yyyy'),
                        'action': 'getDates'
                    };
                    contentLoaderE(objs.tripDate);
                    api_post(api_url, params, function (json) {
                        if (json.ajax_cancel) return;
                        contentLoaderER(objs.tripDate);
                        data.tripDates = json.DATES;
                        objs.tripDate.datepicker('refresh')
                    }, 'json', 0, 0);
                },
                onClose: function () {
                    contentLoaderER(objs.tripDate);
                },
                onSelect: function () {
                    contentLoaderER(objs.tripDate);
                },
                beforeShowDay: function (date) {

                    if (!data.initParams.loadDates) return [ true, "", "" ];

                    var str_date = $.datepicker.formatDate('dd.mm.yy', date);

                    if (!data.tripDates) {
                        return [ true, "", "" ];
                    } else {

                        if ($.inArray(str_date, data.tripDates) != -1) {
                            return [ true, "", "" ];
                        } else {
                            return [ false, "", "" ];
                        }
                    }

                    return true;
                }
            }).change(function () {

                var date = Date.parseExact($(this).val(), 'dd.MM.yyyy');
                var cfdate = Date.parseExact(objs.backTripDate.val() ? objs.backTripDate.val() : $(this).val(), 'dd.MM.yyyy');

                if ((data.roundTrip && !objs.backTripDate.val()) || cfdate.compareTo(date) < 0) {
                    date.add(7).days();
                    objs.backTripDate.val(date.toString('dd.MM.yyyy'));
                }
            });

            objs.backTripDate.datepicker({
                minDate: new Date(),
                constrainInput: true,
                onChangeMonthYear: function (y, m, o) {
                    data.tripBackDates = null;
                    if (!data.initParams.loadDates) return;
                    var date = Date.parseExact('01.' + m + '.' + y, 'dd.M.yyyy');
                    var str_date = date.toString('dd.MM.yyyy');
                    var params = {
                        'START_CITY_ID': objs.secondCity.val(),
                        'END_CITY_ID': objs.firstCity.val(),
                        'START_DATE': str_date,
                        'END_DATE': date.clone().add({ days: 40 }).toString('dd.MM.yyyy'),
                        'onewayTripDate': objs.tripDate.val(),
                        'action': 'getDates'
                    };
                    contentLoaderE(objs.backTripDate);
                    api_post(api_url, params, function (json) {
                        if (json.ajax_cancel) return;
                        contentLoaderER(objs.backTripDate);
                        data.tripBackDates = json.DATES;
                        objs.backTripDate.datepicker('refresh')
                    }, 'json', 0, 0);
                },
                beforeShow: function (field) {

                    data.tripBackDates = null;
                    if (!data.initParams.loadDates) return;

                    var date = Date.parseExact($(field).val(), 'dd.MM.yyyy');

                    var str_date = date.toString('01.MM.yyyy');

                    var params = {
                        'START_CITY_ID': objs.secondCity.val(),
                        'END_CITY_ID': objs.firstCity.val(),
                        'START_DATE': str_date,
                        'END_DATE': date.clone().add({ days: 40 }).toString('dd.MM.yyyy'),
                        'onewayTripDate': objs.tripDate.val(),
                        'action': 'getDates'
                    };
                    contentLoaderE(objs.backTripDate);
                    api_post(api_url, params, function (json) {
                        if (json.ajax_cancel) return;
                        contentLoaderER(objs.backTripDate);
                        data.tripBackDates = json.DATES;
                        objs.backTripDate.datepicker('refresh')
                    }, 'json', 0, 0);
                },
                onClose: function(){
                    contentLoaderER(objs.backTripDate);
                },
                onSelect: function(){
                    contentLoaderER(objs.backTripDate);
                },
                beforeShowDay: function (date) {
                    if (!data.initParams.loadBackDates) return [ true, "", "" ];

                    var str_date = $.datepicker.formatDate('dd.mm.yy', date);

                    if (!data.tripBackDates) {
                        return [ true, "", "" ];
                    } else {

                        if ($.inArray(str_date, data.tripBackDates) != -1) {
                            return [ true, "", "" ];
                        } else {
                            return [ false, "", "" ];
                        }
                    }


                    return true;
                }
            }).change(function () {
                var date = Date.parseExact($(this).val(), 'dd.MM.yyyy');
                var cfdate = Date.parseExact(objs.tripDate.val() ? objs.tripDate.val() : Date.today(), 'dd.MM.yyyy');
                //console.log(cfdate.compareTo(date));
                if (cfdate.compareTo(date) <= 0) return;

                objs.backTripDate.val(cfdate.toString('dd.MM.yyyy'));

            });

            objs.tripDate.mask('99.99.9999');
            objs.backTripDate.mask('99.99.9999');

            //**************//
            objs.firstCountry.html('').disable();
            objs.secondCountry.html('').disable();


            $('#changeDirection').click(function() {
                var c1 = objs.firstCountry;
                var c2 = objs.secondCountry;
                var ct1 = objs.firstCity;
                var ct2 = objs.secondCity;

                var c1p = c1.parent();
                var c2p = c1.parent();
                var ct1p = ct1.parent();
                var ct2p = ct1.parent();
                c1p.append(c2);
                c2p.append(c1);

                ct1p.append(ct2);
                ct2p.append(ct1);

                objs.firstCountry = c2;
                objs.secondCountry = c1;

                objs.firstCity = ct2;
                objs.secondCity = ct1;
            });


            contentLoaderE(objs.firstCountry.parent());
            api_post(api_url, {action: 'getCountries'}, function (json) {
                if (json.data && json.data.COUNTRY) {
                    fill_select(objs.firstCountry, json.data.COUNTRY);
                }
                contentLoaderER(objs.firstCountry.parent());
                contentLoaderE(objs.secondCountry.parent());
                api_post(api_url, {action: 'getCountries', 'second': 1}, function (json) {
                    contentLoaderER(objs.secondCountry.parent());
                    fill_select(objs.secondCountry, json.data.COUNTRY);
                    objs.secondCountry.enable();
                    objs.firstCountry.enable().change();
                    objs.secondCountry.enable().change();
                }, 'json');
            }, 'json');


        }

        function uniqID(idlength) {
            var charstoformid = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
            if (!idlength) {
                idlength = Math.floor(Math.random() * charstoformid.length);
            }
            var uniqid = '';

            for (var i = 0; i < idlength; i++) {
                uniqid += charstoformid[Math.floor(Math.random() * charstoformid.length)];
            }

            if (jQuery("#" + uniqid).length == 0)
                return uniqid;
            else
                return uniqID(idlength)
        }


        function contentLoader(obj, loader) {
            if (!loader) loader = 'ajax-loader-line.gif';
            return obj.html('<div class="ajax-loader-line"><img src="/images/form/' + loader + '" /></div>');
        }

        function contentLoaderE(obj) {

            var loader = $('<div class="ajax-loader-line" />');
            loader.html('<img src="/images/form/ajax-loader-line.gif" />');
            loader.css({
                position: 'absolute', top: obj.offset().top + obj.height() / 4, left: obj.offset().left + obj.width() / 4, width: obj.width() / 2, height: obj.height() / 2, 'z-index': 500

            }).hide();

            //alert(obj.attr('id'));
            if (!obj.attr('id')) {
                obj.attr('id', uniqID());
            }

            contentLoaderER(obj);
            var selector = '#' + obj.attr('id');
            el_loaders[selector] = loader;
            loader.appendTo('body').show();
        }

        function contentLoaderER(obj) {
            if (el_loaders['#' + obj.attr('id')]) {
                el_loaders['#' + obj.attr('id')].remove();
            }
        }

        function fill_select(select, list) {
            select.html('');
            //var option = $('<option>').appendTo(select);
            for (var el in list) {
                var option = $('<option>')
                    .html(list[el])
                    .val(el)
                    .appendTo(select);
            }
        }

        function api_post(url, params, callback, type, multiple, sync) {

            if (api_request && !multiple) api_request.abort();

            if (data.initParams.salt) {
                params['slt'] = data.initParams.salt;
            }
            var async = !sync;
            //alert(async);
            api_request = $.ajax({
                    url: url,
                    async: async,
                    type: "POST",
                    data: params,
                    dataType: type,
                    //timeout: 60,
                    success: function (json) {
                        if (checkError(json)) {
                            return;
                        }

                        callback(json);
                    },
                    error: function () {
                        /*alert('Connection Error');*/

                        callback({ajax_cancel: 1});
                    }

                }
            )
            /*api_request = $.post(url, params, function (json) {

             if (checkError(json)) {
             return;
             }

             callback(json);

             }, type);*/
        }


        init(params);


        objs.roundTrip.change(function () {
            data.roundTrip = !!parseInt($(this).val());
            if (!objs.tripDate.disabled() && data.roundTrip) {
                objs.backTripDate.enable();
            } else if (!data.roundTrip) {
                objs.backTripDate.disable().val('');
            }
            objs.roundTrip.disable();
            objs.secondCity.change();
        });

        //FIRST COUNTRY CHANGE
        objs.firstCountry.change(function () {

            objs.firstCity.html('').disable();
            objs.secondCity.html('').disable();
            objs.tripDate.disable();
            objs.backTripDate.disable();
            objs.searchButton.disable();

            if (!$(this).val()) return;

            contentLoaderE(objs.firstCity.parent());
            api_post(api_url, {action: 'getCities', COUNTRY_ID: $(this).val()}, function (json) {
                fill_select(objs.firstCity, json.CITIES);
                contentLoaderER(objs.firstCity.parent());
                objs.secondCountry.enable();
                objs.firstCity.enable().change();
            }, 'json');

        });

        //FIRST CITY CHANGE
        objs.firstCity.change(function () {

            if (!objs.secondCountry.val()) {
                return;
            }
            objs.secondCountry.change();

        });

        //SECOND COUNTRY CHANGE
        objs.secondCountry.change(function () {
            objs.secondCity.html('').disable();
            objs.tripDate.disable();
            objs.backTripDate.disable();
            objs.searchButton.disable();

            if (!$(this).val()) return;
            if (!objs.firstCity.val()) return;

            var params = {};

            params.COUNTRY_ID = $(this).val();
            params.START_CITY_ID = objs.firstCity.val();
            params.action = 'getCities';
            params.second = 1;
            contentLoaderE(objs.secondCity.parent());
            api_post(api_url, params, function (json) {
                contentLoaderER(objs.secondCity.parent());
                fill_select(objs.secondCity, json.CITIES);
                objs.secondCity.enable().change();
            }, 'json', 1);

        });


        //SECOND CITY CHANGE
        objs.secondCity.change(function () {
            //objs.tripDate.disable().datepicker('destroy');
            objs.roundTrip.disable();
            objs.backTripDate.disable();
            objs.searchButton.disable();

            objs.tripDate.disable();
            objs.backTripDate.disable();

            objs.searchButton.enable();

            objs.tripDate.enable().change();
            if (data.roundTrip) {
                objs.backTripDate.enable();
            }
            objs.roundTrip.enable();

        });

        objs.tickets.on('change', function () {
            var tickets = $(this).val();
            objs.disocuntPopup.changePass(tickets);
        });

        objs.discountsPopupBtn.on('click', function () {

            if (typeof objs.disocuntPopup.attr('shown') == 'undefined') {

                objs.disocuntPopup.popup_show();
            } else {
                objs.disocuntPopup.popup_hide();
            }
        });


        //SEARCH BUTTON CLICK
		
        objs.searchButton.click(function () {
            if ($(this).disabled()) {
                return false;
            }
            $(this).disable();
            var searchParams = {};
/////////
searchParams.START_COUNTRY_ID = objs.firstCountry.val();
searchParams.END_COUNTRY_ID = objs.secondCountry.val();

searchParams.SELECTED_MODES = "";
if($("#buscheck").prop("checked")){
	searchParams.SELECTED_MODES = objs.busCheck.val();
	}
if($("#aviacheck").prop("checked")){
	if(searchParams.SELECTED_MODES != "")
		searchParams.SELECTED_MODES = searchParams.SELECTED_MODES + ";" + objs.aviaCheck.val();
	else
		searchParams.SELECTED_MODES = objs.aviaCheck.val();
	}
if($("#traincheck").prop("checked")){
	if(searchParams.SELECTED_MODES != "")
		searchParams.SELECTED_MODES = searchParams.SELECTED_MODES + ";" + objs.trainCheck.val();
	else
		searchParams.SELECTED_MODES = objs.trainCheck.val();
	}
if($("#exchangecheck").prop("checked")){
	if(searchParams.SELECTED_MODES != "")
		searchParams.SELECTED_MODES = searchParams.SELECTED_MODES + ";" + objs.exchangeCheck.val();
	else
		searchParams.SELECTED_MODES = objs.exchangeCheck.val();
	}


	if(searchParams.SELECTED_MODES == "") searchParams.SELECTED_MODES = "1;3;51";
//////////////
//alert(searchParams.SELECTED_MODES);
            searchParams.START_CITY_ID = objs.firstCity.val();
            searchParams.START_CITY_NAME = objs.firstCity.find(":selected").text();
            searchParams.END_CITY_ID = objs.secondCity.val();
            searchParams.END_CITY_NAME = objs.secondCity.find(":selected").text();


            searchParams.START_COUNTRY_ID = objs.firstCountry.val();
            searchParams.START_COUNTRY_NAME = objs.firstCountry.find(":selected").text();
            searchParams.END_COUNTRY_ID = objs.secondCountry.val();
            searchParams.END_COUNTRY_NAME = objs.secondCountry.find(":selected").text();

            searchParams.TRIP_DATE = objs.tripDate.val();
            searchParams.BACK_TRIP_DATE = objs.backTripDate.val();
            searchParams.ROUND_TRIP = data.roundTrip;
            searchParams.TICKETS = objs.tickets.val();
            searchParams.TRIP_ID = '';
            searchParams.discount = objs.disocuntPopup.getData();

            if (objs.searchTripsInterval) {
                clearTimeout(objs.searchTripsInterval);
            }
/////			
if((searchParams.START_COUNTRY_ID == searchParams.END_COUNTRY_ID) &&(searchParams.START_COUNTRY_ID == '8FA72D107FDAB48DE040A8C01E021896'))	
{
if(searchParams.START_CITY_ID=='928F32EDA475026FE040A8C01E02395E') //если рейс по Украине и пункт отправления Львов
{
			// определение разницы дат > 15 дней
var Date2 = Date.parseExact(searchParams.TRIP_DATE, 'dd.MM.yyyy');
var Year2 = Date2.getFullYear();
var Month2 = Date2.getMonth();
var Day2 = Date2.getDate();


		var Date1 = new Date();
		var Year1 = Date1.getFullYear();
		var Month1 = Date1.getMonth();
		var Day1 = Date1.getDate();

		var DataFlag = false;

if((Year2-Year1)>1){DataFlag = true}
else if((Year2-Year1)==1) //если дата поиска рейсов пришлась на следующий год
{
if((12-Month1+Month2)>1){DataFlag = true}
else if((12-Month1+Month2)==1)
{
if((31-Day1+Day2)>15){DataFlag = true}
}
}
else if((Year2-Year1)==0)
{
if((Month2-Month1)>1){DataFlag = true}
else if((Month2-Month1)==1)
{
if((31-Day1+Day2)>15){DataFlag = true}
}
else if((Month2-Month1)==0)
if((Day2-Day1)>15){DataFlag = true}
}
if(DataFlag)
{


var waiter;


$('div.messageAlert p').html('Обращаем ваше внимание, что глубина продажи автобусных билетов на некоторых автостанциях Львова может быть всего 15 дней');
$('div.messageAlert').fadeIn(300, function(){
// создаём таймер и запоминаем ссылку на него
	waiter=setTimeout(function(){

          // когда таймер отработает будут запущен fadeOut
	          $('div.messageAlert').fadeOut(400);

	   },5000);
	})

	 			  $('div.messageAlert').live('click', function () {
	     clearTimeout(waiter);
		 $('div.messageAlert').fadeOut(400);
	});


	// щелчок унечтожит таймер и обьект не исчезнет



//$('div.messageAlert').html('Оращаем ваше внимание, что глубина продажи автобусных билетов на некоторых автостанциях Львова может быть всего 15 дней').fadeIn(300).delay(10000).fadeOut(400);


}
}
}
////////
            data.searchParams = searchParams;
            searchParams.action = 'searchTrips';
            objs.resultContainer.slideUp(500, function () {

                contentLoader(objs.resultContainer, 'ajax-big-loader.gif').slideDown(500, function () {
                    api_post(api_url, searchParams, function (json) {
                        objs.searchButton.enable();

                        objs.resultContainer.slideUp(200, function () {




                            // window.location = '#s_results'
                            var html = json.HTML;
                            for (var el in json.INFO) {
                                data.trips[el] = json.INFO[el];
                            }

                            objs.resultContainer
                                .html(html)
                                .slideDown(200);
                            objs.seatsContainers = objs.resultContainer
                                .find(params.seatsContainerS)
                                .slideUp()
                                .html('');
                            // objs.resultContainer.find(params.showSeatsButtonS).enable();
                            if (json.success) {
							
                                $('html, body').animate({
                                    scrollTop: $("#s_results").offset().top
                                }, 500);
                            }

                            var fhtml = objs.resultContainer.find('table.filters').find('td').first().html();//.first().hide();
                            objs.resultContainer.find('table.filters').find('td').first().html('<div>' + fhtml + '</div>').find('div').hide();
                            if (!json.COMPLETED) {
							
                                  initFilters()
                                objs.resultContainer
                                    .find('.rezpoisk2 .shapkaniz')
                                    .before('<div class="ajax-loader-line"><img src="/images/form/ajax-big-loader.gif" /></div>');
                            } else {
                                initFilters();
                            }
                            /*objs.seatsContainers.click(function(){
                             if ($(this).html()) {
                             $(this).slideUp(500, function(){
                             $(this).html('');
                             });
                             return;
                             }
                             objs.seatsContainers.slideUp(500, function(){
                             $(this).html('');
                             });

                             api_post(api_url + 'api/getTripSeats', {ID:$(this)})


                             });*/


                            objs.resultContainer.find('#searchAllCityCountry').live('click', function () {
                                getTimeTable(objs.firstCity.val(), objs.secondCountry.val());
                            });
                            objs.resultContainer.find('#searchAllCountryCountry').live('click', function () {
                                getTimeTable(objs.firstCountry.val(), objs.secondCountry.val());
                            });

                            objs.resultContainer.find('#searchYesterday').click(function () {
                                var date_str = objs.tripDate.val();
                                var date = Date.parseExact(date_str, 'dd.MM.yyyy');
                                objs.tripDate.val(date.add({day: -1}).toString('dd.MM.yyyy'));
                                objs.searchButton.click();
                            });
                            objs.resultContainer.find('#searchTomorrow').click(function () {
                                var date_str = objs.tripDate.val();
                                var date = Date.parseExact(date_str, 'dd.MM.yyyy');
                                objs.tripDate.val(date.add({day: 1}).toString('dd.MM.yyyy'));
                                objs.searchButton.click();
								getNearData("forward", 4);
								
                            });

                        });

                        if (!json.COMPLETED) {


                            objs.searchTripsInterval = setTimeout(
                                function () {
                                    loadOtherTrips()
                                }, 2000
                            );

                        }
                    }, 'json');
                });
            });
        });

		// поиск рейсов на ближайшую дату
		// direction - направление поиска: forward - вперед, back - назад
		// iteration - количество циклов поиска
        function getNearData(direction, iteration) {
            if (objs.searchButton.disabled()) {
                return false;
            }
            objs.searchButton.disable();
            var searchParams = {};


            searchParams.START_CITY_ID = objs.firstCity.val();
            searchParams.START_CITY_NAME = objs.firstCity.find(":selected").text();
            searchParams.END_CITY_ID = objs.secondCity.val();
            searchParams.END_CITY_NAME = objs.secondCity.find(":selected").text();


            searchParams.START_COUNTRY_ID = objs.firstCountry.val();
            searchParams.START_COUNTRY_NAME = objs.firstCountry.find(":selected").text();
            searchParams.END_COUNTRY_ID = objs.secondCountry.val();
            searchParams.END_COUNTRY_NAME = objs.secondCountry.find(":selected").text();

            searchParams.TRIP_DATE = objs.tripDate.val();
            searchParams.BACK_TRIP_DATE = objs.backTripDate.val();
            searchParams.ROUND_TRIP = data.roundTrip;
            searchParams.TICKETS = objs.tickets.val();
            searchParams.TRIP_ID = '';
            searchParams.discount = objs.disocuntPopup.getData();

            if (objs.searchTripsInterval) {
                clearTimeout(objs.searchTripsInterval);
            }

            data.searchParams = searchParams;
            searchParams.action = 'searchTrips';
			
			
			//////////////////
            objs.resultContainer.slideUp(500, function () {

                contentLoader(objs.resultContainer, 'ajax-big-loader.gif').slideDown(500, function () {
                    api_post(api_url, searchParams, function (json) {
                        objs.searchButton.enable();

                        objs.resultContainer.slideUp(200, function () {


                            // window.location = '#s_results'
                            var html = json.HTML;
                            for (var el in json.INFO) {
                                data.trips[el] = json.INFO[el];
                            }

                            objs.resultContainer
                                .html(html)
                                .slideDown(200);
                            objs.seatsContainers = objs.resultContainer
                                .find(params.seatsContainerS)
                                .slideUp()
                                .html('');
                            // objs.resultContainer.find(params.showSeatsButtonS).enable();
                            if (json.success) {
							
                                $('html, body').animate({
                                    scrollTop: $("#s_results").offset().top
                                }, 500);
                            }
							////////////////////////////////////////////////////
							else if(iteration!=0){
							iteration--;
							//alert(iteration);
							var date_str = objs.tripDate.val();
                                var date = Date.parseExact(date_str, 'dd.MM.yyyy');
								if(direction == "forward")
                                objs.tripDate.val(date.add({day: 1}).toString('dd.MM.yyyy'));
								else if(direction == "back")
								objs.tripDate.val(date.add({day: -1}).toString('dd.MM.yyyy'));
								getNearData(direction, iteration);
                                
							}

                            var fhtml = objs.resultContainer.find('table.filters').find('td').first().html();//.first().hide();
                            objs.resultContainer.find('table.filters').find('td').first().html('<div>' + fhtml + '</div>').find('div').hide();
                            if (!json.COMPLETED) {
							
                                objs.resultContainer.find('table.filters').find('td').first().append('<div class="ajax-loader-line"><img src="/images/form/ajax-big-loader.gif" /></div>');
                                objs.resultContainer
                                    .find('.rezpoisk2 .shapkaniz')
                                    .before('<div class="ajax-loader-line"><img src="/images/form/ajax-big-loader.gif" /></div>');
                            } else {
                                initFilters();
                            }

                        });

                        if (!json.COMPLETED) {


                            objs.searchTripsInterval = setTimeout(
                                function () {
                                    loadOtherTrips()
                                }, 2000
                            );

                        }
                    }, 'json');
                });
            });
			/////////////////////////////
			
			
        }		
		
		
        function getTimeTable(startId, endId) {

            var searchParams = {};

            searchParams.START_CITY_ID = startId;
            searchParams.END_CITY_ID = endId;
            searchParams.TRIP_DATE = objs.tripDate.val();
			

            searchParams.START_CITY_NAME = objs.firstCity.find(":selected").text();
            searchParams.END_CITY_NAME = objs.secondCity.find(":selected").text();
            searchParams.START_COUNTRY_NAME = objs.firstCountry.find(":selected").text();
            searchParams.END_COUNTRY_NAME = objs.secondCountry.find(":selected").text();




            searchParams.TRIP_ID = '';


            searchParams.action = 'getTimeTable';
            objs.resultContainer.slideUp(500, function () {
                contentLoader(objs.resultContainer, 'ajax-big-loader.gif').slideDown(500, function () {
                    api_post(api_url, searchParams, function (json) {
                        objs.searchButton.enable();

                        objs.resultContainer.slideUp(200, function () {


                            // window.location = '#s_results'
                            var html = json.html;

                            objs.resultContainer
                                .html(html)
                                .slideDown(200);
                            objs.seatsContainers = objs.resultContainer
                                .find(params.seatsContainerS)
                                .slideUp()
                                .html('');
                            // objs.resultContainer.find(params.showSeatsButtonS).enable();
                            if (json.success) {
                                $('html, body').animate({
                                    scrollTop: $("#s_results").offset().top
                                }, 500);
                            }
                        });

                    }, 'json');
                });
            });
        }

        function initSort() {
            var list = objs.resultContainer.find('.srpp');

        }

        function initFilters() {
            var list = objs.resultContainer.find('.srpp');
            var container = objs.resultContainer.find('.rezpoisk2');
            var container_header = objs.resultContainer.find('.rezpoisk2 .shapka');
            var shapka = container_header.find('table.filters');
            //var shapkaniz = objs.resultContainer.find('.shapkaniz');
            var shapka_top = objs.resultContainer.offset().top;
            var shapkaniz_top = shapka_top + objs.resultContainer.height() - 150;
            container_header.find('td').first().find('div').fadeIn(200);
            /* $(window).unbind('scroll').scroll(
             function () {
             if (objs.resultContainer.height() < 300) return;
             var h = $(window).height();
             var scroll_top = $(document).scrollTop();
             if (scroll_top >= shapka_top && scroll_top < shapkaniz_top) {
             shapka.parent().css({
             position: 'relative',
             height: shapka.height()
             });
             shapka.css({
             top: 0,
             position: 'fixed',
             'z-index': 10000
             });
             } else {
             shapka.css({
             top: 0,
             position: 'relative'
             });
             }
             }
             ).scroll();
             */
            if (list.size() < 1) return;

            var filters = objs.resultContainer.find('.filter');
            var sorts = objs.resultContainer.find('.sort');
            filters.unbind('change');
            sorts.unbind('click');
            //alert(filters.size());
            filters.change(function () {
                var show_params = {};
                filters.each(function () {
                    var filter_val = $(this).val();
                    if ($(this).hasClass('filter_checkbox') && !$(this).attr('checked')) {
                        filter_val = null;
                    }
                    if (filter_val || $(this).is('[range]')) {

                        if ($(this).is('[range]')) {
                            if (!filter_val) return;
                            if ($(this).attr('range') == 'min') {
                                if (!show_params[$(this).attr('rel')]) {
                                    show_params[$(this).attr('rel')] = {'min': parseFloat(filter_val)};
                                } else {
                                    show_params[$(this).attr('rel')]['min'] = parseFloat(filter_val);
                                }
                            } else if ($(this).attr('range') == 'max') {
                                if (!show_params[$(this).attr('rel')]) {
                                    show_params[$(this).attr('rel')] = {'max': parseFloat(filter_val)};
                                } else {
                                    show_params[$(this).attr('rel')]['max'] = parseFloat(filter_val);
                                }
                            }

                        } else {
                            show_params[$(this).attr('rel')] = filter_val.split(';');
                        }
                    } else {
                        show_params[$(this).attr('rel')] = null;
                    }
                });


                list.show();
                list.each(function () {
                    var no_hide = 0;
                    var filters = 0;
                    for (var f in show_params) {
                        filters++;
                        if (show_params[f] == null) {
                            no_hide++;
                            continue;
                        }

                        if (!$(this).is('[' + f + ']')) {
                            no_hide++;
                            continue;
                        }
                        var val = $(this).attr(f);

                        if (isset(show_params[f]['min']) || isset(show_params[f]['max'])) {
                            if (isset(show_params[f]['min']) && isset(show_params[f]['max'])) {
                                if (parseFloat(val) >= show_params[f]['min'] && parseFloat(val) <= show_params[f]['max']) {
                                    no_hide++;
                                }
                            } else if (isset(show_params[f]['min']) && !isset(show_params[f]['max'])) {
                                if (parseFloat(val) >= show_params[f]['min']) {
                                    no_hide++;
                                }
                            } else if (!isset(show_params[f]['min']) && isset(show_params[f]['max'])) {
                                if (parseFloat(val) <= show_params[f]['max']) {
                                    no_hide++;
                                }
                            }
                        } else {
                            for (var i in show_params[f]) {
                                if ($(this).attr(f) == show_params[f][i]) {
                                    no_hide++;
                                    break;
                                }
                            }
                        }


                    }

                    if (no_hide < filters) {
                        $(this).hide();
                    }
                });
            });
            try {
                sorts.css('cursor', 'pointer');
                sorts.click(function () {
                    var list = objs.resultContainer.find('.srpp');
                    var d = $(this).is('[direction]') ? $(this).attr('direction') : '';
                    sorts.removeAttr('direction').find('img.direction').remove();

                    d = d == 'ASC' ? 'DESC' : 'ASC';
                    $(this).attr('direction', d);
                    if (d == 'ASC') {
                        $(this).append('<img class="direction" src="/images/form/sort_asc.png" />');
                    } else {
                        $(this).append('<img class="direction"  src="/images/form/sort_desc.png" />');
                    }

                    var sfield = $(this).attr('rel');

                    list.sort(
                        function (a, b) {
                            var contentA = parseFloat($(a).attr(sfield));
                            var contentB = parseFloat($(b).attr(sfield));

                            if (d == 'ASC') {
                                return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
                            } else {
                                return (contentA < contentB) ? 1 : (contentA > contentB) ? -1 : 0;
                            }
                        }
                    );
                    container.html('').append(container_header).append(list);
                    initFilters();

                });
            } catch (e) {

            }


        }

        // LOAD OTHER TRIPS
        function loadOtherTrips() {

            var searchParams = {};
            searchParams.action = 'getTrips';
            searchParams.TICKETS = objs.tickets.val();

            if (objs.searchTripsInterval) {
                clearTimeout(objs.searchTripsInterval);
            }

            api_post(api_url, searchParams, function (json) {
                objs.searchButton.enable();

                objs.resultContainer.find('.ajax-loader-line').last().remove();
                // window.location = '#s_results'
                var html = json.HTML;
                for (var el in json.INFO) {
                    data.trips[el] = json.INFO[el];
                }

                objs.resultContainer
                    .find('.rezpoisk2 .shapkaniz')
                    .before(html);
                objs.seatsContainers = objs.resultContainer
                    .find(params.seatsContainerS)

                // objs.resultContainer.find(params.showSeatsButtonS).enable();


                if (!json.COMPLETED) {

                    objs.resultContainer
                        .find('.rezpoisk2 .shapkaniz')
                        .before('<div class="ajax-loader-line"><img src="/images/form/ajax-big-loader.gif" /></div>');

                    objs.searchTripsInterval = setTimeout(
                        function () {
                            loadOtherTrips()
                        }, 2000
                    );
                } else {
                    objs.resultContainer.find('table.filters').find('td').first().find('.ajax-loader-line').remove();
                    initFilters();
                }
            }, 'json', 1);
        }

        // SHOW SEATS
        objs.resultContainer.on('click', params.showSeatsButtonS, function () {


            var obj = $(this);
            objs.currTripBtn = obj;
            var tripId = obj.attr('rel');

            if (obj.disabled()) return;
            $(params.showSeatsButtonS).disable();

            var seatsContainer = objs.seatsContainers.filter(function () {
                return !!($(this).attr('rel') == tripId);
            });

            if (seatsContainer.html()) {
                seatsContainer.stop(true, true).slideUp(500, function () {
                    $(this).html('');
                });
                data.searchParams.TRIP_ID = '';
                $(params.showSeatsButtonS).enable();
                return;
            }

            data.searchParams.TRIP_ID = tripId;

            objs.seatsContainers.stop(true, true).slideUp(500, function () {
                $(this).html('');
            });

            loadSeats(tripId, obj);
        });

        function loadSeats(tripId, obj, carraige_id, segment) {
            data.tickets_checked = {f: [], b: [], segment0: [], segment1: [], segment2: [], segment3: [], segment4: [], segment5: [], segment6: [], segment7: [], segment8: [], segment9: []};
            var post_params = {ID: tripId};

            if ((carraige_id)&&(!segment)) {
                post_params['CARRIAGE_ID'] = carraige_id;
            }
			else {
                post_params['segment'+segment+'CarriageId'] = carraige_id;
            }
			/*
            else if ((carraige_id)&&(segment == '0')) {
                post_params['segment0CarriageId'] = carraige_id;
            }
            else if ((carraige_id)&&(segment == '1')) {
                post_params['segment1CarriageId'] = carraige_id;
            }
			*/
            obj.find('input').each(function () {
                post_params[$(this).attr('name')] = $(this).val();
            });
            var seatsContainer = objs.seatsContainers.filter(function () {
                return !!($(this).attr('rel') == tripId);
            });
            contentLoader(seatsContainer, 'ajax-big-loader.gif').slideDown(200, function () {
                post_params.action = 'getTripSeats';
                api_post(api_url, post_params, function (json) {

                    seatsContainer.slideUp(200, function () {

                        $(this).html('');

                        seatsContainer.html(json.html).slideDown(500);
                        seatsContainer.find('.seats-tabs').tabs(
                            {
                                show: { effect: "fade", duration: 100 },
                                hide: { effect: "fade", duration: 100 }
                            }
                        );
                        objs.lockSeats = seatsContainer.find(params.lockSeatsS);
                        objs.lockSeats.enable();
                        //objs.lockSeats.disable();
                        objs.buyContainer = seatsContainer.find(params.buyContainerS);

                        $('html, body').animate({
                            scrollTop: $("#ch_seats_" + tripId).offset().top
                        }, 500);

                        data.noSelectSeats = false;

                        if (json.trip.NO_SEATS || json.trip.NO_SELECT_SEATS) {
                            data.noSelectSeats = true;
                            lockSeats();
                        }

                    });

                    $(params.showSeatsButtonS).enable();
                }, 'json', 1);
            });
        }


        //CHANGE CARRIAGE
        objs.resultContainer.on('change', '#carriage', function () {
            data.searchParams.CARRIAGE_ID = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val());
        });
        objs.resultContainer.on('change', '#segment0carriage', function () {
            data.searchParams.segment0CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'0');
        });
        objs.resultContainer.on('change', '#segment1carriage', function () {
            data.searchParams.segment1CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'1');
        });
		objs.resultContainer.on('change', '#segment2carriage', function () {
            data.searchParams.segment2CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'2');
        });
		objs.resultContainer.on('change', '#segment3carriage', function () {
            data.searchParams.segment3CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'3');
        });
		objs.resultContainer.on('change', '#segment4carriage', function () {
            data.searchParams.segment4CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'4');
        });
		objs.resultContainer.on('change', '#segment5carriage', function () {
            data.searchParams.segment5CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'5');
        });
		objs.resultContainer.on('change', '#segment6carriage', function () {
            data.searchParams.segment6CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'6');
        });
		objs.resultContainer.on('change', '#segment7carriage', function () {
            data.searchParams.segment7CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'7');
        });
		objs.resultContainer.on('change', '#segment8carriage', function () {
            data.searchParams.segment8CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'8');
        });
		objs.resultContainer.on('change', '#segment9carriage', function () {
            data.searchParams.segment9CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'9');
        });
		objs.resultContainer.on('change', '#segment10carriage', function () {
            data.searchParams.segment10CarriageId = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val(),'10');
        });

        // CHECK SEAT
        objs.resultContainer.on('click', '.seat-available', function () {
            /*if (data.noSelectSeats) {
                return false;
            }*/
            var obj = $(this);
            var seatId = obj.attr('rel');
            var seatNum = obj.html();
            if (seatNum == '<span>СВ</span>') {
                lockSeats();
                return false;
            }
            var direction = $(this).is('[back]') ? 'b' : 'f';
			direction = $(this).is('[segment]') ?  $(this).attr('segment') : direction;
            // objs.lockSeats.disable();
            data.searchParams.CARRIAGE_ID = $(this).val();  //""
            data.searchParams.segment0CarriageId = $(this).val();
            data.searchParams.segment1CarriageId = $(this).val();

            for (var i in data.tickets_checked[direction]) {
                if (data.tickets_checked[direction][i] && data.tickets_checked[direction][i].sid == seatId) {
                    data.tickets_checked[direction].splice(i, 1);
                    obj.removeClass('seat-reserved');
                    return;
                }
            }

            if (data.tickets_checked[direction].length === parseInt(data.searchParams.TICKETS)) {
                var r = data.tickets_checked[direction].shift();
                obj.closest(params.seatsContainerS).find('.seat-reserved[rel="' + r.sid + '"]').removeClass('seat-reserved');
            }

            var s = {sid: seatId, snum: seatNum}
            data.tickets_checked[direction].push(s);
            obj.addClass('seat-reserved');

            /*  if (data.tickets_checked.length == parseInt(data.searchParams.TICKETS)) {
             objs.lockSeats.enable();
             }*/
        });

        objs.resultContainer.on('click', '.unlock-seats', function () {
            api_post(api_url + 'api/unlockSeats.php', {}, function (json) {

            });

        });


        //LOCK SEATS
        objs.resultContainer.on('click', params.lockSeatsS, function () {
            if ($(this).disabled()) {
                return false;
            }

            lockSeats();

        });

        function lockSeats() {
            var post_params = {};
            post_params.CARRIAGE_ID = $('#carriage').val();
            post_params.segment0CarriageId = $('#segment0carriage').val();
            post_params.segment1CarriageId = $('#segment1carriage').val();
            post_params.TICKETS_CHECKED = data.tickets_checked;
            post_params.TRIP = data.trips[data.searchParams.TRIP_ID];
            post_params = $.extend(data.searchParams, post_params);
            post_params.action = 'lockSeats';
            data.searchParams.decline = '';
            contentLoader(objs.buyContainer, 'ajax-big-loader.gif');
            api_post(api_url, post_params, function (json) {

                if (!json.success) {
                    alert('Ошибка при выборе мест. Повторите попытку');
                    // loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn);
                    //objs.currTripBtn.click().delay(500).click();
                    return false;
                }
                var html = json.html;
                var time = json.time_limit;

                objs.buyContainer.html(html);
                var tooltip = objs.buyContainer.find('.show_tooltip');

                //tooltip.m_tooltip();
                $('html, body').animate({
                    scrollTop: objs.buyContainer.offset().top - 100
                }, 500);

            }, 'json');

            return true;
        }

        // BUY FORM
        objs.resultContainer.on('click', '.buy_order', function () {
            if ($(this).disabled()) {
                return false;
            }
            var obj = $(this);
            var p = obj.parent();
            contentLoader(p);

            var form = $('form[name=order_data]');

            var post = $.extend(data.searchParams, {'order_data': form.serialize()});
			post.TRIP = null;
            post.action = 'ticketsBooking';
            post.url1 = 'http://e-travels.com.ua/orderSuccess.php';
/*
			var str = $("form[name=order_data]").serialize();
			var tickets = objs.tickets.val();
            var post = {
                        'order_data': str,
                        'url1': 'http://e-travels.com.ua/orderSuccess.php',
						'TICKETS': tickets
                        'action': 'ticketsBooking'
                    };
		*/
            api_post(api_url, post, function (json) {
                objs.buyContainer.find('.field_error').removeClass('field_error');
                p.html(obj);
                if (!json.success) {

                    var ferrors = json.errors.fields;
                    for (var el in ferrors) {
                        objs.buyContainer.find('[name="' + ferrors[el] + '"]').parent().addClass('field_error');
                    }
                    return;
                }
                var form = $('<form action="https://ecommerce.liqpay.com/ecommerce/CheckOutPagen" method="post" /></form>');
                obj.disabled();
                for (var el in json.params) {
                    var v = json.params[el];

                    var input = $('<input />')
                        .attr('type', 'hidden')
                        .attr('name', el)
                        .val(v)
                        .appendTo(form);


                }
                form.appendTo(objs.buyContainer);
                //p.html(obj);
                form.submit();

            }, 'json');
            //objs.buyContainer.
        });
	     // BUY FORM ALFABANK

        objs.resultContainer.on('click', '.buy_order_alfa', function () {
            if ($(this).disabled()) {
                return false;
            }
            var obj = $(this);
            var p = obj.parent();
            contentLoader(p);

            var form = $('form[name=order_data]');

            var post = $.extend(data.searchParams, {'order_data': form.serialize()});
			post.TRIP = null;
            post.action = 'abankCheckout';
            post.url1 = 'http://e-travels.com.ua/orderSuccess.php';

/*
			var str = $("form[name=order_data]").serialize();
            var post = {
                        'order_data': str,
                        'url1': 'http://e-travels.com.ua/orderSuccess.php',
                        'action': 'abankCheckout'
                    };
*/
            api_post(api_url, post, function (json) {
                objs.buyContainer.find('.field_error').removeClass('field_error');
                p.html(obj);
                if (!json.success) {

                    var ferrors = json.errors.fields;
                    for (var el in ferrors) {
                        objs.buyContainer.find('[name="' + ferrors[el] + '"]').parent().addClass('field_error');
                    }
                    return;
                }
				 obj.disabled();
                window.location = json.furl;
				
            }, 'json');
            //objs.buyContainer.
        });
	
        // BUY_DISCOUNT FORM
        objs.resultContainer.on('click', '.order_discount', function () {

            if ($(this).disabled()) {
                return false;
            }

            var obj = $(this);
            var discount_data = objs.resultContainer.find('div.buy_discount');
            var p = obj.parent();
            contentLoader(p);
           // post.TRIP = null;
/*
            var form = $('form[name=order_data]');

            var post = $.extend(data.searchParams, {"order_data": form.serialize()});
            post.check_discount = 1;
            post.action = 'ticketsBooking';
            post.url1 = 'http://e-travels.com.ua/orderSuccess.php';

			*/
		 var str = $("form[name=order_data]").serialize();
            var post = {
                        'order_data': str,
                        'url1': 'http://e-travels.com.ua/orderSuccess.php',
                        'check_discount': 1,
                    //    'discount_data': discount_data,
                        'TRIP': null,
                        'action': 'ticketsBooking'
                    };

            api_post(api_url, post, function (json) {
                objs.buyContainer.find('.field_error').removeClass('field_error');
                p.html(obj);
                if (!json.success) {

                    var ferrors = json.errors.fields;
                    for (var el in ferrors) {
                        objs.buyContainer.find('[name="' + ferrors[el] + '"]').parent().addClass('field_error');
                    }
                    return;
                }


                var form = $('<form action="https://ecommerce.liqpay.com/ecommerce/CheckOutPagen" method="post" /></form>');

                obj.disabled();
                for (var el in json.params) {
                    var v = json.params[el];

                    var input = $('<input />')
                        .attr('type', 'hidden')
                        .attr('name', el)
                        .val(v)
                        .appendTo(form);


                }

                data.searchParams.decline = json.order_id;


                discount_data.find('.ecquiring_fields').html(form);
                //form.appendTo(objs.buyContainer);
                //p.html(obj);

                discount_data.find('.discount_cost').html(json.amount);
                discount_data.find('.buy_order_discount').click(function () {
                    form.submit();
                });

                obj.closest('.buy_buttons').fadeOut(200).html('');
                discount_data.fadeIn(200);
                objs.resultContainer.find('.buy_order').unbind('click').click(function () {
                    var errors = 0;
                    if (!$('#check_personal_data').attr('checked')) {
                        $('#check_personal_data').parent().addClass('field_error');
                        errors++;
                    }

                    if (!$('#check_terms').attr('checked')) {
                        $('#check_terms').parent().addClass('field_error');
                        errors++;
                    }

                    if (!errors) {
                        form.submit();
                    }
                });
//
            }, 'json');
            //objs.buyContainer.
        });
        // BOOKING FORM
        objs.resultContainer.on('click', '.booking_order', function () {
            if ($(this).disabled()) {
                return false;
            }
            var obj = $(this);
            var p = obj.parent();
            contentLoader(p);
         //   var form = $('form[name=order_data]');
          //  post.TRIP = null;
		 var str = $("form[name=order_data]").serialize();
            var post = {
                        'order_data': str,
                        'url1': 'http://e-travels.com.ua/orderSuccess.php?r=1',
                        'TRIP': null,
                        'action': 'reserveTickets'
                    };


        //    post = $.extend(data.searchParams, {"order_data": form.serialize()});
     //       post.action = 'reserveTickets';
     //       post.url1 = 'http://e-travels.com.ua/orderSuccess.php?r=1';
            api_post(api_url, post, function (json) {
                objs.buyContainer.find('.field_error').removeClass('field_error');
                if (!json.success) {
                    p.html(obj);
                    var ferrors = json.errors.fields;
                    for (var el in ferrors) {
                        objs.buyContainer.find('[name="' + ferrors[el] + '"]').parent().addClass('field_error');
                    }
                    return;
                }
                window.location = json.url;

            }, 'json');
            //objs.buyContainer.
        });

        objs.resultContainer.on('click', '.booking_order', function () {
            //alert('Booking');
        });


        $(".showmap").unbind('click').live('click', function () {

            $('.popup-map').fadeOut();
            var popup = $(this).closest('td').find('.popup-map');
            var map_line = popup.find('.popup-map-line');
            var map_width = 0;
            var mask_width = 0;

            if (!popup.size) return false;
            popup.fadeIn(200, function () {
                map_line.css('left', 0);
                mask_width = $(this).find('.popup-map-mask').outerWidth();
                map_line.find('.map-point').each(function () {
                    map_width += $(this).outerWidth();
                });


            });

            if (!popup.find('.popup-map-prev').hasClass('popup-btn-disable')) {
                popup.find('.popup-map-prev').addClass('popup-btn-disable');
            }

            if ($(this).hasClass('.scrollAdded')) return false;

            $(this).addClass('.scrollAdded');


            function move(points, speed) {

                speed = speed ? speed : 0;

                var left = map_line.position().left + (points);
                popup.find('.popup-map-prev').removeClass('popup-btn-disable');
                popup.find('.popup-map-next').removeClass('popup-btn-disable');
                if (left >= 0) {
                    map_line.animate({left: 0}, speed);
                    popup.find('.popup-map-prev').addClass('popup-btn-disable');
                    return false;
                }

                if (left <= -1 * (map_width - mask_width)) {
                    map_line.animate({left: -1 * (map_width - mask_width)}, speed);
                    popup.find('.popup-map-next').addClass('popup-btn-disable');
                    return false;
                }
                map_line.animate({left: left}, speed);

            }

            popup.find('.popup-map-prev').click(function () {
                move(mask_width / 2, 200);
                return false;
            });

            popup.find('.popup-map-next').click(function () {

                move(-1 * mask_width / 2, 200);
                return false;
            });


            popup.bind('mousewheel DOMMouseScroll', function (e) {
                var scrollTo = null;

                if (e.type == 'mousewheel') {
                    scrollTo = (e.originalEvent.wheelDelta * -1);
                }
                else if (e.type == 'DOMMouseScroll') {
                    scrollTo = 40 * e.originalEvent.detail;
                }
                //alert(scrollTo);
                //popup.find('.popup-map-next').next().html(scrollTo * -2);
                if (scrollTo) {
                    /* e.preventDefault();
                     map_line.scrollTop(scrollTo + map_line.scrollTop());*/
                    move(scrollTo * -2);
                }
                return false;
            });

            return false;

        });


        //objs.firstCountry.change();
        //objs.secondCountry.change();
        objs.tickets.change();
        // objs.roundTrip.change();
    }
})(jQuery);