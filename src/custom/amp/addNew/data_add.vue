/* eslint-disable */
<style lang="less" scoped>
    .formatType-custom,.type-sql{
        display: none;
    }
</style>

<template>
    <div id="dataSource">
        <form class="form-horizontal" style="width: 550px;margin: 10px auto;">
            <input type="hidden" name="id">
            <div class="form-group">
                <label class="col-md-2 control-label">名称</label>
                <div class="col-md-8">
                    <input type="text" name="name"  style="width: 400px"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">描述</label>
                <div class="col-md-8">
                    <input type="text" name="description" style="width: 400px"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">类型</label>
                <div class="col-md-8" name="type">
                    <select name="type">
                        <option value="sql">SQL</option>
                        <option value="url">url</option>
                    </select>
                </div>
            </div>
            <div class="form-group type-url">
                <label class="col-md-2 control-label">url</label>
                <div class="col-md-8">
                    <input type="text" name="url" style="width: 400px"/>
                </div>
            </div>
            <div class="form-group type-url">
                <label class="col-md-2 control-label">预览url</label>
                <div class="col-md-8">
                    <input type="text" name="demoUrl" style="width: 400px"/>
                </div>
            </div>
            <div class="form-group type-sql">
                <label class="col-md-2 control-label">SQL</label>
                <div class="col-md-8">
                    <input type="text" name="sql" style="width: 400px"/>
                </div>
            </div>
            <div class="form-group type-sql">
                <label class="col-md-2 control-label">SQL格式</label>
                <div class="col-md-8">
                    <select name="sqlDataType">
                        <option value="">默认</option>
                        <option value="table">分页列表</option>
                    </select>
                </div>
            </div>
            <div class="form-group type-sql">
                <label class="col-md-2 control-label">预览SQL</label>
                <div class="col-md-8">
                    <input type="text" name="demoSql" style="width: 400px"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">源处理格式</label>
                <div class="col-md-8">
                    <select name="formatType">
                        <option value="">默认</option>
                        <option value="custom">自定义</option>
                    </select>
                </div>
            </div>
            <div class="form-group formatType-custom">
                <label class="col-md-2 control-label">模版</label>
                <div class="col-md-8">
                    <textarea name="customFormat" placeholder="数据格式化模版" style="width: 380px;height: 120px"></textarea>
                    <i class="fa fa-question-circle tips" data-toggle="tooltip" data-placement="top" title="采用_.template()进行格式化编译，编译中会将数据源返回数据以data变量传入，编译结果必须为标准的JSON格式，示例：[&lt;%_.each(data,function(v,i){%&gt;{&quot;id&quot;:&lt;%=v.id%&gt;,&quot;param&quot;:{&quot;name&quot;:&quot;&lt;%=v.name%&gt;&quot;}}&lt;%=i===(data.length-1)?&quot;&quot;:&quot;,&quot;%&gt;&lt;%})%&gt;]"></i>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">校验配置</label>
                <div class="col-md-8">
                    <select name="projectPath">
                        <c:forEach items="${path}" var="k">
                            <option value="${k.db_key}">${k.db_value}</option>
                        </c:forEach>
                    </select>
                    <input type="button" class="btn btn-info check" value="校验"/>
                    <i class="fa fa-question-circle tips" data-toggle="tooltip" data-placement="top" title="在选择系统校验数据格式是否正常！"></i>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-12 text-center">
                    <input type="button" class="btn btn-info add" value="保存"/>
                    <input type="button" class="btn btn-def cancel" value="取消"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    module.exports = {
        mounted:function () {
            require(['dataSourceModel','dataSourceView'],function(m,v){
                var request;
                try{
                    request=${empty param.data ? 'false':param.data};
                }catch(err){
                    request=false
                }
                new v({
                    el:'#dataSource',
                    model:new m({request:request})
                })
            })
        }
    }
</script>