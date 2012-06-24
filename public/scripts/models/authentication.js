define([
	'backbone',
	'gperror'
], function(Backbone, gpError){
		
	return Backbone.Model.extend({
    initialize : function () {
    	name : 'authentication'
    },
    
    signIn : function(jsonData, cb) {
			this._sendRequest({
//				url : 'http://www.givepulse.com/session/',
				url : 'http://localhost:1234/api/session/',
				data : jsonData
			}, cb);
		},
	  
	  signUp : function (jsonData, cb) {
			this._sendRequest({
//				url : 'http://www.givepulse.com/signup/',
				url : 'http://localhost:1234/api/signup/',
				data : jsonData
			}, cb);
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
