<?php //$this->widget('ext.hoauth.widgets.HOAuth'); ?>

<?  if($model) {
        echo $model->description;
    }
?>
<? echo Yii::app()->user->isGuest;?>
<? var_dump(Yii::app()->user);?>
<div class="new_form" id="new_form">
    <?= $form ;?>
</div>
<div style="clear:both"></div>
<div class="wrapper pad1">
    <div class="srcBlock">
    </div>
    <?  if($model) {
            echo $model->content;
        }
    ?>
</div>
