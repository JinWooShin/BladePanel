
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
                    src: ['js/template/panels/panel-*.html'],
                    dest: 'js/template/populated_template_cache.js'
                }                
            },
            watch: {
                scripts: {
                    files: ['js/template/panels/*.html', 'css/less/*.less'],
                    tasks: ['html2js', 'less'],
                    options: {
                        spawn: false
                    }
                }
            },
            less: {
                compile: {
                    options: {
                        compress: false,
                        yuicompress: false,
                        optimization: 2,
                        path: ['css/less']
                    },
                    files: {
                        "css/style.css": "css/less/style.less"
                    }
                }
            }
        }
    )

    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['html2js', 'less', 'watch']);
}