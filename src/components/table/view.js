define([ 'jquery'
	, 'underscore'
	, 'backbone'
	, 'http'
	, 'gridList'
	, 'gridModel'
	, 'btnView'
	, 'btnModel'
	, 'layer'
	, './tableTop.html'
	, 'dataSourceModel'
	, 'form'
	, 'common'
	,'serializejson'
	,'jquery-validate'
], function(
	$
	, _
	, Backbone
	, http
	, gridList
	, gridModel
	, btnView
	, btnModel
	, layer
	, tableTop
	,dataSourceModel) {
	var addLayer = null;
	var openUrl='';
	var userView = Backbone.View.extend({

		topTemplate:(function(){
			return _.template(tableTop)
		})(),

		initialize : function(option) {
			var self = this;
			var model = this.model;
			var grid=model.get('grid');
			var appendParam=model.get('appendParam');
			model.set('grid',_.extend({},grid,{onloadFn:option.onloadFn}));
			self.createTop();
			self.getUserList();
		},

		events : {
			'click .searchBtn' : 'search',
			'change .searchType' : 'searchTypeChange',
		},

		filter:function(column,columnVal,lineData,key){
			var filter=column.filter,
				filterCustom=column.filterCustom,
				appendParam=this.model.get('appendParam'),
				color={
					back:['#428bca','#5cb85c','#5bc0de','#f0ad4e','#d9534f'],
					front:['#357ebd','#4cae4c','#46b8da','#eea236','#d43f3a']
				};
			if(!filter){
				return columnVal
			}
			var x={
				warnIcon:function(columnVal){
					var index=columnVal;
					var tem=_.template(
						'<div style="background-color: <%=back%>;width: 2px;height: 40px;margin-left: 10px;margin-top: -8px;margin-bottom: -8px;">' +
						'	<i class="fa-circle fa" style="color:<%=front%>;font-size: 15px;margin-left: -6px;margin-top: 12px;"></i>' +
						'</div>'
					);
					if(index>color.back.length){
						index=color.back.length-1;
					}else if(!index>0){
						index=0;
					}
					return tem({back:color.back[index],front:color.front[index]})
				},
				schedule:function(columnVal){
					var val=parseInt(columnVal);
					var tem= _.template(
						'<div class="progress" style="height: 6px;width: 100%;margin-bottom: 0;margin: 8px 0;"> ' +
						'	<div class="progress-bar" role="progressbar" aria-valuenow="<%=val%>" aria-valuemin="0" aria-valuemax="100" style="width: <%=val%>%;background:<%=color%>;"> ' +
						'		<span class="sr-only"></span> ' +
						'	</div> ' +
						'</div>'
					);
					if(val>100){
						val=100;
					}else if(!val>0){
						val=0;
					}
					var colorIndex=parseInt(val/(100/color.front.length));
					var bg=color.front[colorIndex>=5?5:colorIndex];
					return tem({val:val,color:bg})
				},
				custom:function(columnVal,lineData){
					var template='';
					try{
						template= _.template(filterCustom);
						return template(_.extend({},appendParam,{obj:lineData,val:columnVal}))
					}catch(e){
						console.log(e);
						return columnVal
					}
				},
				trigger:function(columnVal,lineData){
					var type="", txt="";
					switch(parseInt(columnVal)){
						case 0: type='label-primary';txt='其它'; break;
						case 1: type='label-success';txt='提示'; break;
						case 2: type='label-info   ';txt='预警'; break;
						case 3: type='label-warning';txt='警告'; break;
						case 4: type='label-danger ';txt='严重'; break;
						case 5: type='label-inverse';txt='致命'; break;
					}
					return type&&txt?'<span class="label '+type+'">'+txt+'</span>':columnVal;
				},
				monitorDataType:function(columnVal){
					if(columnVal == 0){
						return "浮点";
					}else if(columnVal == 1){
						return "字符";
					}else if(columnVal == 2){
						return "日志";
					}else if(columnVal == 3){
						return "整数";
					}else if(columnVal == 4){
						return "文本";
					}
				}
			};
			return x[filter](columnVal,lineData);
		},

		createTop:function(){
			var self=this,
				model=self.model,
				showTitle=model.get('showTitle'),
				showPage=model.get('showPage'),
				title=model.get('title'),
				grid=model.get('grid');
			if(!showPage){
				$(grid.gridid+'_page').hide();
			}
			if(!showTitle){

			}
		},

		createBtn:function(){
			var self = this,
				model = self.model,
				btn = model.get('btn'),
				gridView = model.get('gridView'),
				appendParam = model.get('appendParam')||{},
				btnCallback= model.get('btnCallback'),
				checkbox= model.get('checkbox'),
				project_path=model.getProjectPath();
			_.each(btn,function (val, key) {
				var url=project_path;
				try{
					url+=_.template(val.url)(appendParam);
				}catch(e){
					val.url&&(url+=val.url.replace(/<%(.+?)%>/g,''));
				}
				new btnView({
					el:$('#btn-' + val.btnId,self.$el),
					model: new btnModel(_.extend({},val,{
						url: url,
						btnCallback:btnCallback,
						bindModel:gridView,//绑定的模块实例映射
						sendBefore:function(bindModel){
							if(/<%(.+?)%>/.test(val.param)||val.param==='all'||val.param==='ALL'||(val.type=="custom"&&bindModel.model.get('checkbox'))){
								try{
									var lineData=bindModel.getGridSelected();
									if(lineData.length){
										return lineData;
									}else{
										layer.msg('请选择数据');
										return false
									}
								}catch(err){
									layer.msg('请启用复选框以供传参');
									return false
								}
							}else{
								return {}
							}
						},//请求发送前的处理方法，返回请求参数模版data对象
					}))
				})
			});
			self.$el.on('click','[pageopen-href]',function(e){ 
				if(e.target.innerHTML!='编辑'){
					e.stopPropagation();  
				} 
				
				var $this=$(this);
				var text=$this.attr('pathnav-name')||$('thead td',self.$el).eq($this.closest('td').index()).text();
				var href=$this.attr('pageopen-href');
				var $content=$('.contentDiv',gridView.$el);
				var $table=$('.tableDiv',gridView.$el);
				if(!href){return}
				openUrl=href;
				$table.slideUp();
				$content.load(project_path+href,{},function(){
					btnCallback&&btnCallback($this);
				}).slideDown();
				gridView.$el.off('back update')
					.on('back','>div:first',function(e){
						e.stopPropagation()
						$table.slideDown();
						$content.slideUp(function(){$content.empty()});
						window.clickHideOnBreadcrumb()//导航路径逻辑
					})
					.on('update','>div:first',function(e){
						e.stopPropagation()
						gridView.searchGrid({});
					});

				window.clickShowOnBreadcrumb(text,project_path+href,model.get('mid'),'notClick');//导航路径逻辑
			})
				.on('click', '[windowopen-href]', function (e) {
					e.stopPropagation();
					var $this = $(this);
					var href = $this.attr('windowopen-href');
					var width = $this.attr('windowopen-width') || '500px';
					var height = $this.attr('windowopen-height') || '500px';
					if (!href) {
						return
					}
					openUrl = href;
					layer.open({
						title: model.get('text'),
						type: 1,
						closeBtn: 1,
						maxmin: true,
						area: [width, height],
						content: CommnUtil.ajax(project_path + href),
						success: function (e, index) {
							$(e).on('close', '.layui-layer-content>div:first', function () {
								layer.close(index);
							}).on('update', '.layui-layer-content>div:first', function () {
								gridView.searchGrid({})
							})
							btnCallback&&btnCallback($this);
						}
					})
				})
				.on('click','[onlyrequest-href]',function(e){
					e.stopPropagation();
					var $this = $(this);
					var href = $this.attr('onlyrequest-href');
					var isConfirm = $this.data('confirm');
					var text=$(this).text();
					if(!href){return}
					if(isConfirm){
						layer.confirm('您确定要继续此操作吗？', {icon: 3, title:'提示'},sendRequest)
					}else if(text.indexOf('删除')>-1){
						layer.confirm('您确定要删除此条信息吗？', {icon: 3, title:'提示'},sendRequest)
					}else{
						sendRequest()
					}
					function sendRequest(){
						http.get(project_path + href).success(function(data){
							btnCallback&&btnCallback($this,data);
							if(!_.isObject(data)){return}
							var msg=data.messages;
							if(data.status==='success'){
								text+='成功';
								gridView.searchGrid({})
							}else{
								text+='失败';
							}
							layer.msg(msg||text);
						}).error(function(err){
							console.log(err);
						})
					}
				})
		},

		getUserList : function() {
			var model = this.model;
			var self = this,
				$el=self.$el,
				showTitle=model.get('showTitle'),
				showPage=model.get('showPage'),
				title=model.get('title'),
				grid=model.get('grid'),
				btn=model.get('btn'),
				isOption=model.get('isOption'),
				appendParam = model.get('appendParam')||{},
				project_path=model.getProjectPath(),
				hasSearch=false;
			grid.url=model.getSourceGetUrl();
			_.map(grid.column,function(val,key){
				if(val.filter){
					//val.renderData=self.filter;
					val.renderData=function(a,columnVal,lineData,key){
						return self.filter(this,columnVal,lineData)
					};
				}
				if(!val.noSearch){
					hasSearch=true;
				}
				return val
			});
			var newBtn=[];
			var dataModel=new dataSourceModel({isOption:isOption});
			_.each(btn,function(val,key){
				if(val.dataSourceId){
					dataModel.getModel(val.dataSourceId).getDate(false,function(data){
						newBtn=newBtn.concat(data);
					},appendParam);
				}else{
					newBtn.push(val);
				}
			});
			model.set('btn',newBtn);
			_.each(grid.column, function (val, key) {
				var nosort = [];
				_.each(val.nosort, function (v, k) {
					if(v.dataSourceId){
						dataModel.getModel(v.dataSourceId).getDate(false,function(data){
							nosort=nosort.concat(data);
						},appendParam)
					}else{
						nosort.push(v)
					}
				});
				val.nosort = nosort;
			});
			$el.html(self.topTemplate({data:model.attributes,hasSearch:hasSearch}));
			setTimeout(function(){
				$el.find('.searchType').change()
			});

			model.set('gridView', new gridList({
				el: self.$el,
				model: new gridModel(grid)
			}));
			self.createBtn();
			if(!showPage){
				$(grid.gridid+'_page',self.el).hide();
			}
		},

		search:function(e){
			e.stopPropagation();
			var self=this,
				model=self.model,
				grid=model.get('grid'),
				gridModel=model.get('gridView'),
				search=$('#'+grid.gridid+'_search',this.$el).serializeJSON();
			gridModel.searchGrid(search);
		},
		searchTypeChange:function(e){
			e.stopPropagation();
			var $e=$(e.currentTarget);
			var val=$e.val();
			$e.next('input').attr('name',val);
		}
	});

	return userView;

});