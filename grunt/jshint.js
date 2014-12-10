module.exports = {
    options: {
        jshintrc: __dirname + '/../.jshintrc'
    },
    all: [
        'Gruntfile.js',
        'app/assets/javascripts/**/*.js',
        '!app/assets/javascripts/bastion/i18n/translations.js'
    ]
};
