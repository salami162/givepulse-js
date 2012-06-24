define([
	'bootstrap',
	'backbone',
	'hbs!template/authentication'
], function ($, Backbone, tmplHtml) {
	
  return Backbone.View.extend({
  	
    name : "authentication",
    
    events : {
      'click .gp-placeholder' : 'focusTextInput',
      'keypress .gp-text-input' : 'hidePlaceholder',
      'change .gp-text-input' : 'checkTextInput',
      'click .gp-signin-btn' : 'signIn',
      'click .gp-signup-btn' : 'signUp',
      'click .gp-forget' : 'forgetPassword'
    },

    initialize : function () {
      this.template = tmplHtml;
      if (this.model) {
      	this.model.on('authRequired', this.showModal, this);
      }
    },

    render : function (jsonData) {
      var html = this.template(jsonData);
      this.$el.html( html );
    },
    
    showModal : function (opp) {
    	this.render({opportunity : opp});
    	this.$el.modal('show');
    },
    
    focusTextInput : function(e) {
    	$(e.target).prev().focus();
    },
    
    hidePlaceholder : function(e) {
    	$(e.target).next().hide();
    },
    
    checkTextInput : function(e) {
    	var $input = $(e.target);
    	if ($input.val() == '') $input.next().show();
    },
        
    signIn : function(e) {
    	var self = this;
			var args = {
				email : $('.gp-front-signin .gp-email-input').val(),
				password : $('.gp-front-signin .gp-password-input').val(),
				opportunity : $('.gp-front-signin .gp-opportunity').val()
			}; 
	   	self.model.signIn(args, function() {
	   		self.$el.modal('hide');
	   	});
	   	return false;
    },
    
    signUp : function() {
    	var self = this;
			var args = {
				firstname : $('.gp-front-signup .gp-firstname-input').val(),
				lastname : $('.gp-front-signup .gp-lastname-input').val(),
				email : $('.gp-front-signup .gp-email-input').val(),
				password : $('.gp-front-signup .gp-password-input').val(),
				opportunity : $('.gp-front-signup .gp-opportunity').val()
			}; 
	   	self.model.signUp(args, function() {
	   		self.$el.modal('hide');
	   	});
	   	return false;
    },
    
    forgetPassword : function() {
    	alert("todo");
    }
      
  });
});
