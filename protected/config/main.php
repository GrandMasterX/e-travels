<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
Yii::setPathOfAlias('modules', dirname(__FILE__).'/../modules');
Yii::setPathOfAlias('widgets', dirname(__FILE__).'/../components/widgets');
Yii::setPathOfAlias('bootstrap', dirname(__FILE__) . '/../extensions/bootstrap');
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Yii Blog Demo',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
    'defaultController' => 'site/index',
	'import'=>array(
		'application.models.*',
		'application.components.*',
        'application.extensions.*',
        'application.vendors',
        'application.modules.mobile',
        'application.modules.privatoffice',
        'application.modules.admin',
        'ext.eoauth.*',
        'ext.eoauth.lib.*',
        'ext.lightopenid.*',
        'ext.eauth.services.*',
        'ext.bootstrap.*',
	),
    'modules' => array(
        'gii'=>array(
            'class'=>'system.gii.GiiModule',
            'password'=>'admin',
            'generatorPaths'=>array(
                'bootstrap.gii',
            ),
            'ipFilters'=>array('127.0.0.1','::1'),
        ),
        'mobile',
        'privatoffice',
        'admin',
    ),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
		// uncomment the following to use a MySQL database
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=e-travels',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
		),
        'bootstrap' => array(
            'class' => 'ext.bootstrap.components.Bootstrap',
            'responsiveCss' => true,
        ),
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
        'authManager'=>array(
            'class'=>'CDbAuthManager',
            'defaultRoles' => array('guest'),
        ),
		'urlManager'=>array(
			'urlFormat'=>'path',
            'showScriptName'=>false,
			'rules'=>array(
                //'mobile'=>'mobile/default/index',
                '' => 'site/index',
                //'/site/oauth?provider=<provider>' => 'site/index',
                //'login/<service:(google|google-oauth|yandex|yandex-oauth|twitter|linkedin|vkontakte|facebook|steam|yahoo|mailru|moikrug|github|live|odnoklassniki)>' => 'site/login',
                'login' => 'site/login',
                'logout' => 'site/logout',
                'contacts' => 'site/contacts',
                'register' => 'site/register',
                'reservation' => 'site/reservation',
                'mobile' => 'mobile/default/index',
                'privatoffice' => 'privatoffice/default/index',
                'privatoffice/profiles' => 'privatoffice/default/profiles',
                'admin'=> 'admin/default/index',
                //'admin/city'=> 'admin/city/index',
                //'admin/cities/add'=> 'admin/cities/add',
                '<alias>' => 'site/content',
                '<controller>/<action>'=>'<controller>/<action>',
                '<controller:\w+>/<id:\d+>'=>'<controller>/view',
                '<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
                '<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
			),
		),
        'cache' => array(
            //'class' => 'CApcCache',
            'class' => 'CFileCache',
        ),
	),
    'params' => array(
        'adminEmail' => 'zgrandmasterz@gmail.com',
        'loginDuration' => 3600 * 24 * 30,
        'minPasswordLength' => 6,
        'address' => 'Moscow',
        'defaultLanguage' => 'Рус',
        'defaultPageSize' => 50,
        'sizeOptions' => array(10, 25, 50, 100, 200, 500, 1000, 3000),
        'currentLanguageTitle' => 'Рус',
    ),
	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	//'params'=>require(dirname(__FILE__).'/params.php'),
);