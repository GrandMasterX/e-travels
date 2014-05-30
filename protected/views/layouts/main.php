<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <!-- Latest compiled and minified CSS -->
        <!--<link rel="stylesheet" href="/static/css/bootstrap.min.css">

         Optional theme
        <link rel="stylesheet" href="/static/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="/static/css/datepicker.css">
        <script src="/static/js/jquery.js"></script>
        <!-- Latest compiled and minified JavaScript
        <script src="/static/js/bootstrap.min.js"></script>
        <script src="/static/js/mobile/form.js"></script>
        <script src="/static/js/bootstrap-datepicker.js"></script>-->
        <link rel="stylesheet" type="text/css" href="/static/css/form/form.css"/>
        <link rel="stylesheet" type="text/css" href="/static/css/jquery.editable-select.css"/>
        <link rel="stylesheet" type="text/css" href="/static/css/jquery-ui.css"/>
        <link rel="stylesheet" type="text/css" href="/static/css/style.css"/>
        <link rel="stylesheet" type="text/css" href="/static/css/header_footer.css"/>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.js"></script>
        <script type="text/javascript" src="/static/js/date.js"></script>
        <script type="text/javascript" src="/static/js/jquery.maskedinput.min.js"></script>
        <script type="text/javascript" src="/static/js/ui.datepicker-ru.js"></script>
        <script type="text/javascript" src="/static/js/form_all.js?<?= mt_rand(1, 22222); ?>"></script>
        <script type="text/javascript" src="/static/js/newformscripts.js"></script>
        <script type="text/javascript" src="/static/js/header.js"></script>
        <script type="text/javascript" src="/static/js/wSelect.js"></script>
    </head>
    <body>
        <?php $this->renderPartial('/layouts/social');?>
        <div class="main">
            <?php $this->renderPartial('/layouts/header');?>
            <? echo $content;?>
            <?php $this->renderPartial('/layouts/footer');?>
        </div>
    </body>


</html>