/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
    <div id="proxyHostaddForm">
        <form id="addForm" name="addForm" action="" method="POST">
            <input type="hidden" id="hostid" name="hostsFormMap.hostid"
                   value="${hostsFormMap.hostid}" />
            <div class="tabbable">
                <div class="tab-content form-horizontal form-label-left">
                    <div class="form-group">
                        <div class="row">
                            <label for="" class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align:left;margin-bottom:5px;">名称</label>
                            <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                <input type="text" id="host" name="hostsFormMap.host"
                                       class="form-control form-input" value="${hostsFormMap.host}">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align:left;margin-bottom:5px;"
                                   for="status">代理模式</label>
                            <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                <select class="input dropDrown-select" id="status"
                                        name="hostsFormMap.status" size="1">
                                    <option value="5"
                                            ${hostsFormMap.status eq "5" ? 'selected="selected"':''}>主动式</option>
                                    <option value="6"
                                            ${hostsFormMap.status eq "6" ? 'selected="selected"':''}>被动式</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" id="div_interf"
                         style="margin-left: 5px; display: none;">
                        <label for="" class="control-label col-md-3 col-sm-3 col-xs-12">接口</label>
                        <div class="col-md-9 col-sm-9 col-xs-12 gathering-mode">
                            <fieldset>
                                <div class="Agent_dynamicCon">
                                    <table style="width: 100%;">
                                        <c:if test="${empty hostsFormMap.hostid}">
                                            <tr class="items">
                                                <td>IP：</td>
                                                <td><input type="text" name="interfaces[0][type]"
                                                           value="1" style="display: none;" /> <input type="text"
                                                                                                      name="interfaces[0][ip]" value="127.0.0.1"
                                                                                                      style="width: 150px" /></td>
                                                <td>DNS：</td>
                                                <td><input type="text" name="interfaces[0][dns]"
                                                           style="width: 150px" /></td>
                                                <td>Port：</td>
                                                <td><input type="text" value="10050"
                                                           name="interfaces[0][port]" style="width: 100px;" /></td>
                                            </tr>
                                        </c:if>
                                        <c:if test="${not empty hostsFormMap.hostid}">
                                            <c:forEach items="${interfaces}" var="vo" varStatus="st">
                                                <tr class="items">
                                                    <td>IP：</td>
                                                    <td><input type="hidden"
                                                               name="interfaces[0][interfaceid]" value="${vo.interfaceid}" />
                                                        <input type="text" name="interfaces[0][type]"
                                                               value="${vo.type}" style="display: none;" /> <input
                                                                type="text" name="interfaces[0][ip]" value="${vo.ip}"
                                                                style="width: 150px" /></td>
                                                    <td>DNS：</td>
                                                    <td><input type="text" name="interfaces[0][dns]"
                                                               value="${vo.dns}" style="width: 150px" /></td>
                                                    <td>Port：</td>
                                                    <td><input type="text" value="${vo.port}"
                                                               name="interfaces[0][port]" style="width: 100px;" /></td>
                                                </tr>
                                            </c:forEach>
                                        </c:if>
                                    </table>
                                </div>
                            </fieldset>
                        </div>
                    </div>


                    <%@ include file="/common/proxyHostsSelector.jsp"%>
                    <div class="form-group">
                        <div class="col-md-7 col-sm-5 col-xs-12 col-md-offset-3">
                            <button type="button" class="btn btn-primary marR10 btn-save" id="submit">保存</button>
                            <button type="button" class="btn btn-canel"
                                    onclick="javascript:$('#proxyHostaddForm').trigger('update').trigger('back');" style="margin-right: 213px">取消</button>
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
                    + '/primary/src/devconfig/proxyHost/view/proxyHostOperateView.js',
                    rootPath
                    + '/primary/src/devconfig/proxyHost/model/proxyHostOperateModel.js' ],
                function(ProxyHostOperateView, ProxyHostOperateModel) {
                    var proxyHostOperateView = new ProxyHostOperateView({
                        el : $('#proxyHostaddForm'),
                        model : new ProxyHostOperateModel()
                    });
                })
        }
    }
</script>