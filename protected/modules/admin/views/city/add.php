<div class="form">
    <? $form = $this->beginWidget('CActiveForm',
        array(
            'id' => 'city-form',
            'enableClientValidation'=>true,
            'enableAjaxValidation'=>true,
            'action'=>$this->createUrl('/'),
            'clientOptions'=>array(
                'validateOnSubmit'=>true,
                'afterValidate'=>'js:$.yii.fix.ajaxSubmit.afterValidate'
            ),
        )
    );
    ?>
    <div class="container">
        <?php echo $form->textField($model,'name',array('placeholder'=>'name','class'=>'form-control')); ?>
        <?php echo $form->error($model,'name'); ?>
        <?php echo $form->textField($model,'alias',array('placeholder'=>'alias','class'=>'form-control')); ?>
        <?php echo $form->error($model,'alias'); ?>
        <?php echo $form->textField($model,'description',array('placeholder'=>'description','class'=>'form-control')); ?>
        <?php echo $form->error($model,'description'); ?>
        <?php echo $form->textField($model,'content',array('placeholder'=>'content','class'=>'form-control')); ?>
        <?php echo $form->error($model,'content'); ?>
    </div>
    <div class="row submit">
        <?php echo CHtml::submitButton('Сохранить',array('class'=>'btn btn-lg btn-primary btn-block')); ?>
    </div>
    <? $this->endWidget(); ?>
</div><!-- form -->