/* eslint-disable */
<style lang="less" scoped>
    body .ui-tooltip{
        border: none;
    }
    .layoutLayer label.error{
        width: 100%;
        display: block;
        float: left;
    }
    .layoutLayer .fa{
        font-size: 20px;
    }
    .layoutLayer .fa.fa-close{
        line-height: 30px;
        cursor: pointer;
    }
    .layoutLayer .fa.fa-close:hover{
        color: #999999;
    }
    #modelMain .fa.fa-minus,#modelMain .fa.fa-plus{
        line-height: 30px;
        height: 30px;
        padding-right:10px;
        font-size: 20px;
        cursor: pointer;
    }
    #modelMain .fa.fa-minus:hover,#modelMain .fa.fa-plus:hover{
        color: #999999;
    }
    .input-group-addon{
        color: #fff;
        background-color: #37a8e0;
        border: none;
    }
    #layoutLayer .ztree{
        /*
        background: #eee;
        max-height: 196px;
        min-height: 143px;
        */
        max-height: 143px;
        overflow-y: auto;
        width: 39%;
    }
    .layoutLayer{
        padding: 10px;
        background: #fff;
    }
    .layoutLayer .input-group{
        margin-bottom: 0;
    }
    .layoutLayer .buttons, button, .btn{
        margin: 0;
    }
    .layoutLayer .dataLine{
        margin-bottom: 10px;
    }
    .layoutLayer .dataRoot{
        background: #959191;
        width: 49%;
        margin-right: 1%;
        color: #fff;
        float: left;
        border: none;
        height: 34px;
        border-radius: 0;
    }
    .layoutLayer .input-group{
        float: left;
    }
    .layoutLayer .btn{
        background-color: #37a8e0;
        color: #fff;
        border: none;
    }
    .layoutLayer .btn:active,.layoutLayer .btn:hover{
        background: #1370ab;
        color: #aadcfe;
    }
    .layoutLayer .tab-content{
        background: #fff;
        border: 1px solid #d9d9d9;
        border-top: none;
    }
    #modelMain .tab-content{
        overflow-y: auto;
        overflow-x: hidden;
    }
    .layoutLayer #nav-list a{
        color: #fff;
        padding: 16px 25px;
        background: #4fa4da;
    }
    .layoutLayer #nav-list span{
        line-height: 33px;
        margin-left: 10px;
    }
    .layoutLayer #nav-list .active a{
        background: #1370ab;
        color: #addbfd;
    }
    .layoutLayer #nav-list .active .charts{
        background-image:url(sncfront/primary/core/img/chartsIconHover.png);
    }
    .charts{
        background-image:url(sncfront/primary/core/img/chartsIcon.png);
        background-position: 0 -2px;
        width: 43px;
        height: 33px;
        display: block;
        float: left;
    }
    .charts-spline{
        background-position: 0 -2px;
    }
    .charts-area{
        background-position: 0 -59px;
    }
    .charts-column{
        background-position: 0 -126px;
    }
    .charts-bar{
        background-position: 0 -209px;
    }
    .charts-scatter{
        background-position: 0 -264px;
    }
    .charts-bubble{
        background-position: 0 -331px;
    }
    .charts-pie{
        background-position: 0 -396px;
    }
    .charts-gauge{
        background-position: 0 -468px;
    }
    .charts-funnel{
        background-position: 0 -664px;
    }
    #modelMain{
        padding-left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 3;
    }
    .ctitle{
        text-indent: 10px;
        margin: 0;
        line-height: 40px;
        font-weight: bold;
        border-bottom: 1px solid #dcdcdc;
    }
    .charts-view{
        border: 1px solid #dcdcdc;
        border-right: none;
        padding: 0;
    }
    .ztitle{
        font-weight: bold;
        background: #f0eded;
        text-indent: 10px;
        line-height: 30px;
        height: 30px;
    }
    #modelMain input[type=range]{
        height: 30px;
        width: 58%;
    }
    #modelMain input{
        width: 100%;
        border: none;
        margin-bottom: 10px;
        height: 30px;
        border-radius:0 ;
    }
    #modelMain select{
        border-radius:0 ;
    }
    #modelMain input[type=text],#modelMain input[type=url]{
        border-bottom: 1px solid #b3b3b3;
    }
    #modelMain label{
        height: 30px;
        line-height: 30px;
        margin: 0;
        margin-bottom: 10px;
    }
    #modelMain select,#modelMain .select2{
        background: #dcedf8;
        color: #4fa4da;
        border: none;
        margin-bottom: 10px;
    }
    .data-url label.error{
        position: absolute;
        right: 90px;
        top: 7px;
        z-index: 100;
        display: block;
        width: auto;
    }
    .overflowDiv>h5{
        margin-bottom: -10px;
    }
    #modelMain .nav-tabs{
        background: #f8f8f8;
        border: 1px solid #d2d2d4;
        border-bottom: none;
        border-right: none;
    }
    #modelMain .nav-tabs>li>a{
        color: #353535;
        background: #f8f8f8;
        border-radius: 0;
        margin: 0;
        border: none;
        border-right: 1px solid #d2d2d4;
        border-bottom: 1px solid #d2d2d4;
        padding: 10px;
    }

    #modelMain .nav-tabs>li{
        padding: 0;
        text-align: center;
    }

    #modelMain .nav-tabs>li.active>a{
        border-top:2px solid #1370ab ;
        background-color: #eaf5fb;
        color: #1370ab;
        border-right: 1px solid #d2d2d4;
        border-bottom:none;
        height: 41px;

    }
    #modelMain .nav-tabs>li>a:hover{
    }
    #modelMain label.title{
        font-weight:900 ;
    }
    .floatLabel{
        margin-top: -20px;
        position: absolute;
        background: #88c744;
        z-index: 999;
        top: 23px;
        left: -40px;
        height: 36px;
        width: 41px;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
        cursor: pointer;
    }
    .floatLabel .fa{
        line-height: 36px;
        text-indent: 13px;
        color: #fff;
    }
    #addUI .check-height{
        line-height: 30px;
        margin-bottom: 10px;
        height: 30px;
    }
    .columnBody{
        float: left;
    }
    .removeSort{
        cursor: pointer;
    }
