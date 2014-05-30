<?php

class Profile extends CFormModel {

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'users';
    }

    public function rules()
    {
        return array(
            // username and password are required
            array('firstName, lastName, birthdate, passport, psprt_date, citizenship, phone, email', 'required'),
            array('firstName, lastName, citizenship, passport', 'filter', '/[^A-Za-z0-9]/'),
            array('email','email'),
            array('phone', 'filter', '/[0-9]/'),
            array('id, firstName, lastName, birthdate, passport, psprt_date, citizenship, phone, email', 'safe')
        );
    }

    /**
     * Declares attribute labels.
     */
    public function attributeLabels()
    {
        return array(
            //'rememberMe'=>'Remember me next time',
        );
    }

} 