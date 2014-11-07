var requireDir = require('require-dir');

module.exports = function (grunt) {
    var configs = requireDir('./grunt');

    grunt.loadTasks(__dirname + '/node_modules/grunt-eslint/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-htmlhint/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-bower-task/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-karma/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-angular-gettext/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-contrib-connect/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-connect-proxy/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-contrib-less/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-contrib-watch/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-contrib-copy/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-contrib-concat/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-angular-templates/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-wiredep/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-express/tasks');

    grunt.initConfig(configs);

    grunt.registerTask('ci', [
        'eslint',
        'htmlhint',
        'karma:ci'
    ]);

    grunt.registerTask('test', [
        'karma:unit'
    ]);

    grunt.registerTask('i18n:extract', [
        'nggettext_extract'
    ]);

    grunt.registerTask('i18n:compile', [
        'nggettext_compile'
    ]);

    grunt.registerTask('serve', [
        'less',
        'ngtemplates',
        'concat',
        'copy',
        //'configureProxies:livereload',
        'express:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'ci',
    ]);
};
