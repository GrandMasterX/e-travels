$(document).ready(function() {

    function initDatepicker() {
        var birth_date = $('#birthdate').datepicker({
                format: 'mm.dd.yyyy'
            }).on('changeDate', function(ev) {
                birth_date.hide();
            }).data('datepicker'),

            passport_date = $('#psprt_date').datepicker({
                format: 'mm.dd.yyyy'
            }).on('changeDate', function(ev) {
                passport_date.hide();
            }).data('datepicker');
    }
});