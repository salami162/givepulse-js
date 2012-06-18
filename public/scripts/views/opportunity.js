define([
	'backbone',
	'hbs!template/opportunity'
], function (Backbone, tmplHtml) {
	
	console.log('loading opportunity view');
  return Backbone.View.extend({
  	
    name : "opportunity",
    
    events : {
//      'click .bv-rating-stars-container' : 'clickStars'
    },

    initialize : function () {
      this.template = tmplHtml;
			this.$el.on('click','button.givepulse-register-btn', this, this.registerOpportunity);
    },

    render : function () {
      var html = this.template({opportunities : this.collection.toJSON()});
      console.log("render HTML = ", html);
      this.$el.html( html );
    },
    
    registerOpportunity : function (event) {
    	var curView = event.data;
    	var curUser = curView.model.get('loginUser');
    	if (!curUser.get('isAuthenticated')) {
    		alert("please login first");
    	}
    	else {
	    	var tr = $(this).parents('tr')[0];
	    	var oppName = $(tr).attr('data-opp-name');
    	}
    	return false;
    }
  
  });
});
