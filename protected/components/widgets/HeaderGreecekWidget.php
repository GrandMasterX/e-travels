<?php
class HeaderGreecekWidget extends CWidget
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
        return $this->render('greece', array(), true);
    }



}