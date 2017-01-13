define([
	'jquery',
	'underscore',
	'backbone',
	'http',
	'layer',
	'form',
	'common'],
	function ($, _, Backbone, http, layer) {
	var userView = Backbone.View.extend({

		initialize : function() {
			var self = this,
                model = this.model,
                $el=self.$el;
            $el.html(model.get('text'));
		},

		events : {
			click:'control'
		},

		control:function(){
			var self=this,
				model=self.model,
				type=model.get('type'),
				alert=model.get('alert'),
				btnCallback=model.get('btnCallback');
			if(alert){
				alert&&layer.confirm(alert,{icon: 3, title:'提示'}, function(index){
					layer.close(index);
					action();
				})
			}else{
				action()
			}
			function action(){
				self[type]&&self[type](
					function(data){
						btnCallback&&btnCallback(_.clone(model.attributes),data);
					}
				);
			}
		},

		createUrl:function(){
			var self=this,
				model=self.model,
				url=model.get('url');
			var param=self.createParam();
			var result='';
			if(_.isObject(param)){
				result={
					url:url,
					param:param
				}
			}else if(_.isString(param)){
				if(param){
					url+=(url.indexOf('?') < 0 ? '?' : '&');
					result=url+param;
				}else{
					result=url;
				}

			}else if(param===false){
				result=false;
			}
			return result;
		},
		getLineData:function(){
			var self=this,
				model=self.model,
				sendBefore=model.get('sendBefore'),
				bindModel=model.get('bindModel'),
				templateData=sendBefore(bindModel);
			return templateData;
		},
		createParam:function(){
			var self=this,
				model=self.model,
				param=model.get('param'),
				templateData=self.getLineData();
			if(templateData===false){
				return false
			}
			if(param.toLowerCase()==='all'){
				param={data:JSON.stringify(templateData)};
			}else{
				var redata={};
				_.each(templateData,function(v,k){
					_.each(v,function(val,key){
						if(!redata[key]){
							redata[key]=[]
						}
						redata[key].push(val);
					});
				});
				_.each(redata,function(val,key){
					_.isArray(val)&&(redata[key]=val.join(','));
				});
				try{
					param=_.template(param)(redata);
				}catch(e){
					param=_.template(param)(redata);
				}
			}
			return param;
		},


		onlyRequest:function(callback){
			var self=this,
				model=self.model,
				$e=self.$el;
			var url=self.createUrl();
			var bindModel=model.get('bindModel');
			//{"status":"success","messages":"删除成功","data":null,"page":null}
			if(!url){
				return
			}

			if(model.get('text').indexOf('删除')>-1){
				layer.confirm('您确定要删除此条信息吗？', {icon: 3, title:'提示'},sendRequest)
			}else{
				sendRequest()
			}

			function sendRequest(){
				http.get(url).success(function(data){
					callback&&callback(data);
					if(!_.isObject(data)){
						layer.msg('返回格式错误');
						return
					}
					var text=model.get('backDesc');
					if(data.status==='success'||data.status=='0'){
						text+='成功';
						bindModel.searchGrid({})
					}else{
						text+='失败';
					}
					if(data.messages){
						return
					}else{
						layer.msg(text);
					}
				}).error(function(err){
					console.log(err);
				})
			}
		},

		pageOpen:function(callback){
			var self=this;
			var model=this.model;
			var text=model.get('text');
			var bindModel=model.get('bindModel');
			var url=self.createUrl();
			var $content=$('.contentDiv',bindModel.$el);
			var $table=$('.tableDiv',bindModel.$el);
			var param='';
			if(!url){
				return
			}else if(_.isObject(url)){
				param=url.param;
				url=url.url;
			}
			$table.slideUp();
			$content.load(url,param||{},function(){
				callback&&callback();
			}).slideDown();
			bindModel.$el.off('back update')
				.on('back','>div:first',function(e){
					e.stopPropagation();
					$table.slideDown();
					$content.slideUp(function(){$content.empty()});
					window.clickHideOnBreadcrumb()//导航路径逻辑
				})
				.on('update','>div:first',function(e){
					e.stopPropagation();
					bindModel.searchGrid({});
				});
			window.clickShowOnBreadcrumb(text,url,bindModel.model.get('gridid'),'notClick');//导航路径逻辑
		},

		windowOpen:function(callback){
			var self=this;
			var model=this.model;
			var bindModel=model.get('bindModel');
			var url=self.createUrl(),param;
			if(!url){
				return
			}else if(_.isObject(url)){
				param=url.param;
				url=url.url;
			}
			url&&layer.open({
				title : model.get('text'),
				type : 1,
				closeBtn : 1,
				maxmin : true,
				area : [ model.get('width')||'400px',model.get('height')||400],
				content :CommnUtil.ajax(url,param||{}),// 'about:blank'
				success:function(e,index){
					$(e).on('close', '.layui-layer-content>div:first', function () {
						layer.close(index);
					}).on('update', '.layui-layer-content>div:first', function () {
						bindModel.searchGrid({})
					})
					callback&&callback()
				}
			})
		},
		blank:function(callback){
			var self=this;
			var model=this.model;
			var bindModel=model.get('bindModel');
			var url=self.createUrl();
			url&&window.open(url, '_blank');
			callback&&callback();
		},
		custom:function(callback){
			var self=this,
				lineData=self.getLineData();
			callback&&callback(lineData);
		}

	});
	return userView;

});