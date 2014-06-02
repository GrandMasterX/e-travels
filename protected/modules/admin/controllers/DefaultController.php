<?
class DefaultController extends Controller {

    public $layout = '/layouts/main';

    public function actionIndex() {
        $this->render('index');
    }



    public function actionCities() {

        $search = new Content();
        $search->unsetAttributes();
        if (!is_null(Yii::app()->request->getQuery('Content')))
            $search->attributes = Yii::app()->request->getQuery('Content');

        $criteria = new CDbCriteria;
        $criteria->compare('t.alias', $search->alias, true);
        $criteria->compare('t.description', $search->description, true);
        $criteria->compare('t.content', $search->content, true);
        $criteria->compare('t.is_blocked', array('0' => 0, '1' => 1));
        $criteria->compare('t.available', array('1' => 1));

        $dataProvider = new ActiveDataProvider('Content', array(
            'criteria' => $criteria,
            'sort' => array(
                'defaultOrder' => array('alias' => true),
                'sortVar' => 'sort',
            ),
            'pagination' => array(
                'pageVar' => 'page',
                'pageSize' => Yii::app()->params['defaultPageSize'],
            ),
        ));

        $this->render('cities',array(
            'dataProvider' => $dataProvider,
            'search' => $search,
        ));
    }
}