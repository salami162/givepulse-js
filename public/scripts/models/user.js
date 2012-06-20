define([
	'backbone'
], function(Backbone){
	
	console.log("loading user model");
	
	return Backbone.Model.extend({
    initialize : function () {
    	console.log('user model initialized');
    }
	});
	
});
