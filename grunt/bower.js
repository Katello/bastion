module.exports = {
    update: {
        options: {
            targetDir: 'vendor/assets',
            copy: true,
            layout: function (type, component) {
                // We provide a bit of customization here by allowing
                // explicit path declarations if the component is included
                // in the type. This is handy for sub-nesting within folders
                // for a component. Fallback is 'byType'.
                if (type.indexOf(component) !== -1) {
                    return require('path').join(type);
                } else {
                    return require('path').join(type, component);
                }
            },
            clearBowerDir: true
        }
    }
}
