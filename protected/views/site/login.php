<?php
$this->pageTitle=Yii::app()->name . ' - Login';
$this->breadcrumbs=array(
    'Login',
);
?>

<h1>Login</h1>

<?php
if (Yii::app()->user->hasFlash('error')) {
    echo '<div class="form"><p class="errorSummary">'.CHtml::encode(Yii::app()->user->getFlash('error')).'</p></div>';
}
?>


<hr/>
<h2>Do you already have an account on one of these sites? Click the logo to log in with it here:</h2>
<?php
$this->widget('ext.eauth.EAuthWidget');
?>

<?php $this->endWidget(); ?>
</div><!-- form -->
