<?php

class Profileform extends CFormModel {

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
            array('passport', 'match', 'pattern'=>'/[A-Za-z0-9]/','message'=>"The passport data isn't correct"),
            array('firstName, lastName, citizenship', 'match', 'pattern'=>'/[A-Za-z]/','message'=>"Only characters from A to Z and a to z"),
            array('email','email', 'message'=>"The email isn't correct"),
            array('email','unique', 'message'=>"This email is already in use"),
            array('phone', 'match', 'pattern'=>'/[0-9]/'),
            array('id, firstName, lastName, birthdate, passport, psprt_date, citizenship, phone, email', 'safe'),
        );
    }

} 