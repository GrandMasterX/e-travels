$(document).ready(function() {

    function initDatepicker() {
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

        var checkin = $('#start_date').datepicker({
            onRender: function(date) {
                return date.valueOf() < now.valueOf() ? 'disabled' : '';
            },
            format: 'mm.dd.yyyy'
        }).on('changeDate', function(ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date)
                newDate.setDate(newDate.getDate() + 1);
                checkout.setValue(newDate);
            }
            checkin.hide();
            $('#end_date')[0].focus();
        }).data('datepicker');
        var checkout = $('#end_date').datepicker({
            onRender: function(date) {
                return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            },
            format: 'mm.dd.yyyy'
        }).on('changeDate', function(ev) {
            checkout.hide();
        }).data('datepicker');
    };

    initDatepicker();

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
        for (i=0;i<str.length;i++) {
            newStr += ((arrReplace[str[i]]) ? arrReplace[str[i]] : str[i]);
        }
        return newStr;
    }

    $( "#search,#search2" ).on('keyup', function(e) {
        var keycode = e.keyCode,
            chars = $(this).val(),
            str_length = chars.length,
            request = {},
            placeholder = $(this).attr('placeholder'),
            $search = $(this).attr('id'),
            $dropdown = $('.dropdown-menu.'+placeholder);

        if(str_length>2 && ( keycode > 64 && keycode < 91 || keycode == 8)) {
            lang = $('input#formlang').val();
            if(lang != 'en') {
                request.term = correctStr(chars);
            }
            request = $.extend(request, {lang:lang});
            $.ajax({
                type: "POST",
                url:"/site/getCities",
                data: request,
                dataType: 'json',
                success: function(response){
                    $dropdown.html('');
                    if(response) {
                        $dropdown.append(response).show();
                        $dropdown.find('a').on('click', function(e){
                            e.preventDefault();
                            $('#'+$search).val($(this).text());
                            $dropdown.hide();
                        });
                    }
                }
            });
        } else {
            $dropdown.hide();
        }
    });


})
