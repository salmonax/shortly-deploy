module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: { 
        separator: ';',
      },
      dist: {
        src: ['public/client/*.js'],
        dest: 'public/dist/built.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'public/dist/built.min.js': ['public/dist/built.js'],
          'public/dist/backbone.js': ['public/lib/backbone.js'],
          'public/dist/jquery.js': ['public/lib/jquery.js'],
          'public/dist/handlebars.js': ['public/lib/handlebars.js'],
          'public/dist/underscore.js': ['public/lib/underscore.js']
        }
      }

    },

    processhtml: {
      dist: {
        files: {
          'views/index.ejs': ['src/index.ejs'], 
          'views/layout.ejs': ['src/layout.ejs']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
      ]
    },

    cssmin: {
      dist: {
        files: {
          'public/dist/style.min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: [
          'git add .',
          'git commit -m "Deployment commit on: ' + (function() {
            var date = new Date();
            return date.toString(); 
          })() + '"',
          'git push live master'
        ].join('&&')
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-processhtml');


  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin', 'processhtml']);

  grunt.registerTask('prebuild', [ 'eslint', 'test']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {

      //push it up to our droplet --use shell commands
      // add your production server task here

      //running nodemon on production server

      //


    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'prebuild',
    'build',
    'upload'

    // add your deploy tasks here
  ]);


};
