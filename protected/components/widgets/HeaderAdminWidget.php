<?php
class HeaderAdminWidget extends CWidget
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
        return $this->render('admin/header', array(), true);
    }



}