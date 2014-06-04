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
        if($model->getIsNewRecord() && $_POST['Content']) {
            $model->attributes = $_POST['Content'];
            if($model->validate())
                $model->save();
            $this->actionIndex();
        }

        $this->render('add',array('model' => $model));
    }

    public function actionEdit($id) {
        $model = Content::model()->findByPk($id);
        if(isset($_POST['Content'])) {
            $model->attributes = $_POST['Content'];
            $model->update();
            $this->render('index',array('model'=>$model));
        }
        $this->render('edit',array('model' => $model));
    }

    public function actionDelete($id) {
        $model= Content::model()->findByPk($id);
        $model->delete();
        $this->actionIndex();
    }

    public function actionBlocked($id,$is_blocked) {
        $model= Content::model()->findByPk($id);
        $model->is_blocked = !$is_blocked;
        $model->save();
        $this->actionIndex();
    }

    public function actionAvailable($id,$available) {
        $model= Content::model()->findByPk($id);
        $model->available = !$available;
        $model->save();
        $this->actionIndex();
    }
} 