/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div id="deviceTypeAddBox"><br>
    <form id="form1" data-parsley-validate="" class="form-horizontal form-label-left" onsubmit="return false">
        <input type="hidden" id="device_id" name="deviceTypeFormMap.id" value="${param.id}">
        <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">设备类型名称<span class="required">*</span></label>
            <div class="col-md-8 col-sm-8 col-xs-12">
                <input type="text" class="form-control form-input" name="deviceTypeFormMap.name" id="device_name" value="${param.name}">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">所属主机组 <span class="required">*</span></label>
            <div class="col-md-4 col-sm-4 col-xs-12">
                <select class="dropDrown-select status" name="deviceTypeFormMap.groupid" id="deviceType_groupid">
                    <c:forEach items="${groups}" var="g">
                        <option ${g.groupid eq param.groupid ? 'selected="selected"':''} value="${g.groupid}">${g.name}</option>
                    </c:forEach>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">是否启用 <span class="required">*</span></label>
            <div class="col-md-4 col-sm-4 col-xs-12">
                <select class="dropDrown-select status" name="deviceTypeFormMap.status" id="">
                    <option value="1" ${param.status eq 1 ? 'selected="selected"':''}>启用</option>
                    <option value="0" ${param.status eq 0 ? 'selected="selected"':''}>禁用</option>
                </select>
            </div>
        </div>
        <div class="ln_solid"></div>
        <div class="form-group">
            <div class="text-center">
                <button type="button" class="btn btn-primary btn-save" id="submitBtn">提交</button>
                <button type="button" class="btn btn-canel" onclick="$(this).closest('#deviceTypeAddBox').trigger('close');">取消</button>
            </div>
        </div>
    </form>
    </div>
</template>

<script>
    module.exports = {
        mounted:function () {
            require(
                [rootPath + '/primary/src/config/deviceType/view/deviceTypeView.js',
                    rootPath + '/primary/src/config/deviceType/model/deviceTypeModel.js' ],
                function(deviceTypeView, deviceTypeModel) {
                    new deviceTypeView({
                        el : $('#deviceTypeAddBox'),
                        model : new deviceTypeModel()
                    });
                });
        }
    }
</script>