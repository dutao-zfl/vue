/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div class="custom-wraper">
        <form id="addResourcesform" name="addResourcesform" class="form-horizontal" method="post"
              action="resources/addEntity.shtml">
            <!--<input type="hidden"  name="resFormMap.level" id="level">-->
            <section class="panel panel-default">
                <div class="panel-body">
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color: red">*</span>菜单名称</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control checkacc form-input"
                                   placeholder="请输入菜单名称" name="resFormMap.name" id="name" snc_validate="请输入菜单名称" maxlength="20">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color: red">*</span>菜单唯一KEY</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control checkacc form-input"
                                   placeholder="请输入菜单标识" name="resFormMap.resKey" id="resKey" snc_validate="请输入菜单标识" maxlength="20">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color: red">*</span>菜单url</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control checkacc form-input"
                                   placeholder="请输入菜单url" name="resFormMap.resUrl" id="resUrl" snc_validate="请输入菜单url">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">上级菜单</label>
                        <div class="col-sm-7">
                            <select id="parentId" name="resFormMap.parentId" class=" m-b dropDrown-select"
                                    tabindex="-1">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">菜单类型</label>
                        <div class="col-sm-7">
                            <div class="btn-group m-r" id="typeId">
                                <select id="type" name="resFormMap.type" class=" m-b typeSelect dropDrown-select"
                                        tabindex="-1">
                                    <option value="0">------  目录  ------</option>
                                    <option value="1">------  菜单  ------</option>
                                    <option value="2">------  按扭  ------</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" id="divbut" style="display: none;">
                        <label class="col-sm-3 control-label">选择</label>
                        <div class="col-sm-7">
                            <div id="but" class="doc-buttons">
                            </div>
                        </div>
                    </div>
                    <div class="form-group" id="divbutshe" style="display: none;">
                        <label class="col-sm-3 control-label">设置按扭</label>
                        <div class="col-sm-7">
                            <font color="red" class="col-sm-12">
                                <label class="col-sm-2 control-label">id=</label><input type="text" class="col-xs-4" id="btnId" name="btnId">
                                <label class="col-sm-2 control-label">name=</label><input type="text" class="col-xs-4" id="btnName" name="btnName">
                            </font>
                            <font color="red" class="col-sm-12" style="margin-top: 5px;">
                                <label class="col-sm-2 control-label">class=</label><input type="text" class="col-xs-4" id="btnClass" name="btnClass">
                                <label class="col-sm-2 control-label">value=</label><input type="text" class="col-xs-4" id="btnValue" name="btnValue">
                            </font>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">图标</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control checkacc form-input"
                                   placeholder="请输入icon" name="resFormMap.icon" id="icon" maxlength="20">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">是否隐藏</label>
                        <div class="col-sm-7">
                            <label class="pull-left inline" style="margin-top:5px;">
                                <input id="gritter-light" type="checkbox" name="resFormMap.ishide" id="ishide" class="ace ace-switch ace-switch-5" value="1">
                                <span class="lbl middle"></span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color: red">*</span>菜单顺序</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control checkacc form-input"
                                   placeholder="请输入菜单顺序" name="resFormMap.level" id="level"  snc_validate="请输入菜单顺序,必须为整数！">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">菜单描述</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control checkacc form-input"
                                   placeholder="请输入菜单描述" name="resFormMap.description" id="description" maxlength="50">
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </div>
</template>

<script>
    module.exports = {
        mounted: function () {
            require(
                [
                    system_path + '/sncfront/primary/src/system/resources/add.js'],
                function (resEditView) {
                    new resEditView({
                        el: $('.custom-wraper')
                    });
                })
        }
    }
</script>