<?php
class Rucities extends CActiveRecord {

    public function tableName()
    {
        return 'cities_ru';
    }

    public function rules()
    {
        return array(
            array('id, cid, city, country', 'safe'),
        );
    }
}