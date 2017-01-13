define([
	'jquery',
	'underscore',
	'backbone',
	'http',
	'layer',
	
	],
	function($, _, Backbone, http,layer) {
		var gridView = null;
	
		var configView = Backbone.View.extend({

			/**
			 * [initialize 初始化]
			 * @return {[type]} []
			*/
			initialize : function() {
				var self = this;
				self.refreshChange();
			},
			refreshChange : function(){
				var self = this;
				var model = this.model;
				
                 //加载列表
                 self.configGrid();

                
			},
	      
	      /**
	       * 获取列表配置
	       */
			configGrid : function(){
               var self = this;
			   var model = this.model;
			   var el = this.$el;

			},
          
       
    
      
	
	
//------------------------------------------------------告警区域end----------------------------------------------------------------------//
		});

       

		return configView;

});