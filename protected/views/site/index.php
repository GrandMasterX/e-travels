

<?php
   /* if (Yii::app()->user->hasFlash('error')) {
        echo '<div class="error">'.Yii::app()->user->getFlash('error').'</div>';
    }
    ?>
    ...
    <h2>Do you already have an account on one of these sites? Click the logo to log in with it here:</h2>
    <?php
    $this->widget('ext.eauth.EAuthWidget', array('action' => 'site/login'));*/
?>
<?  if($model) {
        echo $model->description;
    }
?>
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
