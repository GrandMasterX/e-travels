<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 03.06.14
 * Time: 11:40
 */

class CityController extends Controller{

    public function actionIndex() {
        $model = Content::model()->findAll();

        $this->render('index',array('model'=>$model));
    }

    public function actionAdd() {
        $model = new Content();
        $this->render('add',array('model' => $model));
    }

    public function actionUpdate() {

    }

    public function actionEdit($id) {
        $model = Content::model()->findByPk($id);
        $this->render('edit',array('model' => $model));
    }

    public function actionDelete($id) {
        $model=MyModel::model()->findByPk($id);
        $model->delete();
        $this->actionIndex();
    }
} 