<div class="container">
    <div class="checkbox">
        <span class="glyphicon glyphicon-plane"></span>
        <label>
            <input id="plane" type="checkbox" value="">
            Plain
        </label>
    </div>
    <div class="checkbox">
        <span class="glyphicon glyphicon-road"></span>
        <label>
            <input id="road" type="checkbox" value="">
            Road
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input id="train" type="checkbox" value="">
            with transitions
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input id="transplantation" type="checkbox" value="">
            Train
        </label>
    </div>
    <form class="form-signin" role="form">
        <h2 class="form-signin-heading">Please fill all</h2>

        <div class="row">
            <div style=" float: left; margin-top: 35; ">
                <a href="#" id="change_directions">
                    <span class="glyphicon glyphicon-random"></span>
                </a>
            </div>
            <div style=" margin-left: 35; ">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <ul class="dropdown-menu from" role="menu">
                                </ul>
                            </div><!-- /btn-group -->
                            <input type="text" id="search" value="" class="form-control" placeholder="from" required="" autofocus="">
                        </div><!-- /input-group -->
                    </div><!-- /.col-lg-6 -->
                </div>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <ul class="dropdown-menu to" role="menu">
                                </ul>
                            </div><!-- /btn-group -->
                            <input type="text" id="search2" class="form-control" placeholder="to" required="">
                        </div><!-- /input-group -->
                    </div><!-- /.col-lg-6 -->
                </div>
            </div>
        </div>
        <input type="text" id="start_date" class="form-control" placeholder="date there" required="">
        <input type="text" id="end_date" class="form-control" placeholder="date back" required="">
        <input type="text" id="quantity" class="form-control" placeholder="quantity" required="">
        <button class="btn btn-lg btn-primary btn-block" type="submit">go</button>
    </form>
</div>


