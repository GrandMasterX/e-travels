<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
Yii::setPathOfAlias('modules', dirname(__FILE__).'/../modules');
Yii::setPathOfAlias('widgets', dirname(__FILE__).'/../components/widgets');
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
        'ext.eoauth.*',
        'ext.eoauth.lib.*',
        'ext.lightopenid.*',
        'ext.eauth.services.*',
	),
    'modules' => array(
        'mobile',
        'privatoffice',
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
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'urlManager'=>array(
			'urlFormat'=>'path',
            'showScriptName'=>false,
			'rules'=>array(
                //'mobile'=>'mobile/default/index',
                '' => 'site/index',
                'login/<service:(google|google-oauth|yandex|yandex-oauth|twitter|linkedin|vkontakte|facebook|steam|yahoo|mailru|moikrug|github|live|odnoklassniki)>' => 'site/login',
                'login' => 'site/login',
                'logout' => 'site/logout',
                'contacts' => 'site/contacts',
                'register' => 'site/register',
                'reservation' => 'site/reservation',
                'mobile' => 'mobile/default/index',
                'privatoffice' => 'privatoffice/default/index',
                '<alias>' => 'site/content',
                '<controller>/<action>'=>'<controller>/<action>',
			),
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
        'cache' => array(
            //'class' => 'CApcCache',
            'class' => 'CFileCache',
        ),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	//'params'=>require(dirname(__FILE__).'/params.php'),
);