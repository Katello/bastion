module.exports = {
    index: {
        files: [
            {src: 'index.html', dest: '.tmp/'},
        ]
    },
    bower: {
        files: [
            {expand: true, src: ['bastion/bower_components/**'], dest: '.tmp/'},
        ]
    }
}
