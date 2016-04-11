'use strict';

var request = require('request');
var prefixer = require('html-prefixer');
var injector = require('./injector');
var Url = require('url');

var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0';

function fetch(options, callback) {
	// Get URL stream
	var stream = request({
		url: options.url,
		headers: {
			'User-Agent': USER_AGENT
		}
	});
	// Inject styles
	if (options.css) {
		stream = stream.pipe(injector('head', '<style type="text/css">\n' + options.css + '\n</style>\n'));
	}
	// Inject script
	if (options.js) {
		// TODO: head or body
		stream = stream.pipe(injector('head', '<script type=\"text/javascript\">\n' + options.js + '\n<\/script>\n'));
	}
	// Modify relative URL paths in response
	prefixer(stream, {
		prefix: options.url
	}, callback);
}

/**
 * Middleman Middleware
 * @param  {Object} options Object containing a url property, js string for appending javascript and css string for appending CSS
 * @return {Function}        Express middleware function
 */
module.exports = function (options) {
	return function(req, res, next) {
		fetch(options, function(err, buffer) {
			if (err) {
				next(err);
			} else {
				res.write(buffer);
				res.end();
			}
		});
	};
};
