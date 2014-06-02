<?php

// change the following paths if necessary
$yii=dirname(__FILE__).'/framework/yiilite.php';
$config=dirname(__FILE__).'/protected/config/main.php';

// remove the following line when in production mode
// defined('YII_DEBUG') or define('YII_DEBUG',true);
define('YII_DEBUG',true);

if(defined('YII_DEBUG'))
{
    ini_set('display_errors', true);
    error_reporting(E_ALL);
}
else
{
    ini_set('display_errors', false);
    error_reporting(0);
}
require_once($yii);
Yii::createWebApplication($config)->run();
