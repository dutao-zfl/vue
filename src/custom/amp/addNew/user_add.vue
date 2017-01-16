/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div class="col-md-12 col-sm-12 col-xs-12" id="addorEditBox">
        <div class="x_panel">
            <div class="form-wraper">
                <form id="addUserform" name="addUserform"
                      class="form-horizontal form-label-left" data-parsley-validate=""
                      method="post"
                      action="user/${empty user.id ? 'add':'edit' }Entity.shtml">
                    <input type="hidden" id="id" name="userFormMap.id"
                           value="${user.id}">
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12"><span
                                style="color: red">*</span>用户名:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control form-input"
                                   name="userFormMap.fullname" id="fullname"
                                   value="${user.fullname}">
                        </div>
                    </div>
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12"><span
                                style="color: red">*</span>账号:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control form-input" name="userFormMap.name"
                                   id="name" value="${user.name}" maxlength="20">
                        </div>
                    </div>
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12"><span
                                style="color: red">*</span>密码:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="password" class="form-control form-input"
                                   name="userFormMap.password" id="password"
                                   value="${user.password}" maxlength="20">
                        </div>
                    </div>
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">邮件:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control form-input" name="userFormMap.email"
                                   id="email" value="${user.email}" maxlength="40">
                        </div>
                    </div>
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">电话:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control form-input" name="userFormMap.phone"
                                   id="phone" value="${user.phone}" maxlength="20">
                        </div>
                    </div>
                    <%@ include file="/common/usergroupSelector.jsp"%>
                    <div class="ln_solid"></div>
                    <div class="form-group">
                        <div class="text-center">
                            <button type="button" class="btn btn-primary btn-save" id="submitBtn">提交</button>
                            <button type="button" class="btn btn-canel" onclick="$(this).closest('#addorEditBox').trigger('close');">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        mounted:function () {
            $('#submitBtn').click(function(){
                var fullname = $("#fullname").val();
                var name = $("#name").val();
                var password = $("#password").val();

                if(CommnUtil.isNull(fullname)){
                    layer.msg("用户名不能为空");
                    return false;
                }
                if(CommnUtil.isNull(name)){
                    layer.msg("账号不能为空");
                    return false;
                }
                if(CommnUtil.isNull(password)){
                    layer.msg("密码不能为空");
                    return false;
                }
                $("#addUserform").ajaxSubmit({
                    dataType : "json",
                    success : function(result) {
                        if (result == "success") {
                            layer.msg("保存成功");
                            $('#addorEditBox').trigger('update').trigger('close');
                        } else {
                            layer.msg(result);
                        }

                    }
                });
            })
        }
    }
</script>