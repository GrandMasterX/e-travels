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
                    if ($(this).text().match(matcher) ) {
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

                            if (this.value && ( !term || matcher.test(text) || matcher2.test(text)) )
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

            objs.roundTrip = $(params.roundTripS);
            objs.firstCountry = $(params.firstCountryS);
            objs.secondCountry = $(params.secondCountryS);
            objs.firstCity = $(params.firstCityS);
            objs.secondCity = $(params.secondCityS);
            objs.tripDate = $(params.tripDateS);
            objs.backTripDate = $(params.backTripDateS);
            objs.resultContainer = $(params.resultContainerS);
            objs.searchButton = $(params.searchButtonS);
            objs.tickets = $(params.ticketsS);
            objs.disocuntPopup = $(params.discountsPopupS);
            objs.discountsPopupBtn = $(params.discountsPopupBtnS);
            //objs.discountsForm = $(params.discountsFormS);


            data.roundTrip = !!parseInt(objs.roundTrip.filter(':checked').val());
            data.tickets_checked =
                [
                ];
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
                //maxDate: maxDate,
                constrainInput: true,
                minDate: new Date()
                //beforeShowDay: disableDays,
                /*onSelect: function (d, i) {
                 api_params.START_DATE = d;
                 }*/
            });

            var date = new Date();
            objs.backTripDate.datepicker({
                //maxDate: maxDate,
                constrainInput: true,
                minDate: new Date(date.setDate(date.getDate() + 7))
                //beforeShowDay: disableDays,
                /*onSelect: function (d, i) {
                 api_params.START_DATE = d;
                 }*/
            });

            objs.tripDate.mask('99.99.9999');
            objs.backTripDate.mask('99.99.9999');
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

        function api_post(url, params, callback, type, multiple) {

            if (api_request && !multiple) api_request.abort();

            api_request = $.ajax({
                    url: url,

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
                        callback({});
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
                objs.backTripDate.disable();
            }
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
            objs.backTripDate.disable();
            objs.searchButton.disable();

            var params = {
                'START_CITY_ID': objs.firstCity.val(),
                'END_CITY_ID': objs.secondCity.val(),
                'START_DATE': Date.today().toString('dd.MM.yyyy'),
                'END_DATE': Date.today().next().year().toString('dd.MM.yyyy'),
                'action': 'getDates'
            };
            objs.tripDate.enable();
            if (data.roundTrip) {
                objs.backTripDate.enable();
            }
            objs.searchButton.enable();
            return;
            objs.tripDate.val('');
            contentLoaderE(objs.tripDate);

            api_post(api_url, params, function (json) {

                var dates = json.DATES;
                var maxDate = $(dates).last()[0];

                if ($.inArray(objs.tripDate.val(), dates) == -1) {
                    objs.tripDate.val($(dates).first()[0]);
                }

                function disableDays(date) {
                    date = $.datepicker.formatDate('dd.mm.yy', date);
                    if ($.inArray(date, dates) != -1) {
                        return
                            [
                                true,
                                "",
                                "Available"
                            ];
                    } else {
                        return
                            [
                                false,
                                "",
                                "unAvailable"
                            ];
                    }
                }

                objs.tripDate.datepicker({
                    maxDate: maxDate,
                    minDate: new Date(),
                    beforeShowDay: disableDays,
                    onSelect: function (d, i) {
                        api_params.START_DATE = d;
                    }
                });
                contentLoaderER(objs.tripDate);
                objs.tripDate.enable();
                objs.searchButton.enable();

            }, 'json');

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

            searchParams.START_CITY_ID = objs.firstCity.val();
            searchParams.END_CITY_ID = objs.secondCity.val();
            searchParams.TRIP_DATE = objs.tripDate.val();
            searchParams.BACK_TRIP_DATE = objs.backTripDate.val();
            searchParams.ROUND_TRIP = data.roundTrip;
            searchParams.TICKETS = objs.tickets.val();
            searchParams.TRIP_ID = '';
            searchParams.discount = objs.disocuntPopup.getData();

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

                            if (json.success) {
                                $('html, body').animate({
                                    scrollTop: $("#s_results").offset().top
                                }, 500);
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

                        });
                    }, 'json');
                });
            });
        });


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

        function loadSeats(tripId, obj, carraige_id) {
            data.tickets_checked =
                [
                ];
            var post_params = {ID: tripId};

            if (carraige_id) {
                post_params['CARRIAGE_ID'] = carraige_id;
            }

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
                        objs.lockSeats = seatsContainer.find(params.lockSeatsS);
                        objs.lockSeats.disable();
                        objs.buyContainer = seatsContainer.find(params.buyContainerS);

                        $('html, body').animate({
                            scrollTop: $("#ch_seats_" + tripId).offset().top
                        }, 500);

                        if (json.trip.NO_SEATS || json.trip.NO_SELECT_SEATS) {
                            lockSeats();
                        }

                    });

                    $(params.showSeatsButtonS).enable();
                }, 'json');
            });
        }


        //CHANGE CARRIAGE
        objs.resultContainer.on('change', '#carriage', function () {
            data.searchParams.CARRIAGE_ID = $(this).val();
            loadSeats(data.searchParams.TRIP_ID, objs.currTripBtn, $(this).val());
        });

        // CHECK SEAT
        objs.resultContainer.on('click', '.seat-available', function () {
            var obj = $(this);
            var seatId = obj.attr('rel');
            var seatNum = obj.html();
            objs.lockSeats.disable();
            data.searchParams.CARRIAGE_ID = $(this).val();
            for (var i in data.tickets_checked) {
                if (data.tickets_checked[i] && data.tickets_checked[i].sid == seatId) {

                    data.tickets_checked.splice(i, 1);
                    obj.removeClass('seat-reserved');
                    return;
                }
            }

            if (data.tickets_checked.length === parseInt(data.searchParams.TICKETS)) {
                var r = data.tickets_checked.shift();
                obj.closest(params.seatsContainerS).find('.seat-reserved[rel="' + r.sid + '"]').removeClass('seat-reserved');
            }

            var s = {sid: seatId, snum: seatNum}
            data.tickets_checked.push(s);
            obj.addClass('seat-reserved');

            if (data.tickets_checked.length == parseInt(data.searchParams.TICKETS)) {
                objs.lockSeats.enable();
            }
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
            post_params.TICKETS_CHECKED = data.tickets_checked;
            post_params.TRIP = data.trips[data.searchParams.TRIP_ID];
            post_params = $.extend(data.searchParams, post_params);
            post_params.action = 'lockSeats';
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
            post.action = 'ticketsBooking';
            post.url1 = 'http://e-travels.com.ua/orderSuccess.php';

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
                var form = $('<form action="https://ecommerce.liqpay.com/ecommerce/CheckOutPagen" method="post" /></form>');

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

        // BOOKING FORM
        objs.resultContainer.on('click', '.booking_order', function () {
            if ($(this).disabled()) {
                return false;
            }
            var obj = $(this);
            var p = obj.parent();
            contentLoader(p);
            var form = $('form[name=order_data]');
            var post = $.extend(data.searchParams, {'order_data': form.serialize()});
            post.action = 'reserveTickets';
            post.url1 = 'http://e-travels.com.ua/orderSuccess.php?r=1';
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


        objs.firstCountry.change();
        objs.secondCountry.change();
        objs.tickets.change();
        // objs.roundTrip.change();
    }
})(jQuery);