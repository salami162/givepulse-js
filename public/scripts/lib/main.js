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
  'model/opportunity',
  'collection/opportunities',
  'view/opportunity',
  'gperror',
//  'hbs!template/container'
], function ( env, opportunityModel, opportunityCollection, opportunityView, gpError) {
  
  var dataError = gpError.dataError;
 
  //set initial state
  var $dfd = $.ajax({
		dataType: 'jsonp',  // use JSONP to implement cross domain request
//    jsonp : "callback",
//    jsonpCallback: "jsonpcallback",
    url : 'http://127.0.0.1:1234/api/opportunities'
  });

  $dfd.success(function (resp) {
    if (resp.error) {
      return dataError(resp.error_msg);
    }

    var data = resp.data;
    console.log('data', data);
	  
	  var allOpportunities = new opportunityCollection( opportunityCollection.normalize(data));
	  
	  var mainView = new opportunityView({
	    el : $('.givepulse-container'),
	    collection : allOpportunities,
	    model: env
	  });

    mainView.render();
  });

  $dfd.fail(dataError);

});
