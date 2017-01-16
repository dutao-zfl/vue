/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div class="col-md-12 col-sm-12 col-xs-12" id="dic_form">
        <div class="x_panel">
            <div class="form-wraper">
                <form id="addform" name="addform" class="form-horizontal" method="post"
                      action="${pageContext.request.contextPath}/dictionary/addEntity.shtml">
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">code</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control form-input" placeholder="请输入code"
                                   name="dictionaryFormMap.code" id="dictionarycode" snc_validate="请输入code" maxlength="20">
                        </div>
                    </div>
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">值</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control form-input" placeholder="值"
                                   name="dictionaryFormMap.value" id="dictionaryvalue" snc_validate="请输入值" maxlength="20">
                        </div>
                    </div>
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">描述</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control form-input" placeholder="请输入描述"
                                   name="dictionaryFormMap.description" id="description" maxlength="50">
                        </div>
                    </div>
                    <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">下级子类</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <table id="valuemaps"
                                   class="table table-striped responsive-utilities jambo_table dataTable"
                            >
                                <thead>
                                <tr>
                                    <th>编码Code</th>
                                    <th>值</th>
                                    <th>&nbsp;</th>
                                </tr>
                                </thead>
                                <tr>
                                    <td><input class="input text " type="hidden"
                                               name="childId" value="">
                                        <input class="input text " required='required' type="text" name="childCode"
                                               value="" size="20" maxlength="64"></td>
                                    <td><input class="input text" type="text" required='required'
                                               name="childValue" value="" size="20"
                                               maxlength="64"></td>
                                    <td><input class="btn btn-xs btn-danger" type="button"
                                               value="删除" onclick="$(this).parents('tr').remove();"></td>
                                </tr>
                            </table>
                            <input class="btn btn-xs btn-success" type="button" id="add_step"
                                   name="add_step" value="添加" onclick="showpopForm()">
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="ln_solid"></div>
                    <div class="form-group">
                        <div class="text-center">
                            <button type="button" class="btn btn-primary btn-save" id="submitBtn">提交</button>
                            <button type="button" class="btn btn-canel" onclick="$(this).closest('#dic_form').trigger('close');">取消</button>
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
                var dictionarycode = $("#dictionarycode").val();
                var dictionaryvalue = $("#dictionaryvalue").val();

                if(CommnUtil.isNull(dictionarycode)){
                    layer.msg("请输入code");
                    return false;
                }
                if(CommnUtil.isNull(dictionaryvalue)){
                    layer.msg("请输入值");
                    return false;
                }
                $("#addform").ajaxSubmit({
                    dataType : "json",
                    success : function(result) {
                        if (result == "success") {
                            layer.msg("添加成功");
                        } else {
                            layer.msg("添加失败");
                        }
                        $('#dic_form').trigger('update').trigger('close');
                    }
                });
            })
        }
    }
</script>