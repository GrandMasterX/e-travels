<?php

class SiteController extends Bus {

    public $layout = 'main';
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

    public function actionIndex() {
        $form = $this->actionCreateSession();
        $this->render('index', array('form' => $form ));
    }

    public function actionRegister() {
        $this->render('register');
    }

    public function actionContacts() {
        $this->render('contacts');
    }

    public function actionReservation() {
        $this->render('reservation');
    }

    public function actionContent($alias) {
        $model = Content::model()->findByAttributes(array('alias'=>$alias));
        $form = $this->actionCreateSession();
        $this->render('index',array('model'=>$model,'form'=>$form));
    }

    public function actionLogin() {
        $serviceName = Yii::app()->request->getQuery('service');
        if (isset($serviceName)) {
            /** @var $eauth EAuthServiceBase */
            $eauth = Yii::app()->eauth->getIdentity($serviceName);
            $eauth->redirectUrl = Yii::app()->user->returnUrl;
            $eauth->cancelUrl = $this->createAbsoluteUrl('site/login');

            try {
                if ($eauth->authenticate()) {
                    //var_dump($eauth->getIsAuthenticated(), $eauth->getAttributes());
                    $identity = new EAuthUserIdentity($eauth);

                    // successful authentication
                    if ($identity->authenticate()) {
                        Yii::app()->user->login($identity);
                        var_dump($identity->id, $identity->name, Yii::app()->user->id);exit;

                        // special redirect with closing popup window
                        $eauth->redirect();
                    }
                    else {
                        // close popup window and redirect to cancelUrl
                        $eauth->cancel();
                    }
                }

                // Something went wrong, redirect to login page
                $this->redirect(array('site/login'));
            }
            catch (EAuthException $e) {
                // save authentication error to session
                Yii::app()->user->setFlash('error', 'EAuthException: '.$e->getMessage());

                // close popup window and redirect to cancelUrl
                $eauth->redirect($eauth->getCancelUrl());
            }
        }
    }

	/**
	 * This is the action to handle external exceptions.
	 */

    public function actionGetCities() {
        $results = Yii::app()->db->createCommand()
            ->select('id, cid, country, city')
            ->from('cities_ru')
            ->where(array('or', 'city like '."'".$_POST['term'].'%'."'", 'country like '."'".$_POST['term'].'%'."'"))
            ->order('city asc')
            ->queryAll();
        foreach($results as $res) {
            if($res['country']!='')
                $data[] = array('label' => ($res['city'].', '. $res['country']), 'id' => $res['cid']);
            else
                $data[0] = array('label' => $res['city'], 'id' => $res['cid']);
        }

        $tpl = $this->renderPartial('list', array(
            'data' => $data,
        ), true);

        echo json_encode($tpl);
    }

	public function actionError()
	{
	    if($error=Yii::app()->errorHandler->error)
	    {
	    	if(Yii::app()->request->isAjaxRequest)
	    		echo $error['message'];
	    	else
	        	$this->render('error', $error);
	    }
	}

}
