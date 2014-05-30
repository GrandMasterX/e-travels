<?php

class User extends CActiveRecord {

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
            array('id, firstName, lastName, email', 'safe'),
        );
    }

    public function findByEmail($email)
    {
        return self::model()->findByAttributes(array('email' => $email));
    }
} 