<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 27.05.14
 * Time: 17:35
 */

class ApiController extends Controller {
    /**
     * Created by JetBrains PhpStorm.
     * User: bahul
     * Date: 18.03.13
     * Time: 18:58
     * To change this template use File | Settings | File Templates.
     */

    public function actionGetRemoteData($url, $params = array()) {



        if (!is_array($params)) $params = array();

        $ch = curl_init($url);
        $sparams = http_build_query($params);
        $_SESSION['sid'] = $_SESSION['sid'] ? $_SESSION['sid'] : '';
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 2);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $sparams);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 GTB5');
        curl_setopt($ch, CURLOPT_COOKIE, 'PHPSESSID=' . $_SESSION['sid'] . ';');
        $data = curl_exec($ch);
        /*print_r(curl_getinfo($ch));
        print_r(curl_error($ch));*/
        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);
        // print_r($data);
        $r = preg_match('#PHPSESSID=([^;]+);#Umis', $data, $m);

        if ($r)
            $_SESSION['sid'] = $m[1];

        $r = preg_match('#Content-Type: ([^;]+);#Umis', $data, $m);

        $ct = $m[1];

        return array($ct, substr($data, $header_size));
    }


    function hexbin($d)
    {
        $data = '';
        $len = strlen($d);
        for ($i = 0; $i < $len; $i += 2) {
            $data .= chr(hexdec(substr($d, $i, 2)));
        }
        return $data;
    }

    function confirm_buy($merchant_password, $merchant_id, $post)
    {
        if ($post['reasoncode'] != 1 || $post['responsecode'] != 1) {
            return false;
        }

        $m_id = $merchant_id;
        $m_sig = $merchant_password;

        $signature = base64_encode(hexbin(sha1(
            $m_sig
            . $m_id
            . $post['acqid']
            . $post['orderid']
            . $post['responsecode']
            . $post['reasoncode']
            . $post['reasoncodedesc']
        )));

        $signature2 = base64_encode(hexbin(sha1(
            $m_sig
            . $post['eci']
            . $post['ip']
            . $post['countryip']
            . $post['countrybin']
            . $post['onus']
            . $post['time']
            . $post['phone']
            . $post['countryphone']
        )));

        if ($post['signature'] !== $signature) {
            return false;
        }

        if ($post['signature2'] !== $signature2) {
            return false;
        }

        return true;
    }


    function pingDomain($domain, $timeout = 1)
    {

        $timeout = $timeout ? $timeout : 1;
        $starttime = microtime(true);
        $file = @fsockopen($domain, 80, $errno, $errstr, $timeout);
        $stoptime = microtime(true);
        $status = 0;

        if (!$file) $status = -1; // Site is down
        else {
            fclose($file);
            $status = ($stoptime - $starttime) * 1000;
            $status = floor($status);
        }
        return $status;
    }
} 