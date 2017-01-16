/* eslint-disable */
<style lang="less" scoped>
    legend{
        font-size:16px;
        margin-bottom: 5px;
    }
</style>

<template>
    <form id="add_edit_form" name="add_edit_form" class="form-horizontal form-label-left" method="post">
        <input type="hidden" id="hostid" name="hostsFormMap.hostid" value="${hostsFormMap.hostid}">
        <input type="hidden" id="flags" name="hostsFormMap.flags" value="${hostsFormMap.flags}">
        <input type="hidden" id="deviceTypeid" name="hostsFormMap.deviceTypeid" value="${deviceTypeid}">
        <div class="tabbable custom-wraper">
            <ul class="nav nav-tabs padding-12 tab-color-blue padding-left-10 margin-bottom-10 nav-bootstarp">
                <li class="active"><a data-toggle="tab" href="#hosts_div_1"> <i class="green icon-host bigger-110"></i> 设备
                </a></li>
                <li class=""><a data-toggle="tab" href="#hosts_div_2"> <i class="green icon-host bigger-110"></i> 关联模板
                </a></li>
                <li class=""><a data-toggle="tab" href="#hosts_div_3"> <i class="green icon-host bigger-110"></i> IPMI
                </a></li>
                <li class=""><a data-toggle="tab" href="#hosts_div_4"> <i class="green icon-exclamation-sign bigger-110"></i> 宏
                </a></li>
            </ul>
            <div class="tab-content">
                <div id="hosts_div_1" class="tab-pane active">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="row">
                                    <label class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4" style="text-align: left; margin-bottom: 5px;"> 设备名<span style="color: red">*</span></label>
                                    <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                        <input type="text" name="hostsFormMap.host" value="${hostsFormMap.host}" id="host" class="form-control form-input">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="row">
                                    <label class="control-label col-md-8 col-sm-8 col-xs-12" style="text-align: left; margin-bottom: 5px;"> 设备别名<span style="color: red">*</span></label>
                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                        <input type="text" name="hostsFormMap.name" value="${hostsFormMap.name}" id="name" class="form-control form-input">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="row">
                                    <label class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4" style="text-align: left; margin-bottom: 5px;">所属系统</label>
                                    <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                        <select id="region" class="dropDrown-select" name="region">
                                            <c:forEach items="${regions}" var="voo">
                                                <option value="${voo.id}" <c:if test="${voo.id eq regionid}">selected="selected"</c:if>>${voo.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="row">
                                    <label class="control-label col-md-8 col-sm-8 col-xs-12" style="text-align: left; margin-bottom: 5px;">所属组</label>
                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                        <select id="groupid" name="groupid" class="dropDrown-select">
                                            <c:forEach items="${groups}" var="voo">
                                                <option value="${voo.groupid}" <c:if test="${voo.groupid eq deviceTypeGroupid}">selected="selected"</c:if>>${voo.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="control-label col-md-7 col-sm-7 col-xs-12 col-md-offset-2" style="text-align: left; margin-bottom: 5px;">设备类型</label>
                            <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-2">
                                <select id="device_type" name="device_type" class="dropDrown-select">
                                    <c:forEach items="${deviceTypes}" var="voo">
                                        <option value="${voo.id}" <c:if test="${voo.id eq deviceTypeid}">selected="selected"</c:if>>${voo.name}</option>
                                    </c:forEach>
                                </select>
                            </div>
                            <input type="hidden" id="deviceRegionHostid" name="deviceRegionHostid" value="${deviceRegionHostid}" />
                        </div>
                    </div>
                    <div class="form-group" id="div_interf" style="margin-left: 5px;">
                        <div class="row">
                            <label class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-2" style="text-align: left;">采集方式</label>
                            <div class="col-md-8 col-sm-8 col-xs-12 gathering-mode col-md-offset-2" style="margin-top: 8px;">
                                <fieldset>
                                    <legend class="font-text font-color-blue1 border-bottom-dashed">Agent :</legend>
                                    <div class="Agent_dynamicCon">
                                        <table style="width: 100%;">
                                            <tr class="temp">
                                                <td>IP：</td>
                                                <td><input type="text" name="interfaces[1][type]" value="1" style="display: none;" /> <input type="text" name="interfaces[1][ip]" value="127.0.0.1" style="width: 150px" /></td>
                                                <td>DNS：</td>
                                                <td><input type="text" name="interfaces[1][dns]" style="width: 150px" /></td>
                                                <td>Port：</td>
                                                <td><input type="text" value="10050" name="interfaces[1][port]" style="width: 100px;" /></td>
                                                <td>默认：<input type="checkbox" onclick="in_check(this)" id="main" name="interfaces[1][main]" style="margin-bottom: 5px;" value="1" /></td>
                                                <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                            </tr>
                                            <c:if test="${not empty interfaceList}">
                                                <c:forEach items="${interfaceList}" var="vo" varStatus="st">
                                                    <tr class="items">
                                                        <td>IP：</td>
                                                        <td><input type="hidden" name="interfaces[0][interfaceid]" value="${vo.interfaceid}" /> <input type="text" name="interfaces[0][type]" value="${vo.type}" style="display: none;" />
                                                            <input type="text" name="interfaces[0][ip]" value="${vo.ip}" style="width: 150px" /></td>
                                                        <td>DNS：</td>
                                                        <td><input type="text" name="interfaces[0][dns]" value="${vo.dns}" style="width: 150px" /></td>
                                                        <td>Port：</td>
                                                        <td><input type="text" value="${vo.port}" name="interfaces[0][port]" style="width: 100px;" /></td>
                                                        <td>默认：<input type="checkbox" id="main" ${not empty vo.main && vo.main eq 1? 'checked="checked"' :''} onclick="in_check(this)" name="interfaces[0][main]" style="margin-bottom: 5px;"
                                                            value="1"
                                                            /></td>
                                                        <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty interfaceList and empty hostsFormMap.hostid}">
                                                <tr class="items">
                                                    <td>IP：</td>
                                                    <td><input type="text" name="interfaces[2][type]" value="1" style="display: none;" /> <input type="text" name="interfaces[2][ip]" value="127.0.0.1" style="width: 150px" /></td>
                                                    <td>DNS：</td>
                                                    <td><input type="text" name="interfaces[2][dns]" style="width: 150px" /></td>
                                                    <td>Port：</td>
                                                    <td><input type="text" value="10050" name="interfaces[2][port]" style="width: 100px;" /></td>
                                                    <td>默认：<input type="checkbox" checked="checked" id="main" onclick="in_check(this)" name="interfaces[2][main]" style="margin-bottom: 5px;" value="1" /></td>
                                                    <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                                </tr>
                                            </c:if>
                                            <c:if test="${empty interfaceList and not empty hostsFormMap.hostid}">
                                                <tr class="items" id="Agent_tr">
                                                    <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a></td>
                                                </tr>
                                            </c:if>
                                        </table>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend class="font-text font-color-blue1 border-bottom-dashed">SNMP :</legend>
                                    <div class="SNMP_dynamicCon">
                                        <table style="width: 100%; font-size: 16px">
                                            <tr class="temp">
                                                <td>IP：</td>
                                                <td><input type="text" name="interfaces[3][type]" value="2" style="display: none;" /> <input type="text" name="interfaces[3][ip]" value="127.0.0.1" style="width: 150px" /></td>
                                                <td>DNS：</td>
                                                <td><input type="text" name="interfaces[3][dns]" style="width: 150px" /></td>
                                                <td>Port：</td>
                                                <td><input type="text" value="161" name="interfaces[3][port]" style="width: 100px;" /></td>
                                                <td>默认：<input type="checkbox" onclick="in_check(this)" id="main" name="interfaces[3][main]" style="margin-bottom: 5px;" value="1" /></td>
                                                <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                            </tr>
                                            <c:if test="${not empty snmpList}">
                                                <c:forEach items="${snmpList}" var="vo" varStatus="st">
                                                    <tr class="items">
                                                        <td>IP：</td>
                                                        <td><input type="hidden" name="interfaces[0][interfaceid]" value="${vo.interfaceid}" /> <input type="text" name="interfaces[3][type]" value="${vo.type}" style="display: none;" />
                                                            <input type="text" name="interfaces[4][ip]" value="${vo.ip}" style="width: 150px" /></td>
                                                        <td>DNS：</td>
                                                        <td><input type="text" name="interfaces[4][dns]" value="${vo.dns}" style="width: 150px" /></td>
                                                        <td>Port：</td>
                                                        <td><input type="text" value="${vo.port}" name="interfaces[4][port]" style="width: 100px;" /></td>
                                                        <td>默认：<input type="checkbox" id="main" ${not empty vo.main && vo.main eq 1? 'checked="checked"' :''} onclick="in_check(this)" name="interfaces[4][main]" style="margin-bottom: 5px;"
                                                            value="1"
                                                            /></td>
                                                        <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty snmpList}">
                                                <tr class="items" id="SNMP_tr">
                                                    <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td>
                                                </tr>
                                            </c:if>
                                        </table>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend class="font-text font-color-blue1 border-bottom-dashed">IPMI :</legend>
                                    <div class="IPMI_dynamicCon">
                                        <table style="width: 100%; font-size: 16px">
                                            <tr class="temp">
                                                <td>IP：</td>
                                                <td><input type="text" name="interfaces[7][type]" value="3" style="display: none;" /> <input type="text" name="interfaces[7][ip]" value="127.0.0.1" style="width: 150px" /></td>
                                                <td>DNS：</td>
                                                <td><input type="text" name="interfaces[7][dns]" style="width: 150px" /></td>
                                                <td>Port：</td>
                                                <td><input type="text" value="623" name="interfaces[7][port]" style="width: 100px;" /></td>
                                                <td>默认：<input type="checkbox" onclick="in_check(this)" id="main" name="interfaces[7][main]" style="margin-bottom: 5px;" value="1" /></td>
                                                <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                            </tr>
                                            <c:if test="${not empty ipmiList}">
                                                <c:forEach items="${ipmiList}" var="vo" varStatus="st">
                                                    <tr class="items">
                                                        <td>IP：</td>
                                                        <td><input type="hidden" name="interfaces[0][interfaceid]" value="${vo.interfaceid}" /> <input type="text" name="interfaces[8][type]" value="${vo.type}" style="display: none;" />
                                                            <input type="text" name="interfaces[8][ip]" value="${vo.ip}" style="width: 150px" /></td>
                                                        <td>DNS：</td>
                                                        <td><input type="text" name="interfaces[8][dns]" value="${vo.dns}" style="width: 150px" /></td>
                                                        <td>Port：</td>
                                                        <td><input type="text" value="${vo.port}" name="interfaces[8][port]" style="width: 100px;" /></td>
                                                        <td>默认：<input type="checkbox" ${not empty vo.main && vo.main eq 1? 'checked="checked"' :''} onclick="in_check(this)" id="main" name="interfaces[8][main]" style="margin-bottom: 5px;"
                                                            value="1"
                                                            /></td>
                                                        <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty ipmiList}">
                                                <tr class="items" id="IPMI_tr">
                                                    <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td>
                                                </tr>
                                            </c:if>
                                        </table>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend class="font-text font-color-blue1 border-bottom-dashed">JMX :</legend>
                                    <div class="JMX_dynamicCon">
                                        <table style="width: 100%; font-size: 16px">
                                            <tr class="temp">
                                                <td>IP：</td>
                                                <td><input type="text" name="interfaces[5][type]" value="4" style="display: none;" /> <input type="text" name="interfaces[5][ip]" value="127.0.0.1" style="width: 150px" /></td>
                                                <td>DNS：</td>
                                                <td><input type="text" name="interfaces[5][dns]" style="width: 150px" /></td>
                                                <td>Port：</td>
                                                <td><input type="text" value="8999" name="interfaces[5][port]" style="width: 100px;" /></td>
                                                <td>默认：<input type="checkbox" onclick="in_check(this)" id="main" name="interfaces[5][main]" style="margin-bottom: 5px;" value="1" /></td>
                                                <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                            </tr>
                                            <c:if test="${not empty jmxList}">
                                                <c:forEach items="${jmxList}" var="vo" varStatus="st">
                                                    <tr class="items">
                                                        <td>IP：</td>
                                                        <td><input type="hidden" name="interfaces[0][interfaceid]" value="${vo.interfaceid}" /> <input type="text" name="interfaces[6][type]" value="${vo.type}" style="display: none;" />
                                                            <input type="text" name="interfaces[6][ip]" value="${vo.ip}" style="width: 150px" /></td>
                                                        <td>DNS：</td>
                                                        <td><input type="text" name="interfaces[6][dns]" value="${vo.dns}" style="width: 150px" /></td>
                                                        <td>Port：</td>
                                                        <td><input type="text" value="${vo.port}" name="interfaces[6][port]" style="width: 100px;" /></td>
                                                        <td>默认：<input type="checkbox" ${not empty vo.main && vo.main eq 1? 'checked="checked"' :''} onclick="in_check(this)" id="main" name="interfaces[6][main]" style="margin-bottom: 5px;"
                                                            value="1"
                                                            /></td>
                                                        <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty jmxList}">
                                                <tr class="items" id="JMX_tr">
                                                    <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td>
                                                </tr>
                                            </c:if>
                                        </table>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend class=" font-text font-color-blue1 border-bottom-dashed">SSH :</legend>
                                    <div class="SSH_dynamicCon">
                                        <table style="width: 100%; font-size: 16px">
                                            <tr class="temp">
                                                <td>IP：</td>
                                                <td><input type="text" name="interfaces[9][type]" value="5" style="display: none;" /> <input type="text" name="interfaces[9][ip]" value="127.0.0.1" style="width: 150px" /></td>
                                                <td>DNS：</td>
                                                <td><input type="text" name="interfaces[9][dns]" style="width: 150px" /></td>
                                                <td>Port：</td>
                                                <td><input type="text" value="22" name="interfaces[9][port]" style="width: 100px;" /></td>
                                                <td>默认：<input type="checkbox" onclick="in_check(this)" id="main" name="interfaces[9][main]" style="margin-bottom: 5px;" value="1" /></td>
                                                <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                            </tr>
                                            <c:if test="${not empty sshList}">
                                                <c:forEach items="${sshList}" var="vo" varStatus="st">
                                                    <tr class="items">
                                                        <td>IP：</td>
                                                        <td><input type="hidden" name="interfaces[0][interfaceid]" value="${vo.interfaceid}" /> <input type="text" name="interfaces[10][type]" value="${vo.type}" style="display: none;" />
                                                            <input type="text" name="interfaces[10][ip]" value="${vo.ip}" style="width: 150px" /></td>
                                                        <td>DNS：</td>
                                                        <td><input type="text" name="interfaces[10][dns]" value="${vo.dns}" style="width: 150px" /></td>
                                                        <td>Port：</td>
                                                        <td><input type="text" value="${vo.port}" name="interfaces[10][port]" style="width: 100px;" /></td>
                                                        <td>默认：<input type="checkbox" id="main" ${not empty vo.main && vo.main eq 1? 'checked="checked"' :''} onclick="in_check(this)" name="interfaces[10][main]"
                                                            style="margin-bottom: 5px;" value="1"
                                                            /></td>
                                                        <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty sshList}">
                                                <tr class="items" id="SSH_tr">
                                                    <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td>
                                                </tr>
                                            </c:if>
                                        </table>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend class="font-text font-color-blue1 border-bottom-dashed">Telnet :</legend>
                                    <div class="telnet_dynamicCon">
                                        <table style="width: 100%; font-size: 16px">
                                            <tr class="temp">
                                                <td>IP：</td>
                                                <td><input type="text" name="interfaces[0][type]" value="6" style="display: none;" /> <input type="text" name="interfaces[0][ip]" value="127.0.0.1" style="width: 150px" /></td>
                                                <td>DNS：</td>
                                                <td><input type="text" name="interfaces[0][dns]" style="width: 150px" /></td>
                                                <td>Port：</td>
                                                <td><input type="text" value="25" name="interfaces[0][port]" style="width: 100px;" /></td>
                                                <td>默认：<input type="checkbox" onclick="in_check(this)" id="main" name="interfaces[11][main]" style="margin-bottom: 5px;" value="1" /></td>
                                                <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                            </tr>
                                            <c:if test="${not empty telnetList}">
                                                <c:forEach items="${telnetList}" var="vo" varStatus="st">
                                                    <tr class="items">
                                                        <td>IP：</td>
                                                        <td><input type="hidden" name="interfaces[0][interfaceid]" value="${vo.interfaceid}" /> <input type="text" name="interfaces[11][type]" value="${vo.type}" style="display: none;" />
                                                            <input type="text" name="interfaces[11][ip]" value="${vo.ip}" style="width: 150px" /></td>
                                                        <td>DNS：</td>
                                                        <td><input type="text" name="interfaces[11][dns]" value="${vo.dns}" style="width: 150px" /></td>
                                                        <td>Port：</td>
                                                        <td><input type="text" value="${vo.port}" name="interfaces[11][port]" style="width: 100px;" /></td>
                                                        <td>默认：<input type="checkbox" onclick="in_check(this)" id="main" ${not empty vo.main && vo.main eq 1? 'checked="checked"' :''} name="interfaces[11][main]"
                                                            style="margin-bottom: 5px;" value="1"
                                                            /></td>
                                                        <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a> <a href="javascript:void(0);" class="delBtn btn btn-danger btn-xs">删除</a></td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty telnetList}">
                                                <tr class="items" id="telnet_tr">
                                                    <td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td>
                                                </tr>
                                            </c:if>
                                        </table>
                                    </div>
                                </fieldset>
                                <script type="text/javascript">
                                    function in_check(o) {
                                        var m = $(o).parent().parent().parent().find(
                                            "input[id='main']");
                                        m.prop("checked", false);
                                        $(o).prop('checked', true);
                                    }
                                    require(['dynamicCon'],function() {
                                        toInput();
                                        if ("${hostsFormMap.ipmi_privilege}" != "")
                                            $("#ipmi_privilege").val(
                                                "${hostsFormMap.ipmi_privilege}");

                                        if ("${hostsFormMap.ipmi_authtype}" != "")
                                            $("#ipmi_authtype").val(
                                                "${hostsFormMap.ipmi_authtype}");
                                        function reInput(inp_check) {
                                            var b = false;
                                            for ( var i in inp_check) {
                                                if (inp_check[i].checked) {
                                                    b = true;
                                                }
                                            }
                                            if (!b) {
                                                inp_check.prop("checked", false);
                                                inp_check.eq(0).prop('checked', true);
                                            }
                                            toInput()
                                        }
                                        function toInput() {
                                            var sline = 0;
                                            $("#div_interf table tr[class='items']")
                                                .each(
                                                    function(index) {
                                                        $(this)
                                                            .find("input")
                                                            .each(
                                                                function(
                                                                    index) {
                                                                    if (this.name
                                                                            .indexOf("interfaces") > -1) {
                                                                        var n = this.name;
                                                                        var s = n
                                                                            .substring(
                                                                                0,
                                                                                n
                                                                                    .indexOf("[") + 1);
                                                                        var e = n
                                                                            .substring(n
                                                                                .indexOf("]"));
                                                                        this.name = s
                                                                            + sline
                                                                            + e
                                                                    }
                                                                })
                                                        sline++;
                                                    });
                                        }
                                        $
                                            .DynamicCon({
                                                container : ".Agent_dynamicCon",
                                                afterAddOrDel : function(type) {
                                                    if ($('.Agent_dynamicCon table tr').length == 0) {
                                                        $('.Agent_dynamicCon table')
                                                            .append(
                                                                '<tr class="items" id="Agent_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');


                                                    } else {
                                                        $('#Agent_tr').remove();
                                                    }
                                                    var m = $(".Agent_dynamicCon input[id='main']");
                                                    reInput(m);
                                                }

                                            });
                                        $
                                            .DynamicCon({
                                                container : ".SNMP_dynamicCon",
                                                afterAddOrDel : function(type) {
                                                    if ($('.SNMP_dynamicCon table tr').length == 0) {
                                                        $('.SNMP_dynamicCon table')
                                                            .append(
                                                                '<tr class="items" id="SNMP_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                                                    } else {
                                                        $('#SNMP_tr').remove();
                                                    }
                                                    var m = $(".SNMP_dynamicCon input[id='main']");
                                                    reInput(m);
                                                    return true;
                                                }
                                            });
                                        $
                                            .DynamicCon({
                                                container : ".JMX_dynamicCon",
                                                afterAddOrDel : function(type) {

                                                    if ($('.JMX_dynamicCon table tr').length == 0) {
                                                        $('.JMX_dynamicCon table')
                                                            .append(
                                                                '<tr class="items" id="JMX_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                                                    } else {
                                                        $('#JMX_tr').remove();
                                                    }
                                                    var m = $(".JMX_dynamicCon input[id='main']");
                                                    reInput(m);
                                                    return true;
                                                }

                                            });
                                        $
                                            .DynamicCon({
                                                container : ".IPMI_dynamicCon",
                                                afterAddOrDel : function(type) {
                                                    if ($('.IPMI_dynamicCon table tr').length == 0) {
                                                        $('.IPMI_dynamicCon table')
                                                            .append(
                                                                '<tr class="items" id="IPMI_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                                                    } else {
                                                        $('#IPMI_tr').remove();
                                                    }
                                                    var m = $(".IPMI_dynamicCon input[id='main']");
                                                    reInput(m);
                                                    return true;
                                                }
                                            });
                                        $
                                            .DynamicCon({
                                                container : ".SSH_dynamicCon",
                                                afterAddOrDel : function(type) {
                                                    if ($('.SSH_dynamicCon table tr').length == 0) {
                                                        $('.SSH_dynamicCon table')
                                                            .append(
                                                                '<tr class="items" id="SSH_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                                                    } else {
                                                        $('#SSH_tr').remove();
                                                    }
                                                    var m = $(".SSH_dynamicCon input[id='main']");
                                                    reInput(m);
                                                    return true;
                                                }
                                            });
                                        $
                                            .DynamicCon({
                                                container : ".telnet_dynamicCon",
                                                afterAddOrDel : function(type) {
                                                    if ($('.telnet_dynamicCon table tr').length == 0) {
                                                        $(
                                                            '.telnet_dynamicCon table')
                                                            .append(
                                                                '<tr class="items" id="telnet_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                                                    } else {
                                                        $('#telnet_tr').remove();
                                                    }
                                                    var m = $(".telnet_dynamicCon input[id='main']");
                                                    reInput(m);
                                                    return true;
                                                }
                                            });
                                    })
                                </script>
                            </div>
                        </div>
                    </div>
                    <%-- <div style="display: block">
                    <div class="form-group" style="margin-top: 20px">
                        <label for="host"
                               class="control-label col-md-3 col-sm-3 col-xs-12">二级代理</label>
                        <div class="col-md-5 col-sm-5 col-xs-12">
                            <select name="hostsFormMap.proxy_hostid" id="proxy_hostid"><option
                                    value="">无</option>
                                <c:forEach items="${proxy}" var="vo">
                                    <option value="${vo.hostid}"
                                    <c:if test="${hostsFormMap.proxy_hostid eq vo.hostid}">selected="selected"</c:if>>${vo.host}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="host"
                               class="control-label col-md-3 col-sm-3 col-xs-12">监控状态</label>
                        <div class="col-md-5 col-sm-5 col-xs-12">
                            <select name="hostsFormMap.status">
                                <option
                                <c:if test="${hostsFormMap.status eq 0}">selected="selected"</c:if>
                                value="0">启用</option>
                                <option
                                <c:if test="${hostsFormMap.status eq 1}">selected="selected"</c:if>
                                value="1">禁用</option>
                            </select>
                        </div>
                    </div>
                </div> --%>
                    <div style="display: block">
                        <div class="form-group" style="margin-top: 20px">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12 col-md-offset-4" style="text-align: left; margin-bottom: 5px;">二级代理</label>
                                        <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-4">
                                            <select name="hostsFormMap.proxy_hostid" id="proxy_hostid" class="dropDrown-select"><option value="">无</option>
                                                <c:forEach items="${proxy}" var="vo">
                                                    <option value="${vo.hostid}" <c:if test="${hostsFormMap.proxy_hostid eq vo.hostid}">selected="selected"</c:if>>${vo.host}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="row">
                                        <label class="control-label col-md-8 col-sm-8 col-xs-12" style="text-align: left; margin-bottom: 5px;">监控状态</label>
                                        <div class="col-md-8 col-sm-8 col-xs-12">
                                            <select name="hostsFormMap.status" class="dropDrown-select">
                                                <option <c:if test="${hostsFormMap.status eq 0}">selected="selected"</c:if> value="0">启用</option>
                                                <option <c:if test="${hostsFormMap.status eq 1}">selected="selected"</c:if> value="1">禁用</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="hosts_div_2" class="tab-pane">
                    <div class="form-group">
                        <label for="host" class="control-label col-md-3 col-sm-3 col-xs-12">关联模板</label>
                        <div class="col-md-5 col-sm-5 col-xs-12">
                            <table style="width: 100%" class="table table-striped responsive-utilities jambo_table dataTable" id="linkTemplateTb">
                                <thead>
                                <tr>
                                    <td style="width: 80%">名称
                                    </th>
                                    <td style="width: 20%">动作
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <c:forEach items="${linkedTempaltes}" var="vo">
                                    <tr>
                                        <td><input type="hidden" value="${vo.hostid}" />${vo.host}</td>
                                        <td><input type="button" value="取消关联" id="${vo.hostid}" class="delLinkedTemplate"></td>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </table>
                            <input type="hidden" name="txtSelectedTemplateId" id="txtSelectedTemplateId" value="${txtSelectedTemplateId}">
                        </div>
                    </div>
                    <div class="form-group" id="linkNewTemplate">
                        <label for="host" class="control-label col-md-3 col-sm-3 col-xs-12">关联新模板</label> <a type="button" class="btn btn-primary btn-info" href="javascript:void(0);" id="openSelectLinkTemplateButton"
                                                                                                             style="margin-left: 10px;"
                    >选择</a>
                    </div>
                    <div id="template_window" class="x_panel" style="display: none;">
                        <div class="form-horizontal form-label-left">
                            <div class="item form-group" style="padding-left: 22%; margin-top: 10px;">
                                模板类型 <select id="groupsSelectDiv" name="groups" class="dropDrown-select" style="width: 284px;">
                            </select>
                            </div>
                            <div id="template_div" class="item form-group">
                                <input id="iframeid" type="hidden" />
                                <div class="grid_list" id="template_list"></div>
                                <div class="grid_page" id="template_list_page"></div>
                            </div>
                            <div class="item form-group">
                                <button type="button" class="btn btn-info" id="getSelectedTemplates" style="margin-left: 20px">选择</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="hosts_div_3" class="tab-pane">
                    <div class="form-horizontal form-label-left">
                        <div class="form-group">
                            <div class="row">
                                <label for="host" class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align: left; margin-bottom: 5px;">认证方式</label>
                                <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                    <select name="hostsFormMap.ipmi_authtype" id="ipmi_authtype" class="dropDrown-select">
                                        <option value="-1" ${hostsFormMap.ipmi_authtype eq "-1" ? 'selected="selected"':''}>默认</option>
                                        <option value="0" ${hostsFormMap.ipmi_authtype eq "0" ? 'selected="selected"':''}>无</option>
                                        <option value="1" ${hostsFormMap.ipmi_authtype eq "1" ? 'selected="selected"':''}>MD2</option>
                                        <option value="2" ${hostsFormMap.ipmi_authtype eq "2" ? 'selected="selected"':''}>MD5</option>
                                        <option value="4" ${hostsFormMap.ipmi_authtype eq "4" ? 'selected="selected"':''}>Straight</option>
                                        <option value="5" ${hostsFormMap.ipmi_authtype eq "5" ? 'selected="selected"':''}>OEM</option>
                                        <option value="6" ${hostsFormMap.ipmi_authtype eq "6" ? 'selected="selected"':''}>RMCP+</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label for="host" class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align: left; margin-bottom: 5px;">优先级</label>
                                <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                    <select name="hostsFormMap.ipmi_privilege" id="ipmi_privilege" class="dropDrown-select">
                                        <option value="1" ${hostsFormMap.ipmi_privilege eq "1" ? 'selected="selected"':''}>回呼</option>
                                        <option value="2" ${hostsFormMap.ipmi_privilege eq "2" ? 'selected="selected"':''}>用户</option>
                                        <option value="3" ${hostsFormMap.ipmi_privilege eq "3" ? 'selected="selected"':''}>操作者</option>
                                        <option value="4" ${hostsFormMap.ipmi_privilege eq "4" ? 'selected="selected"':''}>管理者</option>
                                        <option value="5" ${hostsFormMap.ipmi_privilege eq "5" ? 'selected="selected"':''}>OEM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label for="host" class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align: left; margin-bottom: 5px;">用户名</label>
                                <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                    <input type="text" name="hostsFormMap.ipmi_username" id="ipmi_username" class="form-control form-input" value="${hostsFormMap.ipmi_username}">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label for="host" class="control-label col-md-5 col-sm-5 col-xs-12 col-md-offset-3" style="text-align: left; margin-bottom: 5px;">密码</label>
                                <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                                    <input type="password" name="hostsFormMap.ipmi_password" id="ipmi_password" class="form-control form-input" value="${hostsFormMap.ipmi_password}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="hosts_div_4" class="tab-pane">
                    <div class="col-md-9 col-sm-9 col-xs-12">
                        <div class="fm-ctrl">
                            <div class="fm-ctrl margin-bottom-10" id="addMacroButton" style="margin-left: 17%;">
                                <a href="javascript:void(0)" class="btn btn-info addRow">添加</a>
                            </div>
                        </div>
                        <table style="width: 100%; margin-left: 17%;" class="table table-striped responsive-utilities jambo_table dataTable" id="host_macroTb">
                            <colgroup width="260px" />
                            <colgroup width="40px" />
                            <colgroup width="260px" />
                            <colgroup width="50px" />
                            <thead>
                            <tr>
                                <td>表达式
                                </th>
                                <td>
                                </th>
                                <td>值
                                </th>
                                <td>操作
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach items="${macros}" var="vo" varStatus="s">
                                <tr>
                                    <td><input class="input_small" type="text" style="width: 260px; text-transform: uppercase;" name="macros[${s.index}][macro]" value="${vo.macro}" size="25" maxlength="64"></td>
                                    <td>=><input type="hidden" name="macros[${s.index}][hostmacroid]" value="${vo.hostmacroid}" /></td>
                                    <td><input class="input_small" type="text" style="width: 260px" name="macros[${s.index}][value]" value="${vo.value}" size="25" maxlength="255"></td>
                                    <!-- <td><input type="button" value="删除" class="deleteRow"></td> -->
                                    <td><button type="button" class="close center-block" style="float: none;" aria-label="Close">
                                        <span aria-hidden="true" class="deleteRow">&times;</span>
                                    </button></td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-5 col-sm-5 col-xs-12 col-md-offset-3">
                <button type="button" data-loading-text="Loading..." class="btn btn-success btn-s-xs save-button btn-save">提交</button>
                <button type="button" class="btn btn-default btn-s-xs back-button btn-canel" onclick="$('#hostFormBox').trigger('back');">取消</button>
            </div>
        </div>
    </form>

</template>

<script>
    module.exports = {
        mounted:function () {
            var add_eidt_view_;
            require([ rootPath + '/primary/src/devconfig/host/view/add_eidt.js' ],
                function(add_eidt_view, add_eidt_model) {
                    add_eidt_view_ = new add_eidt_view({
                        el : $('#hostFormBox')
                    });
                });

            function in_check(o) {
                var m = $(o).parent().parent().parent().find(
                    "input[id='main']");
                m.prop("checked", false);
                $(o).prop('checked', true);
            }
            require(['dynamicCon'],function() {
                toInput();
                if ("${hostsFormMap.ipmi_privilege}" != "")
                    $("#ipmi_privilege").val(
                        "${hostsFormMap.ipmi_privilege}");

                if ("${hostsFormMap.ipmi_authtype}" != "")
                    $("#ipmi_authtype").val(
                        "${hostsFormMap.ipmi_authtype}");
                function reInput(inp_check) {
                    var b = false;
                    for ( var i in inp_check) {
                        if (inp_check[i].checked) {
                            b = true;
                        }
                    }
                    if (!b) {
                        inp_check.prop("checked", false);
                        inp_check.eq(0).prop('checked', true);
                    }
                    toInput()
                }
                function toInput() {
                    var sline = 0;
                    $("#div_interf table tr[class='items']")
                        .each(
                            function(index) {
                                $(this)
                                    .find("input")
                                    .each(
                                        function(
                                            index) {
                                            if (this.name
                                                    .indexOf("interfaces") > -1) {
                                                var n = this.name;
                                                var s = n
                                                    .substring(
                                                        0,
                                                        n
                                                            .indexOf("[") + 1);
                                                var e = n
                                                    .substring(n
                                                        .indexOf("]"));
                                                this.name = s
                                                    + sline
                                                    + e
                                            }
                                        })
                                sline++;
                            });
                }
                $
                    .DynamicCon({
                        container : ".Agent_dynamicCon",
                        afterAddOrDel : function(type) {
                            if ($('.Agent_dynamicCon table tr').length == 0) {
                                $('.Agent_dynamicCon table')
                                    .append(
                                        '<tr class="items" id="Agent_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');


                            } else {
                                $('#Agent_tr').remove();
                            }
                            var m = $(".Agent_dynamicCon input[id='main']");
                            reInput(m);
                        }

                    });
                $
                    .DynamicCon({
                        container : ".SNMP_dynamicCon",
                        afterAddOrDel : function(type) {
                            if ($('.SNMP_dynamicCon table tr').length == 0) {
                                $('.SNMP_dynamicCon table')
                                    .append(
                                        '<tr class="items" id="SNMP_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                            } else {
                                $('#SNMP_tr').remove();
                            }
                            var m = $(".SNMP_dynamicCon input[id='main']");
                            reInput(m);
                            return true;
                        }
                    });
                $
                    .DynamicCon({
                        container : ".JMX_dynamicCon",
                        afterAddOrDel : function(type) {

                            if ($('.JMX_dynamicCon table tr').length == 0) {
                                $('.JMX_dynamicCon table')
                                    .append(
                                        '<tr class="items" id="JMX_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                            } else {
                                $('#JMX_tr').remove();
                            }
                            var m = $(".JMX_dynamicCon input[id='main']");
                            reInput(m);
                            return true;
                        }

                    });
                $
                    .DynamicCon({
                        container : ".IPMI_dynamicCon",
                        afterAddOrDel : function(type) {
                            if ($('.IPMI_dynamicCon table tr').length == 0) {
                                $('.IPMI_dynamicCon table')
                                    .append(
                                        '<tr class="items" id="IPMI_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                            } else {
                                $('#IPMI_tr').remove();
                            }
                            var m = $(".IPMI_dynamicCon input[id='main']");
                            reInput(m);
                            return true;
                        }
                    });
                $
                    .DynamicCon({
                        container : ".SSH_dynamicCon",
                        afterAddOrDel : function(type) {
                            if ($('.SSH_dynamicCon table tr').length == 0) {
                                $('.SSH_dynamicCon table')
                                    .append(
                                        '<tr class="items" id="SSH_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                            } else {
                                $('#SSH_tr').remove();
                            }
                            var m = $(".SSH_dynamicCon input[id='main']");
                            reInput(m);
                            return true;
                        }
                    });
                $
                    .DynamicCon({
                        container : ".telnet_dynamicCon",
                        afterAddOrDel : function(type) {
                            if ($('.telnet_dynamicCon table tr').length == 0) {
                                $(
                                    '.telnet_dynamicCon table')
                                    .append(
                                        '<tr class="items" id="telnet_tr"><td><a href="javascript:void(0);" class="addBtn btn btn-success btn-xs">添加</a><a href="javascript:void(0);" class="delBtn"></a></td></tr>');
                            } else {
                                $('#telnet_tr').remove();
                            }
                            var m = $(".telnet_dynamicCon input[id='main']");
                            reInput(m);
                            return true;
                        }
                    });
            });

            $(".save-button").click(function() {
                add_eidt_view_.savebutton();
            });
        }
    }
</script>