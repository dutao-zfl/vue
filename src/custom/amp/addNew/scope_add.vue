/* eslint-disable */
<style lang="less" scoped>

</style>

<template>
   <div>
       <div class="l_err" style="width: 100%; margin-top: 2px;"></div>
       <div class="col-md-12 col-sm-12 col-xs-12">
           <div class="x_panel">
               <div class="form-wraper">
                   <form id="addform" name="addform" class="form-horizontal" method="post"
                         action="${pageContext.request.contextPath}/regionManage/addEntity.shtml">


                       <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                           <label class="control-label col-md-3 col-sm-3 col-xs-12">名称</label>
                           <div class="col-md-6 col-sm-6 col-xs-12">
                               <input type="text" class="form-control form-input" placeholder="名称"
                                      name="regionFormMap.name" id="dictionarycode" snc_validate="请输入名称" maxlength="20">
                           </div>
                       </div>
                       <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                           <label class="control-label col-md-3 col-sm-3 col-xs-12">编码</label>
                           <div class="col-md-6 col-sm-6 col-xs-12">
                               <input type="text" class="form-control form-input" placeholder="编码"
                                      name="regionFormMap.code" id="dictionaryvalue" snc_validate="请输入编码" maxlength="20">
                           </div>
                       </div>
                       <div class="item form-group col-md-12 col-sm-12 col-xs-12">
                           <label class="control-label col-md-3 col-sm-3 col-xs-12">类别</label>
                           <div class="col-md-6 col-sm-6 col-xs-12">
                               <select class="dropDrown-select regionLevel" name="regionFormMap.level">
                                   <option value="0">域</option>
                                   <option value="1">组</option>
                               </select>
                           </div>
                       </div>
                       <div class="item form-group col-md-12 col-sm-12 col-xs-12" id="regionParent" style="display:none;">
                           <label class="control-label col-md-3 col-sm-3 col-xs-12">所属域</label>
                           <div class="col-md-6 col-sm-6 col-xs-12">
                               <select class="dropDrown-select" name="regionFormMap.parent_id">
                                   <c:forEach var="key" items="${region}">
                                       <option value="${key.id}">${key.name}</option>
                                   </c:forEach>
                               </select>
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
            $('.regionLevel').on('change', function () {
                var v = $(this).children('option:selected').val();
                if (v == 0) {
                    $('#regionParent').hide();
                } else {
                    $('#regionParent').show();
                }
            });
        }
    }
</script>