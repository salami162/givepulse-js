({
    appDir: "../",
    baseUrl: "scripts/lib",
    dir: "../../public-build",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "none",

    hbs : {
        templateExtension : 'hbs',
        disableI18n : true
    },
    
    paths: {
//	      "jquery": "empty:",
				requireLib : '../require',
	      model: '../models',
	      view : '../views',
	      collection : '../collections',
	      template : '../../templates'
    },
		
		
    modules: [
        //Optimize the application files. jQuery is not 
        //included since it is already in require-jquery.js
        {
            name: "main",
            out: "main-build.js",
						include : 'requireLib'
        }
    ]
})
