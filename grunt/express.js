var path = require('path');

module.exports = {
	dev: {
		options: {
		    port: 9000,
		    bases: ['.tmp/'],
            livereload: true,
		    hostname: '0.0.0.0'
		}
	}
}
