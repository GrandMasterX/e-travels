<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="/static/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="/static/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="/static/css/datepicker.css">
    <script src="/static/js/jquery.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="/static/js/bootstrap.min.js"></script>
    <script src="/static/js/mobile/form.js"></script>
    <script src="/static/js/bootstrap-datepicker.js"></script>
    <script src="/static/js/profile_datepicker.js"></script>
</head>

<body>
<input type="hidden" id="formlang" value="ru">
    <?php $this->widget('widgets.HeaderAdminWidget'); ?>
    <div class="container-fluid" style="margin-top:50px;">
        <div class="row-fluid">
            <div class="span3">
            </div>
            <div class="span9">
                <? echo $content;?>
            </div>
        </div>
    </div>
</body>


</html>