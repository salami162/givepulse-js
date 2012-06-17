var fs = require('fs');
var path = require('path');

function loadFile (filename, encoding) {
	try {
		// default encoding is utf8
		if (typeof (encoding) == 'undefined') encoding = 'utf8';
		
		// read file synchroneously
		var contents = fs.readFileSync(filename, encoding);
		// parse contents as JSON
		return JSON.parse(contents);
		
	} catch (err) {
		// an error occurred
		throw err;	
	}
} // loadJSONfile

// this is what we needed to do now
// only supports get and post... probably good enough
function router(prefix, app) {
  return {
    get : function (route, cb) {
      app.get(prefix + route, cb);
    },
    post : function (route, cb) {
      app.post(prefix + route, cb);
    }
  };
}

exports.routes = function (prefix, app) {
  // make all api routes start with prefix
  app = router(prefix, app);

  // get a list of challenges, limited to 100, sorted by create time desc
  app.get('/opportunities', function (req, res) {
//  	res.header('Access-Control-Allow-Origin', '*');
		var opportunities = loadFile(path.join(__dirname, '../data/opportunities.json'));
    res.json({
      error : false,
      data : opportunities
    });
  });

}