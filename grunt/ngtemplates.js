var path = require('path');

var basePath = path.normalize(__dirname + '/../'),
    pluginDir = process.cwd(),
    pluginName = pluginDir.split('/').pop();

module.exports = {
    templates: {
        src: [basePath + 'app/assets/javascripts/**/*.html', pluginDir + '/app/assets/javascripts/**/*.html'],
        dest: '.tmp/bastion/templates.js',
        options: {
            standalone: true,
            url: function(url) {
                return url.replace(basePath + 'app/assets/javascripts/bastion/', '').replace(pluginDir + '/app/assets/javascripts/' + pluginName, '');
            }
        }
    }
};
