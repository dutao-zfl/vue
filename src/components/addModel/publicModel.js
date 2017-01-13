define([
	'jquery', 
	'underscore', 
	'backbone',
	'http',
	'getProjectPath'
	], 
	function($, _, Backbone,http,getProjectPath) {
		var dynamic_sql='/webservice/dynamic/data.shtml';
		var model = Backbone.Model.extend({
			defaults : {
				//公共模块属性
				errorNum : 0,
				error:null,
				mid : '',
				name : '',
                desc : '',
                alias:'',
                reslists:'',
				type : 'line',
				cacheData:'',

				//数据源属性
				data_type : 'dataurl',
				porject_path:'',
				//dynamic_sql :'/webservice/dynamic/data.shtml',
				dataSQLSelect : '',
				dataSQL : '',
				projectPath : '',
				url : '/snc-system/component/gridDataComponent.shtml?beanName=logMapper',
			},
			getSourceGetUrl:function(notSyetem){
				var model = this;
				var parjectPath=model.getProjectPath();
				var url = parjectPath+model.get('url');
				var data_type = model.get('data_type');
				var dataSQL = model.get('dataSQL');
				var type = model.get('type');
				var appendParam = model.get('appendParam')||{};
				var paramArr = [
					'sql=' + dataSQL,
					'type=' +($('#publicForm [name=type]').val()||type)
				];
				if(data_type==='datasql'){
					url=parjectPath+dynamic_sql + (dynamic_sql.indexOf('?') < 0 ? '?' : '&') + paramArr.join('&')+'&'+$.param(appendParam);
				}else{
					url+=(url.indexOf('?')<0?'?':'&')+ $.param(appendParam);
				}
				return url
			},
			getSourcePostJson:function(){
				var model = this;
				var url =model.get('url');
				var data_type = model.get('data_type');
				var dataSQL = model.get('dataSQL');
				var appendParam = model.get('appendParam')||{};
				var parjectPath=model.getProjectPath();
				var paramArr = {
					'sql': dataSQL,
					'type': $('#publicForm [name=type]').val()||model.get('type')
				};
				return {
					url: data_type === 'datasql' ?parjectPath+dynamic_sql :parjectPath + url,
					param: data_type === 'datasql' ? _.extend({},paramArr,appendParam) : {}
				};
			},
			getProjectPath:function(){
				var model = this;
				var key = model.get('porject_path');
				return getProjectPath(key);
			},
		});
		
		return model;

});