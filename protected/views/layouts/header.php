<?php if((isset($regularFlag))&&($regularFlag=="regular")) $regular="регулярные"; else $regular="нерегулярные";?>
<div class="header">
    <div class="wrapper">
        <span style="position: absolute; margin-left: 5px; margin-top: 10px;" class="top"><a id="logo" href="/"></a></span>
      <span id="slogan">Чартеры<br />
	  Авиабилеты на все рейсы
	  </span>
        <div class="nav" id="top_nav">
            <ul>
                <li><a class="nav1" href="/reservation">Выкуп заказа</a></li>
                <li><a class="nav2" href="/register">Партнерам</a></li>
                <li><a class="nav3" href="/contacts">Контакты</a></li>
            </ul>
        </div>
    </div>
</div>
<?php if($regularFlag=="regular"){
    echo'
  <div class="leftbtndiv passive leftclick">Чартерные рейсы</div>
  <div class="rightbtndiv active">Регулярные рейсы</div>
 ';
    $RegularHiddenFlag="";
    $CharterHiddenFlag="hidden";
}
else
{ echo'
  <div class="leftbtndiv active">Чартерные рейсы</div>
  <div class="rightbtndiv passive rightclick">Регулярные рейсы</div>';
    $RegularHiddenFlag="hidden";
    $CharterHiddenFlag="";
}
?>

<div class="clear"></div>

<div class="targetframe">
<div class="lefttarget targetblock <?php echo $CharterHiddenFlag; ?>">
    <ul>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>">Греция</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/montenegro">Черногория</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/bulgaria">Болгария</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/thailand">Таиланд</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/turkey">Турция</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/vietnam">Вьетнам</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/finland">Финляндия</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/slovakia">Словакия</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/egypt">Египет</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/dominicana">Доминикана</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/india">Индия</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/sri-lanka">Шри-Ланка</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/emirates">ОАЭ</a></li>
        <li><a href="<?php echo Yii::app()->createUrl('site/content', array('alias'=>'greece'));?>/austria">Австрия</a></li>
    </ul>
    <div class="separate clear"></div>
    <ul>
        <li><a href="/athens">Афины</a></li>
        <li><a href="/thessaloniki">Салоники</a></li>
        <li><a href="/krit">Крит</a></li>
        <li><a href="/rodos">Родос</a></li>
        <li><a href="/iraklion">Ираклион</a></li>
        <li><a href="/tivat">Тиват</a></li>
        <li><a href="/dalaman">Даламан</a></li>
        <li><a href="/antalia">Анталия</a></li>
        <li><a href="/bangkok">Бангкок</a></li>
        <li><a href="/ho-chi-minh-city">Хошимин</a></li>
        <li><a href="/salzburg">Зальцбург</a></li>
        <li><a href="/kuusamo">Куусамо</a></li>
        <li><a href="/kittila">Киттила</a></li>
        <li><a href="/sofia">София</a></li>
        <li><a href="/poprad">Попрад</a></li>
        <li><a href="/punta-cana">Пунта-Кана</a></li>
        <li><a href="/hurghada">Хургада</a></li>
        <li><a href="/sharm-el-sheikh">Шарм-эль-Шейх</a></li>
        <li><a href="/sharjah">Шарджа</a></li>
        <li><a href="/goa">Гоа</a></li>
        <li><a href="/colombo">Коломбо</a></li>
        <li><a href="/dubai">Дубай</a></li>
    </ul>

</div>
<div class="righttarget targetblock <?php echo $RegularHiddenFlag; ?>">
    <!--  <ul>
          <li><a href="http://echarter.com.ua/regular-flights/england.php">Англия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/germany.php">Германия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/russia.php">Россия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/italy.php">Италия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/france.php">Франция</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/spain.php">Испания</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/austria.php">Австрия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/cyprus.php">Кипр</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/israel.php">Израиль</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/emirates.php">ОАЭ</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/poland.php">Польша</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/czech.php">Чехия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/latvia.php">Латвия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/holland.php">Голландия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/denmark.php">Дания</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/portugal.php">Португалия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/iran.php">Иран</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/georgia.php">Грузия</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/turkey.php">Турция</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/azerbaijan.php">Азербайджан</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/armenia.php">Армения</a></li>
      </ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/usa.php">США</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/belarus.php">Беларусь</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/belgium.php">Бельгия</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/hungary.php">Венгрия</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/kazakhstan.php">Казахстан</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/canada.php">Канада</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/china.php">Китай</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/cuba.php">Куба</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/lithuania.php">Литва</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/moldavia.php">Молдавия</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/norway.php">Норвегия</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/romania.php">Румыния</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/thailand.php">Таиланд</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/tunis.php">Тунис</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/finland.php">Финляндия</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/switzerland.php">Швейцария</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/estonia.php">Эстония</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/japan.php">Япония</a></li></ul>
    <div class="separate clear"></div>


      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/london.php">Лондон</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/moscow.php">Москва</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/riga.php">Рига</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/madrid.php">Мадрид</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/rome.php">Рим</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/larnaca.php">Ларнака</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/prague.php">Прага</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/tel-aviv.php">Тель-Авив</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/st-petersburg.php">Санкт-Петербург</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/vienna.php">Вена</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/barcelona.php">Барселона</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/paris.php">Париж</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/sofia.php">София</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/istanbul.php">Стамбул</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/tbilisi.php">Тбилиси</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/baku.php">Баку</a></li>
      </ul>
      <ul>
          <li><a href="http://echarter.com.ua/regular-flights/yerevan.php">Ереван</a></li>
      </ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/batumi.php">Батуми</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/berlin.php">Берлин</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/budapest.php">Будапешт</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/vilnius.php">Вильнюс</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/kishinev.php">Кишинев</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/minsk.php">Минск</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/new-york.php">Нью-Йорк</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/peking.php">Пекин</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/sochi.php">Сочи</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/tallinn.php">Таллин</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/toronto.php">Торонто</a></li></ul>
<ul><li><a href="http://echarter.com.ua/regular-flights/shanghai.php">Шанхай</a></li></ul>
-->
    <ul>
        <li><a href="http://echarter.com.ua/regular-flights/prague">Прага</a></li>
    </ul>
    <ul>
        <li><a href="http://echarter.com.ua/regular-flights/yerevan">Ереван</a></li>
    </ul>
    <ul>
        <li><a href="http://echarter.com.ua/regular-flights/sofia">София</a></li>
    </ul>
    <ul>
        <li><a href="http://echarter.com.ua/regular-flights/london">Лондон</a></li>
    </ul>
    <ul>
        <li><a href="http://echarter.com.ua/regular-flights/moscow">Москва</a></li>
    </ul>
    <ul>
        <li><a href="http://echarter.com.ua/regular-flights/istanbul">Стамбул</a></li>
    </ul>

    <ul>
        <li><a href="http://echarter.com.ua/regular-flights/baku">Баку</a></li>
    </ul>
    <ul>
        <li><a href="http://echarter.com.ua/regular-flights/larnaca">Ларнака</a></li>
    </ul>

</div>
</div>