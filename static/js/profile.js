$(document).ready(function ()
{
    var $travelDocument = $('.box-travel-document'),
        $travelFields = $(':input.contact-travel-document'),
        $saveTravelDocument = $(':input.travel-document-checkbox'),

        $doesNotExpire = $(':input.doesnotexpirecbx'),
        $expirationDate = $('.traveldocumentexpirationdate');

    if ($saveTravelDocument.length && $travelDocument.length)
    {
        if ($saveTravelDocument.prop('checked'))
        {
            toggleFields(true);
        } else
        {
            toggleFields(false);
        }

        $travelDocument.find('label:not(:last)').append('<sup>*</sup>');
        $travelFields.attrToData();

        $saveTravelDocument.click(function ()
        {
            if ($saveTravelDocument.prop('checked'))
            {
                toggleFields(true);
            } else
            {
                toggleFields(false);
            }

            $travelFields.attrToData();
        });

        $doesNotExpire.click(function ()
        {
            if (this.checked)
            {
                $expirationDate.attr('disabled', 'disabled').val('');
            } else
            {
                $expirationDate.removeAttr('disabled');
            }
        });
    }

    function toggleFields(state)
    {
        if (state)
        {
            $travelDocument.find(':input').not($doesNotExpire).attr('data-validation-required', 'true');
            $travelFields.removeAttr('disabled');
            $doesNotExpire.parent().removeClass('input-disabled input-checked');

            if (!Modernizr.touch)
                $travelFields.filter('select').selectmenu('enable');
        } else
        {
            $travelFields.attr('disabled', 'disabled').removeAttr('data-validation-required').removeClass('error');
            $doesNotExpire.removeAttr('checked').parent().addClass('input-disabled').removeClass('input-checked');

            if (!Modernizr.touch)
                $travelFields.filter('select').selectmenu('disable');
        }
    }

    /* Newsletter tracking */
    var $continueButton = $('.box-form.box-personalinfo').find('button[type="submit"]'),
        $newsletterCheckbox = $('input:checkbox[id$="SubscribeToNewsLetter"]'),
        isSubscribed = $('.box-registration').length ? false : $newsletterCheckbox.is(':checked'),
        valid = false;

    $continueButton.click(function (event)
    {
        event.preventDefault();
        valid = $('body').wizzValidation('execute', $continueButton.attr('data-validation-group'));

        if (valid)
        {
            var value = $('.box-registration').length ? 'Register' : 'Profile',
                hasSubscribed = $newsletterCheckbox.is(':checked');

            if (isSubscribed != hasSubscribed)
            {
                if (!isSubscribed && hasSubscribed)
                {
                    wizzDesign.pushTrackEvent.track('Newsletter', 'Subscribe', value);
                } else if (isSubscribed && !hasSubscribed)
                {
                    wizzDesign.pushTrackEvent.track('Newsletter', 'Unsubscribe', value);
                }
            }
        }
    });

    if ($('.box-modal-newsletter').length)
    {
        wizzDesign.wizzModal.open('newsletter');
    }
});

$(window).load(function ()
{
    $expirationDate = $('.traveldocumentexpirationdate');

    if ($expirationDate.length)
    {
        $expirationDate.datepicker('option', 'minDate', new Date());
    }
});