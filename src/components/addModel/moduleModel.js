define([
	'jquery', 
	'underscore', 
	'backbone',
	'publicModel'
	],
	function($, _, Backbone,publicModel) {
		
		var moduleModel = publicModel.extend({
			defaults : {
				XAxis : '',
				YAxis : '',
				title : '',
				subTitle : '',
				dataKey : '',
				dataName : '',
				dataNum : 10,
				timeLine : false
			}
		});
		
		return moduleModel;

});