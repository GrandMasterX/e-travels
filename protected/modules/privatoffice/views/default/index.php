<div class="form">
    <? $form = $this->beginWidget('CActiveForm',
        array(
            'enableClientValidation'=>true,
            'id' => 'profile-form',
            'action'=>$this->createUrl('privatoffice/index'),
            'clientOptions'=>array(
                'validateOnSubmit'=>true,
            ),
        )
    );
    ?>
    <div class="container">
        <?php echo $form->textField($model,'firstName',array('placeholder'=>'first name')); ?>
        <?php echo $form->textField($model,'lastName',array('placeholder'=>'last name')); ?>
        <?php echo $form->textField($model,'birthdate',array('placeholder'=>'birthdate')); ?>
        <?php echo $form->textField($model,'passport',array('placeholder'=>'passport number')); ?>
        <?php echo $form->textField($model,'psprt_date',array('placeholder'=>'passport date')); ?>
        <?php echo $form->textField($model,'email',array('placeholder'=>'email')); ?>
        <?php echo $form->textField($model,'citizenship',array('placeholder'=>'citizenship')); ?>
        <?php echo $form->textField($model,'phone',array('placeholder'=>'phone')); ?>
        <!--<input type="text" id="firstname" class="form-control" placeholder=" " required="">
        <input type="text" id="lastname" class="form-control" placeholder="last name" required="">
        <input type="text" id="birthdate" class="form-control" placeholder="birthdate" required="">
        <input type="text" id="passport" class="form-control" placeholder="passport number" required="">
        <input type="text" id="psprt_date" class="form-control" placeholder="passport date" required="">
        <input type="text" id="quantity" class="form-control" placeholder="quantity" required="">-->
    </div>
    <div class="row submit">
        <?php echo CHtml::submitButton('Сохранить',array('class'=>'btn btn-lg btn-primary btn-block')); ?>
    </div>
    <? $this->endWidget(); ?>
</div><!-- form -->