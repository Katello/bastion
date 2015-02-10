var requireDir = require('require-dir');

module.exports = function (grunt) {
    var configs = requireDir('./grunt');

    grunt.loadTasks(__dirname + '/node_modules/grunt-contrib-jshint/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-eslint/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-htmlhint/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-bower-task/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-karma/tasks');
    grunt.loadTasks(__dirname + '/node_modules/grunt-angular-gettext/tasks');

    grunt.initConfig(configs);

    grunt.registerTask('ci', [
        'jshint',
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

    grunt.registerTask('default', [
        'ci',
    ]);
};
