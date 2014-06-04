<?php
class Content extends CActiveRecord {

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'content';
    }

    public function rules()
    {
        return array(
            array('name, alias, description, content','required'),
            array('id, name, alias, description, content, is_blocked, vailable', 'safe'),
        );
    }
}