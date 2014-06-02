<?php
	#AUTOGENERATED BY HYBRIDAUTH 2.1.1-dev INSTALLER - Friday 30th of May 2014 01:20:43 PM

/*!
* HybridAuth
* http://hybridauth.sourceforge.net | http://github.com/hybridauth/hybridauth
* (c) 2009-2012, HybridAuth authors | http://hybridauth.sourceforge.net/licenses.html
*/

// ----------------------------------------------------------------------------------------
//	HybridAuth Config file: http://hybridauth.sourceforge.net/userguide/Configuration.html
// ----------------------------------------------------------------------------------------
$runtimeUrl=Yii::app()->runtimePath;
$debugFile=$runtimeUrl.'/debug_errors.txt';
return 
	array(
		"base_url" => "http://localhost/site/oauth",

		"providers" => array ( 

			"Google" => array ( 
				"enabled" => true,
                "display" => "popup",
                "access_type"     => "online",   // optional
                "approval_prompt" => "auto",     // optional
				"keys"    => array ( "id" => "328492189285-hr507tse7c2bq3ghnqm15338v4dgt82n@developer.gserviceaccount.com", "secret" => "nFuKJD-KCbQ-Pkac_Je7TJzf" )
			),

			"Facebook" => array ( 
				"enabled" => true,
				"keys"    => array ( "id" => "1623182461241115", "secret" => "1ff77a560aa4e83cadcdf05a464851fa" ),
                "scope"   => "email, user_about_me, user_birthday, user_hometown, user_website, offline_access, read_stream, publish_stream, read_friendlists", // you can change the data, that will be asked from user
                "display" => "popup" // <- this one
			),
		),

		// if you want to enable logging, set 'debug_mode' to true  then provide a writable file by the web server on "debug_file"
		"debug_mode" => false,

		"debug_file" => $debugFile,
	);
