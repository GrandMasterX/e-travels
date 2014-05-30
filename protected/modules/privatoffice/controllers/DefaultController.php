<?
class DefaultController extends Controller {

    public $layout = '/layouts/profile';

    public function actionIndex() {
        $model = new Profile();

        if(isset($_POST['ajax']) && $_POST['ajax']==='profile-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }


        $this->render('index', array('model'=>$model));
    }
}