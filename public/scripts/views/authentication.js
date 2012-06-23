define([
	'bootstrap',
	'backbone',
	'hbs!template/authentication'
], function ($, Backbone, tmplHtml) {
	
  return Backbone.View.extend({
  	
    name : "authentication",
    
    events : {
//      'click .bv-rating-stars-container' : 'clickStars'
    },

    initialize : function () {
      this.template = tmplHtml;
      if (this.model) {
      	this.model.on('authRequired', this.showModal, this);
      }
    },

    render : function () {
      var html = this.template(this.model.toJSON());
      this.$el.html( html );
    },
    
    showModal : function () {
    	console.log('showModal');
    	this.render();
    	this.$el.modal('show');
    }
      
  });
});
