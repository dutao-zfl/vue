/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div role="tabpanel">
                <ul id="myTab" class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#tab-content1" id="getPhysicalRead" role="tab" data-toggle="tab"> 动 作 </a></li>
                    <li role="presentation"><a href="#tab-content2" id="getBufferGet" role="tab" data-toggle="tab"> 条 件 </a></li>
                    <li role="presentation"><a href="#tab-content3" id="getElapsedTime" role="tab" data-toggle="tab"> 操 作 </a></li>
                </ul>
                <div class="x_content">
                    <br />
                    <form id="action-form" data-parsley-validate class="form-horizontal form-label-left" style="position:static;" action="">
                        <input type="hidden" name="actionid" value="${actionid }" id="actionid">
                        <div id="myTabContent" class="tab-content">
                            <div role="tabpanel" class="tab-pane fade active in" id="tab-content1" aria-labelledby="home-tab">

                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">名称<span class="required">*</span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" id="first-name" name="actionsFormMap.name" value="${actionsFormMap.name }" class="form-control col-md-7 col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">默认主题<span class="required">*</span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" id="last-name" name="actionsFormMap.def_shortdata" value="${actionsFormMap.def_shortdata}" class="form-control col-md-7 col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">默认信息<span class="required">*</span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <textarea class="form-control" name="actionsFormMap.def_longdata" rows="3" placeholder=''>${actionsFormMap.def_longdata}</textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">发送故障恢复消息</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="checkbox">
                                            <label>
                                                <input id="send_fault_msg" type="checkbox" name="actionsFormMap.recovery_msg" value="${actionsFormMap.recovery_msg }" ${actionsFormMap.recovery_msg eq "1" ? 'checked="checked"':''} } >
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group r_msg">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">恢复主题<span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" id="last-name" name="actionsFormMap.r_shortdata" value="${actionsFormMap.r_shortdata }" class="form-control col-md-7 col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group r_msg">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">恢复信息<span class="required">*</span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <textarea class="form-control" rows="3" name="actionsFormMap.r_longdata">${actionsFormMap.r_longdata }</textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">状态<span class="required">*</span></label>
                                    <div class="col-md-2 col-sm-2 col-xs-6">
                                        <select class="form-control" name="actionsFormMap.status">
                                            <option value="0">启用</option>
                                            <option value="1">禁用</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="tab-content2" aria-labelledby="profile-tab" style="margin-right: -170px;">
                                <%-- 			                	<div class="form-group">
                                <label class="control-label col-md-2 col-sm-2 col-xs-3">条件<span class="required">*</span></label>
                                <div class="col-md-8 col-sm-8 col-xs-10">
                                    <table class="table table-bordered" id="condition_table">
                                        <thead>
                                        <tr>
                                            <th width="20%">标签</th>
                                            <th>条件</th>
                                            <th width="20%">动作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <c:forEach items="${conditionList }" var="item">
                                            <tr data-key="${item.conditiontype }_${item.operator }_${item.value }">
                                                <td></td>
                                                <td></td>
                                                <td><a href="#" class="btn btn-danger btn-xs condition-delete-btn"><i class="fa fa-trash-o"></i> 删除 </a></td>
                                                <td style="display: none;">
                                                    <input name="conditionsFormMap.conditiontype" type="hidden" value="${item.conditiontype }">
                                                    <input name="conditionsFormMap.operator" type="hidden" value="${item.operator }">
                                                    <input name="conditionsFormMap.value" type="hidden" value="${item.value }">
                                                </td>
                                            </tr>
                                        </c:forEach>
                                        </tbody>
                                    </table>

                                </div>
                            </div> --%>
                                <div class="form-group" align="right">
                                    <label class="control-label col-md-2 col-sm-2 col-xs-3">条件<span class="required">*</span></label>
                                    <div class="col-md-2 col-sm-2 col-xs-3">
                                        <select class="form-control" id="conditiontype" name="conditionsFormMap.conditiontype">
                                            <option value="5">触发器值</option>
                                            <!--
                                            <option value="16">维修状态</option>
                                            <option value="1">主机</option>
                                            <option value="0">主机群组</option>
                                            <option value="15">监控集</option>
                                            <option value="6">时间期间</option>
                                            <option value="13">模板</option>
                                            <option value="2">触发器</option>
                                            <option value="3">触发器名称</option>
                                            <option value="4">触发器示警度</option>
                                            -->
                                        </select>
                                    </div>
                                    <div class="col-md-2 col-sm-2 col-xs-3">
                                        <!-- 	                                    <select class="form-control optional_control" id="operator_16">
                                                                                    <option value="7" selected="selected">不在维护</option>
                                                                                    <option value="4">在维护</option>
                                                                                </select> -->
                                        <select class="form-control optional_control" id="operator_5" name="conditionsFormMap.operator">
                                            <option value="0" selected="selected" >=</option>
                                            <!--<option value="1">&lt;&gt;</option>
                                            <option value="5">&gt;=</option>
                                            <option value="6">&lt;=</option>
                                            <option value="2">like</option>
                                            <option value="3">not like</option>
                                             -->
                                        </select>
                                    </div>
                                    <div class="col-md-2 col-sm-2 col-xs-3">
                                        <select class="form-control optional_control" id="value_5" name="conditionsFormMap.value">
                                            <option value="1" ${conditionsFormMap.value eq "1" ? 'selected="selected"':''} >不正常</option>
                                            <option value="0" ${conditionsFormMap.value eq "0" ? 'selected="selected"':''}>正常</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- 	                        	<div class="form-group">
                                                                    <div class="col-md-2 col-sm-2 col-xs-1">&nbsp;</div>
                                                                    <div class="col-md-8 col-sm-8 col-xs-10">
                                                                        <button type="button" class="btn btn-info" id="condition-add-btn"><i class="fa fa-plus-square"></i>&nbsp;添加</button>
                                                                    </div>
                                                                </div> -->
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="tab-content3" aria-labelledby="profile-tab">
                                <div class="form-group">
                                    <label class="control-label col-md-2 col-sm-2 col-xs-3"></label>
                                    <div class="col-md-8 col-sm-8 col-xs-10">
                                        <table class="table table-striped responsive-utilities jambo_table dataTable table-bordered " id="operation_table" style="width: 89%;">
                                            <thead>
                                            <tr>
                                                <th width="20%">操作类型</th>
                                                <th>用户</th>
                                                <th>用户组</th>
                                                <th width="20%">通知方式</th>
                                                <th width="10%">动作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <c:forEach items="${opMaps }" var="opMap">
                                                <tr >
                                                    <td>发送消息<input name="operationsFormMap.operationtype" type="hidden" value="0"></td>
                                                    <td>${opMap.usrsnames }<input name="opmessageUsrFormMap.userid" type="hidden" value="${opMap.usrsids }"></td>
                                                    <td>${opMap.grpsnames }<input name="opmessageGrpFormMap.usrgrpid" type="hidden" value="${opMap.grpsids }"></td>
                                                    <td>${opMap.mediatypedescription }<input name="operationsFormMap.mediatypeid" type="hidden" value="${opMap.mediatypeid }"></td>
                                                    <td><a href="#" class="btn btn-danger btn-xs operation-delete-btn"><i class="fa fa-trash-o"></i> 删除 </a></td>
                                                </tr>
                                            </c:forEach>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2 col-sm-2 col-xs-2">&nbsp;</label>
                                    <div class="col-md-8 col-sm-8 col-xs-10">
                                        <div class="form-group">
                                            <label class="control-label col-md-2 col-sm-2 col-xs-2">通知方式</label>
                                            <div class="col-md-3 col-sm-3 col-xs-6">
                                                <select class="form-control" name="" id="media_type">
                                                    <option value="0">所有</option>
                                                    <c:forEach items="${mediaTypeList }" var="mediaType">
                                                        <option value="${mediaType.mediatypeid }">${mediaType.description }</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-2 col-sm-2 col-xs-2">操作类型</label>
                                            <div class="col-md-3 col-sm-3 col-xs-6">
                                                <select class="form-control" name="" id="operation_type">
                                                    <option value="0" selected="selected">发送消息</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-2 col-sm-2 col-xs-2">用户</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" multiple="multiple" id="select2_user">
                                                    <c:forEach items="${usersList }" var="user">
                                                        <option value="${user.userid }">${user.alias }</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-2 col-sm-2 col-xs-2">用户组</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" multiple="multiple" id="select2_usergrp">
                                                    <c:forEach items="${usrgrpList }" var="usrgrp">
                                                        <option value="${usrgrp.usrgrpid }">${usrgrp.name }</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-md-2 col-sm-2 col-xs-2">&nbsp;</div>
                                            <div class="col-md-8 col-sm-8 col-xs-10">
                                                <button type="button" class="btn btn-info" id="operation-add-btn"><i class="fa fa-plus-square"></i>&nbsp;添加</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--          <div class="ln_solid"></div> -->
                        <div class="form-group">
                            <div class="col-md-6 col-sm-5 col-xs-12 col-md-offset-3">
                                <button type="button" class="btn btn-primary marR10 btn-save" id="action-submit-btn">提交</button>
                                <button type="button" class="btn btn-canel" onclick="javascript:$('#action-form').trigger('update').trigger('back');" style="margin-right: 60px">返回</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        mounted:function () {
            require(
                [
                    rootPath
                    + '/primary/src/devconfig/actionManage/view/actionManageView.js',
                    rootPath
                    + '/primary/src/devconfig/actionManage/model/actionManageModel.js' ],
                function(ActionManageView, ActionManageModel) {
                    var actionManageView = new ActionManageView({
                        el : $('#action-form'),
                        model : new ActionManageModel()
                    });
                })
        }
    }
</script>