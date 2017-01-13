define([
	'jquery',
	'underscore',
	'backbone',
	'http',
	'layer',
	'dataSourceModel',
	'backFill',
	'serializejson',
	'common'],
	function ($, _, Backbone, http, layer,dataSourceModel,backFill) {
	var view = Backbone.View.extend({

		initialize : function() {
			var self = this,
                model = this.model,
				request= model.get('request'),
                $el=self.$el;
            $el.html(model.get('text'));
			self.validate();
			if(request){
				request= _.extend(JSON.parse(request[0].attribute),{id:request[0].id});
				backFill($el,request);
			}
			setTimeout(function(){
				$('[name="formatType"],[name="type"]',self.el).change()
			},0)
		},
		events : {
			'click .add':'add',
			'click .cancel':'cancel',
			'click .check':'dataTemplateCheck',
			'change [name="formatType"]':'formatTypeChange',
			'change [name="type"]':'typeChange',
		},
		formatTypeChange:function(e){
			var $e=$(e.currentTarget);
			var val=$e.val();
			$('.formatType-custom',this.el)[val==='custom'?'show':'hide']();
		},
		typeChange:function(e){
			var $e=$(e.currentTarget);
			var val=$e.val();
			if(val==='sql'){
				$('.type-sql',this.el).show();
				$('.type-url',this.el).hide();
			}else if(val==='url'){
				$('.type-sql',this.el).hide();
				$('.type-url',this.el).show();
			}
		},
		validate:function(){
			var self=this;
			var model=this.model;
			var request= model.get('request');
			var $form=$('form',this.$el);
			var option = option || {
					rules: {
						name: {
							remote: function(){
								return system_path+'/datasource/isExist.shtml?id='+$('[name="id"]',self.el).val()
							}
						}
					},
					messages:{
						name:{
							remote:'该值已存在，请更换为其它'
						}
					}
				};
			$form.validate(option);
		},
		getFormData:function(){
			var $form=$('form',this.$el);
			var data;
			if($form.valid()){
				data=$form.serializeJSON();
			}else{
				data=false;
			}
			return data;
		},
		add:function(){
			var self=this,
				$form=$('form',this.$el),
				data=self.getFormData();
			if(!data){
				return
			}
			var param={
					id:data.id,
					name:data.name,
					description:data.description,
					attribute:JSON.stringify(_.omit(data,'id')),
				};
			http.post(system_path+'/datasource/saveEntity.shtml',param).success(
				function(data){
					if(data&&data.id){
						layer.msg('保存成功');
						self.$el.trigger('update').trigger('close');
					}else{
						layer.msg('保存失败')
					}
				}
			)
		},
		cancel:function(){
			this.$el.trigger('close');
		},
		dataTemplateCheck:function(){
			var data=this.getFormData();
			var model=new dataSourceModel(data);
			model.getDate(true,function(data){
				console.log(data);
				if(data){
					layer.msg('校验成功')
				}else{
					layer.msg('校验失败')
				}
			})
		}
	});
	return view;

});