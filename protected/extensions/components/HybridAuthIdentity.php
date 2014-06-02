<?
class HybridAuthIdentity extends CUserIdentity
{
const VERSION = '2.1.2';

/**
*
* @var Hybrid_Auth
*/
public $hybridAuth;

/**
*
* @var Hybrid_Provider_Adapter
*/
public $adapter;

/**
*
* @var Hybrid_User_Profile
*/
public $userProfile;

public $allowedProviders = array('google', 'facebook');

protected $config;

function __construct() {
    $path = Yii::getPathOfAlias('ext.hoauth');
    require_once $path . '/hybridauth/Hybrid/Auth.php';  //path to the Auth php file within HybridAuth folder

    $this->config = array(
    "base_url" => "/site/socialLogin",

    "providers" => array(
        "Google" => array(
            "enabled" => true,
            "keys" => array(
                "id" => "google client id",
                "secret" => "google secret",
            ),
            "scope" => "https://www.googleapis.com/auth/userinfo.profile " . "https://www.googleapis.com/auth/userinfo.email",
            "access_type" => "online",
        ),
        "Facebook" => array (
            "enabled" => true,
            "keys" => array (
                "id" => "facebook client id",
                "secret" => "facebook secret",
            ),
            "scope" => "email"
        ),
        "Live" => array (
            "enabled" => true,
            "keys" => array (
                "id" => "windows client id",
                "secret" => "Windows Live secret",
            ),
            "scope" => "email"
        ),
        "Yahoo" => array(
            "enabled" => true,
            "keys" => array (
                "key" => "yahoo client id",
                "secret" => "yahoo secret",
            ),
        ),
        "LinkedIn" => array(
            "enabled" => true,
            "keys" => array (
                "key" => "linkedin client id",
                "secret" => "linkedin secret",
            ),
        ),
    ),

    "debug_mode" => false,

    // to enable logging, set 'debug_mode' to true, then provide here a path of a writable file
    "debug_file" => "",
    );

    $this->hybridAuth = new Hybrid_Auth($this->config);
}

/**
*
* @param string $provider
* @return bool
*/
    public function validateProviderName($provider) {
        if (!is_string($provider))
            return false;
        if (!in_array($provider, $this->allowedProviders))
            return false;

        return true;
    }

    private function login()
    {
        $this->username = $this->userProfile->email;  //CUserIdentity
        Yii::app()->user->login($this, 0);
    }

    public function authenticate()
    {
        return true;
    }

}