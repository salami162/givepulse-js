define([
	'backbone',
	'collection/opportunities'
], function(Backbone, OpportunityCollection) {
	
	console.log("loading orgnization model");
  
    return Backbone.Model.extend({

      initialize : function () {
      	console.log('orgnization model initialize');
      	this.collection = new OpportunityCollection ({});
//      	this.collection.on('change', this.updateOpportunities);
      }
  
    });	
});
