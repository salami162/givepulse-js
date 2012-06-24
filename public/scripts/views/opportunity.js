define([
	'env',
	'backbone',
	'hbs!template/opportunity'
], function (env, Backbone, tmplHtml) {
	
  return Backbone.View.extend({
  	
    name : "opportunity",
    
    events : {
      'click .givepulse-register-btn' : 'registerOpportunity'
    },

    initialize : function () {
      this.template = tmplHtml;
			
			if (this.collection) {
				this.collection.on('reset', this.render, this);
			}
    },

    render : function () {
      var html = this.template({opportunities : this.collection.toJSON()});
      this.$el.html( html );
    },
        
    registerOpportunity : function (e) {
    	var tr = $(e.target).parents('tr')[0];
    	var oppName = $(tr).attr('data-opp-name');
    	console.log('opportunity : ', oppName);

    	var loginUser = env.get('loginUser');
    	if (!loginUser.get('isAuthenticated')) {
    		loginUser.trigger('authRequired', oppName);
    	}
    	else {
    	}
    	return false;
    }
  
  });
});
