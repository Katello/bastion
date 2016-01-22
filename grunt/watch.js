var basePath = __dirname + '/../',
    pluginName = process.cwd().split('/').pop();

module.exports = {
    options: {
      livereload: true,
    },
    styles: {
        files: ['app/assets/stylesheets/**/*.less'],
        tasks: ['less']
    },
    templates: {
        files: [
            basePath + 'app/assets/javascripts/**/*.html',
            'app/assets/javascripts/**/*.html'
        ],
        tasks: ['ngtemplates']
    },
    concat: {
        files: [basePath + 'app/assets/javascripts/**/*.js', 'app/assets/javascripts/**/*.js'],
        tasks: ['concat']
    },
    index: {
        files: ['index.html'],
        tasks: ['copy:index']
    }
};
