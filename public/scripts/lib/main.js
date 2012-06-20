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
	'model/user',
	'model/orgnization',
  'model/opportunity',
  'collection/opportunities',
  'view/container',
  'view/opportunity',
  'gperror'
], function (env, OrgnizationModel, UserModel, OpportunityModel, OpportunityCollection, ContainerView, OpportunityView, gpError) {
  
  var dataError = gpError.dataError;
  
  var client = new OrgnizationModel({
  	name : 'Goodwill',
  	id : '23',
  	urlRoot : 'http://127.0.0.1:1234/api/orgnizations/23',
  	opportunities : new OpportunityCollection({	url: 'http://127.0.0.1:1234/api/opportunities' })
  })
   	
 	var user = new UserModel({isAuthenticated : false});
 	
 	env.set({
 		loginUser : user,
 		orgnization: client
 	});
 	
  var mainView = new ContainerView({
  	el : $('.givepulse-container'),
  	model : client
  });
    
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
	  	  
	  client.get('opportunities').reset( OpportunityCollection.normalize(data) );
  	mainView.oppView.collection = client.get('opportunities');
	  
    mainView.render();
  });

  $dfd.fail(dataError);

});
