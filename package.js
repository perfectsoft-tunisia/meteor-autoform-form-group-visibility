Package.describe({
    name: 'perfectsofttunisia:autoform-form-group-visibility',
    version: '1.0.0',
    summary: 'Add ability to show/hide fields dynamically',
    git: 'https://github.com/perfectsoft-tunisia/meteor-autoform-form-group-visibility',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2');
    api.use(['ecmascript', 'check']);
    api.use([
        'templating',
        'aldeed:template-extension@3.0.0 || 4.0.0'
    ], 'client');

    api.use('aldeed:autoform@4.0.0 || 5.0.0 || 6.0.0', {weak: true});
    api.use('perfectsofttunisia:autoform@4.0.0 || 5.0.0 || 6.0.0', {weak: true});

    //The simple schema configuration must be included in server
    //and client code as schema can be defined in both
    api.addFiles('simple-schema-config.js');
    api.addFiles([
        'form-group-visibility.html',
        'form-group-visibility.js'
    ], 'client');
});
