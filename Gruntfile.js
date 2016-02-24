module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'client/client.js',
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['client/client.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['client/sass/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "jquery/dist/jquery.min.js",
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular-csp.css",
                    "angular-ui-router/release/angular-ui-router.min.js",
                    "bootstrap/",
                    "bootstrap/*.*",
                    "bootstrap/**/*.*"
                ],
                "dest": "server/public/vendor"
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'client/sass',
                    src: ['style.scss'],
                    dest: 'server/public/assets/styles',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify', 'sass']);

};