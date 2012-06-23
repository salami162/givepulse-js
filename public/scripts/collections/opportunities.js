define([
	'backbone', 
	'model/opportunity'
], function(Backbone, opportunity) {
	
  var res = Backbone.Collection.extend({
      model : opportunity
    });	
    
      // Data normalizer
  res.normalize = function (data) {
    var opportunities = [];
    for (var i = 0; i < data.opportunities.length; i++) {
    	var opp = data.opportunities[i];
    	var oppModel = new opportunity(opp);
      opportunities.push(oppModel);
    }
		console.log('normalize = ', opportunities);
    return opportunities;
  };
  
  return res;

});
