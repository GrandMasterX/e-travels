<?
class DefaultController extends Controller {

    public $layout = '/layouts/profile';

    public function actionIndex() {
        $this->render('index');
    }

    public function actionProfiles() {
        $model = new Profile();

        if(isset($_POST['Profile']) && !empty($_POST['Profile'])) {

            $model->attributes = $_POST['Profile'];
            if($model->validate() && $model->save())
                Yii::app()->user->setFlash('success', "Data saved!");
        }

        $this->render('profiles', array('model'=>$model));
    }
}