$(document).ready(function() {
    $('.leftbtndiv ,.rightbtndiv').on('click', function() {
        if($(this).hasClass('active') == false) {
            $('.leftbtndiv ,.rightbtndiv').toggleClass('active');
            $('.lefttarget,.righttarget').toggleClass('hidden')
        }
    })
})
