define([
		'jquery',
		'underscore',
		'backbone',
		'http',
		'modelTypeList',
		'backFill',
		'modelAnalyze',
		'dataSourceModel',
		'icheck',
		'layer',
		'validate',
		'select2',
		'bootstrap',
		'jquery-ui',
	],
	function(
		$,
		_,
		Backbone,
		http,
		modelTypeList,
		backFill,
		modelAnalyze,
		dataSourceModel) {
		$.fn.form2Json=function(e){
			var $e=$(this);
			var nodeName=$e.prop('nodeName');
			if(['FORM','INPUT','TEXTAREA','SELECT'].indexOf(nodeName)===-1){
				return '错误的标签'+nodeName;
			}
			var data=$e.serializeArray();
			var newData={};
			for(var i=0;i<data.length;i++){
				if(newData[data[i].name]){
					if(!_.isArray(newData[data[i].name])){
						newData[data[i].name]=[newData[data[i].name]];
					}
					newData[data[i].name].push(data[i].value);
				}else{
					newData[data[i].name]=data[i].value;
				}
			}
			return newData;
		};

		var paramList={};
		var chart={};
		var table={};
		var modelType='chart';
		var dataModel=new dataSourceModel();
		var moduleView = Backbone.View.extend({
			state:{
				data:'',
				$el:'',
				chartType:'',
				chartName:'',
				tableOption:{},
			},
			chartTypeList:modelTypeList,
			chartTypeTemplate:(function(){
				return _.template(
				'<%_.each(data,function(val,key){%>' +
				'<li class>' +
				'	<a href="javascript:;" class="" data-url="tpl/page1">' +
				'		<i class="charts charts-<%=val%>"></i>' +
				'		<span class="menu-text"> <%=key%> </span>' +
				'	</a> ' +
				'</li>' +
				'<%})%>'
			)})(),
			selectTemplate:(function(){
				return _.template(
					'<%_.each(data,function(val,key){%>' +
					'<optgroup label="<%=key%>">' +
					'	<%_.each(val,function(v,k){%>' +
					'	<option value="<%=k%>"><%=k%></option>' +
					'	<%})%>' +
					'</optgroup>' +
					'<%})%>'
				)
			})(),
			pathLineTemplate:(function(){
				return _.template(
					'<div class="col-md-12">' +
					'	<div class="row"> ' +
					'		<label class="col-md-5">阀值线</label> ' +
					'		<input type="range" min="0" max="100" name="pathLine" value="<%=val%>"> ' +
					'	</div>' +
					'</div>'
				)
			})(),
			columnTemplate:(function(){
				return _.template(
					'<div class="col-md-12"> ' +
					'	<div class="row"> ' +
					'		<div class="columnTop">' +
					'			<label class="col-md-6 title text-long" title="<%=key%>"><%=key%></label> ' +
					'			<label class="col-md-4 text-right" style="line-height: 30px;">' +
					'				隐藏' +
					'				<input type="checkbox" name="columnShow-<%=key%>" >' +
					'			</label>' +
					'			<div class="col-md-2 text-right"> ' +
					'				<i class="fa fa-close removeColumn" aria-hidden="true" ></i> ' +
					'			</div> ' +
					'		</div>' +
					'		<div class="columnBody">' +
					'			<div class="col-md-12"> ' +
					'				<input type="text" required placeholder="label" name="column-<%=key%>"> ' +
					'			</div> ' +
					'			<div class="col-md-12"> ' +
					'				<input type="text" placeholder="列宽度" name="width-<%=key%>"> ' +
					'			</div> ' +
					'			<label class="col-md-5">过滤器样式</label> ' +
					'			<select class="col-md-7" name="columnFilter-<%=key%>"> ' +
					'				<option value="">默认</option>' +
					'				<option value="custom">自定义</option>' +
					'				<option value="warnIcon">告警(0-4)</option>' +
					'				<option value="schedule">进度条(0-100)</option>' +
					'				<option value="trigger">触发器级别(0-5)</option>' +
					'				<option value="monitorDataType">监控项数据类型(0-4)</option>' +
					'			</select> ' +
					'			<div class="col-md-10 filter-custom" style="display: none;"> ' +
					'				<input type="text" required placeholder="自定义过滤器模版" name="filterCustom-<%=key%>"> ' +
					'			</div> ' +
					'			<div class="col-md-2 filter-custom" style="display:none;line-height: 30px;">' +
					'				<i class="fa fa-question-circle tips" data-toggle="tooltip" data-placement="left" title="示例：&lt;a&gt;&lt;%=obj%&gt;&lt;%=val%&gt;&lt;/a&gt;;其中obj为该行数据对象，val为当前列的值"></i>		' +
					'			</div>' +
					'			<label class="col-md-5">禁用查询</label>' +
					'			<div class="col-md-7 check-height">' +
					'				<input type="checkbox" name="noSearch-<%=key%>">' +
					'			</div>' +
					'			<label class="col-md-5">筛选项目</label>' +
					'			<div class="col-md-7 check-height">' +
					'				<input type="hidden" name="nosort-<%=key%>">' +
					'				<div class="btn btn-info sortOption">设置</div>' +
					'			</div>' +
					'		</div>' +
					'	</div> ' +
					'</div>'
				)
			})(),
			btnTemplate:(function(){
				return _.template(
					'<div class="col-md-12"> ' +
					'	<div class="row"> ' +
					'		<input type="hidden" title="按钮唯一标识" name="btnId-<%=key%>" value="<%=key%>">' +
					'		<label class="col-md-4">按钮功能</label>'+
					'		<select class="col-md-6 btnType" name="btnType-<%=key%>"> ' +
					'			<option value="onlyRequest">仅发送请求</option> ' +
					'			<option value="pageOpen">在当前页面打开</option> ' +
					'			<option value="windowOpen">在弹窗中打开</option> ' +
					'			<option value="blank">在新窗口打开</option> ' +
					'			<option value="custom">自定义</option> ' +
					'		</select>'+
					'		<div class="col-md-2 text-right"> ' +
					'			<i class="fa fa-close removeBtn" aria-hidden="true" ></i>' +
					'		</div> ' +
					'		<label class="col-md-4">按钮位置</label>'+
					'		<select class="col-md-6" name="position-<%=key%>"> ' +
					'			<option value="">头部</option> ' +
					'			<option value="bottom">底部</option> ' +
					'		</select>'+
					'		<div class="col-md-12"> ' +
					'			<input type="text" placeholder="按钮文本text" required name="btnText-<%=key%>">' +
					'		</div> ' +
					'		<div class="notcustom">' +
					'			<div class="col-md-10"> ' +
					'				<input type="text" placeholder="请求路径url" required name="btnUrl-<%=key%>">' +
					'			</div> ' +
					'			<div class="col-md-2" style="line-height: 30px;"> ' +
					'				<i class="fa fa-question-circle tips" data-toggle="tooltip" data-placement="top" title="url不含项目名，可配置动态参数，例如：url?hostID=&lt;%=hostID%&gt;&b=&lt;%=b1%&gt;"></i>' +
					'			</div> ' +
					'			<div class="col-md-10"> ' +
					'				<input type="text" placeholder="请求参数param" name="btnParam-<%=key%>">' +
					'			</div> ' +
					'			<div class="col-md-2" style="line-height: 30px;"> ' +
					'				<i class="fa fa-question-circle tips" data-toggle="tooltip" data-placement="top" title="请求参数模版，例：a=&lt;%=a1%&gt;&b=&lt;%=b1%&gt;，输入ALL则会传递选中行的所有数据"></i>' +
					'			</div> ' +
					'			<div class="col-md-10"> ' +
					'				<input type="text" placeholder="按钮确认信息" name="btnAlert-<%=key%>">' +
					'			</div> ' +
					'		</div>' +
					'		<div class="onlyRequest btnType"> ' +
					'			<div class="col-md-10"> ' +
					'				<input type="text" placeholder="返回描述信息" required name="btnBackDesc-<%=key%>">' +
					'			</div> ' +
					'			<div class="col-md-2" style="line-height: 30px;"> ' +
					'				<i class="fa fa-question-circle tips" data-toggle="tooltip" data-placement="top" title="接口返回格式规范：{status:success||error,messages:操作返回信息};优先显示返回的messages字段，若不存在则显示当前配置信息"></i>' +
					'			</div> ' +
					'		</div> ' +
					'		<div class="windowOpen btnType" style="display: none"> ' +
					'			<div class="col-md-12"> ' +
					'				<input type="text" placeholder="width" required name="btnWidth-<%=key%>">' +
					'			</div> ' +
					'			<div class="col-md-12"> ' +
					'				<input type="text" placeholder="height" required name="btnHeight-<%=key%>">' +
					'			</div> ' +
					'		</div> ' +
					'	</div> ' +
					'</div>'
				)
			})(),
			btnUrlTemplate:function(){
				return _.template(
					'<div class="col-md-12"> ' +
					'	<div class="row"> ' +
					'		<input type="hidden" title="按钮唯一标识" name="btnId-<%=key%>" value="<%=key%>">' +
					'		<label class="col-md-4">数据源</label>'+
					'		<select class="col-md-6" name="dataSourceId-<%=key%>" data-value="<%=val%>"> ' +
					'			<option value="">请选择数据源</option> ' +
					'		</select>'+
					'		<div class="col-md-2 text-right"> ' +
					'			<i class="fa fa-close removeBtn" aria-hidden="true" ></i>' +
					'		</div> ' +
					'	</div> ' +
					'</div>'
				)
			}(),
			groupTemplate:(function(){
				return _.template(
					'<div class="col-md-12">' +
					'	<div class="row">' +
					'		<input type="hidden" title="按钮唯一标识" name="groupId-<%=key%>" value="<%=key%>">' +
					'		<label class="col-md-4">类型</label> ' +
					'		<select class="col-md-6 groupType" name="type-<%=key%>"> ' +
					'			<option value="" selected>默认</option>' +
					'		<%_.each(chartType,function(val,key){%>' +
					'			<option value="<%=val%>"><%=key%></option>' +
					'		<%})%>' +
					'		</select> ' +
					'		<div class="col-md-2 text-right"> ' +
					'			<i class="fa fa-close removeGroup" aria-hidden="true" ></i>' +
					'		</div> ' +
					'		<label class="col-md-5">分组键</label> ' +
					'		<div class="col-md-12">' +
					'			<select class="omitArr select2" multiple="multiple" name="key-<%=key%>" style="width: 100%"> ' +
					'				<option value="">请读取数据源</option>' +
					'			</select> ' +
					'		</div>' +
					'		<div class="col-md-12"> ' +
					'			<input type="text" placeholder="分组值a,b..." name="val-<%=key%>"> ' +
					'		</div> ' +
					'		<label class="col-md-12">分组坐标</label> ' +
					'		<div class="col-md-12">' +
					'			<select class="omitArr select2" multiple="multiple" name="dataAxes-<%=key%>" style="width: 100%"> ' +
					'				<option value="">请读取数据源</option>' +
					'			</select> ' +
					'		</div>' +
					'		<div class="col-md-12"> ' +
					'			<input type="text" placeholder="坐标顺序" name="dataSort-<%=key%>"> ' +
					'		</div> ' +
					'		<label class="col-md-5">分组颜色</label> ' +
					'		<div class="col-md-7"> ' +
					'			<input type="color" placeholder="颜色" name="color-<%=key%>"> ' +
					'		</div> ' +
					'		<div class="col-md-12"> ' +
					'			<input type="text" placeholder="分组名称" name="name-<%=key%>"> ' +
					'		</div> ' +
					'		<div class="col-md-12"> ' +
					'			<input type="text" placeholder="前置单位" name="valuePrefix-<%=key%>"> ' +
					'		</div> ' +
					'		<div class="col-md-12"> ' +
					'			<input placeholder="后置单位" type="text" name="valueSuffix-<%=key%>"> ' +
					'		</div> ' +
					'		<div class="col-md-12 typeGroup"> ' +
					'			<div class="pie row" style="display: none;"> ' +
					'				<div class="col-md-12"><input placeholder="饼图大小" type="text" name="size-<%=key%>"> </div> ' +
					'				<div class="col-md-12"> <input placeholder="空心大小" type="text" name="innerSize-<%=key%>"> </div> ' +
					'				<div class="col-md-12"> <input placeholder="饼图位置x,y" type="text" name="center-<%=key%>"> </div> ' +
					'			</div> ' +
					'		</div>' +
					'	</div>' +
					'</div>')
			})(),
			ringTemplate:(function(){
				return _.template(
					'<div class="col-md-12">' +
					'	<div class="row">' +
					'		<input type="hidden" title="按钮唯一标识" name="ringId-<%=key%>" value="<%=key%>">' +
					'		<label class="col-md-5">前景色</label> ' +
					'		<div class="col-md-5"> ' +
					'			<input type="color" placeholder="前景色" name="barColor-<%=key%>"> ' +
					'		</div> ' +
					'		<div class="col-md-2 text-right"> ' +
					'			<i class="fa fa-close removeGroup" aria-hidden="true" ></i>' +
					'		</div> ' +
					'		<label class="col-md-5">背景色</label> ' +
					'		<div class="col-md-5"> ' +
					'			<input type="color" placeholder="背景色" name="barBgColor-<%=key%>"> ' +
					'		</div> ' +
					'	</div>' +
					'</div>')
			})(),
			sortSingleTemplate:(function(){
				return _.template(
					'<%_.each(data,function(v,k){' +
					'var random=_.now().toString(36)+_.random(0,99);%>' +
					'<div class="sortTem" style="margin: 10px 0;">' +
					'	<i class="fa fa-arrows moveSort" style="width:14px;"></i>' +
					'	<%if(v.dataSourceId){%>' +
					'	<input type="hidden" name="label-<%=random%>" style="width:149px;" value="<%-v&&v.label%>" placeholder="筛选项文本">' +
					'	<select style="width:300px;" name="dataSourceId-<%=random%>" data-value="<%=v&&v.dataSourceId%>">' +
					'		<option value=" ">请选择数据源</option>' +
					'	</select>' +
					'	<%}else{%>' +
					'	<input type="text" name="label-<%=random%>" value="<%-v&&v.label%>" style="width:149px;" placeholder="筛选项文本">' +
					'	<input type="text" name="param-<%=random%>" value="<%-v&&v.param%>" style="width:149px;" placeholder="筛选参数">' +
					'	<%}%>' +
					'	<i class="fa fa-close removeSort"></i>' +
					'</div>' +
					'<%})%>'
				)
			})(),
			/**
			 * [initialize 初始化]
			 * @return {[type]} []
			 */
			initialize : function(options) {
				var self = this;
				var model = this.model;
				var el = this.el;
				var request = model.get('request');
				if(request){
					if(request[0]){
						request= _.extend(request[0],JSON.parse(request[0].attribute));
					}
					model.set('request',request)
				}
				var offsetHeight = $(window).height()-238;
				var formArea='#publicForm,#modelPublic';
				var $mid=$('[name="mid"]');
				http.get(system_path+'/resources/reslists.shtml')
					.success(function(data){
						$('#reslists',self.$el).data('reslists',data).html(_.template(
							'<option value="">请选择对应资源</option>' +
							'<%_.each(data,function(val,key){%>' +
							'<option value="<%=val.id%>"><%=val.name%></option>' +
							'<%})%>'
						)({data:data}));
					})
				$('#preview').height(offsetHeight);
				$('#modelMain .tab-content').height(offsetHeight);
				$('#nav-list',this.el).html(self.chartTypeTemplate({data:self.chartTypeList}));
				self.checkParam($(formArea,this.el));
				$('input[type="checkbox"]').iCheck({checkboxClass: 'icheckbox_flat-blue'});
				$('#chartForm input[type="checkbox"]').on('ifChanged', function () {
					self.chartInputChange.call(self, {currentTarget: this});
				});
				$('select[name="iconClass"]').select2({
					templateResult:function(state) {
					if (!state.id) { return state.text; }
					return '<span><i class="fa ' + state.element.value + '"></i> ' + state.text + '</span>';
					}
				});
				if(request){
					setTimeout(function(){
						switch (request.type){
							case 'record':
								formArea+=',#recordForm';
								break;
							case 'table':
								formArea+=',#tableForm';
								self.tableBackfill();
								break;
							case 'ring':
								formArea+=',#ringForm';
								self.ringBackfill();
								break;
							case 'custom':
								formArea+=',#customForm';
								break;
							case 'baseTable':
								formArea+=',#baseTableForm';
								break;
							default :
								formArea+=',#chartForm,#chartHighForm';
								_.extend(model.attributes,request);
								self.chartBackfill();
								break;
						}
						backFill(formArea,request);
						$('.charts-'+request.type,el).click();
						$('.btn[value="预览"]',formArea).click();
					})
				}
				$('#columnList',self.$el).sortable({
						items :'>div',
						handle :'.title',
						//containment:'#columnList',
						axis:'y',
						helper:'clone',
				})
			},
			events : {
				/*通用组件事件*/
				'click #nav-list li' : 'changeModelType',
				'click .fold-title .fa-minus,.fold-title .fa-plus' : 'fold',
				'change #dataInterfaceInput' : 'changeDataType',
				'click #retrieveData' : 'retrieveData',
				'click .backPage' : 'backPage',
				'click .floatLabel' : 'floatLabel',
				'change #reslists' : 'reslistsChange',
				'dblclick #publicForm input[name="dataSQL"]' : 'textBox',

				/*table组件事件*/
				'click #addTable' : 'addTable',
				'click #addColumn' : 'addColumn',
				'click .removeColumn' : 'removeColumn',
				'click #resetColumn' : 'resetColumn',
				'click #tableReview' : 'tableReview',
				'click #tableApply' : 'tableApply',
				'change select.btnType' : 'changeBtnType',
				'click #addBtn' : 'addBtn',
				'click #addBtnUrl' : 'addBtnUrl',
				'click .removeBtn' : 'removeBtn',
				'click #resetBtn' : 'resetBtn',
				'click .sortOption' : 'sortOption',
				'change select[name^="columnFilter"]' : 'columnFilterChange',
				'click .columnTop' : 'columnTopSlide',

				/*chart组件事件*/
				'change #chartForm [name],#publicForm [name]' : 'chartInputChange',
				'click #addLine' : 'addLine',
				'click #delLine' : 'delLine',
				'click #addChart' : 'addChart',
				'click #addGroup' : 'addGroup',
				'click .removeGroup' : 'removeGroup',
				'click #resetGroup' : 'resetGroup',
				'click #chartReview' : 'chartReview',
				'click .backTab' : 'backTab',
				'change .groupType' : 'groupTypeChange',

				/*record组件事件*/
				'click #recordReview' : 'recordReview',
				'click #addRecord' : 'addRecord',

				/*ring组件事件*/
				'click #addRing' : 'addRing',
				'click .removeRing' : 'removeRing',
				'click #resetRing' : 'resetRing',
				'click #ringReview' : 'ringReview',
				'click #submitRing' : 'submitRing',

				/*custom组件事件*/
				'click #customReview' : 'customReview',
				'click #submitCustom' : 'submitCustom',

				/*baseTable组件事件*/
				'click #baseTableReview' : 'baseTableReview',
				'click #submitBaseTable' : 'submitBaseTable',
			},

			/*通用方法*/
			textBox:function(e){
				var $e=$(e.currentTarget);
				var addLayer = layer.open({
					title : "编辑sql",
					type : 1,
					closeBtn : 1,
					shift:1,
					area : [ "800px", "550px" ],
					content :'<textarea style="height: 100%;width: 100%;"></textarea>',
					btn : [ '确认', '关闭' ],
					success:function(el){
						$('textarea',el).val($e.val());
					},
					yes : function(index,el) {
						$e.val($('textarea',el).val());
						layer.close(index);
					}
				});
			},
			backTab:function(){
				$('#modelMain>.nav-tabs a').eq(1).tab('show');
				$('#modelMain>.tab-content').scrollTop(0);
			},
			fold:function(e){
				var $e=$(e.currentTarget),
					className=['fa-minus','fa-plus'];
				$e.toggleClass(className[0]).toggleClass(className[1]);
				$e.closest('.fold-title').next('.fold-body').slideToggle();
			},
			backPage:function(e){
				this.$el.trigger('back');
			},
			dataFormat:function(data){
				var relay = null, node = [],self=this;
				for (var i in data) {
					if (!data.hasOwnProperty(i)) continue;
					if(_.isArray(data[i])){
						if(!paramList['Array']){
							paramList['Array']={};
						}
						if(!(i>=0)){
							paramList['Array'][i]=data[i];
						}
					}
					if (_.isObject(data[i])) {
						self.dataFormat(data[i]);
						continue;
					}
					if(!paramList[typeof data[i]]){
						paramList[typeof data[i]]={}
					}
					if(!(i>=0)&&!paramList[typeof data[i]][i]){
						paramList[typeof data[i]][i]=data[i];
					}
				}
			},
			retrieveData:function(e){
				var self = this;
				var model = this.model;
				var urldata = model.getSourcePostJson();
				var obj = $(e.currentTarget);
				var dataType=$('#publicForm [name=type]').val()==='custom'?'html':'';
				http.post(urldata.url,urldata.param,true,dataType)
					.success(function (data) {
						if(!_.isObject(data)) return;
						paramList={};
						self.dataFormat({data:data});
						model.set('cacheData',data);
						var omitArr=self.selectTemplate({data:_.omit(paramList,'Array')});
						var pickArr=self.selectTemplate({data:_.pick(paramList,'Array')});
						$('select.omitArr',this.el)
							.each(function(){
								var $e=$(this),
									val=$e.val(),
									$option=$e
										.html(omitArr)
										.find('[value="'+val+'"]');
								if($option.length){$e.val(val)}
								$e.change();
							});
						$('select.pickArr',this.el)
							.each(function () {
								var $e = $(this),
									val = $e.val(),
									$option=$e
										.html(pickArr)
										.find('[value="' + val + '"]');
								if($option.length){$option.val(val)}
								$e.change();
							});
						$('select.select2').select2();
					})
					.error(function (err) {
					});
			},
			changeModelType:function(e){
				var self = this;
				var model = self.model;
				var obj = $(e.currentTarget);
				var chartName = obj.text().replace(/\s/g,'');
				var type = self.chartTypeList[chartName];
				if(type){
					obj.addClass('active').siblings('.active').removeClass('active');
					$('#publicForm input[name="type"]',this.el).val(type).change();
					$('#modelMain>.nav-tabs a').eq(1).tab('show');
					$('#modelMain>.tab-content').scrollTop(0);
				}else{
					layer.msg('未配置的图表类型');
					return
				}
				$('#modelMain .overflowDiv').hide();
				switch (type){
					case self.chartTypeList['列表']:
						$('.table-option').show();
						break;
					case self.chartTypeList['记录']:
						$('.record-option').show();
						break;
					case self.chartTypeList['环形']:
						$('.ring-option').show();
						break;
					case self.chartTypeList['自定义模块']:
						$('.custom-option').show();
						break;
					case self.chartTypeList['基础表格']:
						$('.baseTable-option').show();
						break;
					default:
						$('.charts-option').show();
						self.changeChartsType(type);
						break;
				}
			},
			changeDataType : function(e){
				var self = this;
				var model = this.model;
				var obj = $(e.currentTarget);
				var $input=$('[name="url"]',this.el);
				$input.nextAll('label.error').remove();
				switch(obj.val()){
					case 'dataurl':
						$input.show().attr('disabled',false).nextAll('input').hide().attr('disabled',true);
						break;
					case 'datasql':
						if(!model.get('dataSQL')){
							$('[name="dataSQL"]').change();
						}
						$input.hide().attr('disabled',true).nextAll('input').show().attr('disabled',false);
						break;
				}
			},
			getModelData:function(selector){
				var publicSelector='#publicForm,#modelPublic';
				var $form=selector instanceof $ ?selector:$(selector);
				var isvalid=true;
				var data={
					publicData:{},
					all:{}
				};
				$form.add(publicSelector).each(function(){
					var $this=$(this);
					var id=$this.attr('id');
					var formdata=$this.serializeJSON();
					if(!$this.valid()){
						isvalid=false;
						return false
					}
					if(publicSelector.indexOf(id)>-1){
						_.extend(data.publicData,formdata);
					}else{
						data[id]=formdata;
					}
					_.extend(data.all,formdata)
				});
				return isvalid&&data
			},
			addModel:function(data,notback){
				var self=this,
					param={
						id:data.id,
						name:data.name,
						alias :data.alias,//别名
						reslists :data.reslists,//别名
						resKey:data.mid,
						type:data.type,
						data_type:data.data_type,
						dataSQL:data.dataSQL,
						url:data.url,
						attribute:JSON.stringify(_.omit(data,'id','cacheData'))
					};
				http.post(system_path + '/config/saveModule.shtml',param).success(function(_data){
					var submitType=param.id?'保存':'添加';
					if (_data.id>=0) {
						layer.msg(submitType+"成功");
						if(!param.id){
							$('#publicForm [name="id"]').val(_data.id);
							var formArea='#publicForm,#modelPublic';
						}
						notback||self.$el.trigger('update').trigger('back');
					} else {
						layer.msg(submitType+"失败");
					}
				}).error(function(err){
				})
			},
			floatLabel:function(e){
				var $e=$(e.currentTarget);
				var $parent=$('#modelMain');
				var width=parseInt($parent.width());
				var rigth=parseInt($parent.css('right'))!==0?0:-width+1;
				$('#modelMain').animate({right:rigth})
			},
			reslistsChange:function(e){
				var $e=$(e.currentTarget);
				var data=$e.data('reslists');
				var val=_.findWhere(data,{id:parseInt($e.val())});
				if(!val){return}
				$e.nextAll('[name="name"],[name="alias"]').val($.trim(val.name));
				$e.nextAll('[name="mid"]').val($.trim(val.resKey));
			},
			review:function(data){
				modelAnalyze({
					el:$('#preview'),
					model:data
				})
			},

			/*table组件方法*/
			addColumn:function(e){
				var self=this,
					$columnKey=$('#columnKey'),
					$content=$('#columnList'),
					val= _.isObject(e)?$columnKey.val():e;
				if(!val){
					layer.msg('数据为空',{icon:0});
					return;
				}
				if($content.find('[name$="-'+val+'"]').length){
					layer.msg('请勿重复添加',{icon:0});
					return;
				}
				var $line=$(self.columnTemplate({key:val}));
				$content.append($line);
				$line.data('key',val);
				$line.find('input[type="checkbox"]').iCheck({checkboxClass: 'icheckbox_flat-blue'});
				$columnKey.find('option[value="'+val+'"]').attr('disabled',true);
				$columnKey.val($columnKey.find('option:not([disabled])').first().attr('value'));
				return $line
			},
			removeColumn:function(e){
				var self=this,
					$columnKey=$('#columnKey'),
					$e=$(e.currentTarget),
					$parent=$e.closest('.col-md-12'),
					key=$parent.data('key');
				$parent.remove();
				$columnKey.find('option[value="'+key+'"]').attr('disabled',false);
				$columnKey.val($columnKey.find('option:not([disabled])').first().attr('value'));
			},
			resetColumn:function(e){
				$('#columnList').empty();
				$('#columnKey').find('[disabled]').attr('disabled',false);
			},
			tableDataParse:function(){
				var self=this,
					$tableForm=$('#tableForm'),
					$tableHighForm=$('#tableHighForm'),
					data=self.getModelData($tableForm.add($tableHighForm)),
					tableData=data.tableForm,
					tableHighData=data.tableHighForm;
				if(data===false){
					return false
				}
				_.extend(tableData,tableHighData);
				var newData=_.extend({
					showTitle:!!tableData.showTitle,
					showPage:!!tableData.showPage,
					title:tableData.title,
					btn:[],
					grid:{
						gridid: 'user_paging',
						showTableTop: !!tableData.showTableTop,
						pageSize: tableData.pageSize,
						checkbox: !!tableData.checkbox,
						async: true,
						searchCondition:{},
						url: '',
						column: [],
					}
				},data.publicData);
				_.each(tableData,function(val,key){
					var colkey=_.last(key.split('-'));
					if(key.indexOf('column-')>-1){
						newData.grid.column.push({
							colkey:colkey,
							name:val,
							hide:!!tableData['columnShow-'+colkey],
							width:tableData['width-'+colkey],
							filter:tableData['columnFilter-'+colkey],
							filterCustom:tableData['filterCustom-'+colkey],
							noSearch:!!tableData['noSearch-'+colkey],
							nosort:tableData['nosort-'+colkey]?JSON.parse(tableData['nosort-'+colkey]):[],
						})
					}else if(key.indexOf('btnId-')>-1){
						newData.btn.push({
							btnId:tableData['btnId-'+colkey],
							dataSourceId:tableData['dataSourceId-'+colkey],
							type:tableData['btnType-'+colkey],
							url:tableData['btnUrl-'+colkey],//请求地址：页面或者接口
							param:tableData['btnParam-'+colkey],//请求参数模版：a=<%=p1%>&b=<%=p2%>
							text:tableData['btnText-'+colkey],//按钮文本
							position:tableData['position-'+colkey],//位置
							alert:tableData['btnAlert-'+colkey],//按钮弹框提示信息

							//onlyRequest
							backDesc:tableData['btnBackDesc-'+colkey],//请求返回描述信息：如backDesc='注册',x+成功,x+失败

							//pageOpen
							// contentId:tableData['btnContentId-'+colkey],//页面容器元素id

							//windowOpen
							width:tableData['btnWidth-'+colkey],//窗口宽度
							height:tableData['btnHeight-'+colkey],//窗口高度
						})
					}
				})
				if(!newData.grid.column.length){
					_.each(paramList,function(val,key){
						_.each(val,function(v,k){
							newData.grid.column.push({
								colkey:k,
								name:k,
								hide:false
							})
						})
					})
				}
				return newData;
			},
			changeBtnType:function(e){
				var self=this,
					model=self.model,
					$e=$(e.currentTarget),
					val=$e.val();
				$e.siblings('.notcustom')[val=='custom'?'hide':'show']()
				$e.siblings('div.btnType').hide().filter('.'+val).show();
			},
			addBtn:function(e){
				var self=this;
				var $line=$(self.btnTemplate({key:_.isString(e)?e:_.now().toString(36)+_.random(0,99)}));
				$('#btnList').append($line);
				return $line;
			},
			addBtnUrl:function(e,val){
				var self=this;
				var $line=$(self.btnUrlTemplate({key:_.isString(e)?e:_.now().toString(36)+_.random(0,99),val:val}));
				$('#btnList').append($line)
				dataModel.getList($line.find('select'));
				return $line;
			},
			removeBtn:function(e){
				var self=this,
					$e=$(e.currentTarget),
					$parent=$e.closest('.col-md-12');
				$parent.remove();
			},
			resetBtn:function(e){
				$('#btnList').empty();
			},
			sortOption:function(e){
				var self=this;
				var $e=$(e.currentTarget);
				var $input=$e.prev('input');
				var value=$input.val();
				var columnKey=$input.attr('name').split('-')[1];
				try{
					value=JSON.parse(value);
				}catch(e){
					value={};
				}
				layer.open({
					title : columnKey+"列筛选项配置",
					type : 1,
					closeBtn : 1,
					shift:1,
					area : [ "800px", "550px" ],
					content :
					'<form class="sortForm" style="width:400px;margin: 10px auto;">' +
					'	<div style="">' +
					'		<span class="btn btn-info addSort">添加筛选项</span>' +
					'		<span class="btn btn-info addSortUrl">添加源</span>' +
					'		<span class="btn btn-info addSorting">添加排序</span>' +
					'		<span class="btn btn-info resetSort">清空筛选项</span>' +
					'		<i class="fa fa-question-circle tips" data-toggle="tooltip" data-placement="top" title="筛选参数格式示例：{&quotkey&quot:&quotval&quot}（必须为标准JSON格式）"></i>' +
					'	</div>' +
					'	<div class="sortList"></div>' +
					'</form>',
					btn : [ '确认', '取消' ],
					success:function(el){
						var $layer=$(el);
						var $form=$layer.find('.sortForm');
						var $sortList=$layer.find('.sortList');
						var $tem=$layer.find('.sortTem').first().clone();
						$sortList.sortable({
							items :'>div.sortTem',
							handle :'.moveSort',
							//containment:'#columnList',
							axis:'y',
						});
						$layer.on('click','.resetSort',function(){
								$sortList.html(self.sortSingleTemplate({data:[{}]}));
							})
							.on('click','.addSort',function(){
								$sortList.append(self.sortSingleTemplate({data:[{}]}));
							})
							.on('click','.removeSort',function(){
								$(this).parent().remove()
							})
							.on('click','.addSorting',function(){
								var sort=[
									{
										label:'升序',
										param:'{"sortdatafield":"'+columnKey+'","sortorder":"desc"}'
									},{
										label:'降序',
										param:'{"sortdatafield":"'+columnKey+'","sortorder":"asc"}'
									}
								];
								$sortList.append(self.sortSingleTemplate({data:sort}));
							})
							.on('click','.addSortUrl',function(){
								var $el=$(self.sortSingleTemplate({data:[{dataSourceId:' '}]}));
								$sortList.append($el);
								dataModel.getList($el.find('select'));
							});
						if(!_.isEmpty(value)){
							var $el=$(self.sortSingleTemplate({data:value}));
							$sortList.html($el);
							dataModel.getList($el.find('select'));
						}
					},
					yes : function(index,el) {
						var sortData=$('.sortForm',el).serializeJSON();
						var redata=[];
						_.each(sortData,function(v,k){
							if(k.indexOf('label')===-1){
								return
							}
							var arr= k.split('-');
							(v||sortData['param-'+arr[1]]|| $.trim(sortData['dataSourceId-'+arr[1]]))&&redata.push({
								label:v,
								param:sortData['param-'+arr[1]],
								dataSourceId:$.trim(sortData['dataSourceId-'+arr[1]]),
							})
						});
						$input.val(redata.length?JSON.stringify(redata):'');
						layer.close(index);
					}
				})
			},
			columnFilterChange:function(e){
				var $e=$(e.currentTarget);
				var $els=$e.nextAll('.filter-custom');
				if($e.val()=='custom'){
					$els.show();
				}else{
					$els.hide();
				}
			},
			columnTopSlide:function(e){
				var $e=$(e.currentTarget);
				var $column=$e.closest('.col-md-12');
				var $box=$('#columnList');
				$box.find('.columnTop').not($e).each(function(){
					$(this).next('.columnBody').slideUp();
				});
				$e.next('.columnBody').slideDown();
			},
			tableReview:function(){
				var self=this;
				var data=self.tableDataParse();
				data&&self.review(data);
			},
			tableApply:function(e){
				var self=this;
				self.addTable('notback')
			},
			addTable:function(e){
				var self=this;
				var data=self.tableDataParse();
				data&&self.addModel(data,e==='notback');
			},
			tableBackfill:function(){
				var self=this;
				var request=this.model.get('request');
				request.grid.showTableTop&&$('[name=showTableTop]').iCheck('check');
				request.grid.checkbox&&$('[name=checkbox]').iCheck('check');
				_.each(request.grid.column,function(val,key){
					var $column=self.addColumn(val.colkey);
					$column.find('input[name="column-'+val.colkey+'"]').val(val.name);
					$column.find('input[name="width-'+val.colkey+'"]').val(val.width);
					$column.find('input[name="filterCustom-'+val.colkey+'"]').val(val.filterCustom);
					$column.find('[name="columnFilter-'+val.colkey+'"]').val(val.filter).change();
					$column.find('input[name="nosort-'+val.colkey+'"]').val(val.nosort&&JSON.stringify(val.nosort));
					val.hide&&$column.find('input[name="columnShow-'+val.colkey+'"]').iCheck('check');
					val.noSearch&&$column.find('input[name="noSearch-'+val.colkey+'"]').iCheck('check');
				});
				_.each(request.btn,function(val,key){
					var $column;
					if(val.dataSourceId){
						$column=self.addBtnUrl(val.btnId,val.dataSourceId);
					}else{
						$column=self.addBtn(val.btnId);
						$column.find('input[name="btnId-'+val.btnId+'"]').val(val.btnId);
						$column.find('[name="btnType-'+val.btnId+'"]').val(val.type).change();
						$column.find('input[name="btnUrl-'+val.btnId+'"]').val(val.url);
						$column.find('input[name="btnParam-'+val.btnId+'"]').val(val.param);
						$column.find('input[name="btnText-'+val.btnId+'"]').val(val.text);
						$column.find('input[name="btnBackDesc-'+val.btnId+'"]').val(val.backDesc);
						$column.find('input[name="btnContentId-'+val.btnId+'"]').val(val.contentId);
						$column.find('input[name="btnWidth-'+val.btnId+'"]').val(val.width);
						$column.find('input[name="btnHeight-'+val.btnId+'"]').val(val.height);
						$column.find('[name="position-'+val.btnId+'"]').val(val.position);
					}
				})
			},

			/*chart类型组件方法*/
			checkParam : function(e,option){
				var $e= _.isObject(e)?e:$(e);
				var option = option || {
						rules: {
							name: {
								required: true
							},
							mid: {
								required: true,
								remote:function(){
									return system_path+"/config/isExist.shtml?id="+$('#publicForm [name="id"]').val();
								}
							},
							url: {
								required: true
							},
							dataSQL: {
								required: true
							}

						},
						messages:{
							mid:{
								remote:'该值已存在，请更换为其它'
							}
						}
					};
				$e.each(function(){
					$(this).validate(option);
				})
			},
			addLine:function(e){
				var self=this,
					model=this.model,
					$e=$(e.currentTarget),
					val=_.isNumber(parseInt(e))?parseInt(e):50;
					$line=$(self.pathLineTemplate({val:val}));
				$('#lineList').append($line);
				$line.find('input').val(val).change();
			},
			delLine:function(e){
				var self=this,
					model=this.model,
					$e=$(e.currentTarget);
				$('#lineList>div').last().remove();
				var pathLine=model.get('pathLine');
				model.set('pathLine',_.isArray(pathLine)?_.initial(pathLine):'');
				chart.updata&&chart.updata(model.attributes);
			},
			addChart:function(e){
				var self=this;
				var model=self.model;
				var data=self.getChartData();
				if(data===false){
					return
				}
				self.addModel(data);
			},
			changeChartsType:function(type){
				var self = this;
				var model = self.model;
				model.set('type',type);
				chart.updata&&chart.updata(model.attributes);
			},
			chartInputChange:function(e){
				var self=this,
					model=this.model,
					$e=$(e.currentTarget),
					chartName=['subTitle','coalition','title','dataKey','dataName','XAxis','YAxis','dataNum','YTitle','XTitle','pathLine','timeLine'],
					name=$e.attr('name'),
					modelName=model.get(name);
				var $names=$('[name="'+name+'"]',this.el);
				var nameIndex=$names.index($e);
				var inputType=$e.prop('type');
				var inputVal='';
				if(inputType==='checkbox'){
					inputVal=$e.prop('checked');
				}else{
					inputVal=$e.val();
				}
				if($names.length>1){
					if(!_.isArray(modelName)){
						model.attributes[name]=[modelName]
					}
					model.attributes[name][nameIndex]=inputVal;
				}else{
					model.set(name,inputVal);
				}
				if(_(chartName).indexOf(name)>-1){
					chart.updata&&chart.updata(model.attributes);
				}
			},
			chartReview:function(e){
				var self = this;
				var model = this.model;
				var data=self.getChartData();
				data&&self.review(data);
			},
			chartBackfill:function(){
				var self = this;
				var model = this.model;
				var el = this.el;
				var request = model.get('request');
				_.isArray(request.pathLine)&&_.each(request.pathLine,function(val,key){
					self.addLine(val)
				});
				_.isArray(request.group)&&_.each(request.group,function(val,key){
					var $group=self.addGroup(val.groupId);
					_.each(val,function(v,k){
						$group.find('[name="'+k+'-'+val.groupId+'"]').val(v);
					})
					setTimeout(function () {
						$group.find('.groupType ').change()
					})
				});
			},
			addGroup:function(e){
				var self=this;
				var $group=$(self.groupTemplate({
					key:_.isString(e)?e:_.now().toString(36)+_.random(0,99),
					chartType: _.omit(self.chartTypeList,'记录','列表')
				}));
				$('#groupList').append($group);
				return $group;
			},
			removeGroup:function(e){
				var self=this,
					$e=$(e.currentTarget),
					$parent=$e.closest('.col-md-12');
				$parent.remove();
			},
			resetGroup:function(e){
				$('#groupList').empty();
			},
			getChartData:function(){
				var self=this,
					model=self.model,
					$chartHighForm=$('#chartHighForm'),
					chartHighData=$chartHighForm.form2Json(),
					newData= _.pick(chartHighData,function(val,key,obj){
						return key.indexOf('-')===-1
					});
				var $chartForm=$('#chartForm',this.el);
				var data=self.getModelData($chartForm);
				if(!$chartHighForm.valid()||data===false){
					return false
				}
				newData.group=[];
					/*{
						hideHeader: !!chartHighData.hideHeader,//显示配置界面头部
						polar: !!chartHighData.polar,//极坐标
						inverted: !!chartHighData.inverted,//折线图倒立
						shared:!!chartHighData.shared,//多分组共享提示框
						stacking:!!chartHighData.stacking,//堆叠
						xName:chartHighData.xName,//自定义x轴，多个逗号分割
						yName:chartHighData.yName,//自定义y轴，多个逗号分割
						'3d':!!chartHighData['3d'],//部分图表支持3d效果
						'formatter':chartHighData.formatter,//提示框序列化模版
						'clickUrl':chartHighData.clickUrl,//点击节点跳转url，附带生成当前节点的原始数据
						'openType':chartHighData.openType,//点击节点的跳转方式
						group:[]
					}*/
				_.each(chartHighData,function(_val,_key){
					var arr=_key.split('-');
					if(arr.length<=1||_.first(arr)!=='groupId'){
						return
					}
					var colkey = _.last(arr);
					newData.group.push({
						groupId: _val,//前端记录id
						key: chartHighData['key-' + colkey],//分组键多选
						val: chartHighData['val-' + colkey],//分组值多选与key对应
						dataAxes: chartHighData['dataAxes-' + colkey],//分组数据坐标点，多选，一维或三维
						dataSort: chartHighData['dataSort-' + colkey],//分组数据坐标点，多选，一维或三维

						type: chartHighData['type-' + colkey],//分组类型,单选,选值为图表类型
						color: chartHighData['color-' + colkey],//分组颜色
						name: chartHighData['name-' + colkey],//分组名称
						valuePrefix: chartHighData['valuePrefix-' + colkey],//前置单位
						valueSuffix: chartHighData['valueSuffix-' + colkey],//后置单位

						/*pie*/
						innerSize: chartHighData['innerSize-' + colkey],//饼图内空心部分大小，百分数
						size: chartHighData['size-' + colkey],//饼图大小，百分数
						center: chartHighData['center-' + colkey],//上下左右位置['x','y']

						/*heatmap*/

					})
				});
				return _.extend({},data.all,newData,{pathLine:model.get('pathLine')});
			},
			groupTypeChange:function(e){
				var $e=$(e.currentTarget);
				var $box=$e.siblings('.typeGroup').first();
				var $target=$box.find('.'+$e.val());
				$box.find('>div').hide();
				$target.show()
			},

			/*record类型组件方法*/
			getRecordData:function(e){
				var self=this,
					model=this.model,
					$recordForm=$('#recordForm'),
					data=self.getModelData($recordForm);
				var newData={};
				_.extend(newData,data.all,_.pick(model.attributes,'cacheData'));
				return newData;
			},
			recordReview:function(){
				var self=this;
				var model=self.model;
				var data=self.getRecordData();
				data&&self.review(data);
			},
			addRecord:function(){
				var self=this,
					data=self.getRecordData();
				if(data===false){
					return
				}
				self.addModel(data);
			},
			recordBackfill:function(){
				var self=this;
			},

			/*ring类型组件方法*/
			getRingData:function(){
				var self=this,
					$ringForm=$('#ringForm'),
					data=self.getModelData($ringForm),
					ringData=data.ringForm,
					publiData=data.publicData;
				var newData=_.extend({
					ringTitle:ringData.ringTitle,
					ringValue:ringData.ringValue,
					ring:[]
				},publiData);
				_.each(ringData,function(val,key){
					var colkey=_.last(key.split('-'));
					if(key.indexOf('ringId-')>-1){
						newData.ring.push({
							barColor:ringData['barColor-'+colkey],
							barBgColor:ringData['barBgColor-'+colkey],
						})
					}
				});
				return data&&newData;
			},
			addRing:function(e){
				var self=this;
				var $ring=$(self.ringTemplate({
					key:_.isString(e)?e:_.now().toString(36)+_.random(0,99)
				}));
				$('#ringList').append($ring);
				return $ring;
			},
			removeRing:function(e){
				var self=this,
					$e=$(e.currentTarget),
					$parent=$e.closest('.col-md-12');
				$parent.remove();
			},
			resetRing:function(e){
				$('#ringList').empty();
			},
			ringReview:function(){
				var self=this;
				var model=self.model;
				var data=self.getRingData();
				data&&self.review(data);
			},
			submitRing:function(){
				var self=this,
					data=self.getRingData();
				if(data==false){
					return
				}
				self.addModel(data);
			},
			ringBackfill:function(){
				var self = this;
				var model = this.model;
				var el = this.el;
				var request = model.get('request');
				_.isArray(request.ring)&&_.each(request.group,function(val,key){
					var $Ring=self.addRing(val.ringId);
					_.each(val,function(v,k){
						$Ring.find('[name="'+k+'-'+val.ringId+'"]').val(v);
					})
				});
			},

			/*custom类型组件方法*/
			customReview:function(){
				var self=this;
				var data=self.getModelData($('#customForm'));
				data&&self.review(data.all);
			},
			submitCustom:function(){
				var self=this;
				var data=self.getModelData($('#customForm'));
				if(data===false){
					return
				}
				self.addModel(data.all);
			},

			/*baseTable类型组件方法*/
			baseTableReview:function(){
				var self=this;
				var model=self.model;
				var data=self.getModelData($('#baseTableForm'));
				data&&self.review(data.all);
			},
			submitBaseTable:function(){
				var self=this;
				var data=self.getModelData($('#baseTableForm'));
				if(data===false){
					return
				}
				self.addModel(data.all);
			},
		});

		return moduleView;

});