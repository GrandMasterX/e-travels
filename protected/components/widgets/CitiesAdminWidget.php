<?php
class CitiesAdminWidget extends CWidget
{
    public function init()
    {
        parent::init();
    }

    public function run()
    {
        echo $this->renderBlock();
    }

    protected function renderBlock()
    {
        $model = Content::model()->findAll();
        return $this->render('admin/cities', array('model'=>$model), true);
    }



}