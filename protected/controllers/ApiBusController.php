<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 27.05.14
 * Time: 17:28
 */

class ApiBusController extends ApiController {
    public function actionGetData() {
        $remoteUser =  $_SERVER["SERVER_NAME"].$_SERVER["PHP_SELF"];
        $transportActive = 'active';
        session_start();

        if (!empty($_POST)) {
            $x = $this->actionGetRemoteData('http://api.e-travels.com.ua/apio/'.$_POST['action'].'.php?type=get_bus_dates&res=et_international_new2', $_POST);
            $x = str_replace('/images/', '/images/form/', $x[1]);
            echo $x;
            die;
        }
        $form = $this->actionGetRemoteDatagetRemoteData('api.e-travels.com.ua/apio/getForm.php?type=get_bus_dates&res=et_international_new2');
        $form = $x[1] = str_replace('/images/', '/images/form/', $form[1]);
        echo $form;
    }
} 