</style>

<template>
    <div id="addUI" class="layoutLayer custom-wraper" >
        <div class="form-horizontal form-label-left" style="overflow: hidden;">

            <div class="row">
                <form id="publicForm" class="col-md-12 form-inline dataLine">
                    <input type="hidden" name="type" value="line">
                    <input type="hidden" name="id" value="">
                    <div class="col-md-4">
                        <select class="form-control dataRoot" id="dataInterfaceInput" name="data_type">
                            <option value="dataurl" selected="selected">http接口</option>
                            <option value="datasql">SQL语句</option>
                        </select>
                        <select class="form-control dataRoot" id="dataSQLSelect"  name="dataSQLSelect" style="display: none;">
                            <c:forEach items="${database}" var="k">
                                <option value="${k.db_value}">${k.db_key}</option>
                            </c:forEach>
                        </select>
                        <select class="form-control dataRoot" id="porject_path"  name="porject_path">
                            <c:forEach items="${path}" var="k">
                                <option value="${k.db_key}">${k.db_value}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="input-group col-md-6 data-url">
                        <input type="text" name="url" class="form-control" value="/snc-system/component/gridDataComponent.shtml?beanName=logMapper" style="border-radius: 0;">
                        <input type="text" name="dataSQL" style="border-radius: 0;display: none;" class="form-control" value="select '监控项' item, (SELECT count(i.itemid) count from  items i , `hosts` h  where i.hostid=h.hostid and h.`status` NOT IN(3, 5, 6) and h.flags!=2 and i.flags IN (0,4)) item_count,'启用' ok,(SELECT count(i.itemid) count from items i , `hosts` h  where i.hostid=h.hostid and h.`status` NOT IN(3, 5, 6) and h.flags!=2 and i.flags IN (0,4) and i.`status`=0 and i.error = '') ok_count,'停用' not_,(SELECT count(i.itemid) count from items i , `hosts` h  where i.hostid=h.hostid and h.`status` NOT IN(3, 5, 6) and h.flags!=2 and i.flags IN (0,4) and i.`status`=1 and i.error = '') not_count,'不支持' support,(SELECT count(i.itemid) count from items i , `hosts` h  where i.hostid=h.hostid and h.`status` NOT IN(3, 5, 6) and h.flags!=2 and i.flags IN (0,4) and i.error != '') support_count from dual">
                        <div class="input-group-addon btn" id="retrieveData">√</div>
                    </div>
                    <div class="col-md-2">
                        <input type="button" value="返回" class="btn btn-primary backPage"  style="width: 100%;height: 34px;">
                    </div>
                </form>
                <div class="col-md-12">
                    <div class="col-md-12 charts-view" style="padding-right: 0;">
                        <h5 class="ctitle">图表预览</h5>
                        <div class="pull-preview" id="preview" style="width: 100%;overflow-y: auto;overflow-x: hidden;"></div>
                    </div>
                    <div class="col-md-3" id="modelMain" style="padding-left: 0;">
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="col-md-4 active"><a href="#tabHome" role="tab" data-toggle="tab">类型</a></li>
                            <li role="presentation" class="col-md-4"><a href="#tabOptions" role="tab" data-toggle="tab">属性</a></li>
                            <li role="presentation" class="col-md-4"><a href="#tabMessages" role="tab" data-toggle="tab">高级</a></li>
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="tabHome">
                                <ul class="nav" id="nav-list">
                                    <li class="active">
                                        <a href="javascript:;" class="" data-url="tpl/page1"><i class="menu-icon fa undefined"></i><span class="menu-text"> 折线图 </span></a>
                                    </li>
                                </ul>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="tabOptions">
                                <form id="modelPublic">
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">通用配置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <label class="col-md-5">reslists</label>
                                        <select class=" col-md-7" id="reslists" name="reslists">
                                        </select>
                                        <input type="text" placeholder="组件名称" name="name">
                                        <input type="text" placeholder="组件标识" name="mid" required>
                                        <input type="text" placeholder="组件别名" name="alias">
                                        <input type="text" placeholder="组件描述" name="desc">
                                    </div>
                                </form>
                                <form id="chartForm" class="charts-option overflowDiv">
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">数据设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <label class="col-md-5">数据源</label>
                                            <select name="dataKey" class="pickArr col-md-7" >
                                                <option value="">请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">分组</label>
                                            <select name="dataName" class="col-md-7 omitArr">
                                                <option value="">请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">显示</label>
                                            <select class="col-md-7" name="dataNum">
                                                <option value="5">5条</option>
                                                <option value="10">10条</option>
                                                <option value="20">20条</option>
                                                <option value="50">50条</option>
                                                <option value="0">不限</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">X轴设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <input class="col-md-12" type="text" placeholder="X轴名称" name="XTitle">
                                            <label class="col-md-5">字段</label>
                                            <select class=" col-md-7 omitArr" name="XAxis">
                                                <option value="">请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">
                                                时间轴
                                            </label>
                                            <div class="col-md-7 check-height">
                                                <input type="checkbox" name="timeLine">
                                            </div>
                                            <label class="col-md-5">合并</label>
                                            <select class=" col-md-7" name="coalition">
                                                <option value="">不处理</option>
                                                <option value="sum">累加</option>
                                                <option value="mean">平均</option>
                                                <option value="min">取最小</option>
                                                <option value="max">取最大</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">Y轴设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <input class="col-md-12" type="text" placeholder="Y轴名称" name="YTitle">
                                            <label class="col-md-5">字段</label>
                                            <select class=" col-md-7 omitArr" name="YAxis">
                                                <option value="">请获取数据源</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">其他设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="添加阀值线" id="addLine">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="删除阀值线" id="delLine">
                                            </div>
                                        </div>
                                        <div id="lineList"></div>
                                    </div>

                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">标题设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <input type="text" class="col-md-12" placeholder="主标题" name="title">
                                            <input type="text" class="col-md-12" placeholder="二级标题" name="subTitle">
                                            <label class="col-md-5">标题位置</label>
                                            <select name="titleAlign" class="col-md-7">
                                                <option value="left">左</option>
                                                <option value="center" selected>中</option>
                                                <option value="right">右</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12 text-center">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="预览" id="chartReview">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="确定" id="addChart">
                                            </div>
                                            <div class="col-md-12">
                                                <input type="button" class="btn backPage" value="返回上一页">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <form id="tableForm" style="display: none" class="table-option overflowDiv" style="display: none">
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">数据设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <label class="col-md-5">列表标题</label>
                                            <div class="col-md-7">
                                                <input type="text" placeholder="label" name="title">
                                            </div>
                                            <label class="col-md-5">每页数据</label>
                                            <select class="col-md-7" name="pageSize">
                                                <option value="10">10条</option>
                                                <option value="15">15条</option>
                                                <option value="20">20条</option>
                                                <option value="25">25条</option>
                                                <option value="30">30条</option>
                                                <option value="50">50条</option>
                                            </select>
                                            <label class="col-md-5">添加复选框</label>
                                            <div class="col-md-7 check-height">
                                                <input type="checkbox" name="checkbox">
                                            </div>
                                            <label class="col-md-5">显示分页</label>
                                            <div class="col-md-7 check-height" >
                                                <input type="checkbox" name="showPage">
                                            </div>
                                            <label class="col-md-5">显示标题</label>
                                            <div class="col-md-7 check-height">
                                                <input type="checkbox" name="showTitle">
                                            </div>
                                            <label class="col-md-5">显示表头</label>
                                            <div class="col-md-7 check-height">
                                                <input type="checkbox" name="showTableTop">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="预览" id="tableReview">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="应用" id="tableApply">
                                            </div>
                                        </div>
                                        <input type="button" class="btn" value="保存" id="addTable">
                                        <input type="button" class="btn backPage" value="返回上一页">
                                    </div>
                                </form>
                                <form id="recordForm" style="display: none" class="record-option overflowDiv" style="display: none">
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">组件配置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">

                                            <label class="col-md-5">主题色</label>
                                            <div class="col-md-7">
                                                <input type="color" name="themeColor">
                                            </div>
                                            <label class="col-md-5">标题栏</label>
                                            <select class="col-md-7 omitArr" name="title">
                                                <option>请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">标题栏值</label>
                                            <select class="col-md-7 omitArr" name="titleNum">
                                                <option>请获取数据源</option>
                                            </select>

                                            <label class="col-md-5">子栏1</label>
                                            <select class="col-md-7 omitArr" name="subTitleOne">
                                                <option>请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">子栏1值</label>
                                            <select class="col-md-7 omitArr" name="subTitleOneNum">
                                                <option>请获取数据源</option>
                                            </select>

                                            <label class="col-md-5">子栏2</label>
                                            <select class="col-md-7 omitArr" name="subTitleTwo">
                                                <option>请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">子栏2值</label>
                                            <select class="col-md-7 omitArr" name="subTitleTwoNum">
                                                <option>请获取数据源</option>
                                            </select>

                                            <label class="col-md-5">子栏3</label>
                                            <select class="col-md-7 omitArr" name="subTitleThree">
                                                <option>请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">子栏3值</label>
                                            <select class="col-md-7 omitArr" name="subTitleThreeNum">
                                                <option>请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">图标样式</label>
                                            <select  class="col-md-7" name="iconClass" style="width: 58%">
                                                <optgroup label="网络图标">
                                                    <option value="fa-desktop">desktop</option>
                                                    <option value="fa-keyboard-o">keyboard-o</option>
                                                    <option value="fa-laptop">laptop</option>
                                                    <option value="fa-sitemap">sitemap</option>
                                                </optgroup>
                                                <optgroup label="增加">
                                                    <option value="fa-plus-square">plus-square</option>
                                                    <option value="fa-plus">plus</option>
                                                    <option value="fa-plus-circle">plus-circle</option>
                                                </optgroup>
                                                <optgroup label="删除">
                                                    <option value="fa-trash">trash</option>
                                                    <option value="fa-trash-o">trash-o</option>
                                                    <option value="fa-remove">remove</option>
                                                    <option value="fa-minus-square">minus-square</option>
                                                </optgroup>
                                                <optgroup label="编辑">
                                                    <option value="fa-pencil-square-o">pencil-square-o</option>
                                                </optgroup>
                                                <optgroup label="查询">
                                                    <option value="fa-search">search</option>
                                                </optgroup>
                                                <optgroup label="取消">
                                                    <option value="fa-rotate-left">rotate-left</option>
                                                    <option value="fa-remove">fa-remove</option>
                                                </optgroup>
                                                <optgroup label="导入">
                                                    <option value="fa-mail-reply">mail-reply</option>
                                                </optgroup>

                                                <optgroup label="导出">
                                                    <option value="fa-share-square-o">share-square-o</option>
                                                    <option value="fa-mail-forward">mail-forward</option>
                                                </optgroup>

                                                <optgroup label="上传">
                                                    <option value="fa-cloud-upload">cloud-upload</option>
                                                </optgroup>

                                                <optgroup label="下载">
                                                    <option value="fa-cloud-download">cloud-download</option>
                                                </optgroup>

                                                <optgroup label="上移">
                                                    <option value="fa-long-arrow-up">long-arrow-up</option>
                                                    <option value="fa-sort-up">sort-up</option>
                                                </optgroup>

                                                <optgroup label="下移">
                                                    <option value="fa-long-arrow-down">long-arrow-down</option>
                                                    <option value="fa-sort-desc">fa-sort-desc</option>
                                                </optgroup>

                                                <optgroup label="停止/禁用">
                                                    <option value="fa-warning">warning</option>
                                                    <option value="fa-minus-circle">minus-circle</option>
                                                </optgroup>

                                                <optgroup label="启用">
                                                    <option value="fa-check-circle">check-circle</option>
                                                </optgroup>

                                                <optgroup label="复制/克隆">
                                                    <option value="fa-copy">copy</option>
                                                </optgroup>

                                                <optgroup label="权限配置">
                                                    <option value="fa-gears">gears</option>
                                                    <option value="fa-cog">cog</option>
                                                </optgroup>

                                                <optgroup label="刷新">
                                                    <option value="fa-refresh">refresh</option>
                                                </optgroup>

                                            </select>
                                        </div>
                                    </div>



                                    <div class="col-md-12 text-center">
                                        <input type="button" class="btn" value="预览" id="recordReview">
                                        <input type="button" class="btn" value="确定" id="addRecord">
                                        <input type="button" class="btn backPage" value="返回上一页">
                                    </div>
                                </form>
                                <form id="ringForm" style="display: none" class="ring-option overflowDiv">
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">环形配置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <label class="col-md-5">描述</label>
                                            <select class="omitArr col-md-7" name="ringTitle">
                                                <option value="">请读取数据源</option>
                                            </select>
                                            <label class="col-md-5">数据</label>
                                            <select class="omitArr col-md-7" name="ringValue">
                                                <option value="">请读取数据源</option>
                                            </select>
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="添加环形" id="addRing">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="清空环形" id="resetRing">
                                            </div>
                                        </div>
                                        <div id="ringList"></div>
                                    </div>



                                    <div class="col-md-12 text-center">
                                        <input type="button" class="btn" value="预览" id="ringReview">
                                        <input type="button" class="btn" value="确定" id="submitRing">
                                        <input type="button" class="btn backPage" value="返回上一页">
                                    </div>
                                </form>
                                <form id="customForm" style="display: none" class="custom-option overflowDiv">
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">组件配置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <label class="col-md-8">隐藏标题栏</label>
                                            <div class="check-height">
                                                <input type="checkbox" name="hideHeader">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <input type="button" class="btn" value="预览" id="customReview">
                                        <input type="button" class="btn" value="确定" id="submitCustom">
                                        <input type="button" class="btn backPage" value="返回上一页">
                                    </div>
                                </form>
                                <form id="baseTableForm" style="display: none" class="baseTable-option overflowDiv">
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">数据设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <label class="col-md-5">数据源</label>
                                            <select name="dataKey" class="pickArr col-md-7" >
                                                <option value="">请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">列数</label>
                                            <select name="column" class="col-md-7" >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                            </select>
                                            <label class="col-md-5">描述</label>
                                            <select name="dataTitle" class="col-md-7 omitArr">
                                                <option value="">请获取数据源</option>
                                            </select>
                                            <label class="col-md-5">值</label>
                                            <select name="dataVal" class="col-md-7 omitArr">
                                                <option value="">请获取数据源</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div class="col-md-12 text-center">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="预览" id="baseTableReview">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="确定" id="submitBaseTable">
                                            </div>
                                            <div class="col-md-12">
                                                <input type="button" class="btn backPage" value="返回上一页">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="tabMessages">
                                <form id="chartHighForm" class="charts-option overflowDiv">
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">坐标图设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <label class="col-md-8">隐藏标题栏</label>
                                            <div class="check-height">
                                                <input type="checkbox" name="hideHeader">
                                            </div>
                                            <label class="col-md-8">极坐标</label>
                                            <div class="check-height">
                                                <input type="checkbox" name="polar">
                                            </div>
                                            <label class="col-md-8">共享提示框</label>
                                            <div class="check-height">
                                                <input type="checkbox" name="shared">
                                            </div>

                                            <label class="col-md-8">xy倒置</label>
                                            <div  class="check-height">
                                                <input type="checkbox" name="inverted">
                                            </div>

                                            <label class="col-md-8">堆叠</label>
                                            <div class="check-height">
                                                <input type="checkbox" name="stacking">
                                            </div>

                                            <div class="col-md-12">
                                                <input type="text" placeholder="图表点击事件跳转url" name="clickUrl">
                                            </div>

                                            <label class="col-md-5">标记样式</label>
                                            <select class="col-md-7" name="markerStyle">
                                                <option value="default">默认</option>
                                                <option value="ring">空心圆环</option>
                                            </select>

                                            <label class="col-md-5">跳转目标</label>
                                            <select class="col-md-7" name="openType">
                                                <option value="_blank">新页面</option>
                                                <option value="_self">当前页面</option>
                                            </select>


                                            <div class="col-md-12">
                                                <input type="text" placeholder="自定义X轴a,b,c..." name="xName">
                                            </div>

                                            <div class="col-md-12">
                                                <input type="text" placeholder="自定义Y轴a,b,c..." name="yName">
                                            </div>

                                            <div class="col-md-10">
                                                <input type="text" placeholder="提示框序列化方法" name="formatter">
                                            </div>
                                            <div class="col-md-2" style="line-height: 30px;">
                                                <i class="fa fa-question-circle tips" data-toggle="tooltip" data-placement="top" title="序列化方法示例：名称&lt;%=x%&gt;&lt;%=y%&gt;&lt;%=val%&gt;；其中x、y为预置图表坐标值，val为图表分类名"></i>
                                            </div>

                                            <div class="col-md-12">
                                                <textarea name="customOption" style="width: 100%;"  placeholder="图表自定义配置,可直接写入完整的图表配置参数，如：{&quot;chart&quot;:{},&quot;title&quot;:{},&quot;xAxis&quot;:{},&quot;yAxis&quot;:{}}"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">
                                                图例配置
                                                <i class="fa fa-minus pull-right"></i>
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <label class="col-md-8">隐藏</label>
                                            <div class="check-height">
                                                <input type="checkbox" name="legendHide">
                                            </div>
                                            <label class="col-md-5">水平位置</label>
                                            <select class="col-md-7" name="legendAlign">
                                                <option value="left">左</option>
                                                <option value="center" selected>中</option>
                                                <option value="right">右</option>
                                            </select>
                                            <label class="col-md-5">垂直位置</label>
                                            <select class="col-md-7" name="legendVerticalAlign">
                                                <option value="top">上</option>
                                                <option value="middle">中</option>
                                                <option value="bottom" selected>下</option>
                                            </select>

                                            <div class="col-md-12">
                                                <input type="text" placeholder="自定义X坐标" name="legendX">
                                            </div>
                                            <div class="col-md-12">
                                                <input type="text" placeholder="自定义Y坐标" name="legendY">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">
                                                分组配置
                                                <i class="fa fa-minus pull-right"></i>
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="添加分组" id="addGroup">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="清空分组" id="resetGroup">
                                            </div>
                                        </div>
                                        <div id="groupList"></div>
                                    </div>
                                    <div class="col-md-12">
                                        <input type="button" class="btn backTab" value="返回属性">
                                    </div>
                                </form>
                                <form id="tableHighForm"class="table-option overflowDiv" style="display: none" >
                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">表格显示字段<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <label class="col-md-5">字段</label>
                                            <select class="col-md-7 omitArr" id="columnKey">
                                                <option value="">请获取数据源</option>
                                            </select>
                                            <div class="col-md-6">
                                                <input type="button" class="btn " value="添加字段" id="addColumn">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="button" class="btn" value="清空字段" id="resetColumn">
                                            </div>
                                            <div id="columnList">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12 fold-title">
                                        <div class="row">
                                            <h5 class="ztitle">按钮设置<i class="fa fa-minus pull-right"></i></h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12 fold-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <input type="button" class="btn" value="添加" id="addBtn">
                                            </div>
                                            <div class="col-md-4">
                                                <input type="button" class="btn" value="添加源" id="addBtnUrl">
                                            </div>
                                            <div class="col-md-4">
                                                <input type="button" class="btn" value="清空" id="resetBtn">
                                            </div>
                                            <div id="btnList">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <input type="button" class="btn backTab" value="返回属性">
                                    </div>
                                </form>
                                <form class="record-option overflowDiv" style="display: none">此类型无高级设置</form>
                                <form class="ring-option overflowDiv" style="display: none">此类型无高级设置</form>
                                <form class="custom-option overflowDiv" style="display: none">此类型无高级设置</form>
                                <form class="baseTable-option overflowDiv" style="display: none">此类型无高级设置</form>
                            </div>
                        </div>
                        <div class="floatLabel"><i class="fa fa-cog"></i></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        mounted:function () {
            require(
                [ system_path
                + '/sncfront/primary/src/system/config/addModel/moduleView.js', system_path
                + '/sncfront/primary/src/system/config/addModel/moduleModel.js' ],
                function(moduleView, moduleModel) {
                    //param=param&&JSON.parse(param);
                    var request;
                    try{
                        request=${empty param.data ? 'false':param.data};
                    }catch(err){
                        request=false
                    }
                    new moduleView({
                        el : $('#addUI'),
                        model : new moduleModel({request:request})
                    });

                }
                );
        }
    }
</script>