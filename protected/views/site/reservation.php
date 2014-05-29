<div class="wrapper pad1">
<div style="clear:both"></div>
<div class="new_form" id="new_form">
<style>

    #reservation_form td {
        padding: 5px;
    }

    .info_date_to_pay {
        text-align: center;
        font-weight: bold;
        font-size: 15px;
    }
    .msgb{
        color: #175409;
        font-size: 15px;
    }
    .info_total_pay span {
        font-weight: bold;
    }
    ol li a {color:#0075A6;}
</style>


<div class="order_block">
<div class="order_header">
    <div class="order_hf_content">Выкуп забронированных билетов</div>
</div>
<div class="order_separator_top"></div>
<div style="padding: 25px 13px;">
    <div class="info_date_to_pay">
        <span style="color:#780C0C;">Обратите внимание</span> на срок выкупа, указанный в листе бронирования <br />Оплата должна быть произведена до этого времени
    </div>
    <div style="margin-top:30px;margin-bottom:10px;font-size:14px;">
        <b class="msgb">Обязательно скачивайте лист бронирования!
        </b>
        <br />
        (Смотрите данные бронировки ниже)
        <br /><br />
        <b>Варианты оплаты:</b>
        <ol start="1" style="margin-top:10px;margin-bottom:10px;margin-left:30px;">
            <li>Банковской платежной картой <a href="#payvisa">онлайн оплата &gt;</a></li>

            <li>В Киевском офисе компании</li>
            <li>Через платежные терминалы - bnk.ua</li>
            <li>Через банки на территории Украины</li>


        </ol>
        <b>Для справок: <img src="/static/images/tels.png" alt="" />. Режим работы: Понедельник-Пятница с 9:00 до 19:00.</b>
    </div>
</div>
<div class="order_separator_top"></div>
<div class="order_body">



    <div class="order_content">
        <a name="payvisa"></a><b>Модуль поиска забронированных билетов</b><br /><br />
        <form method="get">
            <table id="reservation_form" cellpadding=5 cellspacing=5>
                <tr>
                    <td>Номер Вашего бронирования:</td>
                    <td>
                        <input type="text" value="<?=$_GET['tn']?>" <? if (!empty($_GET) && empty($_GET['tn'])) { ?>style="border:1px red solid;"<? } ?> name="tn" class="ac-autocomplete-input" id="reservation_id">
                    </td>
                </tr>
                <tr>
                    <td>Дата отправления:</td>
                    <td>
                        <input type="text" value="<?=$_GET['start_date'] ?>" <? if(!empty($_GET) && empty($_GET['start_date'])) {?>style="border:1px red solid;"<? } ?> name="start_date" class="ac-autocomplete-input datepicker" id="start_date">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" target="_blank" class="btn" style=" border:1px solid transparent; border-radius:3px; height:35px;  font-size: 15px;" value="Поиск"/>
                    </td>

                </tr>
            </table>
        </form>
    </div>
</div>

<? if (!empty($data['reservs'])) { ?>
    <div class="order_separator_top"></div>
    <div class="info_date_to_pay">Выкупить до <?=$data['date_to_pay']?>
        <br />
        <br />

        <a class="btn" style="color: white; display: block; height: auto; width: 250px; margin: 15px auto 30px; padding: 10px;" target="_blank" href="/users/getTicket?on=<?= $data['reservs'][0]['ORDER_NUMBER'] ?>">Скачать Лист Бронирования</a>
    </div>

    <?
    foreach ($data['reservs'] as $res) {
        ?>

        <div style="font-size: 13px;">
            <table width=100%>
                <tr>
                    <td colspan="2" width=50%><strong style="font-size:17px;">Бронирование №<?=$res['TICKET_NUMBER']?></strong></td>
                    <td colspan="2"></td>
                </tr>

                <tr>
                    <td width=175><strong>Имя:</strong></td>
                    <td><?=$res['PASSENGER_FIRST_NAME']?></td>
                    <td width=175><strong>Фамилия:</strong></td>
                    <td><?=$res['PASSENGER_LAST_NAME']?></td>
                </tr>
                <tr>
                    <td><strong>Телефон:</strong></td>
                    <td><?=$res['PASSENGER_PHONE']?></td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <td><strong>Номер рейса:</strong></td>
                    <td><?=$res['TRIP_NUMBER']?></td>
                    <td><strong>Место:</strong></td>
                    <td><?=$res['NUMBER_SEAT']?></td>
                </tr>

                <tr>
                    <td><strong>Место отпавления:</strong></td>
                    <td><?=$res['START_CITY']?>, <?=$res['STATION_NAME']?> (<?=$res['STATION_ADDRESS']?>)</td>
                    <td><strong>Дата отправления:</strong></td>
                    <td><?=$res['START_DATE']?> <?=$res['START_TIME']?></td>
                </tr>

                <tr>
                    <td><strong>Место прибытия:</strong></td>
                    <td><?=$res['END_CITY']?></td>
                    <td><strong>Дата прибытия:</strong></td>
                    <td><?=$res['END_DATE']?> <?=$res['END_TIME']?></td>
                </tr>

                <tr>
                    <td><strong>Стоимость:</strong></td>
                    <td><?=$res['TOTAL_AMOUNT']?></td>
                    <td></td>
                    <td></td>
                </tr>

            </table>
        </div>
        <div class="order_separator_top"></div>
    <? } ?>
    <div class="info_total_pay">
        <form action="https://ecommerce.liqpay.com/ecommerce/CheckOutPagen" method="post">
            Сумма к оплате: <span><?=$data['pay']?></span>

            <?foreach ($data['pbank'] as $k => $v) {?>

                <input type="hidden" name="<?=$k?>" value="<?=$v?>">
            <? } ?>



            <div style="clear:both;margin-top:10px"></div>
            <div style="margin:0 auto;width:500px">
                <input type="submit" target="_blank" class="btn" style="float:left; width:230px;position:relative;" value="Оплатить Visa / MasterCard">
                <input type="button" target="_blank" class="btn morepvays" style="float:left;margin-left:10px;position:relative; width:230px;" value="Другие способы оплаты">
            </div>
            <div style="clear:both;margin-bottom:10px"></div>



        </form>
        <div style="margin: 0 auto 10px;width: 518px;display:none;" class="hidden-pways">
            <table width="500" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                    <td width="100" valign="bottom" align="center">
                        <span style="color:#0075a6" class="kassa_pay">В офисах и агентствах</span>
                    </td>
                    <td width="50">
                    </td>
                    <td width="100" valign="bottom" align="center">
                        <span style="color:#0075a6" class="office_pay">Купить в офисе</span>
                    </td>
                    <td width="50">
                    </td>
                    <td width="100" valign="bottom" align="center">
                        <span style="color:#0075a6" class="terminal_pay">Платежные терминалы</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>

<? } ?>

<div class="order_separator_bottom"></div>
<div class="order_footer"></div>

    <div>

        <p>&nbsp;</p>
        <p><img src="/static/images/contacts.png" align="right"></p>
        <h2>Оплата билетов банковской картой</h2>
        <p>Оплатить билеты на сайте с помощью платежной карты Visa или
            Mastercard (любого банка) вы сможете онлайн, а также выкупить позже (по условиям бронирования
            в срок) либо
            воспользоваться другими способами оплаты, например, банковским платежом на счет,
            в платежных терминалах либо в центральном офисе.</p>
        <p>Для оплаты банковской картой необходима пластиковая платежная карта и
            достаточная сумма на счету. Комиссия банка не взымается.</p>
        <p>Важно: после оплаты билета на сайте, Вам обязательно необходимо распечатать
            документ автоматически отправленный на указанный Вами адрес электронной почты.</p>
        <p>Дополнительно, Вам могут позвонить из службы поддержки и предупредить о
            необходимости получить дополнительный авиабилет.</p>
        <p>Если у Вас возникнут финансовые вопросы о возврате средств или оплате, то
            служба поддержки с удовольствием проконсультирует Вас об условиях.</p>
        <p><img border="0" src="/static/images/contacts-e.png" width="354" height="309" align="right"></p>
        <p>Вы можете позвонить в службу поддержки компании и задать любые
            вопросы касающиеся наиболее удобного способа оплаты, но по вопросам банковских
            услуг, и непроведенных платежей, Вам необходимо обращаться в свой банк.</p>
        <p>Виды платежных карт которые дают возможность производить платежи в Интернет: Visa Classic, Visa Gold, Visa Internet; MasterCard Standard, MasterCard Mass,
            MasterCard Gold.</p>
        <h3>Инструкция по оплате банковской картой</h3>
        <p>После нажатия на кнопку &quot;Купить&quot; откроется страница банка - &quot;эквайринг&quot;.
            Указывайте данные своей платежной карты, которые необходимо внести на этой
            странице для проведения платежа.<br>
            Указываются следующие данные: полный номер карты и дата окончания действия, также необходимо
            указывать CVV/CVС2 код. Этот код, из трех цифр указан на обратной стороне карты,
            в рамочке.</p>
        <p>Нажимаете на кнопку &quot;Оплатить&quot;.</p>
        <p>Дождитесь сообщения о результате проведения платежа.</p>
        <p>Если оплата произведена с ошибкой - проверьте списание средств со своего
            счета, и можете перезвонить либо в Банк - если сумма не списана, либо в контакт
            центр компании, если деньги были списаны.</p>
        <p>&nbsp;</p>
        <h3>Конфиденциальность информации</h3>
        <p>Важно: сайт не получает данные Ваших кредитных карт, а в случае оплаты в
            онлайн режиме на сайте, данные обрабатываются непосредственно банком (на
            странице сайта, в режиме шифрования данных).</p>
        <p>Обработку персональных данных (ФИО, тел., паспорт и др.) проводит компания по
            условиям указанным на сайте (возле кнопки купить), с которыми Вам обязательно
            необходимо согласится.</p>
        <p>&nbsp;</p>
        <h3>Условия возврата средств</h3>
        <p>Возврат оплаченных средств за билет проводится согласно правил применяемого
            тарифа и правил перевозчика.</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>

    </div>

</div>



</div>

<div style="clear:both"></div>


</div>

