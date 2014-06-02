<?php

class User extends CActiveRecord {

    public  $password_repeat;
    public  $password_check;
    private $password_old;
    private $_id;
    private $_name;
    private $_email;
    private $_model;
    private $fname;
    private $lname;
    private $acc_status;
    private $_isAuthenticated = false;
    private $_state = array();
    public  $unhashed_password;
    public  $auth_role;

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

    public static function setSocialData($social,$user_id) {

        if($user_id) {
            $model = self::model()->findByAttributes(array('id' => $user_id));
            if($model===null) {
                $model = new User();
                $model->name = $social->firstName.' '.$social->lastName;
                $model->gender = $social->gender;
                $model->email = (!empty($social->emailVerified)) ? $social->emailVerified : $social->email;
                $model->birth = $social->birthDay.'.'.$social->birthMonth.'.'.$social->birthYear;
                $model->photo = $social->photoURL;
                $model->language = $social->language;
                $model->save();
                //need to set data;
            } /*else {
                $model->scenario = 'clientUpdateByAdmin';
                $sizemodel = ClientHasSize::model()->findAllByAttributes(array('client_id' => $user_id));
                $sizes = Yii::app()->session['sizeTours'];
                if(empty($sizemodel) || is_null($sizemodel) ) {
                    if(!empty($sizes) || $sizes!='') {
                        $sql = 'insert into client_size (client_id,value,size_id)
                                values  ('.$user_id.','.$sizes[0].','.'10'.'),
                                        ('.$user_id.','.$sizes[1].','.'9'.'),
                                        ('.$user_id.','.$sizes[2].','.'8'.'),
                                        ('.$user_id.','.$sizes[3].','.'7'.');';
                        Yii::app()->db->createCommand($sql)->execute();
                    }
                }
                if($model->completed != 1) {
                    if($social->firstName!='' && $social->lastName!='' && $model->name == '') {
                        $name ='';
                        $name = ($social->firstName.' '.$social->lastName);
                        $model->name = $name;
                    }
                    if($model->gender =='' && $social->gender!='') {
                        $model->gender = $social->gender;
                    }
                    if(empty($model->email) && !empty($social->email)) {
                        $model->email = $social->email;
                    }
                    if($model->birthday =='' && $social->birthDay!='' && $social->birthMonth !='' && $social->birthYear!='') {
                        $bdate = date("d-m-Y", mktime(0, 0, 0, $social->birthMonth, $social->birthDay, $social->birthYear));
                        $model->birthday = $bdate;
                    }
                    if($model->photo == '') {
                        $model->photo =  $social->photoURL;
                    }
                    if(!$model->language) {
                        $model->language = $social->language;
                    }
                    if(!empty($model->gender) && !empty($model->birthday) && !empty($model->name) && !empty($model->photo)) {
                        $model->completed = 1;
                    }
                    //Yii::app()->authManager->assign('client', $user_id);
                    $model->save(false);
                }
            }*/
        } else {
                $model = new User();
                $model->firstName = $social->firstName;
                $model->lastName = $social->lastName;
                //$model->gender = $social->gender;
                $model->email = (!empty($social->emailVerified)) ? $social->emailVerified : $social->email;
                $model->birthdate = $social->birthDay.'.'.$social->birthMonth.'.'.$social->birthYear;
                //$model->photo = $social->photoURL;
                //$model->language = $social->language;
                $model->save();

        }
    }
} 