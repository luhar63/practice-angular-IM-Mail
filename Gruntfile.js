'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    var packageJson = grunt.file.readJSON('package.json');
    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        prod: 'prod'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 8000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35720
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            prod: {
                options: {
                    open: true,
                    base: '<%= yeoman.prod %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            prod: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.prod %>/{,*/}*',
                        '!<%= yeoman.prod %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            options: {
                cwd: '<%= yeoman.app %>/../',
            },
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            prod: {
                src: ['<%= yeoman.prod %>/index.html'],
                ignorePath: /\.\.\//

            }
        },

        // Renames files for browser caching purposes
        filerev: {
            prod: {
                src: [
                    '<%= yeoman.prod %>/scripts/{,*/}*.js',
                    '<%= yeoman.prod %>/styles/{,*/}*.css',
                    '<%= yeoman.prod %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.prod %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.prod %>'
            }
        },

        // concat: {
        //     options: {
        //         seperator : ';'
        //     },
        //     prod: {
        //         src: ['<%= yeoman.app %>/scripts/*.js', '<%= yeoman.app %>/scripts/{,*/}*.js' ],
        //         dest: '<%= yeoman.prod %>/app.js'
        //     }
        // },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.prod %>/{,*/}*.html'],
            js: ['<%= yeoman.prod %>/{,*/}*.js'],
            css: ['<%= yeoman.prod %>/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.prod %>', '<%= yeoman.prod %>/images'],
                patterns: {
                    // FIXME While usemin won't have full support for revved files we have to put all references manually here
                    js: [
                        [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },
        // The following *-min tasks will produce minified files in the prod folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    src: '*.css',
                    dest: '<%= yeoman.prod %>/styles'
                }]
            },

        },
        uglify: {
            options: {
                mangle: false
            }
        },
        // concat: {
        //   prod: {}
        // },

        imagemin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.prod %>/img'
                }]
            }
        },

        svgmin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.prod %>/images'
                }]
            }
        },
        htmlangular: {
            options: {

            },
            all: {
                src: [
                    '<%= yeoman.app %>/**/*.html'
                ]
            }
        },
        htmlmin: {
            prod: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.prod %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.prod %>'
                }]
            }
        },
        injector: {
            options: {
                ignorePath: '<%= yeoman.app %>/',
                min: true,
                lineEnding: grunt.util.linefeed
            },
            dependencies: {
                files: {
                    '<%= yeoman.app %>/index.html': [
                        '<%= yeoman.app %>/**/*.js',
                        '!<%= yeoman.app %>/**/*.test.js',
                        '<%= yeoman.app %>/**/*.css'
                    ],
                }
            }
        },
        // ngAnnotate tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            prod: {
                files: [{
                    expand: true,
                    src: ['<%= yeoman.app %>/**/*.js'],
                    dest: '.tmp'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            prod: {
                html: ['<%= yeoman.prod %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            prod: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.prod %>',
                    src: [
                        'index.html',
                        '404.html',
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{gif,webp,png,svg,mp4,jpg,jpeg}',
                        'styles/fonts/*',
                        'fonts/**/*',
                        'images/**/*',
                        'fixtures/**/*',
                        'views/**/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.prod %>/images',
                    src: [
                        'generated/*'
                    ]
                }, {
                    expand: true,
                    cwd: './bower_components/font-awesome/fonts',
                    src: '*',
                    dest: '<%= yeoman.prod %>/fonts'
                }, {
                    expand: true,
                    cwd: './bower_components/bootstrap/fonts',
                    src: '*',
                    dest: '<%= yeoman.prod %>/fonts'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            prod: [
                'copy:styles',
                //'imagemin',
                //'svgmin',
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'prod') {
            return grunt.task.run(['build']); //, 'connect:prod:keepalive']);
        }
        if (target === 'testProd') {
            return grunt.task.run(['testBuild']); //, 'connect:prod:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:prod',
        'concurrent:prod',
        'wiredep',
        'ngAnnotate',
        'injector',
        'useminPrepare',
        'autoprefixer',
        'concat',
        'copy:prod',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'imagemin',
        'svgmin'
    ]);
    grunt.registerTask('testBuild', [
        'clean:prod',
        'concurrent:prod',
        'wiredep',
        'ngAnnotate',
        'injector',
        'useminPrepare',
        'autoprefixer',
        'concat',
        'copy:prod',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'imagemin',
        'svgmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
