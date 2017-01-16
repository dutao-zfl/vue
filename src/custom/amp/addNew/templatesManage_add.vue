/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div id="templateAdddForm">
        <form id="addForm" name="addForm" class="form-horizontal form-label-left" method="POST">
            <input type="hidden" id="hostid" name="hostsFormMap.hostid" value="${hostsFormMap.hostid}">
            <div class="tabbable custom-wraper">
                <ul class="nav nav-tabs padding-12 tab-color-blue padding-left-10 margin-bottom-10 nav-bootstarp">
                    <li class="active"><a data-toggle="tab" href="#tab_div_1"> <i
                            class="green icon-user bigger-110"></i> 模板
                    </a></li>
                    <li class=""><a data-toggle="tab" href="#tab_div_2"> <i
                            class="green icon-exclamation-sign bigger-110"></i> 关联模板
                    </a></li>
                    <li class=""><a data-toggle="tab" href="#tab_div_3"> <i
                            class="green icon-exclamation-sign bigger-110"></i> 被关联设备
                    </a></li>
                    <li class=""><a data-toggle="tab" href="#tab_div_4"> <i
                            class="green icon-exclamation-sign bigger-110"></i> 宏
                    </a></li>

                </ul>

                <div class="tab-content">
                    <div id="tab_div_1" class="tab-pane active">
                        <!-- 模板 -->
                        <div class="form-group">
                            <div class="row">
                                <label class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align:left;margin-bottom:5px;"><span
                                        style="color: red">*</span>模板名称</label>
                                <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                    <input type="text" id="host" name="hostsFormMap.host" class="form-control form-input"
                                           value="${hostsFormMap.host}">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align:left;margin-bottom:5px;">模板别名</label>
                                <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                    <input type="text" id="name" name="hostsFormMap.name" class="form-control form-input"
                                           value="${hostsFormMap.name}">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align:left;margin-bottom:5px;">模板类型</label>
                                <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                    <select id="parent_templateTypes" class="dropDrown-select"
                                            name="parent_templateTypes">
                                        <c:forEach items="${parentTemplateTypes}" var="voo">
                                            <option value="${voo.id}"
                                                    ${voo.id eq parent_id ? 'selected="selected"':''}>${voo.name}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <label class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align:left;margin-bottom:5px;">模板细分类型</label>
                                <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                    <select id="sl_templateTypes" name="sl_templateTypes"
                                            class="dropDrown-select">
                                    </select>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div id="tab_div_2" class="tab-pane">
                        <!-- 连结的模板 -->
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">关联模板</label>
                            <div class="col-md-5 col-sm-5 col-xs-12">
                                <table style="width: 100%"
                                       class="table table-striped responsive-utilities jambo_table dataTable"
                                       id="linkTemplateTb">
                                    <thead>
                                    <tr>
                                        <td style="width: 80%">名称</th>
                                        <td style="width: 20%">动作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <c:forEach items="${linkedTempaltes}" var="vo">
                                        <tr>
                                            <td><input type="hidden" value="${vo.hostid}" />${vo.host}</td>
                                            <td><input type="button" value="取消关联" id="${vo.hostid}"
                                                       class="delLinkedTemplate"></td>
                                        </tr>
                                    </c:forEach>
                                    </tbody>
                                </table>
                                <input type="hidden" name="txtSelectedTemplateId"
                                       id="txtSelectedTemplateId" value="${txtSelectedTemplateId}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">关联新模板</label>
                            <a type="button" class="btn btn-info" href="javascript:void(0);"
                               id="openSelectLinkTemplateButton" style="margin-left:10px;">选择</a>
                        </div>
                    </div>
                    <div id="tab_div_3" class="tab-pane">
                        <!-- 设备 -->
                        <%@ include file="/common/hostsAndTemplateSelector.jsp"%>
                    </div>
                    <div id="tab_div_4" class="tab-pane">
                        <!-- 宏 -->
                        <div class="form-group">
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <div class="fm-ctrl margin-bottom-10" style="margin-left:17%;">
                                    <a href="javascript:void(0)" class="btn btn-info addRow">添加</a>
                                </div>

                                <table style="width: 100%;margin-left:17%;"
                                       class="table table-striped responsive-utilities jambo_table dataTable"
                                       id="macroTb">
                                    <colgroup width="260px" />
                                    <colgroup width="40px" />
                                    <colgroup width="260px" />
                                    <colgroup width="50px" />
                                    <thead>
                                    <tr>
                                        <th>表达式</th>
                                        <th></th>
                                        <th>值</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <c:forEach items="${macros}" var="vo" varStatus="s">
                                        <tr>
                                            <td><input class="input_small" type="text"
                                                       style="width: 260px; text-transform: uppercase;"
                                                       name="macros[${s.index}][macro]" value="${vo.macro}"
                                                       size="25" maxlength="64"></td>
                                            <td>=><input type="hidden"
                                                         name="macros[${s.index}][hostmacroid]"
                                                         value="${vo.hostmacroid}" /></td>
                                            <td><input class="input_small" type="text"
                                                       style="width: 260px" name="macros[${s.index}][value]"
                                                       value="${vo.value}" size="25" maxlength="255"></td>
                                            <!-- <td><a href="javascript:void(0)"
                                                class="btn btn-sm btn-danger deleteRow">删除</a></td> -->
                                            <td><button type="button" class="close center-block" style="float:none;" aria-label="Close"><span aria-hidden="true" class="deleteRow">&times;</span></button></td>
                                        </tr>
                                    </c:forEach>

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                            <button type="button" class="btn btn-primary marR10 btn-save" id="submit">保存</button>
                            <button type="button" class="btn btn-canel" onclick="$('#templateAdddForm').trigger('back');" >取消</button>
                        </div>

                    </div>
                    <div id="template_window" class="x_panel" style="display: none;">
                        <div class="form-horizontal form-label-left">
                            <div class="item form-group" style="padding-left:22%; margin-top:10px;">
                                模板类型 <select id="groupsSelectDiv" name="groups"
                                             style="width: 285px" class="dropDrown-select">
                            </select>
                            </div>
                            <div id="template_div" class="item form-group">
                                <input id="iframeid" type="hidden" />
                                <div class="grid_list" id="template_list"></div>
                                <div class="grid_page" id="template_list_page"></div>
                            </div>
                            <div class="item form-group">
                                <button type="button" class="btn btn-info"
                                        id="getSelectedTemplates" style="margin-left:20px;">选择</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    module.exports = {
        mounted:function () {
            var childtemplateType = ${childtemplatetypes};
            var id = ${id};
            require(
                [
                    rootPath
                    + '/primary/src/devconfig/template/view/templateOperateView.js',
                    rootPath
                    + '/primary/src/devconfig/template/model/templateOperateModel.js' ],
                function(TemplateOperateView, TemplateOperateModel) {
                    var templateOperateView_ = new TemplateOperateView({
                        el : $('#templateAdddForm'),
                        model : new TemplateOperateModel()
                    });
                })
        }
    }
</script>