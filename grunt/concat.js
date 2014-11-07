var path = require('path');

var basePath = path.normalize(__dirname + '/../'),
    pluginDir = process.cwd();

module.exports = {
    options: {
        separator: ';'
    },
    modules: {
        src: [
            basePath + 'app/assets/javascripts/**/*.module.js',
            pluginDir + '/app/assets/javascripts/**/*.module.js'
        ],
        dest: '.tmp/bastion/modules.js'
    },
    therest: {
        src: [
            basePath + 'app/assets/javascripts/**/*.js',
            pluginDir + '/app/assets/javascripts/**/*.js',
            '!' + basePath + 'app/assets/javascripts/**/*.module.js',
            '!' + pluginDir + '/app/assets/javascripts/**/*.module.js'
        ],
        dest: '.tmp/bastion/bastion.js'
    }
};
