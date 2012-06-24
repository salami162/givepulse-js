define([
	'env',
	'backbone',
	'gperror'
], function(env, Backbone, gpError){
		
	return Backbone.Model.extend({
    name : 'authentication',
    
    initialize : function () {
    	env.on('registerOpportunity', this.registerOpportunity, this);
    },
    
	  registerOpportunity : function(oppName) {
    	if (!this.get('isAuthenticated')) {
    		this.trigger('authRequired', oppName);
    	}
    	else {
    		this.addImpact(oppName);
    	}
	  },
	  
	  addImpact : function (oppName) {
	  	var self = this;
			self._sendRequest({
//				url : 'http://www.givepulse.com/session/',
				url : 'http://localhost:1234/api/impact/',
				data : {opportunity : oppName, loginUser : this.toJSON()}
			},function () {
				env.trigger('registerSucceed', {username: self.get('name'), opportunity: self.get('opportunity')});
			});
	  },
	  
    signIn : function(jsonData, cb) {
	  	var self = this;
			self._sendRequest({
//				url : 'http://www.givepulse.com/session/',
				url : 'http://localhost:1234/api/session/',
				data : jsonData
			}, function () {
				self.trigger('signInSucceed');
				env.trigger('registerSucceed', {username: self.get('name'), opportunity: self.get('opportunity')});
    		if (_.isFunction(cb)) {cb.call();}
			});
		},
	  
	  signUp : function (jsonData, cb) {
	  	var self = this;
			self._sendRequest({
//				url : 'http://www.givepulse.com/signup/',
				url : 'http://localhost:1234/api/signup/',
				data : jsonData
			}, function () {
				self.trigger('signInSucceed');
				env.trigger('registerSucceed', {username: self.get('name'), opportunity: self.get('opportunity')});
    		if (_.isFunction(cb)) {cb.call();}
			});
	  },
	  
	  _sendRequest : function(options, cb) {
    	var self = this;
	   	var dataError = gpError.dataError;
	   	options = _.extend({}, options, {type:'POST', dataType:'json'});
			var $dfd = $.ajax(options);
			
    	$dfd.success(function (resp) {
		    if (resp.error) {
		      return dataError(resp.error_msg);
		    }
		
		    var data = resp.data;
    		self.set(data);
    		
    		if (_.isFunction(cb)) {cb.call();}
    	});
    	
    	$dfd.fail(dataError);   	
	  }
    
	});
	
});
