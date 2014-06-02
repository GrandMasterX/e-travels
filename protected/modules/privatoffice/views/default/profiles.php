<div class="form">
    <? $form = $this->beginWidget('CActiveForm',
            array(
                'id' => 'profile-form',
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
        <?php echo $form->textField($model,'firstName',array('placeholder'=>'first name','class'=>'form-control')); ?>
        <?php echo $form->error($model,'firstName'); ?>
        <?php echo $form->textField($model,'lastName',array('placeholder'=>'last name','class'=>'form-control')); ?>
        <?php echo $form->error($model,'lastName'); ?>
        <?php echo $form->textField($model,'birthdate',array('placeholder'=>'birthdate','class'=>'form-control')); ?>
        <?php echo $form->error($model,'birthdate'); ?>
        <?php echo $form->textField($model,'passport',array('placeholder'=>'passport number','class'=>'form-control')); ?>
        <?php echo $form->error($model,'passport'); ?>
        <?php echo $form->textField($model,'psprt_date',array('placeholder'=>'passport date','class'=>'form-control')); ?>
        <?php echo $form->error($model,'psprt_date'); ?>
        <?php echo $form->textField($model,'email',array('placeholder'=>'email','class'=>'form-control')); ?>
        <?php echo $form->error($model,'email'); ?>
        <?php echo $form->textField($model,'citizenship',array('placeholder'=>'citizenship','class'=>'form-control')); ?>
        <?php echo $form->error($model,'citizenship'); ?>
        <?php echo $form->textField($model,'phone',array('placeholder'=>'phone','class'=>'form-control')); ?>
        <?php echo $form->error($model,'phone'); ?>
    </div>
    <div class="row submit">
        <?php echo CHtml::submitButton('Сохранить',array('class'=>'btn btn-lg btn-primary btn-block')); ?>
    </div>
    <? $this->endWidget(); ?>
</div><!-- form -->