define([
	'backbone'
], function(Backbone) {
	
	console.log("loading opportunity model");
  
    return Backbone.Model.extend({
  
      initialize : function () {
      	console.log('opportunity model initialize')
      }
  
    });	
});
