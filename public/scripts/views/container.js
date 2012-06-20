define([
	'backbone',
	'view/opportunity',
	'hbs!template/container'
], function (Backbone, OpportunityView, tmplHtml) {
	
	console.log('loading container view');
  return Backbone.View.extend({
  	
    name : "givepulse",
    
    events : {
//      'click .bv-rating-stars-container' : 'clickStars'
    },

    initialize : function () {
      this.template = tmplHtml;
      var html = this.template({});
      this.$el.html( html );
      this.oppView = new OpportunityView({el : this.$el.find('.gp-opportunity-content')});
    },

    render : function () {
      this.oppView.render();      
    }
    
  });
});
