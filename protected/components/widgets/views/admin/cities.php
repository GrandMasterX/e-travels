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
                <a title="Редактирование" href="/admin/city/edit?id=<? echo $city->id?>"><i class="glyphicon glyphicon-pencil"></i></a>
                <a title="Удалить" onclick="return confirm('Вы уверены?');" href="/admin/city/delete?id=<? echo $city->id;?>&is_blocked=<? echo $city->is_blocked;?>"><i class="glyphicon glyphicon-remove"></i></a>
                <a title="<? echo ($city->available == 1) ? 'Заблокировать': 'Разблокировать'?>" onclick="return confirm('Вы уверены?');" href="/admin/city/available?id=<? echo $city->id;?>&available=<? echo $city->available;?>"><i class="glyphicon glyphicon-remove"></i></a>
            </td>
        </tr>
    <? endforeach;?>
    </tbody>
</table>