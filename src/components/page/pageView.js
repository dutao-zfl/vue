/**
 * Created by Administrator on 2016/8/22 0022.
 */
define(
    [
        'jquery'
        , 'underscore'
        , 'layer'
        , 'http'
        , 'backbone'
        , 'modelTypeList'
        , 'modelAnalyze'
        , 'gridster'
        , 'resize'
    ]
    , function (
        $
        , _
        ,layer
        ,http
        ,Backbone
        ,modelTypeList
        ,modelAnalyze) {
        var param = {
            pageid: '',
            viewmodel: [
                {
                    id: '',
                    position: ''
                }
            ]
        };
        var gridster=null;
        var modelList=null;
        var view = Backbone.View.extend({
            modelListTemplate:_.template(
                '<li class="dropdown-header">' +
                '   <span>模块名称</span>' +
                '   <span style="float: right;">模块类型</span>' +
                '</li>' +
                '<%_.each(data,function(val,key){%>' +
                '<li>' +
                '   <a href="#" data-id="<%=val.id%>">' +
                '       <%=val.name%>' +
                '       <span style="float: right;"><%=val.typeName%></span>' +
                '   </a>' +
                '</li>' +
                '<%})%>'
            ),
            modelHtmlTemplate:_.template(
                '<div data-id="<%=id%>">' +
                '   <header>' +
                '       <div class="text-long col-md-6"><%=data%>' +
                '           <span><%=time%></span>' +
                '       </div>' +
                '       <div class="btnbox col-md-6" style="text-indent: 0;text-align: right;">' +
                '           <i class="fa fa-refresh"></i>' +
                '           <%if(desc){%><i class="fa fa-question tips" data-placement="bottom" data-toggle="tooltip" title="<%=desc%>"></i><%}%>' +
                    //'           <i class="fa fa-expand"></i>' +
                '           <i class="fa fa-close removeModel"></i>' +
                '       </div>' +
                '   </header>' +
                '   <div class="model-body fade2">' +
                '   </div>' +
                '</div>'
            ),
            navTemplate: _.template(
                '<%_.each(data,function(val,key){%>' +
                '<a data-targetid="<%=val.id%>">' +
                '   <i class="fa fa-book"></i>' +
                '   <%=val.name%>' +
                '</a>' +
                '<%})%>'
            ),
            initialize : function(options) {
                var self = this;
                var model = this.model;
                var isview = model.get('isview')==='true';
                gridster=null;
                modelList=null;
                //model.set('isNav','true');
                self.addModelList();
                self.refreshModel();
            },
            events:{
                'click #addModelList a':'addModel',
                'click #addModel':'gotoAddModel',
                'click .removeModel':'removeModel',
                'click #saveModel':'saveModel',
                'click header .fa-refresh':'refresh',
                'click #refreshModel':'refreshModel',
                'click .pageContent>.right>a':'navClick',
                'change #conf_name':'pageChange',
            },
            pageChange: function (e) {
                var $e=$(e.currentTarget);
                var val=$e.val();
                val&&$("#appMain").load(system_path+val);
            },
            navClick:function(e){
                var self=this;
                var $e=$(e.currentTarget);
                var id=$e.data('targetid');
                var $model=$('.gridster [data-id="'+id+'"]',this.el);
                var $appMain=self.$el.closest('#appMain');
                var scrollTop=$model.offset().top-self.$el.offset().top-5;
                if(!$model.length){layer.msg('错误的目标模块');return}
                $model.addClass('outline').siblings().removeClass('outline');
                $e.addClass('active').siblings().removeClass('active');
                $appMain.animate({scrollTop:scrollTop});
            },
            addModelList:function(){
                var self = this;
                var model = this.model;
                var isview = model.get('isview')==='true';
                param.pageid=model.get('resKey');
                if(isview){
                    return
                }
                $('#topGroup').show();
                http.post(model.get('getList'), {pagenum: 1, pagesize: 1000},'','',{notSend:true})
                    .success(function (data) {
                        if (!data||!data.records) {
                                return
                        }

                        modelList =_.map(data.records,function(val,key){
                            _.each(modelTypeList,function(v,k){
                                if(v===val.type){
                                    val.typeName=k;
                                    return false
                                }
                            });
                            return val;
                        });
                        $('#addModelList', this.el).html(self.modelListTemplate({data: data.records}));
                    })
                    .error(function (err) {
                        console.log(err);
                    });
            },
            refreshModel:function(){
                var self=this;
                var model=self.model;
                var timeOut=null;
                var width=null;
                var fn = _.debounce(function () {
                    if ($(window).width() == width) {
                        return
                    }
                    width = $(window).width();
                    self.gridsterReset();
                    http.post(model.get('findPage'), _.pick(param, 'pageid'),'','',{notSend:true})
                        .success(function (data) {
                            var modelList = _.map(data.module, function (val) {
                                return _.extend({}, JSON.parse(val.attribute), {
                                    id: val.id,
                                    position: JSON.parse(val.position)
                                });
                            });
                            if(model.get('isNav')=='true'){
                                self.createNav(modelList);
                            }
                            self.createModelDiv(self.appendParam(modelList));
                        })
                }, 600);
                $(this.$el).off('resize');
                $(this.$el).resize(fn);
                $(this.$el).resize();
            },
            addModel:function(e){
                var self = this;
                var model = this.model;
                var $e = $(e.currentTarget);
                var modelId = $e.data('id');
                var lineData=modelList[$e.parent().index()-1];
                if(!modelId){
                    return
                }
                if(!lineData||lineData.id!=modelId){
                    layer.msg('组件数据错误');
                }
                var modelData=JSON.parse(lineData.attribute);
                self.createModelDiv(_.extend({},modelData,{id:lineData.id}));
            },
            gotoAddModel:function(){
                var self=this;
                self.$el.hide().after('<div id="addUIPage"></div>');
                $('#addUIPage').load(system_path + '/config/addUI.shtml',{},function(){
                    $('#addUI').on('back',function(){
                        var $e=$(this);
                        self.$el.slideDown();
                        $e.slideUp(function(){
                            $e.remove();
                        });
                    })
                });

            },
            removeModel:function(e){
                var self = this;
                var model = this.model;
                var $e = $(e.currentTarget);
                var index = $e.closest('.gs-w').index();
                gridster.remove_widget($e.closest('.gs-w'));
            },
            saveModel:function(e){
                var model = this.model;
                var self=this;
                param.viewmodel=JSON.stringify(self.getModelDiv());
                http.post(model.get('savePage'),param).success(function(data){
                    layer.msg(data ? '保存成功' : '保存失败')
                })
            },
            getModelDiv:function(){
                var modelParam=[];
                $(".gridster>.gs-w").each(function(){
                    var $this=$(this),modelData=$this.data();
                    modelParam.push({
                        id:modelData.id,
                        position:JSON.stringify(_.pick(modelData,'col','row','sizex','sizey'))
                    })
                });
                return modelParam;
            },
            gridsterReset:function(){
                var self=this;
                var  margin=[5,5];//[左右,上下]
                var isview=self.model.get('isview')=='true';
                var isNav=self.model.get('isNav')=='true';//;
                var $pageMain=$('.pageContent',self.el);
                if(isNav){
                    $pageMain.addClass('showRight');
                }else{
                    $pageMain.remove('showRight');
                }
                gridster=$(".gridster").off().removeData().empty().gridster({
                    widget_margins: [0,0],
                    widget_base_dimensions: (function(){
                        var width=parseInt($('.gridster',this.el).parent().width()/24*10)/10;
                        return [width,30]
                    })(),
                    avoid_overlapped_widgets: true,
                    draggable: {
                        handle: isview?'#noneElement':'header .text-long'
                    },
                    resize: {
                        enabled: isview?false:true,
                        stop: function (event, ui) {
                            var $e=$(ui.$helper),
                                $model=$(ui.$helper).parent();
                            var view=$model.data('model');
                            if(view.createChart){
                                view.createChart({chart:{height:$model.height()-40,width:$model.width()-10}})
                            }
                        },
                    }
                }).data('gridster');
            },
            createNav:function(modelList){
                var self=this;
                var model=this.model;
                var $main=$('.pageContent .right',this.el).empty();
                $main.html(self.navTemplate({data:modelList}));
            },
            createModel:function(model){
                modelAnalyze(model)
            },
            createModelDiv:function(modelList){
                var $modelList=[];
                var self=this;
                var model=this.model;
                var time=model.get('key_time');
                var  margin=[5,5];//[左右,上下]
                if(!modelList)   return;
                _.isArray(modelList)||(modelList=[modelList]);
                $.each(modelList, function (i, val) {
                    var tempData={data:val.name,id:val.id,time:'',desc:val.desc};
                    var position=[];
                    var gridsterOption=[];
                    if(val.position){
                        with (val.position){
                            if(col==1&&row==1&&time){
                                tempData.time=new Date(parseInt(time)).Format('yyyy-MM-dd hh:mm:ss');
                            }
                            position=[sizex, sizey, col, row];
                        }
                    }else{
                        position=[6,8]
                    }
                    gridsterOption=[self.modelHtmlTemplate(tempData)].concat(position);
                    var $model= gridster.add_widget.apply(gridster,gridsterOption);
                    $modelList.push($model);
                    if(model.get('isview')==='true'&&val.hideHeader){
                       $model.find('header').hide();
                    }
                    var modeleConfig={
                        el:$model.find('.model-body'),
                        model:val,
                        errorFn:self.errorFn,
                        onloadFn:function(e){
                            var $e=e?$(e):$(this.el);
                            $e.addClass('in');
                        }
                    };
                    var height = $model.height();
                    if(model.get('isview')==='true'){
                        if(!val.hideHeader){
                            $model.find('header').show();
                            modeleConfig.el.css({height:height-40})
                        }else{
                            $model.find('header').hide();
                        }
                    }else{
                        modeleConfig.el.css({height:height-40})
                    }
                    if(val.type==='record'){
                        if(model.get('isview')!=='true'){
                            $model.find('header').hide();
                        }
                    }else if(val.type==='table'){
                    }else if(val.type==='ring'){
                    }else if(val.type==='custom'){
                    }else if(val.type==='baseTable'){
                    }else{
                        modeleConfig.onload=function(module){
                        };
                    }
                    self.createModel(modeleConfig);
                });

                return $modelList
            },
            refresh:function(e){
                var self = this;
                var model = this.model;
                var $e = $(e.currentTarget);
                var m = $e.closest('.gs-w').find('>.model-body').data('model');
               self.update.call(m);
            },
            update:function(){
                this.model.set('cacheData','');
                this.initialize({onloadFn:''});
            },
            errorFn:function(err,view){
                var  option=this;
                var  self=view;
                var  model=view.model;
                var  errorNum=model.get('errorNum');
                var  error=model.get('error');
                model.set('errorNum',++errorNum);
                model.set('error',true);
                console.log('名称为：'+model.get('name')+' 的组件加载失败,即将重试一次');
                if(errorNum<2){
                    self.model.set('cacheData','');
                    self.initialize(option);
                }
            },
            appendParam:function(modelList){
                var self=this;
                var pageData=self.model.attributes;
                if(!pageData.paramKey){return modelList}
                var paramKey=pageData.paramKey.split(',');
                var appendParam={};
                _.map(paramKey,function(val,key){
                    appendParam[val]=pageData[val];
                });
                return _.map(modelList,function(val,key){
                    val.appendParam=appendParam||{};
                    return val;
                })
            },
        });

        return view;
    }
)