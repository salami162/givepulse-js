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
    },

    render: function () {
      var html = this.template({opportunities : this.collection.toJSON()});
      console.log("render HTML = ", html);
      this.$el.html( html );
    }
  
  });
});
