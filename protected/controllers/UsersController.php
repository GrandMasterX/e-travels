<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 29.05.14
 * Time: 14:03
 */

class UsersController extends Controller{
    public function actionGetTicket() {
        if (!$_GET['oid']) {
            header("HTTP/1.0 404 Not Found");
        }

        $queryString = http_build_query($_GET);
        $x =  getRemoteData('http://api.e-travels.com.ua/ticket.php?'. $queryString.'&type=all');
        header('Content-type:application/pdf ');
        echo $x[1];
    }
} 