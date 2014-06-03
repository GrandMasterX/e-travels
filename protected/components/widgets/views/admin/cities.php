<div class="navbar">
    <div class="navbar-inner">
        <ul class="nav">
            <li class="divider-vertical"></li>
            <li>
                <div>
                    <?echo CHtml::link('Создать',
                        Yii::app()->controller->createUrl('add'),
                        array('class'=>'btn btn-success')
                    );?>
                </div>
            </li>
            <li class="divider-vertical"></li>
        </ul></div>
</div>
<table class="table table-striped table-hover">
    <tbody>
    <thead>
        <th>ID</th>
        <th>Ссылка</th>
        <th>Описание</th>
        <th>Контент</th>
        <th>Заблокирован</th>
        <th>Доступен на сайте</th>
        <th>&nbsp &nbsp &nbsp</th>
    </thead>
    <? foreach($model as $city):?>
        <tr>
            <td><? echo $city->id;?></td>
            <td><? echo $city->alias;?></td>
            <td><? echo substr(strip_tags($city->description),0,200).'...';?></td>
            <td><? echo substr(strip_tags($city->content),0,200).'...';?></td>
            <td><? echo $city->is_blocked;?></td>
            <td><? echo $city->available;?> </td>
            <td>
                <a title="<? ($city->is_blocked == 1)?>Заблокирован" href="/admin/site_menu?type=1&amp;parent_id=1"><i class="glyphicon glyphicon-asterisk"></i></a>
                <a title="Перейти к подменю" href="/admin/site_menu?type=1&amp;parent_id=1"><i class="glyphicon glyphicon-asterisk"></i></a>
                <a title="Редактирование" href="/admin/city/edit?id=<? echo $city->id?>"><i class="glyphicon glyphicon-pencil"></i></a>
                <a title="Удалить" onclick="return confirm('Удалить этот пункт меню и все подменю?');" href="/admin/city/delete?id=<? echo $city->id?>"><i class="glyphicon glyphicon-remove"></i></a>
            </td>
        </tr>
    <? endforeach;?>
    </tbody>
</table>