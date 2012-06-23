require.config({
    //By default load any module IDs from js/lib
    baseUrl: '/scripts/lib',
    hbs : {
        templateExtension : 'hbs',
        disableI18n : true
    },
    paths: {
      model: '../models',
      view : '../views',
      collection : '../collections',
      template : '../../templates'
    }
});

/*      
function jsonpcallback(data) {
	alert ("jsonp callback");
} */

require(['env',
	'model/authentication',
	'model/organization',
  'model/opportunity',
  'collection/opportunities',
  'view/container',
  'gperror'
], function (env, AuthenticateModel, OrgnizationModel, OpportunityModel, OpportunityCollection, ContainerView, gpError) {
  
  var dataError = gpError.dataError;
  
  var client = new OrgnizationModel({
  	name : 'Goodwill',
  	id : '23',
  	url : 'http://127.0.0.1:1234/api/organizations/23'
  });
   	
 	var user = new AuthenticateModel({isAuthenticated : false});
 	
 	var opportunities = new OpportunityCollection ({
  	urlRoot: client.url + 'opportunities'
 	});
 	
 	env.set({
 		loginUser : user,
 		orgnization : client,
 		opportunities : opportunities
 	});
 	
  var mainView = new ContainerView({
  	el : $('.givepulse-container'),
  	model : env
  });
  mainView.render();
  mainView.initSubviews();
  
/* 	env.fetch ({
		dataType: 'jsonp',  // use JSONP to implement cross domain request
    url : 'http://127.0.0.1:1234/api/opportunities'
 	});*/
 
  // Request a list of all the opportunities
  var $dfd = $.ajax({
		dataType: 'jsonp',  // use JSONP to implement cross domain request
//    jsonp : "callback",
//    jsonpCallback: "jsonpcallback",
    url : 'http://127.0.0.1:1234/api/opportunities'
  });

	// 
  $dfd.success(function (resp) {
    if (resp.error) {
      return dataError(resp.error_msg);
    }

    var data = resp.data;
    console.log('data', data);
	  	  
	  env.get('opportunities').reset( OpportunityCollection.normalize(data) );
  });

  $dfd.fail(dataError);

});
