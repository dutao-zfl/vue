define([
    'jquery'
    , 'underscore'
    , 'http'
    , 'layer'
    , 'tableModel'
    , 'tableView'
], function ($
    , _
    , http
    , layer
    , tableModel
    , tableView
) {
    var url = system_path + '/config/find_view.shtml';
    function loadModel (model) {
        var requireModel=[];
        var modelTypeList='record,table,ring,custom,baseTable';
        var defModel='chart';
        if (modelTypeList.indexOf(model.model.type)>-1) {
            requireModel.push(model.model.type+'Model', model.model.type+'View');
        } else {
            requireModel.push(defModel+'Model', defModel+'View');
        }
        var reqView=eval(requireModel[1]);
        var reqModel=eval(requireModel[0]);
        var module = new reqView(
            _.extend( _.omit(model,'onload','resKey'), {
                model: new reqModel(model.model)
            })
        );
        model.el.data('model',module);
        model.onload(module);
        /*require(requireModel,function(m,v){
            var module = new v(
                _.extend( _.omit(model,'onload','resKey'), {
                    model: new m(model.model)
                })
            );
            model.el.data('model',module);
            model.onload(module);
        })*/
    }

    function func (container, param, appendParam, modelData) {//container与appendParam参数对应为modelData的el与appendParam属性
        if (!param||!container) {
            return
        }
        var $container = container instanceof $ ? container : $(container);
        var modelView = null;
        var modeleConfig = {
            onloadFn: function (e) {
                var $e = e ? $(e) : $(this.el);
                $e.addClass('in');
            }
        };

        var defmodel= _.extend({
            el:$container.empty().off().addClass('fade2'),
            model: _.extend({appendParam:appendParam&&appendParam.data},modelData),
            resKey:'',
        },modeleConfig)
        if(param&&_.isObject(param)){
            if(param.resKey){
                defmodel.resKey=param.resKey;
            }else{
                _.extend(defmodel.model,param)
            }
        }
        func2(defmodel)

    };//old

    function unbindToggleTree(sParent,sTree,hideDomStr,showDomStr){
        $('body').off('click',hideDomStr);
        $('body').off('click',showDomStr);
    } ;
    //用于控制左边栏目录结构的显示与隐藏
    function toggleTree(param){
        var sParent ='#display-view';
        var sTree ='#tree';
//不需要控制左边目录树显示的tag
        var arr=['#resHostsList','#resGroupsList','hhh','#resGroupsHostList','#resGroupsJobList'];	 //hhh应该是还没有实现的部分
//dom筛选
        var hideDomStr=sParent+' #user_paging_search .btn-info:contains(新增),table.jambo_table a:contains(编辑)';
        var showDomStr=' button.btn-save:contains(确定) , button.btn-save:contains(提交) , button.btn-canel:contains(取消)'
        var domStr='.page_title';
//解绑
        unbindToggleTree(sParent,sTree,hideDomStr,showDomStr);
        if(arr.indexOf(param[0])<0){
            $('body').on('click',hideDomStr,function(){
                $(sTree).parent().hide();
                $(domStr).hide();
            });
            $('body').on('click',showDomStr,function(){
            
                	if($(sParent).find('.tableDiv').is(':visible')){
                        $(sTree).parent().show();
                        $(domStr).show();
                    }
              
               
            });
        }
    };
    function func2 (model) {//container与appendParam参数对应为modelData的el与appendParam属性
        if (!model||!model.el) {
            layer.msg('错误的初始化参数')
            return
        }
        var appendModel = {
            onloadFn: function (e) {
                var $e = e ? $(e) : $(this.el);
                $e.addClass('in');
            }
        };
        var defmodel= _.extend({
            el:$(),
            model:{appendParam:''},
            resKey:'',
            onload:function(){}
        },appendModel,model);

        defmodel.el.empty().off().addClass('fade2');
        defmodel.model.isOption=false;

        if(defmodel.model.appendParam){
            defmodel.model.appendParam.id && (delete  defmodel.model.appendParam.id)
            defmodel.model.appendParam.resKey && (delete  defmodel.model.appendParam.resKey)
        }
        if (defmodel.resKey) {
            http.post(url, {resKey:defmodel.resKey}, '', '', {notSend: true}).success(function(data){
                var model = {};
                try {
                    if (data && data.attribute) {
                        model = JSON.parse(data.attribute)
                    } else if (_.isString(data)) {
                        model = JSON.parse(data)
                    }else{
                        model=data
                    }
                }catch(e){
                    layer.msg('返回数据处理发生错误，详情查看控制台');
                    console.log(e)
                }
                _.extend(defmodel.model,model)
                loadModel(defmodel);
            });
        } else if(defmodel.model) {
            loadModel(defmodel)
        }else{
            layer.msg('无法获取到model数据')
        }
    };//new
    return function(){
        toggleTree(arguments);
        return (arguments.length===1?func2:func).apply(this,arguments)
    }
})