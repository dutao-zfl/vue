define([
        'jquery',
        'underscore',
        'backbone',
        'http',
        'getProjectPath'
    ],
    function ($, _, Backbone,http,getProjectPath) {
        var datalist=null;
        var sqlUrl='/webservice/dynamic/data.shtml';
        var model = Backbone.Model.extend({
            defaults: {
                isOption:true,
                name:'',
                description:'',
                type:'',

                url:'',
                demoUrl:'',

                sql:'',
                demoSql:'',
                sqlDataType:'',

                formatType:'',
                customFormat:'',
                projectPath:'',
            },
            getDate:function(async,callback,appendParam){
                var model=this,
                    type=model.get('type'),
                    sqlDataType=model.get('sqlDataType'),
                    formatType=model.get('formatType'),
                    customFormat=model.get('customFormat'),
                    projectPath=model.get('projectPath'),
                    demoUrl=model.get('demoUrl'),
                    demoSql=model.get('demoSql'),
                    isOption=model.get('isOption'),
                    url=model.get('url'),
                    sql=model.get('sql'),
                    newUrl,param;
                switch (type){
                    case 'url':
                        try{
                            url=_.template(url)(appendParam||{});
                        }catch(e){
                            url&&(url=url.replace(/<%(.+?)%>/g,''));
                        }
                        newUrl=isOption?demoUrl|| url:url;
                        param={};
                        break;
                    case 'sql':
                        newUrl=sqlUrl;
                        param={
                            sql:isOption?demoSql||sql:sql,
                            type:sqlDataType
                        };
                        break;
                    default :
                        break;
                }
                $.ajax({
                    cache: false,
                    type: 'POST',
                    url: getProjectPath(projectPath)+newUrl,
                    data: param,
                    async : async,
                    dataType:'json',
                    success:function(data){
                        var redata;
                        try{
                            if(formatType=='custom'&&customFormat){
                                redata=JSON.parse(_.template(customFormat)({data:data}))
                            }else if(!formatType){
                                redata=data;
                            }
                        }catch(e){
                            console.log(e);
                            redata=false;
                        }
                        callback&&callback(redata)
                    }
                });
            },
            getModel:function(id,callback){
                if(!id){return false}
                var model=this;
                $.ajax({
                    cache: false,
                    type: 'POST',
                    url: system_path+'/datasource/findEntity.shtml',
                    data: {id:id},
                    async : false,
                    dataType:'json',
                    success:function(data){
                        var redata={};
                        try{
                            redata=JSON.parse(data.attribute)
                        }catch(e){
                            console.log(e)
                        }
                        model.set(redata);
                        callback&&callback(redata)
                    }
                });
                return model;
            },
            selectTemplate:function(){
                return _.template(
                    '<%_.each(data,function(v,i){%>' +
                    '<option value="<%=v.id%>"><%=v.name%></option>' +
                    '<%})%>'
                )
            }(),
            getList:function(el){
                var self=this;
                var $el=el instanceof $?el:$(el);
                if(!datalist){
                    $.ajax({
                        cache: false,
                        type: 'POST',
                        url: system_path+'/datasource/findByPage.shtml',
                        data: {pagenum:1,pagesize:1000},
                        async : false,
                        dataType:'json',
                        success:function(data){
                            datalist=data;
                        }
                    });
                }
                if(_.isFunction(el)){
                    el(datalist);
                }else if($el.length){
                    $el.append(self.selectTemplate({data:datalist.records})).each(function(){
                        var $this=$(this);
                        $this.val($this.data('value'));
                    })
                }
            }
        });
        return model;
    });