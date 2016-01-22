var basePath = __dirname + '/../',
    cwd = process.cwd(),
    modRewrite = require('connect-modrewrite');

module.exports = {
    options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729,
        base: {
	   path: basePath + '../',
 	   options: {
	       index: 'index.html'
           }
	}
    },
    proxies: [
        {
            context: '/katello/api',
            host: '0.0.0.0',
            port: 3000
        },
        {
            context: '/foreman_tasks',
            host: '0.0.0.0',
            port: 3000
        }
    ],
    livereload: {
        options: {
            open: true,
            middleware: function (connect) {
                return [
                    require('grunt-connect-proxy/lib/utils').proxyRequest,
                    modRewrite(['^[^\\.]*$ /index.html [L]'])
		    //basePath,
		    //'.tmp/',
		    //basePath + '/.tmp/',
		    //basePath + '/vendor/assets/fonts/'
                ];
            }
        }
    },
    test: {
        options: {
            port: 9001,
            middleware: function (connect) {
                return [
                ];
            }
        }
    }
};
