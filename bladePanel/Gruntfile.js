
module.exports = function(grunt) {

    grunt.initConfig({
            html2js: {
                options: {
                    base:'app',
                    module: 'myApp.templates',
                    singleModule: true,
                    useStrict: true,
                    rename: function(moduleName) {
                        return moduleName.split("/")[moduleName.split("/").length-1];
                    }
                },
                main: {
                    src: ['Views/templates/panels/panel-*.html'],
                    dest: 'View/templates/populated_template_cashe.js'
                }
            },
            watch: {
                scripts: {
                    files: ['Views/templates/panels/*.html'],
                    tasks: ['html2js'],
                    options: {
                        spawn: false
                    }
                }
            }
        }
    )

    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['html2js', 'watch']);
}