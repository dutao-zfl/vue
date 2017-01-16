/* eslint-disable */
<style lang="less" scoped>

</style>

<template>

    <div id="groupAddBox"><br>
        <form id="group_form1" data-parsley-validate="" class="form-horizontal form-label-left" onsubmit="return false">
            <input type="hidden" id="groups_id" name="groupsFormMap.groupid" value="${param.groupid}">
            <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12" style="padding-right:0;">主机组名称<span class="required">*</span></label>
                <div class="col-md-8 col-sm-8 col-xs-12">
                    <input type="text" class="form-control form-input" name="groupsFormMap.name" id="name" value="${param.name}">
                </div>
            </div>
            <div class="ln_solid"></div>
            <div class="form-group">
                <div class="text-center">
                    <button type="button" class="btn btn-primary btn-save" id="submitBtn">提交</button>
                    <button type="button" class="btn btn-canel" onclick="$(this).closest('#groupAddBox').trigger('close');">取消</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    module.exports = {
        mounted:function () {
            require(['jquery', 'underscore', 'backbone', 'http', 'global', 'layer'], function ($, _, Backbone, http, global, layer) {
                $('#submitBtn').click(function(){
                    var url = rootPath + ($('#groups_id').val() === '' ? '/config/groups/addEntity.shtml' : '/config/groups/updateEntity.shtml');
                    var applicationName = $("#name").val();
                    if(!applicationName){
                        layer.msg("名称不能为空");
                        return;
                    }
                    http.post(url,$('#group_form1').serializeJSON()).success(function(data){
                        layer.closeAll('loading');
                        layer.msg(data.messages);
                        if(data.status == 'success'){
                            $('#groupAddBox').trigger('update').trigger('close');
                        } else {

                        }
                    });
                });
            });

        }
    }
</script>