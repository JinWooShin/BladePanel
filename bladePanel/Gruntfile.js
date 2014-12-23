
module.exports = function(grunt) {

    grunt.initConfig({
            html2js: {
                options: {
                    base:'app',
                    module: 'app.templates',
                    singleModule: true,
                    useStrict: true,
                    rename: function(moduleName) {
                        return moduleName.split("/")[moduleName.split("/").length-1];
                    }
                },
                main: {
                    src: ['Views/template/panels/panel-*.html'],
                    dest: 'Views/template/populated_template_cache.js'
                }
            },
            watch: {
                scripts: {
                    files: ['Views/template/panels/*.html'],
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