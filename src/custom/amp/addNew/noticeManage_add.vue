/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div id="noticeManageForm">
        <form id="addForm" name="addForm" action="" method="POST">
            <input type="hidden" id="mediatypeid" name="mediaTypeFormMap.mediatypeid"
                   value="${mediaTypeFormMap.mediatypeid}" />
            <div class="tabbable">
                <div class="tab-content ">
                    <div id="mediaType_div_1" class="tab-pane active">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4" style="text-align:left;margin-bottom:5px;">名称<span style="color: red">*</span></label>
                                        <div  class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                            <input type="text" id="description"
                                                   name="mediaTypeFormMap.description"
                                                   class="form-control form-input"
                                                   value="${mediaTypeFormMap.description}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12" style="text-align:left;margin-bottom:5px;">类型</label>
                                        <div class="col-md-8 col-sm-8 col-xs-12">
                                            <select class="input dropDrown-select"
                                                    name="mediaTypeFormMap.type" id="mediaType"
                                            >
                                                <option value="1"
                                                        ${mediaTypeFormMap.type eq "1" ? 'selected="selected"':''}>脚本</option>
                                                <option value="0"
                                                        ${mediaTypeFormMap.type eq "0" ? 'selected="selected"':''}>电子邮件</option>
                                                <option value="2"
                                                        ${mediaTypeFormMap.type eq "2" ? 'selected="selected"':''}>短信</option>
                                                <option value="3"
                                                        ${mediaTypeFormMap.type eq "3" ? 'selected="selected"':''}>jabber</option>
                                                <%-- 											<option value="7"
                                                                                                        ${mediaTypeFormMap.type eq "7" ? 'selected="selected"':''}>弹窗</option>
                                                <option value="8"
                                                        ${mediaTypeFormMap.type eq "8" ? 'selected="selected"':''}>声音</option>
                                                <option value="100"
                                                        ${mediaTypeFormMap.type eq "100" ? 'selected="selected"':''}>Ez简讯</option> --%>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 电子邮件 -->
                            <div class="row _type_smtp" style="display: none">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label
                                                class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4"
                                                style="text-align: left; margin-bottom: 5px;">SMTP服务器<span
                                                style="color: red">*</span></label>
                                        <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                            <input type="text" id="smtp_server"
                                                   name="mediaTypeFormMap.smtp_server"
                                                   class="form-control form-input"
                                                   value="${mediaTypeFormMap.smtp_server}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12"
                                               style="text-align: left; margin-bottom: 5px;">SMTP
                                            HELO<span style="color: red">*</span>
                                        </label>
                                        <div class="col-md-8 col-sm-8 col-xs-12">
                                            <input type="text" id="smtp_server"
                                                   name="mediaTypeFormMap.smtp_helo"
                                                   class="form-control form-input"
                                                   value="${mediaTypeFormMap.smtp_helo}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row _type_smtp" style="display: none">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label
                                                class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4"
                                                style="text-align: left; margin-bottom: 5px;">发送邮箱<span
                                                style="color: red">*</span></label>
                                        <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                            <input type="text" id="smtp_email"
                                                   name="mediaTypeFormMap.smtp_email"
                                                   class="form-control form-input"
                                                   value="${mediaTypeFormMap.smtp_email}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12"
                                               style="text-align: left; margin-bottom: 5px;">状态<span
                                                style="color: red">*</span></label>
                                        <div class="col-md-8 col-sm-8 col-xs-12">
                                            <select class="input dropDrown-select"
                                                    name="mediaTypeFormMap.status" id="status">
                                                <option value="0"
                                                        ${mediaTypeFormMap.status eq "0" ? 'selected="selected"':''}>启用</option>
                                                <option value="1"
                                                        ${mediaTypeFormMap.status eq "1" ? 'selected="selected"':''}>禁用</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 脚本 -->
                            <div class="row _type_script" style="display: none">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4" style="text-align:left;margin-bottom:5px;">脚本名称<span style="color: red">*</span></label>
                                        <div  class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                            <input type="text" id="exec_path"
                                                   name="mediaTypeFormMap.exec_path"
                                                   class="form-control form-input"
                                                   value="${mediaTypeFormMap.exec_path}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12"
                                               style="text-align: left; margin-bottom: 5px;">状态<span
                                                style="color: red">*</span></label>
                                        <div class="col-md-8 col-sm-8 col-xs-12">
                                            <select class="input dropDrown-select"
                                                    name="mediaTypeFormMap.status" id="status">
                                                <option value="0"
                                                        ${mediaTypeFormMap.status eq "0" ? 'selected="selected"':''}>启用</option>
                                                <option value="1"
                                                        ${mediaTypeFormMap.status eq "1" ? 'selected="selected"':''}>禁用</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <!-- 短信 -->
                            <div class="row _type_gsm" style="display: none">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label
                                                class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4"
                                                style="text-align: left; margin-bottom: 5px;">GSM 调制解调器<span
                                                style="color: red">*</span></label>
                                        <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                            <input type="text" id="gsm_modem"
                                                   name="mediaTypeFormMap.gsm_modem"
                                                   class="form-control form-input"
                                                   value="${mediaTypeFormMap.gsm_modem}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12"
                                               style="text-align: left; margin-bottom: 5px;">状态<span
                                                style="color: red">*</span></label>
                                        <div class="col-md-8 col-sm-8 col-xs-12">
                                            <select class="input dropDrown-select"
                                                    name="mediaTypeFormMap.status" id="status">
                                                <option value="1"
                                                        ${mediaTypeFormMap.status eq "0" ? 'selected="selected"':''}>启用</option>
                                                <option value="1"
                                                        ${mediaTypeFormMap.status eq "1" ? 'selected="selected"':''}>禁用</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <!-- jabber -->
                            <div class="row _type_jabber" style="display: none">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label
                                                class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4"
                                                style="text-align: left; margin-bottom: 5px;">Jabber 标识符<span
                                                style="color: red">*</span></label>
                                        <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                            <input type="text" id="smtp_server"
                                                   name="mediaTypeFormMap.username"
                                                   class="form-control form-input"
                                                   value="${mediaTypeFormMap.username}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12"
                                               style="text-align: left; margin-bottom: 5px;">密码<span style="color: red">*</span>
                                        </label>
                                        <div class="col-md-8 col-sm-8 col-xs-12">
                                            <input type="password" id="passwd"
                                                   name="mediaTypeFormMap.passwd"
                                                   class="form-control form-input"
                                                   value="${mediaTypeFormMap.passwd}">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row _type_jabber" style="display: none">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label
                                                class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4"
                                                style="text-align: left; margin-bottom: 5px;">状态<span
                                                style="color: red">*</span></label>
                                        <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                            <select class="input dropDrown-select"
                                                    name="mediaTypeFormMap.status" id="status">
                                                <option value="0"
                                                        ${mediaTypeFormMap.status eq "0" ? 'selected="selected"':''}>启用</option>
                                                <option value="1"
                                                        ${mediaTypeFormMap.status eq "1" ? 'selected="selected"':''}>禁用</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 弹窗 -->



                            <!-- Ez简讯 -->



                            <div class="form-group">
                                <div class="col-md-7 col-sm-5 col-xs-12 col-md-offset-2" style="margin-top:10px">
                                    <button type="button" class="btn btn-primary marR10 btn-save"
                                            id="submit">保存</button>
                                    <button type="button" class="btn btn-canel"
                                            onclick="javascript:$('#noticeManageForm').trigger('update').trigger('back');" style="margin-right:62px">取消</button>
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
            require(
                [
                    rootPath
                    + '/primary/src/devconfig/noticeManage/view/noticeManageView.js',
                    rootPath
                    + '/primary/src/devconfig/noticeManage/model/noticeManageModel.js' ],
                function(NoticeManageView, NoticeManageModel) {
                    var noticeManageView = new NoticeManageView({
                        el : $('#noticeManageForm'),
                        model : new NoticeManageModel()
                    });
                })
        }
    }
</script>