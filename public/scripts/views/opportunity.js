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
			env.on('registerSucceed', this.updateOpportunity, this);
    },

    render : function () {
      var html = this.template({opportunities : this.collection.toJSON()});
      this.$el.html( html );
    },
        
    registerOpportunity : function (e) {
    	var tr = $(e.target).parents('tr')[0];
    	var oppName = $(tr).attr('data-opp-name');

			env.trigger('registerOpportunity', oppName);
    	
    	return false;
    },
    
    updateOpportunity : function (data) {
//    	alert(data.username + ", thank you for registering with GivePulse!");
    	var td = this.$('tr[data-opp-name="'+ data.opportunity + '"]').find('td')[1];
    	$(td).html(data.username + ", you are registered.");
    }
  
  });
});
