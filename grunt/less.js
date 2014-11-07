var basePath = __dirname + '/../',
    pluginName = process.cwd().split('/').pop();

module.exports = {
    development: {
        options: {
            paths: [basePath + "vendor/assets/stylesheets/bastion", basePath + "app/assets/stylesheets/bastion"]
        },
        files: {
            ".tmp/bastion/bastion.css": [basePath + "app/assets/stylesheets/bastion/bastion.less", "app/assets/stylesheets/**/" + pluginName + ".less"]
        }
    }
};
