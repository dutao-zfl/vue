$.ajaxSetup(
    {
        //options.url='http://192.168.11.43:1212'+options.url;
        //dataType: 'jsonp',
    }
);

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    let moduleUrl =getModuleUrl(options.url);
    if(moduleUrl){
        options.success({moduleName:moduleUrl});
        jqXHR.abort();//终止ajax请求
    }else{
        options.url = "/api" + options.url;
    }
});

window.system_path='/snc-system';
/**************api映射区域********************/
const addNewPath='src/custom/amp/addNew/'; //新增页面路径
const customPage={
    amp:{
        addNew:{//新增
            '/snc-amp/devconfig/templatesManage/add.shtml':addNewPath+'user_add',//系统管理-系统基础管理-用户管理
            '/snc-system/groups/addUI.shtml':addNewPath+'group_add',//系统管理-系统基础管理-组管理
            '/snc-system/resources/addUI.shtml':addNewPath+'menu_add',//系统管理-系统基础管理-菜单管理
            '/snc-system/regionManage/addUI.shtml':addNewPath+'scope_add',//系统管理-系统基础管理-域管理
            '/snc-system/config/addUI.shtml':addNewPath+'assembly_add',//系统管理-系统基础管理-添加组件/界面配置
            '/snc-system/datasource/add.shtml':addNewPath+'data_add',//系统管理-系统基础管理-数据源
            '/snc-system/dictionary/addUI.shtml':addNewPath+'dictionaries_add',//系统管理-数据字典管理-字典列表
            /***************************************************/
            '/snc-amp/devconfig/templatesManage/add.shtml':addNewPath+'templatesManage_add',//配置管理-配置管理-模板管理
            '/snc-amp/devconfig/hostsManage/addUI.shtml':addNewPath+'hostsManage_add',//配置管理-配置管理-主机管理
            '/snc-amp/config/groups/add.shtml':addNewPath+'config_groups_add',//配置管理-配置管理-主机组管理
            '/snc-amp/config/deviceType/add_edit.shtml':addNewPath+'deviceType_add',//配置管理-配置管理-设备类型管理
            '/snc-amp/devconfig/proxyHost/addPage.shtml':addNewPath+'proxyHost_add',//配置管理-配置管理-代理主机管理
            '/snc-amp/devconfig/noticeManage/add.shtml':addNewPath+'noticeManage_add',//配置管理-配置管理-通知管理
            '/snc-amp/devconfig/actionManage/add.shtml':addNewPath+'actionManage_add',//配置管理-配置管理-动作管理
            /***************************************************/
        }
    }
};
//$.ajax('/snc-system/datasource/add.shtml',{success:function(a){console.log(a)}})
/***************辅助方法**********************/
const getModuleUrl=(url)=>{
    let result=null;
    Object.keys(customPage).map(v=>{
        let group=customPage[v];//组节点
        Object.keys(group).map(v1=>{
            let fn=group[v1];//功能节点
            Object.keys(fn).map(v2=>{
                if(url.indexOf(v2)>=0) {
                    result = fn[v2]; //api节点
                }
            })
        })
    });
    return result;
}
