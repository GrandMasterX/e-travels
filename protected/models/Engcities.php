<?php
class Engcities extends CActiveRecord {

    public function tableName()
    {
        return 'cities_en';
    }

    public function rules()
    {
        return array(
            array('id, cid, city, country', 'safe'),
        );
    }
}