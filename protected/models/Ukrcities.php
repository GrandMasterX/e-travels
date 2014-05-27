<?php
class Urkcities extends CActiveRecord {

    public function tableName()
    {
        return 'cities_ua';
    }

    public function rules()
    {
        return array(
            array('id, cid, city, country', 'safe'),
        );
    }
}