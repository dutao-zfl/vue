/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div class="custom-wraper" id="groupFormBox">
        <!-- PAGE CONTENT BEGINS -->
        <!-- /.row -->
        <!-- PAGE CONTENT ENDS -->
        <div class="x_panel">
            <div class="x_title">
                <h2>${empty groups.id ? '新增':'修改'}用户组${groups.name}</h2>
                <ul class="nav navbar-right panel_toolbox">
                </ul>
                <div class="col-md-3 col-sm-3 col-xs-12 pull-right top_search">
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <div class="tabbable">
                    <ul class="nav nav-tabs padding-12 tab-color-blue nav-bootstarp padding-left-10">
                        <li class="active"><a data-toggle="tab" href="#tab_div_1"> <i
                                class="green icon-user bigger-110"></i> 组信息
                        </a></li>
                        <c:if test="${not empty groups}">
                            <li class=""><a data-toggle="tab" href="#tab_div_2"> <i
                                    class="green icon-exclamation-sign bigger-110"></i> 菜单权限
                            </a></li>
                            <li class=""><a data-toggle="tab" href="#tab_div_3"> <i
                                    class="green icon-exclamation-sign bigger-110"></i> 主机权限
                            </a></li>
                        </c:if>
                    </ul>

                    <div class="tab-content" style="padding-top: 15px;">
                        <div id="tab_div_1" class="x_content tab-pane active">
                            <!-- 模板 -->
                            <form id="addForm" name="addForm" class="form-horizontal form-label-left" method="POST">
                                <input type="hidden" id="id" name="groupsFormMap.id" value="${groups.id}">
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12"><span style="color: red">*</span>组名:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" class="form-control form-input" name="groupsFormMap.name"
                                               id="name" value="${groups.name}" maxlength="20">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12 ">组key:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" class="form-control form-input"
                                               name="groupsFormMap.groupsKey" id="groupsKey"
                                               value="${groups.groupsKey}" maxlength="20">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">描述:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" class="form-control form-input"
                                               name="groupsFormMap.description" id="description"
                                               value="${groups.description}" maxlength="50">
                                    </div>
                                </div>
                                <div class="form-group" id="groupStatus">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">状态:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="dropDrown-select" name="groupsFormMap.state" id="state"
                                                value="${groups.state}">
                                            <option value="0"
                                            <c:if test="${groups.state == 0}">selected="selected"</c:if>>启用</option>
                                            <option value="1"
                                            <c:if test="${groups.state == 1}">selected="selected"</c:if>>禁用</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">

                                        <!-- <button type="button" class="btn btn-primary marR10 btn-save" id="submit">保存</button>
                                        <button type="button" class="btn btn-canel" id="deleteHeadTab">取消</button> -->
                                        <button type="button" class="btn btn-primary marR10 btn-save" id="submit">保存</button>
                                        <button type="button" class="btn btn-canel" onclick="$('#groupFormBox').trigger('back')">取消</button>

                                    </div>
                                </div>
                            </form>
                        </div>

                        <div id="tab_div_2" class="tab-pane">
                            <!-- 连结的模板 -->
                            <div class="form-group">
                                <div class="col-md-12 col-sm-12 col-xs-12">
                                    <div class="x_panel">
                                        <ul id="tree" class="ztree" style="width: 100%; overflow: auto;"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_div_3" class="tab-pane">
                            <div class="form-group">
                                <div class="col-md-12 col-sm-12 col-xs-12">
                                    <div class="x_panel">
                                        <ul id="hostPermissionTree" class="ztree" style="width: 100%; overflow: auto; height: 460px;"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end x_content-->
        </div>
    </div>
</template>

<script>
    module.exports = {
        mounted:function () {
            require(
                [
                    system_path
                    + '/sncfront/primary/src/system/groups/groupEditList.js',
                    system_path
                    + '/sncfront/primary/src/system/groups/model/groupEditModel.js' ],
                   function(groupEditView, groupEditModel) {
                    var groupEditView = new groupEditView({
                        el : $('.custom-wraper'),
                        model : new groupEditModel({groupid:"${groups.id}"})
                    });
                });
        }
    }
</script>