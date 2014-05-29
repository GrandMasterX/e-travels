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
            array('id, alias, description, content', 'safe'),
        );
    }
}