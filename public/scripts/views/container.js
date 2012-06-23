define([
	'backbone',
	'view/opportunity',
	'view/authentication',
	'hbs!template/container'
], function (Backbone, OpportunityView, AuthenticationView, tmplHtml) {
	
  return Backbone.View.extend({
  	
    name : "givepulse",
    
    events : {
//      'click .bv-rating-stars-container' : 'clickStars'
    },

    initialize : function () {
      this.template = tmplHtml;
    },

    render : function () {
      var html = this.template({});
      this.$el.html( html );
    },
    
    initSubviews : function () {
      this.oppsView = new OpportunityView({
      	el : this.$('.gp-opportunity-content'),
      	collection : this.model.get('opportunities')
     	});
     	this.authView = new AuthenticationView({
     		el : this.$('.gp-register-content'),
     		model : this.model.get('loginUser')
     	});
    }
    
  });
});
