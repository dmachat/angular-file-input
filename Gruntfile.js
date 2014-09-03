'use strict';

module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    config: {
      src: 'src/**/*.js',
      dist: 'dist',
      dev: 'dev',
      unit: 'test/**/*.js',
      e2e: 'e2e/**/*.js',
      sass: 'src/**/*.scss',
      module: 'angular-file-input.js',
      minified: 'angular-file-input.min.js'
    },

    // Testing
    karma: {
      options: {
        configFile: 'karma.conf.js',
        files: [
          'bower_components/es5-shim/es5-shim.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-mocks/angular-mocks.js',
          '<%= config.src %>',
          '<%= config.unit %>'
        ]
      },
      unit: {
        options: {
          browsers: [
            'Chrome'
          ]
        },
        background: true
      },
      continuous: {
        options: {
          browsers: [
            'PhantomJS'
          ]
        },
        singleRun: true
      }
    },

    // Validation
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.src %>',
        '<%= config.unit %>',
        '<%= config.e2e %>'
      ]
    },

    // Developing
    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['build']
      },
      js: {
        files: ['<%= config.src %>', '<%= config.unit %>'],
        tasks: ['concat', 'karma:unit:run', 'jshint']
      },
      sass: {
        files: ['<%= config.sass %>'],
        tasks: ['sass:dev']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['<%= config.dist %>/<%= config.module %>', 'src/**/*.css']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            'bower_components',
            '<%= config.dist %>',
            '<%= config.dev %>',
          ]
        }
      },
    },

    // Building
    clean: {
      dist: {
        files: '<%= config.dist %>'
      },
      dev: '.tmp'
    },

    concat: {
      dev: {
        files: {
          '<%= config.dist %>/<%= config.module %>': '<%= config.src %>'
        }
      }
    },

    ngmin: {
      dist: {
        files: {
          '<%= config.dist %>/<%= config.module %>': '<%= config.dist %>/<%= config.module %>'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/<%= config.minified %>': '<%= config.dist %>/<%= config.module %>'
        },
        options: {
          compress: true
        }
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= config.dist %>/angular-file-input.css': 'src/directives/btnFileInput.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= config.dist %>/angular-file-input.min.css': 'src/directives/btnFileInput.scss'
        }
      }
    },

    wiredep: {
      target: {
        src: ['<%= config.dev %>/*.html'],
      }
    },

    // Releasing
    bump: {
      options: {
        files: [
          'package.json',
          'bower.json'
        ],
        updateConfigs: [],
        commit: true,
        commitMessage: '%VERSION%',
        commitFiles: [
          'CHANGELOG.md',
          'package.json',
          'bower.json',
          'dist/angular-file-input.scss',
          'dist/angular-file-input.min.css',
          'dist/angular-file-input.js',
          'dist/angular-file-input.min.js'
        ],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'karma:continuous'
  ]);

  grunt.registerTask('dev', [
    'clean:dev',
    'concat:dev',
    'sass:dev',
    'jshint',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('autotest', [
    'concat',
    'karma:unit',
    'karma:unit:run',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concat',
    'ngmin:dist',
    'uglify:dist',
    'sass'
  ]);

  grunt.registerTask('default', [
    'build',
    'test'
  ]);

  grunt.registerTask('travis', [
    'jshint',
    'test'
  ]);

  grunt.registerTask('release', [
    'build',
    'bump'
  ]);

};
