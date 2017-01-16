/**
 * Created by Administrator on 2016/11/17 0017.
 */
define([
    'jquery',
    'underscore',
],function($,_){
    var projectPath=null;
    return function(project){
        if(!projectPath){
            $.ajax({
                cache: false,
                type: 'POST',
                url: system_path+'/config/project_path.shtml',
                data: {},
                async : false,
                dataType:'json',
                success:function(data){
                    projectPath=data
                }
            });
        }
        return project?projectPath[project]:projectPath;
    }
})