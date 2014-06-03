<?  if(!empty($model)) {
        echo $model->description;
    }
?>

<div class="new_form" id="new_form">
    <? echo $form ;?>
</div>
<div style="clear:both"></div>
<div class="wrapper pad1">
    <div class="srcBlock">
    </div>
    <?  if(!empty($model)) {
            echo $model->content;
        }
    ?>
</div>